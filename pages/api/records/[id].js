import RecordModel from '@/models/Record';

const connectToDatabase = require('../../../lib/db');
const { ObjectId } = require('mongodb');

export default async function handler(req, res) {
	try {
		await connectToDatabase();

		const { id } = req.query;

		if (req.method === 'GET') {
			try {
				const record = await RecordModel.findOne({ _id: new ObjectId(id) });
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
				const result = await RecordModel.deleteOne({ _id: new ObjectId(id) });
				if (result.deletedCount > 0) {
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
				const { id, date, phoneModel, purchaseSite, purchaseAmount, purchaseQuantity, salesParty, salesAmount, salesQuantity, profit } = req.body;
				const result = await RecordModel.updateOne(
					{ _id: new ObjectId(id) },
					{
						$set: {
							date,
							phoneModel,
							purchaseSite,
							purchaseAmount,
							purchaseQuantity,
							salesParty,
							salesAmount,
							salesQuantity,
							profit,
						},
					}
				);
				if (result.modifiedCount > 0) {
					res.status(200).json({ message: 'Record updated' });
				} else {
					res.status(404).json({ error: 'Record not found' });
				}
			} catch (error) {
				console.error('Error updating record:', error);
				res.status(500).json({ error: 'Error updating record' });
			}
		} else {
			res.setHeader('Allow', ['GET', 'DELETE', 'PUT', 'POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (connectionError) {
		console.error('Database connection error:', connectionError);
		res.status(500).json({ error: 'Database connection error' });
	}
}
