import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

let sequelize;

const createDatabaseIfNotExists = async (dbName, config) => {
	const { host, user, password, port } = config;
	const connection = await mysql.createConnection({ host, user, password, port });
	await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
	await connection.end();
};

const connectDB = async () => {
	try {
		const dbName = "food_order";
		const dbHost = "localhost";
		const dbUser = "root";
		const dbPassword = "admin";
		const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

		// Ensure database exists before initializing Sequelize
		await createDatabaseIfNotExists(dbName, { host: dbHost, user: dbUser, password: dbPassword, port: dbPort });

		sequelize = new Sequelize(dbName, dbUser, dbPassword, {
			host: dbHost,
			port: dbPort,
			dialect: "mysql",
			logging: false,
			pool: {
				max: parseInt(process.env.DB_CONN_LIMIT, 10) || 10,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
		});

		await sequelize.authenticate();

		console.log("MySQL (Sequelize) Connected");
	} catch (error) {
		console.log("DB Error:", error.message);
		process.exit(1);
	}
};

const getSequelize = () => sequelize;

const syncModels = async (options = {}) => {
	if (!sequelize) throw new Error("Sequelize not initialized. Call connectDB() first.");
	return sequelize.sync(options);
};

export { getSequelize, Sequelize, syncModels };
export default connectDB;
