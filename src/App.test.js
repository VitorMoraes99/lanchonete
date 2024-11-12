import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Home link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeLink = screen.getByText(/home/i);
  expect(homeLink).toBeInTheDocument();
});

test('renders Cadastro de Lanches link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const cadastroLink = screen.getByText(/cadastro de lanches/i);
  expect(cadastroLink).toBeInTheDocument();
});

test('renders Consulta link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const consultaLink = screen.getByText(/consulta/i);
  expect(consultaLink).toBeInTheDocument();
});

test('renders Contato link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const contatoLink = screen.getByText(/contato/i);
  expect(contatoLink).toBeInTheDocument();
});
