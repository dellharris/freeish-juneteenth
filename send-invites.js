// FREE-ISH Juneteenth — SMS Blast Script
// Uses Twilio (free trial gives $15.50 credit, ~1,900 texts)
//
// SETUP (one time):
//   1. Sign up free at twilio.com
//   2. Get your Account SID, Auth Token, and a free Twilio phone number
//   3. Fill in the 3 lines below
//   4. Add your guest list to contacts.js (see format below)
//   5. Run:  node send-invites.js

const TWILIO_ACCOUNT_SID = 'YOUR_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN  = 'YOUR_AUTH_TOKEN';
const TWILIO_FROM_NUMBER = '+1XXXXXXXXXX'; // your Twilio number

// ── YOUR GUEST LIST ──────────────────────────────────────────────────────────
// Add/remove entries. Numbers must be in E.164 format: +1XXXXXXXXXX
const contacts = [
  // { name: 'Jordan',  phone: '+14045550101' },
  // { name: 'Aaliyah', phone: '+14045550102' },
];

// ── YOUR MESSAGE ─────────────────────────────────────────────────────────────
const message = (name) =>
  `Hey ${name}! It's Dell 👋 FREE-ISH is back — a Juneteenth estate party, June 19th, 2PM–11PM in ATL. Pool. DJ. Food. All ages. Free. RSVP here (address sent after): https://dellharris.github.io/freeish-juneteenth/`;

// ── SEND ─────────────────────────────────────────────────────────────────────
const https = require('https');

async function sendText(to, body) {
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const data = new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: body }).toString();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.twilio.com',
      path: `/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  if (contacts.length === 0) {
    console.log('No contacts found. Add them to the contacts array in this file.');
    return;
  }
  console.log(`Sending to ${contacts.length} contacts...\n`);
  let sent = 0, failed = 0;

  for (const { name, phone } of contacts) {
    try {
      const res = await sendText(phone, message(name));
      if (res.status === 201) {
        console.log(`✓  ${name} (${phone})`);
        sent++;
      } else {
        console.log(`✗  ${name} (${phone}) — ${res.body.message}`);
        failed++;
      }
    } catch (e) {
      console.log(`✗  ${name} (${phone}) — ${e.message}`);
      failed++;
    }
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nDone. Sent: ${sent} | Failed: ${failed}`);
}

main();
