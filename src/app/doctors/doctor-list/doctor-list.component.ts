import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor.service';
import { Doctor } from 'src/app/shared/doctor.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  constructor(private service: DoctorService, private toastr: ToastrService) { }
 
   ngOnInit() {
    this.service.refreshList();
  }

  populateForm(doctor : Doctor){
    console.log(doctor);
    //debugger;
    this.service.formData = Object.assign({},doctor);
    //if(doctor.DocotorID!=null) this.service.formData.DocotorID = doctor.DocotorID; 
    console.log("-------"+this.service.formData.DocotorID);
  }

  deleteDoctor(doctorId: number){
    this.service.deleteDoctor(doctorId).subscribe(res=>{
      this.service.refreshList();
    });
    this.toastr.error("Doctor removed!","Doctors list");
  }

}
