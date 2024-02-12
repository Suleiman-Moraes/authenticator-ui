import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonMeService {

    private apiPath: string = `${environment.apiURLBase}/api/v1/person/me`;

    constructor(
        private http: HttpClient
    ) { }

    getMe(): Observable<void> {
        return this.http.get(`${this.apiPath}`).pipe(
            map((res: any) => res)
        )
    }
}
