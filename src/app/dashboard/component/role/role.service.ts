import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const roles = [
  {
    role: "",
    status: "",
    permissions: [],
  },
]

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roleFilter$ = new BehaviorSubject<any>(roles);
  currentMessage = this.roleFilter$.asObservable();

  constructor() { }

  updateRole(x : any){
    roles[0]=(x);
    this.roleFilter$.next(roles);
  }
}
