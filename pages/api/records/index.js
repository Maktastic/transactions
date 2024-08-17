// pages/api/records/index.js
const dbPromise = require('../../../lib/db');

export default async function handler(req, res) {
  const database = await dbPromise;

  if (req.method === 'GET') {
    const records = await database.all('SELECT * FROM records');
    res.status(200).json(records);
  } else if (req.method === 'POST') {
    const { date, phoneModel, purchaseSite, purchaseAmount, purchaseQuantity, salesParty, salesAmount, salesQuantity, profit } = req.body;
    
    await database.run(`
      INSERT INTO records (date, phone_model, purchase_site, purchase_amount, purchase_quantity, sales_party, sales_amount, sales_quantity, profit)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [date, phoneModel, purchaseSite, purchaseAmount, purchaseQuantity, salesParty, salesAmount, salesQuantity, profit]
    );
    res.status(201).json({ message: 'Record added' });
  }
}
