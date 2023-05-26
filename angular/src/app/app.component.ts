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

  error = ''
  constructor(private formBuilder: FormBuilder) { }

  validatePassword() {
    const password = this.form.value.password!

    if(password.length <= 8) {
      this.error = 'Contraseña muy corta -> 8 <'
      return
    }

    if(!/[A-Z]/.test(password)) {
      this.error = 'La contraseña debe contener mayúsculas'
      return
    }

  }
}
