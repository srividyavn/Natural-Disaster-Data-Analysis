import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReportComponent} from './report/report.component';
import {RenderMapComponent} from './render-map/render-map.component';
import {CompareTypeComponent} from './compare-type/compare-type.component';
import {CompareCountriesComponent} from './compare-countries/compare-countries.component';
import {EmpericalViewComponent} from './emperical-view/emperical-view.component';

const routes: Routes = [ { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {path: 'report', component: ReportComponent},
  {path: 'map', component: RenderMapComponent},
  {path: 'compareType', component: CompareTypeComponent},
  {path: 'compareCountry', component: CompareCountriesComponent},
  {path: 'empericalView', component: EmpericalViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
