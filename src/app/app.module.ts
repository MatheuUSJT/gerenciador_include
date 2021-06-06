import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ChartModule} from 'primeng/chart';
import {OrderListModule} from 'primeng/orderlist';
import {HttpClientModule} from '@angular/common/http';
import {SelectButtonModule} from 'primeng/selectbutton';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule,
    ChartModule,
    OrderListModule,
    HttpClientModule,
    SelectButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
