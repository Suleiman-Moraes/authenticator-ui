import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    private apiPath: string = `${environment.apiURLBase}/api/v1/menu`;

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<any[]> {
        return this.http.get(`${this.apiPath}`).pipe(
            map((res: any) => res)
        )
    }
}
