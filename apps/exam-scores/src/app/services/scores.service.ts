import { Observable } from 'rxjs';
import EventSource from 'eventsource';

export default class ScoresService {
  private static url = 'https://live-test-scores.herokuapp.com/scores';

  static getScores(): Observable<EventSource> {
    const eventSource = new EventSource(this.url);
    return new Observable((observer) => {
      eventSource.onopen = () =>
        console.log('eventSource.readyState: ', eventSource.readyState);

      eventSource.addEventListener('score', (event) => {
        observer.next(event);
      });

      eventSource.onerror = (error) =>
        observer.error('EventSource error: ' + error);
    });
  }
}
