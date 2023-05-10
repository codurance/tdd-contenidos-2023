import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PasswordValidatorForm from '../PasswordValidatorForm.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(PasswordValidatorForm, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
