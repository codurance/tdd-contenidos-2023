import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import { render, RenderResult } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

describe('Password validator Form', () => {
  let passwordValidatorFormWrapper:RenderResult

  beforeEach(async () => {
    passwordValidatorFormWrapper = render(PasswordValidatorForm)
    const input = passwordValidatorFormWrapper.getByPlaceholderText('Pon tu contraseña')
    expect(input).toBeInTheDocument()

    await userEvent.click(input)
  })

  it('should not repeat errors after first submit', async () => {
    await userEvent.keyboard('a long password without numbers')
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(await passwordValidatorFormWrapper.queryByText('The password should contain numbers')).toBeInTheDocument()
  })

  it('should validate a too short password', async () => {
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should contain numbers')).toBeInTheDocument()
    expect(passwordValidatorFormWrapper.getByText('The password should have a length of 8')).toBeInTheDocument()
  })

  it.each([
    [' '],
    ['short'],
    ['pass']
  ])('should validate a too short password without numbers when input is %s', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should contain numbers')).toBeInTheDocument()
    expect(passwordValidatorFormWrapper.getByText('The password should have a length of 8')).toBeInTheDocument()
  })

  it.each([
    ['abcdefghi'],
    ['password'],
    ['a password with the right length']
  ])('should show errors when the password {%s} does not have numbers', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should contain numbers')).toBeInTheDocument()
  })

  it.each([
    ['1234567'],
    ['short1'],
    ['1234']
  ])('should show error password to short when password is {%s}', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should have a length of 8')).toBeInTheDocument()
  })

  it.each([
    ['4 super valid password'],
    ['4 valid password'],
    ['passw0rd']
  ])('should validate a valid password when the password has the right length and has numbers {%s}', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(await passwordValidatorFormWrapper.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(await passwordValidatorFormWrapper.queryByText('The password should have a length of 8')).not.toBeInTheDocument()
  })

  it.each([
    ['4 super valid password']
  ])('should validate a valid password when the password has the right length and has numbers {%s} and added to the password listing', async (password: string) => {
    await userEvent.keyboard(password)
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))
    expect(await passwordValidatorFormWrapper.queryByText(password)).toBeInTheDocument()
  })
})
