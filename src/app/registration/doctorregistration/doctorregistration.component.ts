import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Component({
  selector: 'app-doctorregistration',
  templateUrl: './doctorregistration.component.html',
  styleUrls: ['./doctorregistration.component.css']
})
export class DoctorregistrationComponent implements OnInit {

  constructor(private router: Router,private hc:HttpClient) { }

  ngOnInit() {
  }
  doctorReg(data){
    if(data.puname=="" || data.password=="" || data.email=="" || data.mobileno=="" || data.date=="")
    {
     alert("please fill the required fields")
     }
     else{
    this.hc.post('nav/register/doctor',data).subscribe((res)=>{

      if(res["message"]=="Duplicate Username")
      {
        alert(res['message'])
      }

     
      else
      {
        alert(res["message"])
        this.router.navigate(['nav/login/'])
      }
    })
  }
  }
}
