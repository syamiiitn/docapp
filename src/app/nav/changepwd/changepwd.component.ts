import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
  }

  changepassword(y)
  {
   this.http.put("/nav/changepwd",y).subscribe(res=>
  {
    if(res["message"]=="password changed")
    {
      alert(res["message"])
      this.router.navigate(["/nav/login"])
    }
    else{
      this.router.navigate(["/nav/otp"])
    }
  })
  }

}

