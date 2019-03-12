import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from '../app.component'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCf5imGc4PIY7TyUWgsjHPH-lXhcgZbQ1o'})
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
