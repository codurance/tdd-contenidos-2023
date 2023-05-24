import {queryByText, render} from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
  it('should show proper error with too short password', async () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard('short1')
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8'))
  })

  it.each([
    ['password'],
    ['invalidpassword']
  ])('should show proper error when password is {%s}', async (password:string) => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard(password)
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should contain numbers'))
  })

  it('should show both errors when there is no password', async () => {
    const { getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8'))
    expect(getByText('The password should contain numbers'))
  })

  it('should not show errors when the password is valid', async () => {
    const { getByPlaceholderText, queryByText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByPlaceholderText('Introduce tu contraseña'))
    await userEvent.keyboard('passw0rd')

    await userEvent.click(getByText('Enviar consulta'))

    expect(await queryByText('The password should have length of 8')).not.toBeInTheDocument()
    expect(await queryByText('The password should contain numbers')).not.toBeInTheDocument()
  })

  it('should not repeat error messages', async () => {
    const { queryByText, getByText } = render(PasswordValidatorForm)

    await userEvent.click(getByText('Enviar consulta'))
    await userEvent.click(getByText('Enviar consulta'))

    expect(getByText('The password should have length of 8')).toBeInTheDocument()
    expect(getByText('The password should contain numbers')).toBeInTheDocument()
  })
})
