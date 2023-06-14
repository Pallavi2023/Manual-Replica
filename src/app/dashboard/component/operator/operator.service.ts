import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const operators = [
  {
    // project: '',
    projectName: '',
    status: [],
    startDate: '',
    endDate: '',
  }
]
@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  entryFilter$ = new BehaviorSubject<any>(operators);
  currentMessage = this.entryFilter$.asObservable();
  constructor() { }

  updateOperator(x: any){
    operators[0]=(x);
    this.entryFilter$.next(operators);
  }
}
