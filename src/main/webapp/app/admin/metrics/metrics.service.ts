import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

export type MetricsKey = 'jvm' | 'http.server.requests' | 'services' | 'garbageCollector' | 'processMetrics';
export type Metrics = { [key in MetricsKey]: any };

@Injectable({ providedIn: 'root' })
export class MetricsService {
  constructor(private http: HttpClient) {}

  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(SERVER_API_URL + 'management/jhimetrics');
  }
}
