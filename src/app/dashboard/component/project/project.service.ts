import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const projects = [
 {
  project : '',
  status: '',
 }
]
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsFilter$ = new BehaviorSubject<any>(projects);
  currentMessage = this.projectsFilter$.asObservable();

  constructor() { }

  updateProject(x: any){
    projects[0]=(x);
    this.projectsFilter$.next(projects);
  }
}
