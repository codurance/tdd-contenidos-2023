import {fireEvent, render, waitFor} from "@testing-library/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import userEvent from "@testing-library/user-event";

function buildComponent() {
  return render(AppComponent, {
    imports: [ReactiveFormsModule]
  });
}

describe('Password validation kata', () => {
  it('should render password input', async () => {
    const { getByPlaceholderText } = await buildComponent();

    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render save button', async () => {
    const { getByText } = await buildComponent();

    expect(getByText('Save')).toBeInTheDocument();
  });

  it.each([
    '1',
    '12',
    '123',
    '1234',
    '12456',
    '1234567',
    '12345678',
  ])('should validate short password (less than 8) %s', async (password: string) => {
    const {getByText, getByPlaceholderText, findByText} = await buildComponent()

    await userEvent.type(getByPlaceholderText('Password'), password);

    await userEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
  });

  it('password that is longer than 8 should not display error message', async () => {
    const {getByPlaceholderText, queryByText, findByText} = await buildComponent()

    await userEvent.type(getByPlaceholderText('Password'), '123456789');

    fireEvent.click(await findByText('Save'));

    await waitFor(() => {
      expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
    })
  });
});
