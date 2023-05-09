import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
       
  }
  postUser(data: any) {
    return this.http.post<any>(this.baseUrl + "/api/users", data);

  }
  getUser() {

    return this.http.get<any>(this.baseUrl + "/api/users");
  }

  putUser(data: any) {
    return this.http.put<any>(this.baseUrl + "/api/users", data);
  }
  postSearchRole(data: any) {

    return this.http.post<any>(this.baseUrl + "/api/users/search_criteria", data);
  }
  getUserById(id: any) {
    
    return this.http.get<any>(this.baseUrl + '/api/user/id/' + id);
  }
  

 
}
