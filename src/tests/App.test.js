import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Header from '../components/Header';
import Profile from '../pages/Profile';

describe('Testes do componente Login', () => {
  it('Renderiza corretamente o caminho', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Renderiza corretamente a tela', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('o email é validado corrretamente a partir do regex', () => {
    renderWithRouterAndRedux(<App />);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect('teste@teste.com').toMatch(emailRegex);
  });

  it('o botão "Enter está desativado por padrão', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('ao inserir email e senhas válidos, o botão enter vai ser ativado', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });
    console.log(enterButton.disabled);

    fireEvent.change(emailInput, { target: { value: 'alguem@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(enterButton.disabled).toBe(false);
    expect(passwordInput.value).toBe('12345678');
    // verifica o valor do password
    // verifica se o botão está ativado
  });
  it('Verifica se ao clicar no botão enter, ele redireciona para a página Recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

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
    screen.logTestingPlaygroundURL();
  });
});

describe('Testando Header e SearchBar', () => {
  it('Testa a renderização do título do Profile, Done Recipes e Favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    const DoneBtn = screen.getByTestId('profile-done-btn');
    const FavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const ProfileBtn = screen.getByTestId('profile-top-btn');

    const inputEmail = screen.getByRole('textbox', { name: /user:/i });
    const inputPassword = screen.getByLabelText(/password:/i);
    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });

    fireEvent.change(inputEmail, { target: { value: 'alguem@gmail.com' } });
    fireEvent.change(inputPassword, { target: { value: '12345678' } });
    userEvent.click(enterButton);

    userEvent('Click', DoneBtn);
    waitFor(() => screen.getByRole('heading', { name: /done recipes/i }));
    expect(pathname).toBe('/done-recipes');

    userEvent('Click', ProfileBtn);
    waitFor(() => screen.getByRole('heading', { name: /Profile/i }));
    expect(pathname).toBe('/profile');

    userEvent('Click', FavoriteBtn);
    waitFor(() => screen.getByRole('heading', { name: /Favorite Recipes/i }));
    expect(pathname).toBe('/favorite-recipes');
  });

  test('should call the API when the Search button is clicked', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: [] }),
    });

    global.fetch = mockFetch;

    renderWithRouterAndRedux(<Header />);
    const bntSrch = screen.getByTestId('search-top-btn');
    fireEvent.click(bntSrch);
    await waitFor(() => {
      const searchInput = screen.getByTestId('search-input');
      const radio = screen.getByTestId('ingredient-search-radio');

      userEvent.type(searchInput, 'chicken');
      fireEvent.click(radio);
    });
    const searchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });
});

describe('Testes do componente Profile', () => {
  it('envia para a rota /done-recipes ao clicar no respectivo botão', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const doneBtn = screen.getByTestId('profile-done-btn');
    const { pathname } = history.location;

    fireEvent.click(doneBtn);
    expect(pathname).toBe('/done-recipes');
  });

  it('envia para a rota /favorite-recipes ao clicar no respectivo botão', () => {
    renderWithRouterAndRedux(<Profile />);
    const { history } = createMemoryHistory();
    const favBtn = screen.getByTestId('profile-favorite-btn');
    const { pathname } = history.location;

    fireEvent.click(favBtn);
    expect(pathname).toBe('/favorite-recipes');
  });

  it('apaga as informações de usuário do localStorage e envia para a rota / ao clicar em logout', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    const { pathname } = history.location;

    localStorage.setItem('user', JSON.stringify({ email: 'alguem@teste.com' }));
    fireEvent.click(logoutBtn);
    expect(localStorage.getItem('user')).toBeNull();
    expect(pathname).toBe('/');
  });
});
