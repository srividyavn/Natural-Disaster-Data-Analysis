import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from '../countryData';
import {range} from 'rxjs';

@Component({
  selector: 'app-compare-type',
  templateUrl: './compare-type.component.html',
  styleUrls: ['./compare-type.component.css']
})
export class CompareTypeComponent implements OnInit {
  countryDropDownValue = 'India';
  apiURL: String = 'http://127.0.0.1:5000/api';
  countries;
  yearData;
  fromValue = 2010;
  toValue = 2018;
  oldYear;
  newYear;
  eventOccured = [];
  filterData;
  // chart labels
  eOccuranceLabels = [];
  deathLabels = [];
  affectedLabels = [];
  economyLabels = [];
  // chart data
  occuranceData = [];
  deathData = [];
  affectedData = [];
  economyData = [];
  eOccuranceOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  deathOptions = {
    responsive: true
  };
  affectedOptions = {
    responsive: true
  };
  economyOptions = {
    responsive: true
  };

  // chartColors: Array<any> = [
  //   { // first color
  //     backgroundColor: '#2980B9',
  //     borderColor: 'rgba(225,10,24,0.2)',
  //     pointBackgroundColor: 'rgba(225,10,24,0.2)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(225,10,24,0.2)'
  //   }];
  constructor(private http: HttpClient) { }

  countryDropdownChange(country) {
    this.countryDropDownValue = country;
     this.getRange();
  }
  onToYearChange(to) {
    this.toValue = to;
    this.getRange();
  }
  onFromYearChange(from) {
    this.fromValue = from;
    this.getRange();
  }
  getCountries() {
    this.http.get(this.apiURL + '/country/getCountries').
    subscribe(countryData => {
      this.countries = countryData;
      // console.log(this.countries);
    }, error => {});
  }
  getYear() {
    this.http.get(this.apiURL + '/year/getYear').
    subscribe(yearData => {
      this.yearData = yearData;
      // console.log(this.disasterType);
    }, error => {});
  }
  getRange() {
    this.eOccuranceLabels = [];
    this.deathLabels = [];
    this.affectedLabels = [];
    this.economyLabels = [];
    this.occuranceData = [];
    this.deathData = [];
    this.affectedData = [];
    this.economyData = [];
    const etotalDeaths = [];
    const wtotalDeaths = [];
    const ltotalDeaths = [];
    const stotalDeaths = [];
    const vtotalDeaths = [];
    const ftotalDeaths = [];
    const eTotalOccurance = [];
    const wTotalOccurance = [];
    const lTotalOccurance = [];
    const sTotalOccurance = [];
    const vTotalOccurance = [];
    const fTotalOccurance = [];
    const etotalPeopleAffected = [];
    const wtotalPeopleAffected = [];
    const ltotalPeopleAffected = [];
    const stotalPeopleAffected = [];
    const vtotalPeopleAffected = [];
    const ftotalPeopleAffected = [];
    const eEconomyAffected = [];
    const wEconomyAffected = [];
    const lEconomyAffected = [];
    const sEconomyAffected = [];
    const vEconomyAffected = [];
    const fEconomyAffected = [];
    this.http.get(this.apiURL + '/typeCompare?from=' + this.fromValue + '&to=' + this.toValue + '&country=' +
      this.countryDropDownValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
        this.newYear = y.year;
        if (this.oldYear !== this.newYear || this.oldYear === null) {
            this.eOccuranceLabels.push(y.year);
            this.deathLabels.push(y.year);
            this.affectedLabels.push(y.year);
            this.economyLabels.push(y.year);

          if (!this.eventOccured.includes('Earthquake')) {
            eTotalOccurance.push(0);
            etotalDeaths.push(0);
            etotalPeopleAffected.push(0);
            eEconomyAffected.push(0);
          }
          if (!this.eventOccured.includes('WildFire')) {
            wTotalOccurance.push(0);
            wtotalDeaths.push(0);
            wtotalPeopleAffected.push(0);
            wEconomyAffected.push(0);
          }
          if (!this.eventOccured.includes('Landslide')) {
            lTotalOccurance.push(0);
            ltotalDeaths.push(0);
            ltotalPeopleAffected.push(0);
            lEconomyAffected.push(0);
          }
          if (!this.eventOccured.includes('Storm')) {
            sTotalOccurance.push(0);
            stotalDeaths.push(0);
            stotalPeopleAffected.push(0);
            sEconomyAffected.push(0);
          }
          if (!this.eventOccured.includes('Volcanic')) {
            vTotalOccurance.push(0);
            vtotalDeaths.push(0);
            vtotalPeopleAffected.push(0);
            vEconomyAffected.push(0);
          }
          if (!this.eventOccured.includes('Flood')) {
            fTotalOccurance.push(0);
            ftotalDeaths.push(0);
            ftotalPeopleAffected.push(0);
            fEconomyAffected.push(0);
          }
          this.eventOccured = [];
        }
        if (y.disasterType === 'Earthquake') {
          eTotalOccurance.push(y.occurrence);
          etotalDeaths.push(y.totalDeaths);
          etotalPeopleAffected.push(y.totalAffected);
          eEconomyAffected.push(y.totalDamage);
          this.eventOccured.push('Earthquake');
        } else if (y.disasterType === 'WildFire') {
          wTotalOccurance.push(y.occurrence);
          wtotalDeaths.push(y.totalDeaths);
          wtotalPeopleAffected.push(y.totalAffected);
          wEconomyAffected.push(y.totalDamage);
          this.eventOccured.push('WildFire');
        } else if (y.disasterType === 'Landslide') {
          lTotalOccurance.push(y.occurrence);
          ltotalDeaths.push(y.totalDeaths);
          ltotalPeopleAffected.push(y.totalAffected);
          lEconomyAffected.push(y.totalDamage);
          this.eventOccured.push('Landslide');
        } else if (y.disasterType === 'Storm') {
          sTotalOccurance.push(y.occurrence);
          stotalDeaths.push(y.totalDeaths);
          stotalPeopleAffected.push(y.totalAffected);
          sEconomyAffected.push(y.totalDamage);
          this.eventOccured.push('Storm');
        } else if (y.disasterType === 'Volcanic') {
          vTotalOccurance.push(y.occurrence);
          vtotalDeaths.push(y.totalDeaths);
          vtotalPeopleAffected.push(y.totalAffected);
          vEconomyAffected.push(y.totalDamage);
          this.eventOccured.push('Volcanic');
        } else if (y.disasterType === 'Flood') {
          fTotalOccurance.push(y.occurrence);
          ftotalDeaths.push(y.totalDeaths);
          ftotalPeopleAffected.push(y.totalAffected);
          fEconomyAffected.push(y.totalDamage);
          this.eventOccured.push('Flood');
        }
      });
      this.occuranceData = [{data: eTotalOccurance, label: 'Earthquake'},
        {data: wTotalOccurance, label: 'WildFire'},
        {data: lTotalOccurance, label: 'Landslide'},
        {data: sTotalOccurance, label: 'Storm'},
        {data: vTotalOccurance, label: 'Volcanic'},
        {data: fTotalOccurance, label: 'Flood'}];

