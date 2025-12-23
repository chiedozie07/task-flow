import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transcribeRouter from './routes/transcribe.js';


dotenv.config();

const app = express();
const envPort = process.env.PORT;
const PORT: number = envPort && envPort.trim() !== '' ? parseInt(envPort, 10) : 4000;
if (Number.isNaN(PORT) || PORT <= 0) {
  throw new Error('Invalid PORT environment variable. Please set PORT to a positive integer.');
}
// middleware setup to handle CORS and JSON requests fron the client app
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
  }));
app.use(express.json());

// routes
app.use('/api/transcribe', transcribeRouter);
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to TaskFlow Backend server! The server is running smoothly and ready for voice tasks.');
});

// start the server, bind to all interfaces so physical devices on the same LAN can reach the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`TaskFlow Server running on http://0.0.0.0:${PORT}`);
});