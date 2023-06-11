import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  it('should have a button and input to validate the password', () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)
    expect(getByPlaceholderText('Introduce tu contraseña')).toBeInTheDocument()
    expect(getByText('Enviar consulta')).toBeInTheDocument()
  })

  it('should show the error of short password when the password is {short1}', async () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard('short1')
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
  })

  it('should show the error of short password when the password is {p4ss} only when password is validated', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(PasswordValidatorForm)
    expect(await queryByText('The password should have length of 8')).not.toBeInTheDocument()

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard('p4ss')
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
  })

  it.each([
    ['shor1'],
    ['p4ass']
  ])('should show the error of short password when the password is {%s} only when password is validated', async (shortPasswordWithNumbers: string) => {
    const { getByPlaceholderText, getByText, queryByText } = render(PasswordValidatorForm)
    expect(await queryByText('The password should have length of 8')).not.toBeInTheDocument()

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard(shortPasswordWithNumbers)
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
  })
})
