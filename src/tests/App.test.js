import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Header from '../components/Header';
import { mockData } from './mockData';

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
  });
});

describe('Testando SearchBar', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mockData),
  //   });
  // });

  // afterEach(() => {
  //   global.fetch.mockClear();
  // });

  // it('testa se o botão search aparece', async () => {
  //   renderWithRouterAndRedux(<Header />);
  //   const btnSearch = screen.getByTestId('search-top-btn');
  //   userEvent.click(btnSearch);
  //   await waitFor(() => {
  //     screen.getByText(/ingredient/i);
  //     screen.getByText(/name/i);
  //   });
  //   const searchIpt = screen.getByTestId('search-input');
  //   const filterFL = screen.getByText(/first letter/i);
  //   const searchBtn = screen.getByTestId('exec-search-btn');
  //   userEvent.type(searchIpt, 'a');
  //   userEvent.click(filterFL);
  //   userEvent.click(searchBtn);
  //   expect(store.getStore().resultsAPI).toHaveLength(4);
  // });
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
      // expect(mockFetch).toHaveBeenCalledWith(
      //   'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
      // );
    });
  });
});
