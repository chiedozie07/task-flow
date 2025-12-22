import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route for testing server status 
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to TaskFlow Backend server!');
});

app.listen(PORT, () => { console.log(`TaskFlow Server running on http://localhost:${PORT}`); });