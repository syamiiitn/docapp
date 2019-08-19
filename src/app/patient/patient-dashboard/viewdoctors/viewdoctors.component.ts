import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewdoctors',
  templateUrl: './viewdoctors.component.html',
  styleUrls: ['./viewdoctors.component.css']
})
export class ViewdoctorsComponent implements OnInit {

  b:boolean = true;
  status:string;
  value:string;
  check:boolean;
  list:any[]=[];
  currentUser:any[];
  searchTerm:string;
  searchWord:string;
  constructor(private hc:HttpClient,private ts:TransferService,private router:Router) { }
  
  ngOnInit() {
    this.currentUser=this.ts.currentUsername
    
    this.hc.get("/patientdashboard/viewdoctors").subscribe(
      res=>{
        this.list=res['message']
        console.log(this.list)

          
      if(res['message']=="unauthorized access")
      {
        alert(res['message'])
        this.router.navigate(['/nav/login'])
      }
      
      else
      {
        alert(res['message'])
      }
      })
  }
  ngOnChanges()
  {
  }
  changeStatus(doctorObject) {
    
    console.log(doctorObject)
    console.log(this.currentUser)
    var bookappointment={
      "reqstatus":'',
      "patientname": this.currentUser[0].name,
      "patientnumber":this.currentUser[0].mobileno,
      "patientemail":this.currentUser[0].email,
      "patientarea":this.currentUser[0].area,
      "doctorname":doctorObject.name,
      "doctornumber":doctorObject.number,
      "doctoremail":doctorObject.email,
      "doctorarea":doctorObject.area,
      "doctorspec":doctorObject.specialization,
      "doctorexp":doctorObject.experience
    }
    console.log(bookappointment)
    this.hc.post('/patientdashboard/viewdoctors',bookappointment).subscribe(res=>{
        alert(res['message'])

      
      }
      
    )
  }

}
