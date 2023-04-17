import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Repository} from "./repository";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isPasswordLessThan8Chars = false
  passwordDoesNotContainsCapitalLetters = false

  validPasswordList: string[] = []

  form = this.formBuilder.group({
    password: ['', []],
  });


  constructor(private formBuilder: FormBuilder, private repository: Repository) {}

  onSubmit() {
    this.isPasswordLessThan8Chars = false;
    this.passwordDoesNotContainsCapitalLetters = false;

    const password = this.form.value.password;

    if (!password) return;

    if (password.length <= 8) {
      this.isPasswordLessThan8Chars = true;
    }

    if (this.isPasswordWithoutCapitals()) {
      this.passwordDoesNotContainsCapitalLetters = true;
    }

   if(!this.isPasswordLessThan8Chars && !this.passwordDoesNotContainsCapitalLetters) {
     this.validPasswordList = [...this.validPasswordList, password]

     this.repository.sendPassword(password)
   }
  }

  private isPasswordWithoutCapitals() {
    return !(/[A-Z]/.test(this.form.value.password!!));
  }
}
