import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, NgForm, NgModel, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  password = '';

  isPasswordLessThan8Chars = false


  form = this.formBuilder.group({
    password: ['', []],
  });


  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.form.value.password && this.form.value.password.length >= 8) {
      return;
    }

    this.isPasswordLessThan8Chars = true;
  }
}
