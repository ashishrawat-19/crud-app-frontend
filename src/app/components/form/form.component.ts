import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  name: string = '';
  experience: number = 0;
  designation: string = '';
  records: any;
  @Input() data: any;
  @Input() updateInfo: boolean;
  @Output() formSubmitted: EventEmitter<Object>;
  constructor(private http: HttpClient) {
    this.formSubmitted = new EventEmitter();
   }

  ngOnChanges(): void {
    this.name = this.data.name;
    this.experience = this.data.Experience;
    this.designation = this.data.Designation;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const record = { name: this.name, Designation: this.designation, Experience: this.experience };
    if (this.updateInfo === true) {
      this.http.put<any>('http://localhost:5000/api/updateInfo/' + this.data._id, record).subscribe((response) => {
        console.log('Record updated:', response);
        this.getRecords();
      });
    } else {
      this.http.post<any>('http://localhost:5000/api/submitRecords', record).subscribe((response) => {
        console.log('Record added:', response);
        this.getRecords();
      });
    }
  }

  getRecords(): void {
    this.http.get<any[]>('http://localhost:5000/api/records').subscribe((response) => {
      this.formSubmitted.emit(response)
    });
  }
}
