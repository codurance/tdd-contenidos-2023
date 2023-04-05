import {Component, Input, ViewChild} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  password = '';

  isPasswordLessThan8Chars = false

  onSaveBtnClick() {
    if(this.password.length < 8) {
      this.isPasswordLessThan8Chars = true;
    }
  }
}
