# Website forms → Google Sheet

Every form on the site posts to a small Google Apps Script web app, which writes it to a Google Sheet. One tab per form:

| Tab | Forms |
| --- | --- |
| Newsletter | "Get race updates" (Home, The Race) and "Stay connected" (Contact). Duplicate emails are skipped. |
| Contact | Contact page form |
| Sponsor deck, Sponsor claims, Friends, Vendors, Volunteers | The other interest forms |

Columns are the field labels people see ("First name", "Email", "Comments"), plus Timestamp, Form, and Page. New fields add columns automatically.

## Setup (about 5 minutes, once)

1. Sign in to the Google account that should own the submissions (ideally the info@dashforthebeads.org account) and create a blank sheet at [sheets.new](https://sheets.new). Name it **Dash for the Beads Website Forms**.
2. In the sheet: **Extensions → Apps Script**. Delete the starter code, paste in all of `Code.gs` from this folder, and save.
3. Email alerts: `NOTIFY_EMAIL` near the top is set to `'info@dashforthebeads.org'`, and `NOTIFY_FORMS` lists which forms send one. Out of the box that's the two Friends of the Dash forms. Add `'contact'`, `'sponsor-deck'`, `'vendor'`, or `'volunteer'` to get alerts for those too, or set `NOTIFY_EMAIL` to `''` to turn alerts off.
4. **Deploy → New deployment**. Click the gear and choose **Web app**. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then **Authorize access** and approve. Google will warn that the app isn't verified because it's your own script: choose **Advanced → Go to (project name)**.
6. Copy the **Web app URL** (it ends in `/exec`). Open it in a browser: you should see `{"ok":true,"service":"Dash for the Beads forms"}`.
7. Paste the URL into `formEndpoint` in `src/data.js`, then rebuild and deploy the site:
   ```js
   formEndpoint: 'https://script.google.com/macros/s/AKfy.../exec',
   ```

Until `formEndpoint` is set, forms fall back to opening a prefilled email to info@dashforthebeads.org, so nothing is lost.

## Updating the script

After editing `Code.gs` in Apps Script, use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. This keeps the same URL. Creating a *new deployment* instead gives you a new URL, which you'd then have to update in `src/data.js`.

## Friends of the Dash alerts

Each Friends sign-up emails info@dashforthebeads.org with the subject **New Friend of the Dash: First Last**. Hit Reply to answer the person directly with payment details. Sign-ups are saved either way:

| Where they signed up | Form name | Sheet tab |
| --- | --- | --- |
| Get Involved page | `friends` | Friends |
| Friends of the Dash sponsor page (linked from the Friends email) | `sponsor-friends-of-the-dash` | Sponsor claims |

Sending email is a new permission. When you deploy the new version, Google asks you to authorize it (allow "Send email as you"). If it doesn't ask, pick `doGet` in the Apps Script toolbar and click **Run** once to bring up the prompt. Until it's approved, alerts won't send, but sign-ups still save.

## Notes

- **Spam:** each form has a hidden honeypot field. Submissions that fill it are silently dropped. If spam still gets through, add Cloudflare Turnstile.
- **Safety:** values starting with `=`, `+`, `-`, or `@` are stored as text, so nobody can plant a formula in the sheet.
- **Moving to a mailing tool:** export the Newsletter tab as CSV and import it into Mailchimp, Constant Contact, or similar.
- **Testing locally:** the site POSTs `text/plain` JSON (`{ form, page, website, fields }`) so the browser skips a CORS preflight, which Apps Script can't answer.
