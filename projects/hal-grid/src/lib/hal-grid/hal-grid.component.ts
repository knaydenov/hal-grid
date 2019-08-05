import { Input, ViewChild, AfterViewInit } from "@angular/core";
import { MatSort } from "@angular/material";
import { HalDataSource } from "../hal-data-source";
import { Resource, IResource } from '@knaydenov/hal';

export class HalGridComponent<T extends Resource<IResource>> implements AfterViewInit {
  @Input() showSelection = false;
  @Input() showState = false;
  @Input() showFilters = true;
  @Input() columns: string[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 50];
  @Input() actions: string[] = [];
  @Input() filters: string[] = [];
  @Input() dataSource: HalDataSource<T>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe(event => this.dataSource.handleSortEvent(event));
    }
  }
}
