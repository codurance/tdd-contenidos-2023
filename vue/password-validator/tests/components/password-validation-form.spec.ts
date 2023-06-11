import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import userEvent from '@testing-library/user-event'

describe('Password validator form', () => {
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
