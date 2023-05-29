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

  error : string[] = []

  passwords: string[] = []

  constructor(private formBuilder: FormBuilder) { }

  validatePassword() {
    const password = this.form.value.password!

    if(password.length <= 8) {
      this.error.push('Contraseña muy corta -> 8 <');
    }

    if(!/[A-Z]/.test(password)) {
      this.error.push('La contraseña debe contener mayúsculas');
    }

    if (this.error.length === 0) {
      this.passwords.push(password);
    }
  }
}
