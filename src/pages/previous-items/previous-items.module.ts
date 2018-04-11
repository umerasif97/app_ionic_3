import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousItemsPage } from './previous-items';

@NgModule({
  declarations: [
    PreviousItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousItemsPage),
  ],
})
export class PreviousItemsPageModule {}
