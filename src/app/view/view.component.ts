import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/api-call.service';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  id : string = "";
  data : any;

  constructor(private apiService:ApiCallService,private activatedRoute : ActivatedRoute){}
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.apiService.getartData(this.id).subscribe((data)=>{
      console.log(this.id)
      this.data = data.data;

      console.log(this.data)
    })
  }
}



