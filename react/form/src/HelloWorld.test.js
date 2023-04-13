import { render, screen } from '@testing-library/react';
import { HelloWorld } from './HelloWorld';

describe('Dummy test', () => { 

  it('Should render text hello world', async () => {
      render(<HelloWorld />);

      const helloWorldElement = screen.getByText('hello world');

      expect(helloWorldElement).toBeInTheDocument();
  })
});

