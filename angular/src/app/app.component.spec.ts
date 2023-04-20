import {fireEvent, queryByText, render} from "@testing-library/angular";
import {AppComponent} from "./app.component";
import userEvent from "@testing-library/user-event";
import {ReactiveFormsModule} from "@angular/forms";

describe('Password validation kata', () => {
  it('should render password field', async () => {
    const {getByPlaceholderText} = await render(AppComponent);
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render save button', async () => {
    const {getByText} = await render(AppComponent);
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('should not render password is too short', async () => {
    const {queryByText} = await render(AppComponent);
    expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
  });

  it.each([
    '1',
    '12',
    '123',
    '1234',
    '12345',
    '123456',
    '1234567',
    '12345678',
  ])('should render password is too short (%s)', async (password: string) => {
    const {findByText, getByPlaceholderText, getByText} = await render(AppComponent);

    await userEvent.type(getByPlaceholderText('Password'), password)

    fireEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
  });

  it('should render not render message if password is greater than 8 chars', async () => {
    const {queryByText, getByPlaceholderText, getByText, findByText} = await render(AppComponent, {
      imports: [ ReactiveFormsModule ]
    });

    await userEvent.type(getByPlaceholderText('Password'), '123456789')

    fireEvent.click(getByText('Save'));

    expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
  });
});
