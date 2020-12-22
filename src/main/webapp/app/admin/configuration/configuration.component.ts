import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'jhi-configuration',
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent implements OnInit {
  filter = '';
  configAscending = true;
  configurations: any = null;
  allConfigurations: any = null;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.get().subscribe(configurations => {
      this.allConfigurations = this.configurations = configurations;
    });
  }

  filterAndSort(): void {
    this.configurations = this.allConfigurations
      .filter((configuration: { key: string }) => !this.filter || configuration.key.toLowerCase().includes(this.filter.toLowerCase()))
      .sort((a: { prefix: number }, b: { prefix: number }) =>
        a.prefix < b.prefix ? (this.configAscending ? -1 : 1) : this.configAscending ? 1 : -1
      );
  }
}
