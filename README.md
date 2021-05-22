# ExamScores

This project was generated using [Nx](https://nx.dev).

## Development server

Run `nx serve exam-scores` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if
you change any of the source files.

## Build

Run `nx build exam-scores` to build the project. The build artifacts will be stored in the `dist/` directory. Use
the `--prod` flag for a production build.

## Running unit tests

Run `nx test exam-scores` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## API Usage

### GET `http://localhost:3333/api/v1/students`

Example Response:

```json
{
  "students": [
    "Stephanie_Labadie83",
    "Dorcas.Aufderhar",
    "Earlene38",
    "Corbin_Ankunding94",
    "Joana_Von",
    "Emerson_Bailey",
    "Jerald_Klocko",
    "Ursula_Dooley18",
    "Merritt2",
    "Olga95",
    "Guillermo_Sawayn",
    "Einar73",
    "Destiny.Krajcik28",
    "Easter_Bergstrom56",
    "Susan.Adams56",
    "Edison78",
    "Nolan64",
    "Garfield_Jones",
    "Joey_Christiansen49",
    "Holly48"
  ]
}
```

### GET `http://localhost:3333/api/v1/students/:studentId`

Example Response:

```json
{
  "averageScore": 0.7571023332675776
}
```

### GET `http://localhost:3333/api/v1/exams`

Example Response:

```json
{
  "exams": [
    6809,
    6810
  ]
}
```

### GET `http://localhost:3333/api/v1/exams/:examNumber`

Example Response:

```json
{
  "averageScore": 0.7571023332675776
}
```

## Notes

- These endpoints only listen to events for ten seconds. Other options: I can increase the time to another arbitrary
  number, allow a time limit to be passed in as a parameter, or unsubscribe from the observable after receiving a
  certain number of events.
- Due to time constraints I did not test `scores.service.ts`, and my tests for `exams.ts` and `students.ts` are lighter
  than I would expect for a production application.
- I would have liked to add input validation for the parameters
- I would have liked to make the search for studentIds case-insensitive
