import {findByText, fireEvent, queryByText, render} from "@testing-library/angular";
import {AppComponent} from "./app.component";
import userEvent from "@testing-library/user-event";
import {ReactiveFormsModule} from "@angular/forms";
import {RenderResult} from "@testing-library/angular/src/lib/models";

describe('Password validation kata', () => {
  let screen: Promise<RenderResult<any, any>>;

  beforeEach(async () => {
    screen = render(AppComponent, {
      imports: [ReactiveFormsModule]
    });
  })

  it('should render password field', async () => {
    const {getByPlaceholderText} = await screen
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render save button', async () => {
    const {getByText} = await screen
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('should not render password is too short', async () => {
    const {queryByText} = await screen
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
    const {findByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), password)

    await userEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
  });

  it('should not render message if password is greater than 8 chars', async () => {
    const {queryByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), '123456789')

    fireEvent.click(getByText('Save'));

    expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
  });

  it('should render message if password dos not contain upper case char', async () => {
    const {findByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), '123456789')

    fireEvent.click(getByText('Save'));

    expect(await findByText('La contraseña debe contener mayúscula')).toBeInTheDocument();
  });

  it('should render message if password dos not contain upper case char and password is shorter than 8 chars', async () => {
    const {findByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), '12345')

    fireEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
    expect(await findByText('La contraseña debe contener mayúscula')).toBeInTheDocument();
  });

  it('should NOT render message when password does contain a uppercase', async () => {
    const {queryByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), '12345N')

    fireEvent.click(getByText('Save'));

    expect(queryByText('La contraseña debe contener mayúscula')).not.toBeInTheDocument();
  })

  it('should NOT render message when password does contain upper case char and password is longer than 8 chars', async () => {
    const {queryByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), '123456789UPPER')

    fireEvent.click(getByText('Save'));

    expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
    expect(queryByText('La contraseña debe contener mayúscula')).not.toBeInTheDocument();
  });

  it('should render error messages based on input', async () => {
    const {findByText, queryByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), '12345')
    fireEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
    expect(await findByText('La contraseña debe contener mayúscula')).toBeInTheDocument();

    await userEvent.clear(getByPlaceholderText('Password'))
    await userEvent.type(getByPlaceholderText('Password'), '12345N')
    fireEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
    expect(queryByText('La contraseña debe contener mayúscula')).not.toBeInTheDocument();
  });

  it('should list valid password', async () => {
    const validPassword = 'da12345678UPPER'
    const {findByText, queryByText, getByPlaceholderText, getByText} = await screen

    await userEvent.type(getByPlaceholderText('Password'), validPassword)
    fireEvent.click(getByText('Save'));

    expect(await findByText(validPassword)).toBeInTheDocument()
  })
});
