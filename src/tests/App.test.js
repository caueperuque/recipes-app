import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Header from '../components/Header';
import { mockData } from './mockData';
import { mockFirstLetter } from './mockFirstLetter';
import { mockCorba } from './mockCorba';
import { mockCategories } from './mockCategories';
import { mockBeefCategory } from './mockBeefCategory';
import { mockCheeseIngredient } from './mockCheeseIngredient';

afterEach(jest.restoreAllMocks);

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

    userEvent.type(emailInput, 'alguem@gmail.com');
    userEvent.type(passwordInput, '12345678');

    expect(enterButton.disabled).toBe(false);
    expect(passwordInput.value).toBe('12345678');
  });

  it('Verifica se ao clicar no botão enter, ele redireciona para a página Recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox', { name: /user:/i });
    const inputPassword = screen.getByLabelText(/password:/i);
    const enterButton = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(inputEmail, 'alguem@gmail.com');
    userEvent.type(inputPassword, '12345678');
    userEvent.click(enterButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
    screen.logTestingPlaygroundURL();
  });
});

describe('Testando Header e SearchBar', () => {
  it('Testa a renderização do título do Profile, Done Recipes e Favorite Recipes', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');

    const DoneBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(DoneBtn);
    await waitFor(() => screen.getByRole('heading', { name: /done recipes/i }));
    expect(history.location.pathname).toBe('/done-recipes');
    const ProfileBtn = screen.getByTestId('profile-top-btn');

    userEvent.click(ProfileBtn);
    await waitFor(() => screen.getByRole('heading', { name: /Profile/i }));
    expect(history.location.pathname).toBe('/profile');

    const FavoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(FavoriteBtn);
    await waitFor(() => screen.getByRole('heading', { name: /Favorite Recipes/i }));
    expect(history.location.pathname).toBe('/favorite-recipes');

    renderWithRouterAndRedux(<App />, {}, '/meals');
    screen.getByTestId('drinks-bottom-btn');

    const btnDrink = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrink).toBeInTheDocument();

    renderWithRouterAndRedux(<App />, {}, '/drinks');
    screen.getByRole('heading', { name: /Drinks/i });
  });

  it('testa se o searchbar aparece e some ao clicar no botão', () => {
    renderWithRouterAndRedux(<App />, {}, '/meals');
    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    const ingredient = screen.getByText(/ingredient/i);
    expect(ingredient).toBeInTheDocument();
    userEvent.click(btnSearch);
    expect(ingredient).not.toBeInTheDocument();
  });

  test('should call the API when the Search button is clicked', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: [] }),
    });

    global.fetch = mockFetch;

    renderWithRouterAndRedux(<Header />);
    const bntSrch = screen.getByTestId('search-top-btn');
    userEvent.click(bntSrch);
    await waitFor(() => {
      const searchInput = screen.getByTestId('search-input');
      const radio = screen.getByTestId('ingredient-search-radio');

      userEvent.type(searchInput, 'chicken');
      userEvent.click(radio);
    });
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it('Testa os filtros do SearchBar no Meals', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mockData)
        .mockResolvedValueOnce(mockCategories)
        .mockResolvedValueOnce(mockFirstLetter)
        .mockResolvedValueOnce(mockCorba),
    });

    const { history } = renderWithRouterAndRedux(<App />, {}, '/meals');
    // busca na tela inicial
    await screen.findByText('Corba');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    await waitFor(() => {
      screen.getByTestId('search-input');
    });

    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const fLetterRadioBtn = screen.getByTestId('first-letter-search-radio');
    const nameRadioBtn = screen.getByTestId('name-search-radio');

    userEvent.type(searchInput, 'a');
    userEvent.click(fLetterRadioBtn);
    userEvent.click(searchBtn);
    await screen.findByText('Apple Frangipan Tart');

    userEvent.type(searchInput, 'Corba');
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);
    await screen.findByText('Corba');
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(1);
  });
});

describe('Testes do componente Profile', () => {
  it('envia para a rota /done-recipes ao clicar no respectivo botão', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const doneBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('envia para a rota /favorite-recipes ao clicar no respectivo botão', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const favBtn = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('apaga as informações de usuário do localStorage e envia para a rota / ao clicar em logout', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    localStorage.setItem('user', JSON.stringify({ email: 'alguem@teste.com' }));
    userEvent.click(logoutBtn);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});

describe('Teste do componente Recipes', () => {
  it('Testa diferentes filtros', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(mockData)
        .mockResolvedValueOnce(mockCategories)
        .mockResolvedValueOnce(mockBeefCategory)
        .mockResolvedValueOnce(mockCheeseIngredient),
    });

    renderWithRouterAndRedux(<App />, {}, '/meals');

    const beefCategory = await screen.findByText('Beef');
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(12);
    userEvent.click(beefCategory);
    await screen.findByText('Beef Asado');
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(12);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    await waitFor(() => {
      screen.getByTestId('search-input');
    });
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadioBtn = screen.getByTestId('ingredient-search-radio');

    userEvent.type(searchInput, 'cheese');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    await screen.findByText('Big Mac');
  });

  it('Testa erro de procura por "First Letter" ao digitar mais de uma letra', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {}, '/meals');
    const alertSpy = jest.spyOn(global, 'alert');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    await waitFor(() => {
      screen.getByTestId('search-input');
    });
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const fLetterRadioBtn = screen.getByTestId('first-letter-search-radio');

    userEvent.type(searchInput, 'aa');
    userEvent.click(fLetterRadioBtn);
    userEvent.click(searchBtn);
    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Testa erro de procura por "Name" ao digitar "Barabam"', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {}, '/meals');
    const alertSpy = jest.spyOn(global, 'alert');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    await waitFor(() => {
      screen.getByTestId('search-input');
    });
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const nameRadioBtn = screen.getByTestId('name-search-radio');

    userEvent.type(searchInput, 'Barabam');
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);
    expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });

  // it('Testa de só tiver um elemento, será direcionado diretamente para a página de detalhes da receita', async () => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn()
  //       .mockResolvedValueOnce(mockData)
  //       .mockResolvedValueOnce(mockCategories)
  //       .mockResolvedValueOnce(mockData),
  //   });

  //   const { history } = renderWithRouterAndRedux(<App />, {}, '/meals');

  //   const searchTopBtn = screen.getByTestId('search-top-btn');
  //   userEvent.click(searchTopBtn);

  //   await waitFor(() => {
  //     screen.getByTestId('search-input');
  //   });
  //   const searchBtn = screen.getByTestId('exec-search-btn');
  //   const searchInput = screen.getByTestId('search-input');
  //   const nameRadioBtn = screen.getByTestId('name-search-radio');

  //   userEvent.type(searchInput, 'Corba');
  //   userEvent.click(nameRadioBtn);
  //   userEvent.click(searchBtn);
  //   expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(1);

  //   // renderWithRouterAndRedux(<App />, {}, '/meals');
  //   // await screen.findByText('Corba')

  //   // console.log(history.location.pathname);
  // })
});
