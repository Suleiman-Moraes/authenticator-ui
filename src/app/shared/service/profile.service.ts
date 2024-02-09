import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResourceService } from '../components/base-resource-service/base-resource-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseResourceService {

    constructor(
      injector: Injector
    ) {
      super(`${environment.apiURLBase}/api/v1/profile`, injector);
    }
}
