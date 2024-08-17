// scripts/migrate.js
const dbPromise = require('../lib/db');

(async () => {
  const database = await dbPromise;
  await database.exec(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      phone_model TEXT,
      purchase_site TEXT,
      purchase_amount REAL,
      purchase_quantity INTEGER,
      sales_party TEXT,
      sales_amount REAL,
      sales_quantity INTEGER
    )
  `);
  console.log('Database schema created');
  process.exit();
})();
