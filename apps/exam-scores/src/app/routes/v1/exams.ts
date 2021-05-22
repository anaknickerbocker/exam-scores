import express, { Request, Response } from 'express';
import ScoresService from '../../services/scores.service';
import { takeUntil, map, reduce, filter } from 'rxjs/operators';
import { timer } from 'rxjs';

const exams = express.Router();

exams.get('/', (req: Request, res: Response) => {
  ScoresService.getScores()
    .pipe(
      takeUntil(timer(10000)),
      map((event) => {
        const json = JSON.parse(event.data);
        return json.exam;
      }),
      reduce((acc, exam) => {
        return acc.add(exam);
      }, new Set()),
      map((exams) => res.json({ exams: Array.from(exams) }))
    )
    .subscribe();
});

exams.get('/:number', (req: Request, res: Response) => {
  ScoresService.getScores()
    .pipe(
      takeUntil(timer(10000)),
      map((event) => JSON.parse(event.data)),
      filter((event) => {
        return Number(event.exam) === Number(req.params.number);
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

export { exams };
