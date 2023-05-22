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

  it('should have a button', () => {
    expect(passwordValidatorFormWrapper.getByText('Enviar consulta')).toBeInTheDocument()
  })

  it('should validate a too short password', async () => {
    await userEvent.keyboard('short1')
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should have a length of 8')).toBeInTheDocument()
  })

  it('should validate a password lacking numbers', async () => {
    await userEvent.keyboard('abcdefghi')
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should contain numbers')).toBeInTheDocument()
  })

  it('should validate a too short password with no numbers', async () => {
    await userEvent.keyboard(' ')
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(passwordValidatorFormWrapper.getByText('The password should contain numbers')).toBeInTheDocument()
    expect(passwordValidatorFormWrapper.getByText('The password should have a length of 8')).toBeInTheDocument()
  })

  it('should validate a too short password with no numbers', async () => {
    await userEvent.keyboard('4 super valid password')
    await userEvent.click(passwordValidatorFormWrapper.getByText('Enviar consulta'))

    expect(await passwordValidatorFormWrapper.queryByText('The password should contain numbers')).not.toBeInTheDocument()
    expect(await passwordValidatorFormWrapper.queryByText('The password should have a length of 8')).not.toBeInTheDocument()
  })
})
