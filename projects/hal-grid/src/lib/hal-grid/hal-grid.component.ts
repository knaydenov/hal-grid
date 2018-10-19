import { Input, ViewChild, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { MatSort, MatDialogRef, MatDialog } from "@angular/material";
import { HalDataSource } from "../hal-data-source";
import { Observable } from "rxjs/Rx";
import { Resource, IResource } from '@knaydenov/hal';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export class HalGridComponent<T extends Resource<IResource>> implements AfterViewInit {
  @Input() showAdd = false;
  @Input() showPick = false;
  @Input() showSelection = false;
  @Input() showState = false;
  @Input() showFilters = true;
  @Input() columns: string[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 50];
  @Input() actions: string[] = [];
  @Input() filters: string[] = [];
  @Input() dataSource: HalDataSource<T>;

  @Output() pick = new EventEmitter<T[]>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    protected dialog: MatDialog
  ) { }

  pickRows(rows: T[]) {
    this.pick.emit(rows);
  }

  confirmDelete(rows: T[]) {
    const dialogRef: MatDialogRef<DeleteDialogComponent, boolean> = this.dialog.open(DeleteDialogComponent, {
      data: rows
    });
    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.onDeleteConfirmed(rows);
      }
    });
  }

  onDeleteConfirmed(rows: T[]) {
    const deletes$ = rows.map(item => item.delete());
    Observable.forkJoin(deletes$).subscribe(() => this.dataSource.refresh());
    this.dataSource.selectNone();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe(event => this.dataSource.handleSortEvent(event));
    }
  }
}
