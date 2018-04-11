import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentItemsPage } from './current-items';

@NgModule({
  declarations: [
    CurrentItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentItemsPage),
  ],
})
export class CurrentItemsPageModule {}
