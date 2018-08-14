import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdunitService } from '../../adunit.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  angForm: FormGroup;
  showNotification: boolean;

  constructor(private adunitservice: AdunitService, private fb: FormBuilder) { 
    this.createForm();
    this.showNotification = false;
  }

  createForm() {
    this.angForm = this.fb.group({
      unit_name: ['', Validators.required ],
      unit_price: ['', Validators.required ]
   });
  }

  addAdUnit(unit_name, unit_price) {
    this.adunitservice.addAdUnit(unit_name, unit_price).subscribe((res) => {
      this.angForm = this.fb.group({
        unit_name: ['', Validators.required ],
        unit_price: ['', Validators.required ]
     });
     this.showNotification = true;
     setTimeout(() => {
      this.showNotification = false;
     }, 3000)
    })
  }
  ngOnInit() {
  }

}
