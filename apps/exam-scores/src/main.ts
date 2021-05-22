import express from 'express';
import { exams, students } from './app/routes/v1';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to exam-scores!' });
});

app.use('/api/v1/students', students);
app.use('/api/v1/exams', exams);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
