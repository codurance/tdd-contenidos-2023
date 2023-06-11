import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  it.each([
    ['shor1'],
    ['p4ass'],
    ['1'],
    ['12'],
    ['123'],
    ['1234'],
    ['12345'],
    ['123456'],
    ['1234567']
  ])('should show the error of short password when the password is {%s} only when password is validated', async (shortPasswordWithNumbers: string) => {
    const { getByPlaceholderText, getByText, queryByText } = render(PasswordValidatorForm)
    expect(await queryByText('The password should have length of 8')).not.toBeInTheDocument()

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard(shortPasswordWithNumbers)
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
  })

  it.each([
    ['password'],
    ['a random password'],
    ['qwertyui']
  ])('should show error when the password has not a number for password {%s}', async (passwordWithoutNumbers: string) => {
    const { getByPlaceholderText, getByText, queryByText } = render(PasswordValidatorForm)
    expect(await queryByText('The password should contain numbers')).not.toBeInTheDocument()

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard(passwordWithoutNumbers)
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should contain numbers')).toBeInTheDocument()
    expect(await queryByText('The password should have length of 8')).not.toBeInTheDocument()
  })
})
