import { Injectable } from '@angular/core';
import { Doctor } from './doctor.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  formData:Doctor;
  doctorsList: Doctor[];
  readonly rootUrl = "http://localhost:60518/api";
  constructor(private http:HttpClient) {  }

  postDoctor(formData: Doctor){
    console.log(formData);
    formData.DocotorID=0;
    return this.http.post(this.rootUrl+"/doctors",formData);
  }

  putDoctor(formData: Doctor){
    return this.http.put(this.rootUrl+"/doctors/"+formData.DocotorID,formData);
  }

  refreshList(){
    this.http.get(this.rootUrl+"/doctors").
      toPromise().then(res=> this.doctorsList = res as Doctor[]);
  }

  deleteDoctor(id:number){
    return this.http.delete(this.rootUrl+"/doctors/"+id);
  }
}
