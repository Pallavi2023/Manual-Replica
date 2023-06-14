import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl
  }

  postOperator(data: any) {
    return this.http.post<any>(this.baseUrl + "/documents/", data)
  }

  postSearchOperator(data: any) {
    return this.http.post<any>(this.baseUrl + `/documents/search_criteria`, data)
  }
  putOperator(data: any, request: any) {
    return this.http.put<any>(this.baseUrl + "/documents/" + request, data);
  }

  deleteOperator(id: number) {
    return this.http.delete<any>(this.baseUrl + "/documents/" + id);
  }
  getProject() {
    return this.http.get<any>(this.baseUrl + "/activeprojectdetails/")
  }
  getEntryById(id: any) {

    return this.http.get<any>(this.baseUrl + "/documents/id/" + id);

  }
  putSaveDraft(data: any, request: any) {
    if (data.findCall) {
      return this.http.put<any>(this.baseUrl + "/documents/" + request, data)
    }
    return this.http.post<any>(this.baseUrl + "/documents/", data)
  }
}
