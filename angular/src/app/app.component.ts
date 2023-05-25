import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  error: string = ''

  formGroup = this.formBuilder.group({
    password: ['', []]
  });

  constructor(private formBuilder: FormBuilder) {}

  validatePassword() {
    this.error = 'Contraseña muy corta -> 8 <';
  }
}
