import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';

export interface Property {
  key: string;
  value: any;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get<any>(SERVER_API_URL + 'management/configprops').pipe(
      map(configProps => {
        const properties: Property[] = [];
        for (const [k, v] of Object.entries(configProps)) {
          properties.push({ key: k, value: v });
        }

        return properties;
      })
    );
  }
}
