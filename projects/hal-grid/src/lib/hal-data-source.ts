import { GridDataSource, GridFilterDefDirective } from '@knaydenov/material-grid';
import { Resource, IResource, PageableResource } from '@knaydenov/hal';
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { Sort, PageEvent } from "@angular/material";

export class HalDataSource<T extends Resource<IResource>> extends GridDataSource<T> {
    constructor(
        private _pageableResource: PageableResource<T>
    ) {
        super();

        this.pageableResource.options$.subscribe(options => this.filters.forEach(filter => {
            if (filter.multiple) {
                const optFilters = options.filters.filter(optFilter => optFilter.field === filter.field);
                if (!optFilters.length) {
                    filter.value = undefined;
                } else {
                    filter.value = optFilters.map(optFilter => filter.convertFromModelValue(optFilter.value));
                }
            } else {
                const optFilter = options.filters.find(optFilter => optFilter.field === filter.field);
                if (!optFilter) {
                    filter.value = undefined;
                } else {
                    filter.value = filter.convertFromModelValue(optFilter.value);
                }
            }
        }));
    }

    get pageableResource() {
        return this._pageableResource;
    }

    get isLoading(): boolean {
        return this.pageableResource.isLoading;
    }
    
    get items(): T[] {
        return this.pageableResource.items;
    }

    get limit(): number {
        return this.pageableResource.limit;
    }

    get total(): number {
        return this.pageableResource.total;
    }

    get pageIndex(): number {
        return this.pageableResource.page - 1;
    }

    activateFilter(filter: GridFilterDefDirective) {
        const newFilters = this.pageableResource.filters.filter(_filter => _filter.field !== filter.field).slice();
        if (filter.multiple) {
            (<any[]>filter.value).map(value => newFilters.push({ field: filter.field, multiple: true, value: filter.convertToModelValue(value) }));
        } else {
            newFilters.push({ field: filter.field, multiple: false, value: filter.convertToModelValue(filter.value) });
        }
        this.pageableResource.filters = newFilters;

        this.pageableResource.page = 1;

        this.pageableResource.commit();
    }

    deactivateFilter(filter: GridFilterDefDirective) {
        this.pageableResource.filters = this.pageableResource.filters.filter(_filter => _filter.field !== filter.field).slice();
        this.pageableResource.commit();
    }

    handleSortEvent(event: Sort) {
        switch (event.direction) {
            case 'asc':
                this.pageableResource.sort = [{field: event.active, direction: true}];
                break;
            case 'desc':
            this.pageableResource.sort = [{field: event.active, direction: false}];
                break;
            case '':
            default:
            this.pageableResource.sort = [];
                break;
        }
        this.pageableResource.commit();
    }

    handlePageEvent(event: PageEvent) {
        this.pageableResource.page = event.pageIndex + 1;
        this.pageableResource.limit = event.pageSize;
        this.pageableResource.commit();
    }

    refresh(): void {
        this.pageableResource.refresh();
    }
    
    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.pageableResource.items$;
    }

    disconnect(collectionViewer: CollectionViewer): void {

    }
}
