import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MetricsService, Metrics, MetricsKey } from './metrics.service';

@Component({
  selector: 'jhi-metrics',
  templateUrl: './metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent implements OnInit {
  metrics?: Metrics;
  updatingMetrics = true;

  constructor(private metricsService: MetricsService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.updatingMetrics = true;
    this.metricsService.getMetrics().subscribe(metrics => {
      this.metrics = metrics;
      this.updatingMetrics = false;
      this.changeDetector.detectChanges();
    });
  }

  metricsKeyExists(key: MetricsKey): boolean {
    return this.metrics && this.metrics[key];
  }

  metricsKeyExistsAndObjectNotEmpty(key: MetricsKey): boolean {
    return this.metrics && this.metrics[key] && JSON.stringify(this.metrics[key]) !== '{}';
  }
}
