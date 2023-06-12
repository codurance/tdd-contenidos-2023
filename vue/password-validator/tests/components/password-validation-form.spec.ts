import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'

describe('Password validator form', () => {
  it('should have a button and an input', () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    expect(getByPlaceholderText('Introduce tu contraseña')).toBeInTheDocument()
    expect(getByText('Enviar consulta')).toBeInTheDocument()
  })
})
