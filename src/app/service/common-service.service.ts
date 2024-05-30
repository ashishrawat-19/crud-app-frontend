import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private apiUrl = 'http://localhost:5000/api/records/count';
  private infoUrl = 'http://localhost:5000/api/posts';
  private updateUrl = 'http://localhost:5000/api/updateInfo';
  private deleteUrl = 'http://localhost:5000/api/deleteInfo/';

  constructor(private http: HttpClient) { }

  getRecordCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  fetchInfo(): Observable<any> {
    return this.http.get<any>(this.infoUrl);
  }

  updateInfo(): Observable<any> {
    return this.http.get<any>(this.updateUrl);
  }

  deleteInfo(id): Observable<any> {
    return this.http.delete<any>(this.deleteUrl + id);
  }
}