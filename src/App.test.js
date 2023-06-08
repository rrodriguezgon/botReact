import { render, screen } from '@testing-library/react';
import App from './App';

test('renders component Navbar', () => {
  render(<App />);
  const linkElement = screen.getByText('BOT MARCADOR');
  expect(linkElement).toBeInTheDocument();
});

test('renders component Routes', () => {
	render(<App />);
	const linkElement = screen.getByText('HOME');
	expect(linkElement).toBeInTheDocument();
  });
