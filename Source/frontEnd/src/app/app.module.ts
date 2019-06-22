import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule} from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { RenderMapComponent } from './render-map/render-map.component';
import { CompareTypeComponent } from './compare-type/compare-type.component';
import { CompareCountriesComponent } from './compare-countries/compare-countries.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { EmpericalViewComponent } from './emperical-view/emperical-view.component';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    RenderMapComponent,
    CompareTypeComponent,
    CompareCountriesComponent,
    EmpericalViewComponent
    // Ng2GoogleChartsModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    GoogleChartsModule.forRoot('AIzaSyAohWG1VqFhEHkxpXRV77aHYoGyRZB1ktU')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
