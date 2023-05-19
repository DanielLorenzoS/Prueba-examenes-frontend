import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uriLogin = "http://localhost:8080/login";
  private uriUsers = "http://localhost:8080/users";

  constructor(private http: HttpClient) {
  }
  public addUser(user: any) {
    return this.http.post(`${baseUrl}users/`, user);
  }
  public login(data: any) {
    return this.http.post(`${this.uriLogin}`, data, { responseType: 'text' });
  }
  public getUsers() {
    const username = 'user';
    const password = '15fd4041-4cce-4092-adbe-6e77847d2d26';
    const authHeaderValue = btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': `Basic ${authHeaderValue}`,
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.get(`${this.uriUsers}/`, { headers: headers, responseType: "json" });
  }

}
