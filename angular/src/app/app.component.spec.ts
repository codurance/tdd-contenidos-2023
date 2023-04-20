import {render, waitFor} from '@testing-library/angular';
import {AppComponent} from './app.component';
import userEvent from "@testing-library/user-event";
import {ReactiveFormsModule} from "@angular/forms";
import {Repository} from "./repository";


const mockedRepository = jest.mock('./repository', () => {
  sendPassword: jest.fn()
})

describe('Password validation kata', () => {
  test('should render input text for password', async () => {
    const { getByPlaceholderText } = await render(AppComponent, {})

    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('should render save button', async () => {
    const { getByText } = await render(AppComponent, {})

    expect(getByText('Save')).toBeInTheDocument();
  });

  test('should start app without validation errors', async () => {
    const {queryByText} = await render(AppComponent, {
      imports: [ReactiveFormsModule]
    })

    expect(queryByText('La contraseña debe contener mayúsculas')).not.toBeInTheDocument();
  });

  test('should show up error message for password that is less than 8 chars', async () => {
    const {getByText, getByPlaceholderText, findByText} = await render(AppComponent, {
      imports: [ReactiveFormsModule]
    })

    await userEvent.type(getByPlaceholderText('Password'), '123');

    await userEvent.click(getByText('Save'));

    expect(await findByText('Contraseña muy corta -> 8 <')).toBeInTheDocument();
  });

  test.each([
    'asdfgmfoaa',
    '12345678'
  ])('should show up error message for password that does not have capital letters', async (password) => {
    const {getByText, getByPlaceholderText, findByText} = await render(AppComponent, {
      imports: [ReactiveFormsModule]
    })

    await userEvent.type(getByPlaceholderText('Password'), password);

    await userEvent.click(getByText('Save'));

    expect(await findByText('La contraseña debe contener mayúsculas')).toBeInTheDocument();
  })

  test.each([
    ['numbers and chars', '12345678VALID'],
  ])('should NOT show any error message with %s', async (_, password) => {
    const {getByText, getByPlaceholderText, queryByText, findByText} = await render(AppComponent, {
      imports: [ReactiveFormsModule]
    })

    await userEvent.type(getByPlaceholderText('Password'), password);

    await userEvent.click(await findByText('Save'));

    await waitFor(() => {
      expect(queryByText('La contraseña debe contener mayúsculas')).not.toBeInTheDocument();
      expect(queryByText('Contraseña muy corta -> 8 <')).not.toBeInTheDocument();
    })
  })


  it('should list valid password', async () => {
    const validPassword = '12345678VALID'

    const { findByText, getByText, getByPlaceholderText } = await render(AppComponent, {
      imports: [ReactiveFormsModule]
    })

    await userEvent.type(getByPlaceholderText('Password'), validPassword);
    await userEvent.click(getByText('Save'));

    expect(await findByText(validPassword)).toBeInTheDocument()
  })

  it('should call repository when password is valid', async () => {
    const useValue = {
      sendPassword: jest.fn()
    };

    const { getByPlaceholderText, findByText} = await render(AppComponent, {
      imports: [ReactiveFormsModule],
      providers: [{
        provide: Repository,
        useValue
      }]
    })

    await userEvent.type(getByPlaceholderText('Password'), '12345678VALID');
    await userEvent.click(await findByText('Save'));

    expect(useValue.sendPassword).toHaveBeenCalledWith('12345678VALID')
  })
});
