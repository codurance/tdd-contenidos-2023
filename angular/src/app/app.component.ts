import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.formBuilder.group({
    password: ['', []]
  });

  constructor(private formBuilder: FormBuilder) {}

  invalidMessage: String[] = []

  validPasswords: String[] = []

  validatePassword() {
    this.invalidMessage = [];
    const password = this.form.value.password || ''

    if (this.isValidPassword(password)) {
      this.validPasswords.push(password)
    }
  }

  private isValidPassword(password: string) {
    if (!password)  {
      this.invalidMessage.push('La contraseña no puede ser vacia');
    }

    if (password.length <= 8) {
      this.invalidMessage.push('Contraseña muy corta -> 8 <');
    }

    if (!/[A-Z]/.test(password)) {
      this.invalidMessage.push('La contraseña debe contener mayúscula');
    }

    return this.invalidMessage.length === 0;
  }
}
