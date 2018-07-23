import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    TranslateModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [DeleteDialogComponent],
  entryComponents: [DeleteDialogComponent]
})
export class HalGridModule { }
