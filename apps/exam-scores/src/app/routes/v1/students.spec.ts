import express from 'express';
import request from 'supertest';
import { students } from '../v1';

const app = express();

app.use('/api/v1/students', students);

describe('students', () => {
  it('should load students route', async (done) => {
    const response = await request(app).get('/api/v1/students').expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ students: expect.any(Array) })
    );
    return done();
  }, 15000);

  it('should load students route with a studentId param', async (done) => {
    const response = await request(app)
      .get('/api/v1/students/mockName')
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ averageScore: null })
    );
    console.log('response: ', response);
    return done();
  }, 15000);
});
