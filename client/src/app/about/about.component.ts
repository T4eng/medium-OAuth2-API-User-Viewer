import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Injectable } from "@angular/core";//
import { BrowserXhr } from "@angular/http";//
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common/src/directives/ng_for_of';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  constructor(
  private http:Http,
  private route:ActivatedRoute,
  private browser:BrowserXhr,
  ){}
  nameshow: string; usershow: string; imageUrl: string;
  token_type:string; access_token:string; publication= [];
  
  ngOnInit(){
    var code = '';
   this.route.queryParams.subscribe(
      params => {
      if(params.code){
      console.log(params.code)
      code=params.code;
     }
  }
)     
const headers1 = new Headers({'content-type': 'application/x-www-form-urlencoded'});
const body = 'code='+code+'&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=authorization_code&redirect_uri=http://127.0.0.1:4200/me';
this.http.post('https://api.medium.com/v1/tokens',body, { 
  headers: headers1		
  })		
       .subscribe(params => {		     
         var ch = params['_body'];		      
         var obj = JSON.parse(ch);		      
        const headers2 = new Headers()		      
        headers2.set('Authorization', 'my-auth-token')		  
        headers2.set('Content-Type', 'application/json');		       
        console.log('token= '+obj);		     
        // post value token
    this.http.post('http://127.0.0.1:3000/token', obj//,		 
    //{ headers: headers2 }
  )		 
     .subscribe(data => {		   
          console.log('data= ' +data)
    })		
       // get value user		
        this.http.get(		
        "http://127.0.0.1:3000/app/user"		
      )		
      .subscribe(params=>{		
        var ch = params['_body'];		
        var obj = JSON.parse(ch);		
        this.nameshow = "Name: "+obj.data.name		
        this.usershow = "User: "+obj.data.username		
        this.imageUrl = obj.data.imageUrl		
        console.log("user= "+obj.data.id)		
        // post value iduser		
        this.http.post('http://127.0.0.1:3000/iduser', obj,		
        {headers: headers2})		
        .subscribe(data => {		
          console.log('iduser= ' +data)		
        })//		
       })		      
      })
      // get value publication
       this.http.get(		
         "http://127.0.0.1:3000/app/publication"//		
       )		
      .subscribe(params=>{		
        var ch = params['_body'];		
        var obj = JSON.parse(ch);		
        this.publication = obj.data		
        console.log(obj.data);		
      })		
    }//OnInit		  
  }