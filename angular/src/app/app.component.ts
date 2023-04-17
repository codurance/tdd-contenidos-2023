import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isPasswordLessThan8Chars = false
  passwordContainsCapitalLetters = false


  form = this.formBuilder.group({
    password: ['', []],
  });


  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    const password = this.form.value.password;

    if (!password) return;

    if (password.length <= 8) {
      this.isPasswordLessThan8Chars = true;
    }

    if (this.isPasswordWithoutCapitals()) {
      this.passwordContainsCapitalLetters = true;
    }
  }

  private isPasswordWithoutCapitals() {
    return !(/[A-Z]/.test(this.form.value.password!!));
  }
}
