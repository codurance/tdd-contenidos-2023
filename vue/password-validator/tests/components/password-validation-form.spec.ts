import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from "@testing-library/user-event";

describe('Password validator form', () => {
  it('should have a button and an input', () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    expect(getByText('Enviar consulta')).toBeInTheDocument()
    expect(getByPlaceholderText('Introduce tu contraseña')).toBeInTheDocument()
  })

  it('should show proper error with too short password', () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    userEvent.keyboard('short1');
    userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8'))
  });
})
