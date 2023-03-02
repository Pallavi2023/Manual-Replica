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
  // public url = environment.apiUrl;

  // getUser() {

  // }



  // projectStructuredAPI() {

  //   const body: HttpRequestBody = {

  //     option: {

  //       url: '',

  //       endpoint: '/doc/analytics/platform_document_structure_stat',

  //       data: {},

  //       // hideGlobalLoader: hideLoader ? true : false

  //     },

  //     log: 'projectStructuredAPI request initiated',

  //     error: 'projectStructuredAPI Error',

  //     method: 'get'

  //   };

  //   return this.httpRequestService.callHttp(body);

  // }


  postUser(data: any) {
    return this.http.post<any>(this.baseUrl + "/admin/user", data);

  }

  getUser() {

    return this.http.get<any>(this.baseUrl + "/admin/user");
  }

  putUser(data: any) {
    return this.http.put<any>(this.baseUrl + '/admin/user', data);
  }

  postSearchUser(data: any) {
    return this.http.post<any>(this.baseUrl + `/admin/user/search_criteria`, data)
  }

  getUserById(id: any) {

    return this.http.get<any>(this.baseUrl + '/admin/user/id/' + id);
  }
  deleteUser(id: number) {
    return this.http.delete<any>(this.baseUrl + `/admin/user${id}`);
  }

  getUserInfo(){
    
  }
}
