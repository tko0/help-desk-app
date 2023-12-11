import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './db/index';
import ticketRouter from './routes/TicketRouter';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use('/tickets', ticketRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
