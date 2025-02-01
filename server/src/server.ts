import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = process.env.FORCE_DB_REFRESH === 'true';

// Log environment variables (for debugging)
console.log("Database URL:", process.env.DATABASE_URL ? "Loaded ✅" : "❌ Not Found");
console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "❌ Not Found");

// Serves static files from the client dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

// Connect to the database and start the server
sequelize.sync({ force: forceDatabaseRefresh })
  .then(() => {
    console.log(`Database sync ${forceDatabaseRefresh ? "with forced reset" : "without reset"} ✅`);
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit if the database doesn't connect
  });
