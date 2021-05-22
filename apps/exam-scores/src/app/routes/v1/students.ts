import express, { Request, Response } from 'express';
import ScoresService from '../../services/scores.service';
import { takeUntil, map, filter, reduce } from 'rxjs/operators';
import { timer } from 'rxjs';

const students = express.Router();

students.get('/', (req: Request, res: Response) => {
  ScoresService.getScores()
    .pipe(
      takeUntil(timer(10000)),
      map((event) => {
        const json = JSON.parse(event.data);
        return json.studentId;
      }),
      reduce((acc, student) => {
        return acc.add(student);
      }, new Set()),
      map((students) => res.json({ students: Array.from(students) }))
    )
    .subscribe();
});

students.get('/:id', (req: Request, res: Response) => {
  ScoresService.getScores()
    .pipe(
      takeUntil(timer(10000)),
      map((event) => JSON.parse(event.data)),
      filter((event) => {
        return event.studentId === req.params.id;
      }),
      reduce(
        (acc, scoreData) => {
          return { sum: acc.sum + scoreData.score, count: acc.count + 1 };
        },
        { sum: 0, count: 0 }
      ),
      map((summedScores) => {
        return res.json({
          averageScore: summedScores.sum / summedScores.count,
        });
      })
    )
    .subscribe();
});

export { students };
