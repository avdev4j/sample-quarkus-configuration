import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MetricsService, Metrics } from 'app/admin/metrics/metrics.service';
import { SERVER_API_URL } from 'app/app.constants';

describe('Service Tests', () => {
  describe('Logs Service', () => {
    let service: MetricsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      service = TestBed.get(MetricsService);
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    describe('Service methods', () => {
      it('should call correct URL', () => {
        service.getMetrics().subscribe();

        const req = httpMock.expectOne({ method: 'GET' });
        const resourceUrl = SERVER_API_URL + 'management/jhimetrics';
        expect(req.request.url).toEqual(resourceUrl);
      });

      it('should return Metrics', () => {
        let expectedResult: Metrics | null = null;
        const metrics: Metrics = {
          jvm: {},
          'http.server.requests': {},
          services: {},
          garbageCollector: {},
          processMetrics: {},
        };

        service.getMetrics().subscribe(received => {
          expectedResult = received;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(metrics);
        expect(expectedResult).toEqual(metrics);
      });
    });
  });
});
