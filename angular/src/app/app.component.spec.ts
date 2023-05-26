import {fireEvent, render} from "@testing-library/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/dom";

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
    '12345',
    '123456',
    '1234567',
    '12345678'
  ])('should print error message when password is shorter than 8 chars (%s)', async (password: string) => {
    const {getByText, getByPlaceholderText} = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), password);
    fireEvent.click(getByText('Save'));

    expect(getByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
  });

  it('should not print error message when password is longer than 8 chars', async () => {
    const {getByText, getByPlaceholderText, queryByText} = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), '123456789');
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
    });
  });

  it('should print error message when password have not any CAP', async () => {
    const { getByText, getByPlaceholderText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), 'zxcvbnmas');
    fireEvent.click(getByText('Save'));

    expect(getByText('La contraseña debe contener mayúsculas')).toBeInTheDocument()
  })

  it('should not print error message when password have any CAP', async () => {
    const { getByText, getByPlaceholderText, queryByText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), 'abcabc');
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(queryByText('La contraseña debe contener mayúsculas')).not.toBeInTheDocument()
    })
  })


  it('should print password too short and password without caps', async () => {
    const { getByText, getByPlaceholderText, queryByText } = await buildComponent();

    await userEvent.type(getByPlaceholderText('Password'), 'abc123');
    fireEvent.click(getByText('Save'));

    expect(getByText('Contraseña muy corta -> 8 <')).toBeInTheDocument()
    expect(getByText('La contraseña debe contener mayúsculas')).toBeInTheDocument()
  })

});
