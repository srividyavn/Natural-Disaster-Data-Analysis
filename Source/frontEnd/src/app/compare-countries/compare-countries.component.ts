import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from '../countryData';
import {range} from 'rxjs';


@Component({
  selector: 'app-compare-countries',
  templateUrl: './compare-countries.component.html',
  styleUrls: ['./compare-countries.component.css']
})
export class CompareCountriesComponent implements OnInit {
  firstCountryDropDownValue = 'India';
  secondCountryDropDownValue = 'China';
  disasterDropdownValue = 'Earthquake';
  apiURL: String = 'http://127.0.0.1:5000/api';
  countries;
  filterData;
  yearData;
  disasterType;
  fromValue = 2010;
  toValue = 2018;
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
  firstCountryDropdownChange(country) {
    this.firstCountryDropDownValue = country;
    this.getRange();
  }
  secondCountryDropdownChange(country) {
    this.secondCountryDropDownValue = country;
    this.getRange();
  }
  getCountries() {
    this.http.get(this.apiURL + '/country/getCountries').
    subscribe(countryData => {
      this.countries = countryData;
      // console.log(this.countries);
    }, error => {});
  }
  onToYearChange(to) {
    this.toValue = to;
    this.getRange();
  }
  onFromYearChange(from) {
    this.fromValue = from;
    this.getRange();
  }
  getYear() {
    this.http.get(this.apiURL + '/year/getYear').
    subscribe(yearData => {
      this.yearData = yearData;
      // console.log(this.disasterType);
    }, error => {});
  }
  getType() {
    this.http.get(this.apiURL + '/type/getDisasterType').
    subscribe(typeData => {
      this.disasterType = typeData;
      // console.log(this.disasterType);
    }, error => {});
  }
  disasterDropdownChange(type) {
    this.disasterDropdownValue = type;
    this.getRange();
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
    const ftotalDeaths = [];
    const stotalDeaths = [];
    const fTotalOccurance = [];
    const sTotalOccurance = [];
    const ftotalPeopleAffected = [];
    const stotalPeopleAffected = [];
    const fEconomyAffected = [];
    const sEconomyAffected = [];
    this.http.get(this.apiURL + '/countryCompare?from=' + this.fromValue + '&to=' + this.toValue + '&FirstCountry=' +
      this.firstCountryDropDownValue + '&SecondCountry=' + this.secondCountryDropDownValue + '&type=' + this.disasterDropdownValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
        if (y.countryName === this.firstCountryDropDownValue) {
          fTotalOccurance.push(y.occurrence);
          ftotalDeaths.push(y.totalDeaths);
          ftotalPeopleAffected.push(y.totalAffected);
          fEconomyAffected.push(y.totalDamage);
        } else if (y.countryName === this.secondCountryDropDownValue) {
          sTotalOccurance.push(y.occurrence);
          stotalDeaths.push(y.totalDeaths);
          stotalPeopleAffected.push(y.totalAffected);
          sEconomyAffected.push(y.totalDamage);
        }
        if (!this.eOccuranceLabels.includes(y.year)) {
          this.eOccuranceLabels.push(y.year);
          this.deathLabels.push(y.year);
          this.affectedLabels.push(y.year);
        }
      });
      this.occuranceData = [{data: fTotalOccurance, label: this.firstCountryDropDownValue},
        {data: sTotalOccurance, label: this.secondCountryDropDownValue}];

      this.deathData = [{data: ftotalDeaths, label: this.firstCountryDropDownValue},
        {data: stotalDeaths, label: this.secondCountryDropDownValue}];

      this.affectedData = [{data: ftotalPeopleAffected, label: this.firstCountryDropDownValue},
        {data: stotalPeopleAffected, label: this.secondCountryDropDownValue}];

      this.economyData = [{data: fEconomyAffected, label: this.firstCountryDropDownValue},
        {data: sEconomyAffected, label: this.secondCountryDropDownValue}];
    }, error => {});
  }
  onChartClick(event) {
    console.log(event);
  }
  ngOnInit() {
    this.getCountries();
    this.getYear();
    this.getType();
    this.getRange();
  }

}
