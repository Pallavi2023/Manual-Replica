import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const users = [
  {
    name: '',
    email: "",
    status: "",
  },
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  usersFilter$ = new BehaviorSubject<any>(users);
  currentMessage = this.usersFilter$.asObservable();
  constructor() { 
    // this.usersFilter$.next(users);
  }

  updateUser(x: any){
    users[0]=(x);
    this.usersFilter$.next(users);
  }
}
