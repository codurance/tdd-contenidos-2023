import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event';

describe('Password validator Form', () => {
  it('should have a button', () => {
    const { getByText } = render(PasswordValidatorForm)
    expect(getByText('Enviar consulta')).toBeInTheDocument()
  })

  it('should validate a too short password', async () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)
    const input = getByPlaceholderText('Pon tu contraseña')
    expect(input).toBeInTheDocument()

    await userEvent.keyboard("short1")
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have a length of 8')).toBeInTheDocument()
  })

  it('should validate a password lacking numbers', async() => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)
    const input = getByPlaceholderText('Pon tu contraseña')
    expect(input).toBeInTheDocument()

    await userEvent.keyboard("abcdefghi")
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should contain numbers')).toBeInTheDocument()
  })
})
