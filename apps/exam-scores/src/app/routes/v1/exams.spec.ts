import express from 'express';
import request from 'supertest';
import { exams } from '../v1';

const app = express();

app.use('/api/v1/exams', exams);

describe('exams', () => {
  it('should load exams route', async (done) => {
    const response = await request(app).get('/api/v1/exams').expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ exams: expect.any(Array) })
    );
    return done();
  }, 15000);

  it('should load exams route with number param', async (done) => {
    const response = await request(app).get('/api/v1/exams/1111').expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ averageScore: null })
    );
    return done();
  }, 15000);
});
