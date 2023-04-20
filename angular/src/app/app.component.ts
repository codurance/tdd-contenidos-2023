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

  invalidMessage: String = ''

  validatePassword() {
    const password = this.form.value.password

    if(!password) return;

    if( password.length <= 8 ) {
      this.invalidMessage = 'Contraseña muy corta -> 8 <';
    }

  }
}
