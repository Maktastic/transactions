require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const clientOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000, // Adjust as necessary
};

async function connectToDatabase() {
	try {
		// Connect to the database with the specified options
		const database = await mongoose.connect(uri, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
		return database;
	} catch (error) {
		console.error("Database connection failed:", error);
		throw error; // Re-throw the error after logging it
	}
}

module.exports = connectToDatabase;
