import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

    private apiPath: string = `${environment.apiURLBase}/api/v1/construction`;

    constructor(
        private http: HttpClient
    ) { }

    getNameAll(): Observable<string[]> {
        return this.http.get(`${this.apiPath}/name`).pipe(
            map((res: any) => res)
        )
    }
}
