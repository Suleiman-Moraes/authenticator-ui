import { HttpClient, HttpParams } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, map } from "rxjs";
import { Filter } from "../../model/default/filter";
import { Page } from "../../model/default/page";

export abstract class BaseResourceService {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector
    ) {
        this.http = injector.get(HttpClient);
    }

    findAll(filter: Filter): Observable<Page<any>> {
        let params = this.buildHttpParams(filter);
        return this.http.get(this.apiPath, { params: params }).pipe(
            map((res: any) => res)
        )
    }

    findById(id: number): Observable<any> {
        return this.getUtil(`${this.apiPath}/${id}`);
    }

    sendForm(resource: any, metodo: boolean): Observable<any> {
        return metodo ? this.update(resource) : this.create(resource);
    }

    create(resource: any): Observable<any> {
        return this.http.post(this.apiPath, resource).pipe(
            map((res: any) => res)
        )
    }

    update(resource: any, key?: any): Observable<any> {
        key = key ? key : resource.key;
        return this.http.put(`${this.apiPath}/${key}`, resource).pipe(
            map((res: any) => res)
        );
    }

    protected getUtil(url: string): Observable<any> {
        return this.http.get(url).pipe(
            map((res: any) => res)
        )
    }

    protected buildHttpParams(filter: any) {
        let params = new HttpParams();
        if (filter) {
            for (const key in filter) {
                if (filter[key]) {
                    params = params.append(key, filter[key]);
                }
            }
        }
        return params;
    }
}
