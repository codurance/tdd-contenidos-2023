import { render } from '@testing-library/vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'

describe('Password validator form', () => {
  it('should have a button and an input', () => {
    const { getByPlaceholderText, getByText } = render(PasswordValidatorForm)

    expect(getByText('Envíar consulta')).toBeInTheDocument()
    expect(getByPlaceholderText('Introduce tú contraseña')).toBeInTheDocument()
  })
})
