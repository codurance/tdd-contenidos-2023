import { render } from '@testing-library/vue'
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
})
