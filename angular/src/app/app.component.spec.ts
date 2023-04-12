import {render} from '@testing-library/angular';
import {AppComponent} from './app.component';
import userEvent from "@testing-library/user-event";
import {ReactiveFormsModule} from "@angular/forms";

describe('Password validation kata', () => {
  test('should render input text for password', async () => {
    const { getByPlaceholderText } = await render(AppComponent, {})

    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('should render save button', async () => {
    const { getByText } = await render(AppComponent, {})

    expect(getByText('Save')).toBeInTheDocument();
  });

  test('should show up error message for password that is less than 8 chars', async () => {
    const {getByText, getByPlaceholderText, findByText} = await render(AppComponent, {
      imports: [ReactiveFormsModule]
    })

    await userEvent.type(getByPlaceholderText('Password'), '123');

    await userEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
  })
});
