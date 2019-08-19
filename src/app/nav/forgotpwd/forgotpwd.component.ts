import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  constructor(private hc:HttpClient,private router:Router) { }

  ngOnInit() {
  }
password(x){
  console.log(x)
  this.hc.post('nav/forgotpwd',x).subscribe(res=>{
    console.log(res)
    alert(res["message"]);
    if(res["message"]=="user found")
    {
      this.router.navigate(['/nav/otp'])
    }
    else
    {
      this.router.navigate(['nav/forgotpwd'])
    }
  })
}
}
