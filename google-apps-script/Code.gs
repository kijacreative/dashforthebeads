/**
 * Dash for the Beads: website form receiver.
 *
 * Paste this into Extensions > Apps Script on the "Dash for the Beads Website Forms" Google Sheet,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the /exec URL into formEndpoint in src/data.js. Full steps: google-apps-script/README.md
 *
 * Each form writes to its own tab. Newsletter sign-ups from every page share one "Newsletter" tab
 * and are de-duplicated by email. New fields get new columns automatically.
 */

// Optional: email the committee when these forms come in. Leave NOTIFY_EMAIL empty to turn off.
const NOTIFY_EMAIL = '';
const NOTIFY_FORMS = ['contact', 'sponsor-deck', 'vendor', 'volunteer', 'friends'];

const NEWSLETTER_FORMS = ['race-updates', 'mailing-list'];
const TAB_NAMES = { contact: 'Contact', 'sponsor-deck': 'Sponsor deck', friends: 'Friends', vendor: 'Vendors', volunteer: 'Volunteers' };
const MAX_LEN = 5000;

function doPost(e) {
  try {
    const p = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    // Honeypot: real people never see or fill the "website" field.
    if (p.website) return json({ ok: true });

    const form = String(p.form || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60);
    const fields = p.fields && typeof p.fields === 'object' ? p.fields : {};
    if (!form || !Object.keys(fields).length) return json({ ok: false, error: 'Empty submission' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const isNews = NEWSLETTER_FORMS.indexOf(form) !== -1;
      const tab = isNews ? 'Newsletter' : TAB_NAMES[form] || (form.indexOf('sponsor-') === 0 ? 'Sponsor claims' : form);
      const sheet = getSheet(tab);
      const row = Object.assign({ Timestamp: new Date(), Form: form, Page: String(p.page || '').slice(0, 200) }, clean(fields));

      if (isNews && alreadySubscribed(sheet, row.Email)) return json({ ok: true, duplicate: true });
      append(sheet, row);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL && NOTIFY_FORMS.indexOf(form) !== -1) notify(form, fields);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  }
}

// Health check: open the /exec URL in a browser to confirm the deployment works.
function doGet() {
  return json({ ok: true, service: 'Dash for the Beads forms' });
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(['Timestamp', 'Form', 'Page']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
  }
  return sheet;
}

// Writes values under matching headers, adding a column for any field the sheet hasn't seen yet.
function append(sheet, row) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
  Object.keys(row).forEach((k) => {
    if (headers.indexOf(k) === -1) {
      headers.push(k);
      sheet.getRange(1, headers.length).setValue(k).setFontWeight('bold');
    }
  });
  sheet.appendRow(headers.map((h) => (h in row ? row[h] : '')));
}

function alreadySubscribed(sheet, email) {
  if (!email) return false;
  const col = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0].indexOf('Email');
  if (col === -1 || sheet.getLastRow() < 2) return false;
  const want = String(email).trim().toLowerCase();
  return sheet.getRange(2, col + 1, sheet.getLastRow() - 1, 1).getValues().some((r) => String(r[0]).trim().toLowerCase() === want);
}

// Trims long values and neutralizes spreadsheet formulas (=, +, -, @) typed into the form.
function clean(fields) {
  const out = {};
  Object.keys(fields).slice(0, 40).forEach((k) => {
    const key = String(k).slice(0, 80).replace(/^[=+\-@]/, "'$&");
    let v = String(fields[k] == null ? '' : fields[k]).slice(0, MAX_LEN);
    if (/^[=+\-@\t\r]/.test(v)) v = "'" + v;
    out[key] = v;
  });
  return out;
}

function notify(form, fields) {
  const body = Object.keys(fields).map((k) => k + ': ' + fields[k]).join('\n');
  const opts = { name: 'Dash for the Beads website' };
  if (fields.Email && /^\S+@\S+\.\S+$/.test(fields.Email)) opts.replyTo = fields.Email;
  MailApp.sendEmail(NOTIFY_EMAIL, 'Website form: ' + form, body + '\n\nAll submissions: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(), opts);
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
