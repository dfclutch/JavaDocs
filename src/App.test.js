import { render, screen } from '@testing-library/react';
import App from './App';

test('renders javadocs text', () => {
  render(<App />);
  const text = screen.getByText(/javadocs/i);
  expect(text).toBeInTheDocument();
});
