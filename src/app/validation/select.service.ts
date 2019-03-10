import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  city = [
    { label: 'Ahmadabad', value: 'Ahmadabad' },
    { label: 'Allahabad', value: 'Allahabad' },
    { label: 'Hyderabad', value: 'Hyderabad' },
    { label: 'Bengaluru', value: 'Bengaluru' },
    { label: 'Mengaluru', value: 'Mengaluru' },
  ];

  getCities(): Observable<any[]> {
      return of(this.city);
  }
}

