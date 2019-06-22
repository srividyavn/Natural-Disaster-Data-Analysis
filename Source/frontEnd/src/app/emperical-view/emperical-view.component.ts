import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Data} from '../countryData';
import {range} from 'rxjs';

@Component({
  selector: 'app-emperical-view',
  templateUrl: './emperical-view.component.html',
  styleUrls: ['./emperical-view.component.css']
})
export class EmpericalViewComponent implements OnInit {

  apiURL: String = 'http://127.0.0.1:5000/api';
  fromValue = 1900;
  toValue = 2018;
  oldYear;
  newYear;
  eventOccured = [];
  reportedEventData = [];
  reportedEventLabels = [];

  economyDamageData = [];
  economyDamageLabels = [];

  topTenDeadliestEvent;
  topCountriesByOccurance;
  eventsByDeath;
  eventsByOccurance;
  deathData = [];
  deathLabels = [];
  filterData;
  data: Data[];
  constructor(private http: HttpClient) { }
  chartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  chartColors: Array<any> = [
    { // first color
      backgroundColor: '#2980B9',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
  onChartClick(event) {
    console.log(event);
  }
  getData() {
    this.reportedEventLabels = [];
    this.economyDamageLabels = [];
    this.deathLabels = [];
    const eventData = [];
    const damageData = [];

    const etotalDeaths = [];
    const wtotalDeaths = [];
    const ltotalDeaths = [];
    const stotalDeaths = [];
    const vtotalDeaths = [];
    const ftotalDeaths = [];
    this.http.get(this.apiURL + '/getReportedEvents').
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
        this.reportedEventLabels.push(y.year);
        this.economyDamageLabels.push(y.year);
        eventData.push(y.occurrence);
        damageData.push(y.totalDamage);
      });
      console.log(eventData);
      console.log(this.reportedEventLabels);
      this.reportedEventData = [{data: eventData, label: 'Total Events'}];
      this.economyDamageData = [{data: damageData, label: 'Total Damage'}];
    }, error => {});

    this.http.get(this.apiURL + '/tenDeadliest').
    subscribe((rangeData: Data[]) => { this.topTenDeadliestEvent = rangeData;
    }, error => {});

    this.http.get(this.apiURL + '/totalDeath?from=' + this.fromValue + '&to=' + this.toValue).
    subscribe((rangeData: Data[]) => { this.filterData = rangeData;
      rangeData.forEach(y => {
        this.newYear = y.year;
        if (this.oldYear !== this.newYear || this.oldYear === null) {
           this.deathLabels.push(y.year);
           this.oldYear = y.year;
           if (!this.eventOccured.includes('Earthquake')) {
             etotalDeaths.push(0);
           }
          if (!this.eventOccured.includes('WildFire')) {
            wtotalDeaths.push(0);
          }
          if (!this.eventOccured.includes('Landslide')) {
            ltotalDeaths.push(0);
          }
          if (!this.eventOccured.includes('Storm')) {
            stotalDeaths.push(0);
          }
          if (!this.eventOccured.includes('Volcanic')) {
            vtotalDeaths.push(0);
          }
          if (!this.eventOccured.includes('Flood')) {
            ftotalDeaths.push(0);
          }
           this.eventOccured = [];
        }
        if (y.disasterType === 'Earthquake') {
          etotalDeaths.push(y.totalDeaths);
          this.eventOccured.push('Earthquake');
        } else if (y.disasterType === 'WildFire') {
          wtotalDeaths.push(y.totalDeaths);
          this.eventOccured.push('WildFire');
        } else if (y.disasterType === 'Landslide') {
          ltotalDeaths.push(y.totalDeaths);
            this.eventOccured.push('Landslide');
        } else if (y.disasterType === 'Storm') {
          stotalDeaths.push(y.totalDeaths);
            this.eventOccured.push('Storm');
        } else if (y.disasterType === 'Volcanic') {
          vtotalDeaths.push(y.totalDeaths);
            this.eventOccured.push('Volcanic');
        } else if (y.disasterType === 'Flood') {
          ftotalDeaths.push(y.totalDeaths);
            this.eventOccured.push('Flood');
        }
          // else {
          //   ftotalDeaths.push(0);
          // }
      });
      console.log(ftotalDeaths);
      console.log(this.deathLabels);
      this.deathData = [{data: etotalDeaths, label: 'Earthquake'},
        {data: wtotalDeaths, label: 'WildFire'},
        {data: ltotalDeaths, label: 'Landslide'},
        {data: stotalDeaths, label: 'Storm'},
        {data: vtotalDeaths, label: 'Volcanic'},
        {data: ftotalDeaths, label: 'Flood'}];
    }, error => {});

    this.http.get(this.apiURL + '/occuranceEvent').
    subscribe((rangeData: Data[]) => { this.eventsByOccurance = rangeData;
    }, error => {});

    this.http.get(this.apiURL + '/deadliestEvent').
    subscribe((rangeData: Data[]) => { this.eventsByDeath = rangeData;
    }, error => {});

    this.http.get(this.apiURL + '/topCountries').
    subscribe((rangeData: Data[]) => { this.topCountriesByOccurance = rangeData;
    }, error => {});


  }

  ngOnInit() {
    this.getData();
  }

}
