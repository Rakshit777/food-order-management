import dotenv from 'dotenv';
import connectDB, { syncModels } from '../config/db.js';
dotenv.config();

(async () => {
  try {
    await connectDB();
    await import('../models/menu.model.js');
    await import('../models/order.model.js');
    await syncModels({ alter: true });
    console.log('Schema sync (alter) completed');
    process.exit(0);
  } catch (err) {
    console.error('Schema sync error:', err.message);
    process.exit(1);
  }
})();
