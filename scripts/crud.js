const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataDir = path.join(__dirname, '..', 'data');
const dataPath = path.join(dataDir, 'docgia.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]', 'utf8');
}

function loadData() {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]');
  } catch (e) {
    return [];
  }
}

function saveData(arr) {
  ensureDataFile();
  fs.writeFileSync(dataPath, JSON.stringify(arr, null, 2), 'utf8');
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function question(q) { return new Promise(resolve => rl.question(q, a => resolve(a))); }

async function main() {
  console.log('=== Terminal CRUD - Quản lý Độc Giả ===');
  while (true) {
    console.log('\nChọn thao tác:');
    console.log('1) Tạo (Create)');
    console.log('2) Đọc tất cả (Read all)');
    console.log('3) Đọc theo ID (Read by ID)');
    console.log('4) Cập nhật (Update)');
    console.log('5) Xóa (Delete)');
    console.log('6) Thoát (Exit)');
    const opt = (await question('> ')).trim();
    const data = loadData();

    if (opt === '1' || opt.toLowerCase() === 'create') {
      const name = await question('Tên: ');
      const age = await question('Tuổi: ');
      const email = await question('Email: ');
      const id = data.length ? Math.max(...data.map(d => d.id || 0)) + 1 : 1;
      const rec = { id, name, age: age ? Number(age) : null, email };
      data.push(rec);
      saveData(data);
      console.log('Đã tạo:', rec);

    } else if (opt === '2' || opt.toLowerCase().startsWith('read')) {
      console.log('\nDanh sách hiện tại:');
      if (data.length === 0) console.log('(Rỗng)');
      else console.table(data);

    } else if (opt === '3') {
      const id = Number(await question('ID: '));
      const rec = data.find(d => d.id === id);
      console.log(rec ? rec : 'Không tìm thấy.');

    } else if (opt === '4' || opt.toLowerCase() === 'update') {
      const id = Number(await question('ID cần cập nhật: '));
      const idx = data.findIndex(d => d.id === id);
      if (idx === -1) { console.log('Không tìm thấy.'); }
      else {
        const cur = data[idx];
        const name = await question(`Tên (${cur.name}): `);
        const age = await question(`Tuổi (${cur.age}): `);
        const email = await question(`Email (${cur.email}): `);
        if (name) cur.name = name;
        if (age) cur.age = Number(age);
        if (email) cur.email = email;
        saveData(data);
        console.log('Đã cập nhật:', cur);
      }

    } else if (opt === '5' || opt.toLowerCase() === 'delete') {
      const id = Number(await question('ID cần xóa: '));
      const idx = data.findIndex(d => d.id === id);
      if (idx === -1) console.log('Không tìm thấy.');
      else {
        const removed = data.splice(idx, 1)[0];
        saveData(data);
        console.log('Đã xóa:', removed);
      }

    } else if (opt === '6' || opt.toLowerCase() === 'exit') {
      break;
    } else {
      console.log('Lựa chọn không hợp lệ.');
    }
  }
  rl.close();
  console.log('Tạm biệt.');
}

main();
