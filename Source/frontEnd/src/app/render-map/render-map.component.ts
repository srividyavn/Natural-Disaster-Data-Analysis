import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../countryData';

@Component({
  selector: 'app-render-map',
  templateUrl: './render-map.component.html',
  styleUrls: ['./render-map.component.css']
})
export class RenderMapComponent implements OnInit {
  eGeo_data = [];
  lGeo_data = [];
  wGeo_data = [];
  fGeo_data = [];
  vGeo_data = [];
  sGeo_data = [];
  disasterDropdownValue = 'Storm';
  disasterType;
  apiURL: String = 'http://127.0.0.1:5000/api';
  constructor(private http: HttpClient) {}
  disasterDropdownChange(type) {
    this.disasterDropdownValue = type;
    this.mapData();
  }
  getType() {
    this.http.get(this.apiURL + '/type/getDisasterType').
    subscribe(typeData => {
      this.disasterType = typeData;
    }, error => {});
  }
  mapData() {
    this.http.get(this.apiURL + '/countryMap').subscribe((mapData: Data[]) => {
      mapData.forEach(y => {
        if (y.disasterType === 'Earthquake') {
          this.eGeo_data.push([y.countryName, y.occurrence]);
        } else if (y.disasterType === 'Storm') {
          this.sGeo_data.push([y.countryName, y.occurrence]);
        } else if (y.disasterType === 'Landslide') {
          this.lGeo_data.push([y.countryName, y.occurrence]);
        } else if (y.disasterType === 'Flood') {
          this.fGeo_data.push([y.countryName, y.occurrence]);
        } else if (y.disasterType === 'Volcanic activity') {
          this.vGeo_data.push([y.countryName, y.occurrence]);
        } else if (y.disasterType === 'Wildfire') {
          this.wGeo_data.push([y.countryName, y.occurrence]);
        }
      });
      // location.reload();
    }, error => {});
  }
  ngOnInit() {
    this.mapData();
    this.getType();
  }

}
