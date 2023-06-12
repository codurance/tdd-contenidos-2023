import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  it('should have a button and an input', () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    expect(getByPlaceholderText('Introduce tu contraseña')).toBeInTheDocument()
    expect(getByText('Enviar consulta')).toBeInTheDocument()
  })

  it('should show an error when password is too short', async () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard('short1')
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
  })
})