      this.deathData = [{data: etotalDeaths, label: 'Earthquake'},
        {data: wtotalDeaths, label: 'WildFire'},
        {data: ltotalDeaths, label: 'Landslide'},
        {data: stotalDeaths, label: 'Storm'},
        {data: vtotalDeaths, label: 'Volcanic'},
        {data: ftotalDeaths, label: 'Flood'}];

      this.affectedData = [{data: etotalPeopleAffected, label: 'Earthquake'},
        {data: wtotalPeopleAffected, label: 'WildFire'},
        {data: ltotalPeopleAffected, label: 'Landslide'},
        {data: stotalPeopleAffected, label: 'Storm'},
        {data: vtotalPeopleAffected, label: 'Volcanic'},
        {data: ftotalPeopleAffected, label: 'Flood'}];

      this.economyData = [{data: eEconomyAffected, label: 'Earthquake'},
        {data: wEconomyAffected, label: 'WildFire'},
        {data: lEconomyAffected, label: 'Landslide'},
        {data: sEconomyAffected, label: 'Storm'},
        {data: vEconomyAffected, label: 'Volcanic'},
        {data: fEconomyAffected, label: 'Flood'}];
    }, error => {});
  }
  onChartClick(event) {
    console.log(event);
  }
  ngOnInit() {
    this.getCountries();
    this.getYear();
    this.getRange();
  }

}
