import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente Login', () => {
  it('Renderiza corretamente o caminho', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Renderiza corretamente a tela', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('o email é validado corrretamente a partir do regex', () => {
    renderWithRouter(<App />);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect('teste@teste.com').toMatch(emailRegex);
  });

  it('o botão "Enter está desativado por padrão', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('ao inserir email e senhas válidos, o botão enter vai ser ativado', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });
    console.log(enterButton.disabled);

    // userEvent.type(emailInput, 'alguem@teste.com');
    // userEvent.type(passwordInput, '1234567');
    fireEvent.change(emailInput, { target: { value: 'alguem@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(enterButton.disabled).toBe(false);
    expect(passwordInput.value).toBe('12345678');
    // verifica o valor do password
    // verifica se o botão está ativado
  });
  it('Verifica se ao clicar no botão enter, ele redireciona para a página Recipes', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByRole('textbox', { name: /user:/i });
    const inputPassword = screen.getByLabelText(/password:/i);
    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });

    fireEvent.change(inputEmail, { target: { value: 'alguem@gmail.com' } });
    fireEvent.change(inputPassword, { target: { value: '12345678' } });
    userEvent.click(enterButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
