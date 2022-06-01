import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $$ } from 'protractor';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenService:TokenService,
    private router:Router ) { }
  token:string='';
connecte:boolean=false;
username:any
  ngOnInit(): void {
    this.connecte=this.tokenService.getToken().length>0;
if(this.connecte==true)
{this.username=this.tokenService.getUser(this.tokenService.getToken())
} }


signout(){
this.tokenService.signOut();
this.router.navigate(['/login'])
this.connecte=false;
this.token='';
}
}
