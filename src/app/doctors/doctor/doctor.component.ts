import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private service:DoctorService,private tostr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      DocotorID: null, 
      Name:'',
      Age:null 
    };
  }
  
  onSubmit(form: NgForm){
    console.log("xxx"+this.service.formData.DocotorID);
    if(this.service.formData.DocotorID==null){
        this.insertRecord(form);
    }    
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    console.log("Insert");
    this.service.postDoctor(form.value).subscribe(res=>{
      this.service.refreshList();
      this.tostr.success("New Doctor Added",'Doctors Info');  
      this.resetForm(form);
    });
    this.service.refreshList();
  }

  updateRecord(form:NgForm){
    console.log("Update");
    this.service.putDoctor(form.value).subscribe(res=>{
      this.service.refreshList();
      this.tostr.success("Data updated Successfully",'Doctors Info');  
      this.resetForm(form);
    });
    
   // this.tostr.success("Data updated Successfully",'Doctors Info');  
  }

  


}
