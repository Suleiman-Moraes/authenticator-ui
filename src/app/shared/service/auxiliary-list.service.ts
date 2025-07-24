import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyDescriptionDTO } from '../model/key-description-dto.model';

@Injectable({
    providedIn: 'root'
})
export class AuxiliaryListService {

    private apiPath: string = `${environment.apiURLBase}/api/v1/auxiliary-list`;

    constructor(
        private http: HttpClient
    ) { }

    getEnumList(enumName: string): Observable<KeyDescriptionDTO[]> {
        return this.http.get(`${this.apiPath}/${enumName}`).pipe(
            map((res: any) => res)
        )
    }
}
