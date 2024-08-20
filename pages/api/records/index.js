import RecordModel from '@/models/Record';

// pages/api/records/index.js
const connectToDatabase = require('@/lib/db');

export default async function handler(req, res) {

	await connectToDatabase()

	if(req.method === 'GET') {
		try {
			const records = await RecordModel.find({});
			res.status(200).json(records);
		} catch (error) {
			console.error('Error fetching records:', error);
			res.status(500).json({ error: 'Error fetching records' });
		}
	}
	else if(req.method === 'POST') {
		try {
			const {
				date,
				phoneModel,
				purchaseSite,
				purchaseAmount,
				purchaseQuantity,
				salesParty,
				salesAmount,
				salesQuantity,
				profit,
			} = req.body;

			await RecordModel.create({
				date,
				phoneModel,
				purchaseSite,
				purchaseAmount,
				purchaseQuantity,
				salesParty,
				salesAmount,
				salesQuantity,
				profit,
			});
			res.status(201).json({ message: 'Record added' });
		} catch (error) {
			console.error('Error adding record:', error);
			res.status(500).json({ error: 'Error adding record' });
		}
	}

	
}
