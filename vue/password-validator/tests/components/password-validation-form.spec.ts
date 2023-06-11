import { render, RenderResult } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  let passwordForm: RenderResult

  beforeEach(async () => {
    passwordForm = render(PasswordValidatorForm)

    await userEvent.click(passwordForm.getByPlaceholderText('Introduce tu contraseña'))
  })

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
    expect(await passwordForm.queryByText('The password should have length of 8')).not.toBeInTheDocument()

    await userEvent.keyboard(shortPasswordWithNumbers)
    await userEvent.click(passwordForm.getByText('Enviar consulta'))

    expect(passwordForm.getByText('The password should have length of 8')).toBeInTheDocument()
    expect(await passwordForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()
  })

  it.each([
    ['password'],
    ['a random password'],
    ['qwertyui']
  ])('should show error when the password has not a number for password {%s}', async (passwordWithoutNumbers: string) => {
    expect(await passwordForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()

    await userEvent.keyboard(passwordWithoutNumbers)
    await userEvent.click(passwordForm.getByText('Enviar consulta'))

    expect(passwordForm.getByText('The password should contain numbers')).toBeInTheDocument()
    expect(await passwordForm.queryByText('The password should have length of 8')).not.toBeInTheDocument()
  })

  it.each([
    ['short'],
    ['pass']
  ])('should show short error message and password should contain a number error when the password is {%s}', async (shortPasswordWithoutNumbers) => {
    expect(await passwordForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(await passwordForm.queryByText('The password should have length of 8')).not.toBeInTheDocument()

    await userEvent.keyboard(shortPasswordWithoutNumbers)
    await userEvent.click(passwordForm.getByText('Enviar consulta'))

    expect(passwordForm.getByText('The password should contain numbers')).toBeInTheDocument()
    expect(passwordForm.getByText('The password should have length of 8')).toBeInTheDocument()
  })

  it('should reset errors on every validation', async () => {
    expect(await passwordForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(await passwordForm.queryByText('The password should have length of 8')).not.toBeInTheDocument()

    await userEvent.click(passwordForm.getByText('Enviar consulta'))

    expect(passwordForm.getByText('The password should contain numbers')).toBeInTheDocument()
    expect(passwordForm.getByText('The password should have length of 8')).toBeInTheDocument()

    await userEvent.click(passwordForm.getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard('short1')
    await userEvent.click(passwordForm.getByText('Enviar consulta'))

    expect(await passwordForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(passwordForm.getByText('The password should have length of 8')).toBeInTheDocument()
  })

  it.each([
    ['p4ssword']
  ])('should show the password on the list of valid passwords {%s}', async (validPassword) => {
    await userEvent.keyboard(validPassword)
    await userEvent.click(passwordForm.getByText('Enviar consulta'))

    expect(await passwordForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(await passwordForm.queryByText('The password should have length of 8')).not.toBeInTheDocument()

    expect(passwordForm.getByText(validPassword)).toBeInTheDocument()
  })
})
