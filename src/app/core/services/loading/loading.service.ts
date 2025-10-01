import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly activeRequestsSubject = new BehaviorSubject<number>(0);
  readonly activeRequests$: Observable<number> = this.activeRequestsSubject.asObservable();

  increment(): void {
    this.activeRequestsSubject.next(this.activeRequestsSubject.value + 1);
  }

  decrement(): void {
    const next = Math.max(0, this.activeRequestsSubject.value - 1);
    this.activeRequestsSubject.next(next);
  }

  isLoading(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const sub = this.activeRequests$.subscribe((count) => subscriber.next(count > 0));
      return () => sub.unsubscribe();
    });
  }
}


