import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  recordCount: Number = 0;
  info: any;
  enableForm: boolean = false;
  fillFormData: any;
  updateForm: boolean = false;

  constructor(private commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.commonService.getRecordCount().subscribe(data => {
      this.recordCount = data.count
      this.commonService.fetchInfo().subscribe(data => this.info = data);
    });
  }

  showForm() {
    this.enableForm = true;
    this.updateForm = false;
    this.fillFormData = { name: '', Designation: '', Experience: 0, _id: '' };
  }

  setTableData(event) {
    console.log('event ~ ', event);
    this.info = event;
    this.recordCount = this.info.length;
    this.enableForm = false;
  }

  editInfo(event) {
    console.log('event ~ ', event);
    this.enableForm = true;
    this.updateForm = true;
    this.fillFormData = { name: event.name, Designation: event.Designation, Experience: event.Experience, _id: event._id };
  }

  deleteInfo(event) {
    console.log('event ~ ', event);
    this.commonService.deleteInfo(event._id).subscribe(data => {
      this.commonService.fetchInfo().subscribe(data => {this.info = data; this.recordCount = this.info.length});
    })
  }
}
