// FREE-ISH Juneteenth — SMS Blast via TextBelt API
// 1. Go to textbelt.com/purchase and buy a key (~$7.50 for 83 texts)
// 2. Paste your key below
// 3. Run: node send-invites.js

const TEXTBELT_KEY = 'de78677326dd04671a068d8f8d4df55fa885f71c54n0G1mVgQ1bTotjAWR9bRHJN';

const contacts = [
  { name: 'Michael',     phone: '17723538680' },
  { name: 'Atria',       phone: '12407236872' },
  { name: 'Toni',        phone: '13165165701' },
  { name: 'Betty',       phone: '16787700234' },
  { name: 'Camille',     phone: '14048447898' },
  { name: 'Gabby',       phone: '16787799968' },
  { name: 'Jahari',      phone: '14043978855' },
  { name: 'Chrissy',     phone: '14043242998' },
  { name: 'Tracey',      phone: '14708341817' },
  { name: 'Tequila',     phone: '14046415070' },
  { name: 'Donald',      phone: '14047480197' },
  { name: 'Michael B',   phone: '14704286531' },
  { name: 'Bear',        phone: '14044225806' },
  { name: 'Fats',        phone: '14046445712' },
  { name: 'Anthony',     phone: '14042000554' },
  { name: 'Khary',       phone: '16784801383' },
  { name: 'Ebony',       phone: '17708669267' },
  { name: 'Shane',       phone: '14047501117' },
  { name: 'Malia',       phone: '14704043059' },
  { name: 'Marvin',      phone: '14045930529' },
  { name: 'Jade',        phone: '14044445458' },
  { name: 'Nicholas',    phone: '14045023949' },
  { name: 'Patrice',     phone: '14044685603' },
  { name: 'Davena',      phone: '12054100516' },
  { name: 'India',       phone: '14704494610' },
  { name: 'Dr. Cynthia', phone: '14702704177' },
  { name: 'CJ',          phone: '14046376311' },
  { name: 'Shelly',      phone: '14043847371' },
  { name: 'Kelley',      phone: '14046830346' },
  { name: 'Shatori',     phone: '12024239991' },
  { name: 'Lamia',       phone: '12134762618' },
  { name: 'Terrence',    phone: '16786446808' },
  { name: 'Supr',        phone: '17075705111' },
  { name: 'Latisha',     phone: '16782179700' },
  { name: 'Darryl',      phone: '16785776960' },
  { name: 'Tearine',     phone: '16788569052' },
  { name: 'Cash',        phone: '14045522487' },
  { name: 'Talib',       phone: '14045076111' },
  { name: 'Wis',         phone: '14048492212' },
  { name: 'D',           phone: '14049973574' },
  { name: 'Ryan',        phone: '15405384434' },
  { name: 'Terrance',    phone: '19174144026' },
  { name: 'Joshua',      phone: '16787689580' },
  { name: 'Gio',         phone: '17705618112' },
  { name: 'Tiffany',     phone: '16786421992' },
  { name: 'Treana',      phone: '19124927284' },
  { name: 'Kenn',        phone: '15133195387' },
  { name: 'Shawn',       phone: '14705387934' },
  { name: 'Russell',     phone: '14048627208' },
  { name: 'Giana',       phone: '14706043949' },
  { name: 'Marrico',     phone: '15713421356' },
  { name: 'Eric',        phone: '17702121863' },
  { name: 'Vincent',     phone: '14048195844' },
  { name: 'Stephen',     phone: '14046066589' },
  { name: 'Jay',         phone: '17066595040' },
  { name: 'Oscar',       phone: '16785311232' },
  { name: 'Iren',        phone: '17706800356' },
  { name: 'Marcus',      phone: '14043260449' },
  { name: 'Christina',   phone: '14049159894' },
  { name: 'Pamela',      phone: '14043748795' },
  { name: 'Gold',        phone: '14708384774' },
  { name: 'Wendell',     phone: '14704139419' },
  { name: 'Sauce',       phone: '14045812906' },
  { name: 'Robin',       phone: '16787941594' },
  { name: 'Tacarra',     phone: '14703967095' },
  { name: 'Donnie',      phone: '17706051110' },
  { name: 'AK',          phone: '16787778207' },
  { name: 'Alisha',      phone: '19432688084' },
  { name: 'Stephen D',   phone: '17707223572' },
  { name: 'Boston',      phone: '14708277269' },
  { name: 'Quasim',      phone: '13466047454' },
  { name: 'Antonio',     phone: '14708087070' },
  { name: 'Shay',        phone: '16784091664' },
  { name: 'Amerika',     phone: '14706428476' },
  { name: 'Jairme',      phone: '16782278508' },
  { name: 'Timothy',     phone: '13077633482' },
  { name: 'Adammah',     phone: '14705585718' },
  { name: 'Tan',         phone: '14045437710' },
  { name: 'Adrian',      phone: '13054173509' },
  { name: 'Jessica',     phone: '14048494668' },
  { name: 'Musa',        phone: '16789839643' },
  { name: 'Tmoney',      phone: '14706464946' },
];

const message = (name) =>
`Hey ${name}! It's Dell 👋 FREE-ISH is TODAY — Juneteenth Country House Pool Party, June 19 2PM–11PM. Free food · BYOB · All ages · Pool in the woods · Guest set by Cardi B's DJ 🎤 DO NOT come to the house directly. 🚐 FREE SHUTTLE: Park at Panola Rd Park & Ride, Stonecrest GA 30038. Security watching your car. Shuttle every 15 min starting 2PM. Last shuttle back 10:30PM. Details: dellharris.github.io/freeish-juneteenth · Questions? Text (917) 727-8470 🖤`;

const https = require('https');

async function sendText(phone, body) {
  const data = JSON.stringify({ phone, message: body, key: TEXTBELT_KEY });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'textbelt.com',
      path: '/text',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log(`\nFREE-ISH Juneteenth Blast — ${contacts.length} contacts\n`);
  let sent = 0, failed = 0;

  for (const { name, phone } of contacts) {
    try {
      const res = await sendText(phone, message(name));
      if (res.success) {
        console.log(`✓  ${name} (${phone}) — ${res.quotaRemaining} texts remaining`);
        sent++;
      } else {
        console.log(`✗  ${name} (${phone}) — ${res.error}`);
        failed++;
      }
    } catch (e) {
      console.log(`✗  ${name} (${phone}) — ${e.message}`);
      failed++;
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n✅ Done. Sent: ${sent} | Failed: ${failed}`);
}

main();
