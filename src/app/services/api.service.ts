import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: string = "https://jsonplaceholder.typicode.com/"; //importante API fake e salvando na variável
  private options: any = { headers: new HttpHeaders({ "Content-Type": "application/json; charset=UTF-8" }) }

  constructor(private http: HttpClient) { }

  //CRUD ------- INICIO

  createData(data: any) {
    return this.http.post(`${this.api}posts`, JSON.stringify(data), this.options);
  }

  readData() {
    return this.http.get(`${this.api}posts`);
  }

  updateData(data: any) {
    return this.http.put(`${this.api}posts/1`, JSON.stringify(data), this.options);
  }

  deleteData() {
    return this.http.delete(`${this.api}posts/1`);
  }

  //CRUD ------ FIM

}
