const fs = require('fs');
const path = require('path');

function walk(d) {
  fs.readdirSync(d).forEach(f => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('route.ts')) {
      let c = fs.readFileSync(p, 'utf8');
      if (!c.includes('force-dynamic')) {
        fs.writeFileSync(p, "export const dynamic = 'force-dynamic';\n" + c);
      }
    }
  });
}

walk('./src/app/api');
