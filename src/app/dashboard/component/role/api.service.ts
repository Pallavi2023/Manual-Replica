import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;


  }
  postRole(data: any) {
    return this.http.post<any>(this.baseUrl + "/role", data);
  }

  getRole() {
    return this.http.get<any>(this.baseUrl + "/role");
  }

  putRole(data: any) {
    return this.http.put<any>(this.baseUrl + "/role", data);
  }

  deleteRole(id: number) {
    return this.http.delete<any>(this.baseUrl + "/user/" + id);
  }
  postSearchRole(data: any) {

    return this.http.post<any>(this.baseUrl + "/role/search_criteria", data);
  }
  getRoleById(id: any) {
    return this.http.get<any>(this.baseUrl + "/role/id/" + id);

  }
  getPermission() {
    return this.http.get<any>(this.baseUrl + "/permission/")
  }
}
