import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '' //CapgeminiLBS , UserLBS
  password = '' //dummy , password@!23@#!
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  private loggInUser:string
 
  //Router
  //Angular.giveMeRouter
  //Dependency Injection
  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  get LoggInUser() : string {
    console.log("Get LoggInUser : ", this.loggInUser);
    return this.loggInUser;
  }

  set LoggInUser(value : string) {
    console.log("Set LoggInUser : ", value);
    this.loggInUser = value;
  } 

    
  handleLogin() {
    // console.log(this.username);
    //if(this.username==="in28minutes" && this.password === 'dummy') {
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      //Redirect to Welcome Page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin() {
    // console.log(this.username);
    //if(this.username==="in28minutes" && this.password === 'dummy') {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false  
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.LoggInUser = this.username //Set method is called by initializing 
            this.LoggInUser //Calling Get method
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false 
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
      }

}
