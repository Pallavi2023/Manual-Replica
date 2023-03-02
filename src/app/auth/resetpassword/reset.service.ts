import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  
  confirmPassword(reqObj: any){
    return this.http.post<any>(this.baseUrl + "/confirmpassword", reqObj);
  }

  getUserCredential(token: any){
    // const body= {
    //     option: {
      
    //         data: { }
    //     }
    // }
    return this.http.get<any>(this.baseUrl + '/validateuser?token=' + token)
  }
}
