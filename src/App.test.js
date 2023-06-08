import { render, screen } from '@testing-library/react';
import App from './App';

test('renders component Navbar', () => {
  render(<App />);
  const titleNavbarComponent = screen.getByText('BOT MARCADOR');
  expect(titleNavbarComponent).toBeInTheDocument();
});

test('renders component Routes', () => {
	render(<App />);
	const titleHomeComponent = screen.getByText('HOME');
	expect(titleHomeComponent).toBeInTheDocument();
  });

