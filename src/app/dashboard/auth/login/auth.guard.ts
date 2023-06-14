import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isLoggedIn()){
        return true;
      }
      window.alert("you don't have permission to view this page");
      this.router.navigate(['/login']);  
      return false;
  }
  public isLoggedIn(): boolean {      
    let status = false;      
    if (localStorage.getItem('token')) {      
       status = true;     
    }
      else {      
       status = false;      
       }     
    return status;      
    }    
 }   

