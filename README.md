# Pura Suerte App

Pura Suerte is a small browser app for quick decisions:

- **Toss a coin**: Flip a virtual coin and get Heads or Tails.
- **Random number**: Generate an inclusive integer between two limits.
- **Raffle**: Enter one name or item per line and randomly select a winner.

## Technology

The app is a plain static website built with:

- HTML
- CSS
- jQuery
- Bootstrap CSS and JavaScript
- Bootstrap Icons
- The browser Web Crypto API for random values

There is no Node.js, npm, build step, backend, or package installation required.

## Run The App

Open `src/index.html` directly in a browser, or serve the `src/` folder from any static web host.

The page loads Bootstrap, jQuery, and web fonts from CDNs, so an internet connection is required unless those resources are later downloaded and vendored locally.

## Routes

The app uses hash routes so it works from a local file and from a basic static host:

| Route | Purpose |
| --- | --- |
| `#/` | Main menu |
| `#/coin` | Coin toss |
| `#/number` | Random number generator |
| `#/raffle` | Raffle winner picker |

## Project Structure

```text
src/
  index.html
  css/
    styles.css
  js/
    app.js
.github/
  ISSUE_TEMPLATE/
  PULL_REQUEST_TEMPLATE.md
```

## Randomness And Behavior

Random values use `crypto.getRandomValues()` with rejection sampling to avoid biased ranges. Raffle entries are trimmed line by line, blank lines are ignored, and duplicate entries count as separate chances.

Number limits must be safe integers between -9007199254740991 and 9007199254740991. A range can contain at most 4,294,967,296 values (inclusive); larger ranges are rejected because the random generator uses 32-bit samples.

## Languages

The interface is available in English and Spanish. It follows the browser language on first visit (Spanish browsers start in Spanish; all others start in English), and the language selector saves your choice for future visits.
