import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'
import { render } from '@testing-library/vue'

describe('Password validator Form', () => {
  it('should have a button', () => {
    const { getByText } = render(PasswordValidatorForm)
    expect(getByText('Enviar consulta')).toBeInTheDocument()
  })
})
