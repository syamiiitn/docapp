import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logout()
  {
    localStorage.removeItem('idToken')
    this.router.navigate(['nav/home'])
  }
}
