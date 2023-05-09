
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any;
  projectsFilter$: any;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  postProject(data: any) {
    return this.http.post<any>(this.baseUrl + "/admin/project", data);
  }

  getProject() {
    return this.http.get<any>(this.baseUrl + "/admin/project");
  }

  putProject(data: any) {
    return this.http.put<any>(this.baseUrl + "/admin/project", data);
  }

  deleteProject(id: number) {
    return this.http.delete<any>(this.baseUrl + "/project/" + id);
  }

  getAllRole() {
    return this.http.get<any>(this.baseUrl + "/role/enabled");
  }

  postSearchProject(data: any) {
    return this.http.post<any>(this.baseUrl + `/admin/project/search_criteria`, data);
  }
  getProjectById(id: any) {
    return this.http.get<any>(this.baseUrl + "/admin/project/id/" + id);
  }
  getAllUser() {
    return this.http.get<any>(this.baseUrl + "/admin/user/enabled");
  }
}
