import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

(async () => {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || 'admin';
  const database = process.env.DB_NAME || 'food_order';
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
  try {
    const conn = await mysql.createConnection({ host, user, password, database, port });
    const [rows] = await conn.query("SHOW COLUMNS FROM order_items");
    console.log('Columns in order_items:');
    console.table(rows);
    await conn.end();
  } catch (err) {
    console.error('Error inspecting DB:', err.message);
    process.exit(1);
  }
})();
