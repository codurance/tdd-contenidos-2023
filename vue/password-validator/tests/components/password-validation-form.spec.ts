import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  it.each([
    ['short1'],
    ['p4ss'],
    ['1234567'],
    ['p4sswor']
  ])('should show an error when password is too short with password {%s}', async (shortPassword: string) => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard(shortPassword)
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
  })

  it.each([
    ['password'],
    ['qwertyui'],
    ['a random password']
  ])('should show an error when password has not a number, using password {%s}', async (passwordWithoutNumbers: string) => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard(passwordWithoutNumbers)
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should contain numbers')).toBeInTheDocument()
  })

  it('should show both errors when you click the button with an empty input', async () => {
    const { getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
    expect(getByText('The password should contain numbers')).toBeInTheDocument()
  })
})
