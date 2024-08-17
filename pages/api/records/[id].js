const dbPromise = require('../../../lib/db');

export default async function handler(req, res) {
  const database = await dbPromise;
  const { id } = req.query; // Extract `id` from the query parameters

  if (req.method === 'GET') {
    try {
      const record = await database.get('SELECT * FROM records WHERE id = ?', [id]);
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    } catch (error) {
      console.error('Error fetching record:', error);
      res.status(500).json({ error: 'Error fetching record' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await database.run('DELETE FROM records WHERE id = ?', [id]);
      if (result.changes > 0) {
        res.status(204).end(); // No content, successful deletion
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ error: 'Error deleting record' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { date, phoneModel, purchaseSite, purchaseAmount, purchaseQuantity, salesParty, salesAmount, salesQuantity, profit } = req.body;
      const result = await database.run(`
        UPDATE records SET 
          date = ?, 
          phone_model = ?, 
          purchase_site = ?, 
          purchase_amount = ?, 
          purchase_quantity = ?, 
          sales_party = ?, 
          sales_amount = ?, 
          sales_quantity = ?,
          profit = ? 
        WHERE id = ?`, 
        [date, phoneModel, purchaseSite, purchaseAmount, purchaseQuantity, salesParty, salesAmount, salesQuantity, profit ,id]
      );
      if (result.changes > 0) {
        res.status(200).json({ message: 'Record updated' });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Error updating record' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
