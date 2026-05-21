import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

// Create Sequelize instance globally
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10) || 3306,
		dialect: "mysql",
		logging: false,

		pool: {
			max: parseInt(process.env.DB_CONN_LIMIT, 10) || 10,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

// Create database if not exists
const createDatabaseIfNotExists = async (dbName, config) => {
	const { host, user, password, port } = config;

	const connection = await mysql.createConnection({
		host,
		user,
		password,
		port,
	});

	await connection.query(
		`CREATE DATABASE IF NOT EXISTS \`${dbName}\`
         CHARACTER SET utf8mb4
         COLLATE utf8mb4_unicode_ci;`
	);

	await connection.end();
};

// Connect Database
const connectDB = async () => {
	try {
		const dbName = process.env.DB_NAME;
		const dbHost = process.env.DB_HOST;
		const dbUser = process.env.DB_USER;
		const dbPassword = process.env.DB_PASSWORD;

		const dbPort =
			parseInt(process.env.DB_PORT, 10) || 3306;

		// Ensure database exists
		await createDatabaseIfNotExists(dbName, {
			host: dbHost,
			user: dbUser,
			password: dbPassword,
			port: dbPort,
		});

		// Authenticate Sequelize
		await sequelize.authenticate();

		console.log("MySQL (Sequelize) Connected");
	} catch (error) {
		console.log("DB Error:", error.message);
		process.exit(1);
	}
};

// Sync Models
const syncModels = async (options = {}) => {
	return sequelize.sync(options);
};

// Export everything
export { sequelize, Sequelize, syncModels };

export default connectDB;