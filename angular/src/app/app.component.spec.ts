import {render, screen } from '@testing-library/angular'
import {AppComponent} from './app.component'

describe('Counter', () => {
  test('should render counter', async () => {
    await render(AppComponent, {})

    expect(screen.getByText('Here are some links to help you get started:')).toBeInTheDocument()
  })
})
