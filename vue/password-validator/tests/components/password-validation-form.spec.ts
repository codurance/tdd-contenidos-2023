import { render, RenderResult } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  let passwordValidatorForm: RenderResult
  beforeEach(async () => {
    passwordValidatorForm = render(PasswordValidatorForm)
    await userEvent.click(passwordValidatorForm.getByPlaceholderText('Introduce tu contraseña'))
  })

  it.each([
    ['short1'],
    ['pass4'],
    ['1234567']
  ])('should show proper error with too short password {%s}', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorForm.getByText('Enviar consulta'))

    expect(passwordValidatorForm.getByText('The password should have length of 8'))
  })

  it.each([
    ['password'],
    ['invalidpassword'],
    ['a long password without numbers']
  ])('should show proper error when password is {%s}', async (password:string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorForm.getByText('Enviar consulta'))

    expect(passwordValidatorForm.getByText('The password should contain numbers'))
  })

  it.each([
    ['passw0rd'],
    ['p4assword'],
    ['p4assw0rd']
  ])('should not show errors when the password is valid {%s}', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorForm.getByText('Enviar consulta'))

    expect(await passwordValidatorForm.queryByText('The password should have length of 8')).not.toBeInTheDocument()
    expect(await passwordValidatorForm.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(passwordValidatorForm.getByText(password)).toBeInTheDocument()
  })

  it('should show both errors when there is no password', async () => {
    await userEvent.click(passwordValidatorForm.getByText('Enviar consulta'))

    expect(passwordValidatorForm.getByText('The password should have length of 8'))
    expect(passwordValidatorForm.getByText('The password should contain numbers'))
  })

  it('should not repeat error messages', async () => {
    await userEvent.click(passwordValidatorForm.getByText('Enviar consulta'))
    await userEvent.click(passwordValidatorForm.getByText('Enviar consulta'))

    expect(passwordValidatorForm.getByText('The password should have length of 8')).toBeInTheDocument()
    expect(passwordValidatorForm.getByText('The password should contain numbers')).toBeInTheDocument()
  })
})
