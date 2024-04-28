import { Component, OnInit } from '@angular/core';
import { DashboardUpdatedGQL } from 'src/generated-types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private readonly dashboardUpdatedGql: DashboardUpdatedGQL) { }

  ngOnInit(): void {
    this.dashboardUpdatedGql.subscribe().subscribe(data => { 
      console.log(data);

    })
  }

}
