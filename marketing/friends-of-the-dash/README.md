# Friends of the Dash campaign (2027)

Everything needed to recruit $250 Friends of the Dash sponsors by email and social media.

Sign-up link (used everywhere): https://dashforthebeads.org/sponsor/friends-of-the-dash/#claim

## Before sending

1. **Deploy the site.** The email's images load from `https://dashforthebeads.org/assets/email/` (files live in `public/assets/email/`). They won't show until the site is deployed.
2. **Send yourself a test** from your email tool and open it on a phone.

## Email

- `email.html`: designed HTML email. Paste it into your email tool's "code your own" / custom HTML option (Mailchimp, Constant Contact, etc.).
- **Subject line:** Become a Friend of the Dash for $250
  - Alternates: "You're invited: Friends of the Dash 2027" · "2 race entries + Oak Cliff kids who thrive" · "Help make the 2027 Dash our best yet"
- **Preview text:** Two race entries, your name on our website, and Oak Cliff kids who thrive.

### Plain-text version (for Gmail/Outlook, or a personal note)

> Dear Community Partner,
>
> We are excited to invite you to become a Friend of the Dash for the 2027 Dash for the Beads 5K Fun Run & Family Festival on Sunday, February 7, 2027!
>
> Dash for the Beads is more than just a 5K. It's one of Oak Cliff's most cherished traditions: a chip-timed 5K through Kessler Park, a 1-mile Fun Run for families, and a Mardi Gras festival with music, food trucks, mimosas, and craft beer, right before the Go Oak Cliff Mardi Gras Parade rolls down Davis Street.
>
> As we prepare for 2027, we're looking for neighbors, families, and community supporters who want to make a difference. Every contribution, big or small, makes an impact.
>
> FRIENDS OF THE DASH: $250
> - 2 race entries (5K or 1-mile Fun Run)
> - Your name on the Dash for the Beads website
> - A direct boost for Oak Cliff schools and youth non-profits
>
> Why become a Friend of the Dash?
> - Support a community-centered event that brings about 1,000 runners and thousands of parade-goers to Davis Street.
> - Help create a fun, family-friendly experience.
> - Show your commitment to giving back.
> - Be part of a great cause: all net proceeds go to Oak Cliff kids through fitness, nutrition, and the arts. The Dash has awarded more than $450,000 so far.
>
> Joining takes two minutes: send the short form at https://dashforthebeads.org/sponsor/friends-of-the-dash/ or simply reply to this email. We'll send payment details (PayPal, Zelle, or check).
>
> Thank you for considering supporting Dash for the Beads. Together, we can make a difference, one step at a time!
>
> With gratitude,
> Dash for the Beads Sponsorship Team
> 2027 Dash for the Beads 5K Fun Run & Family Festival
> Making Every Step Count!
>
> P.S. Representing a business? Sponsorships start at $750 and include your name or logo on the Dash tee shirt. See all levels: https://dashforthebeads.org/get-involved/sponsor/

## Social graphics (`social/`)

| File | Size | Use for |
|---|---|---|
| `friends-carousel-1-invite.png` | 1080×1350 | Instagram/Facebook feed post, or slide 1 of a carousel |
| `friends-carousel-2-benefits.png` | 1080×1350 | Carousel slide 2 |
| `friends-carousel-3-impact.png` | 1080×1350 | Carousel slide 3 |
| `friends-story.png` | 1080×1920 | Instagram/Facebook Stories (add a link sticker to the sign-up link) |
| `friends-facebook-linkedin.png` | 1200×630 | Facebook, LinkedIn, X, Nextdoor posts |

To change wording, edit `social/social.html` and run `zsh marketing/friends-of-the-dash/social/render.sh` (needs Google Chrome).

### Captions

**Instagram carousel**
> Want to be part of one of Oak Cliff's most cherished traditions? Become a Friend of the Dash! 💜💚💛
>
> For $250 you get 2 race entries (5K or 1-mile Fun Run), your name on our website, and the best feeling of all: knowing you helped Oak Cliff kids thrive through fitness, healthy eating, and the arts.
>
> 🗓️ Sunday, Feb 7, 2027 · Davis & Clinton
> 🔗 Link in bio to join
>
> #DashForTheBeads #OakCliff #FriendsOfTheDash #Dallas5K #MardiGras #GoOakCliff #DallasNonprofit

**Facebook / LinkedIn**
> Calling all neighbors, families, and small businesses! Become a Friend of the Dash for the 2027 Dash for the Beads 5K Fun Run & Family Festival on Sunday, February 7.
>
> $250 includes 2 race entries and your name on our website, and every dollar of net proceeds goes to Oak Cliff schools and youth non-profits. The Dash has awarded more than $450,000 so far.
>
> Join here: https://dashforthebeads.org/sponsor/friends-of-the-dash/
>
> Making every step count! 🎭

**Story text (if posting without the graphic)**
> Be a Friend of the Dash 💜 $250 = 2 race entries + your name on our site + Oak Cliff kids who thrive. Tap the link!

**Short reminder post (closer to the race)**
> Still time to become a Friend of the Dash! $250 gets you 2 race entries for Feb 7 and helps Oak Cliff kids run, eat well, and create. Link in bio. 🏃‍♀️📿
