import { describe, test, expect, vitest } from 'vitest';
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = vitest.fn();
vitest.mock('react-router', () => ({
    ...vitest.importActual('react-router'), 
    useNavigate: () => mockNavigate
}));

describe('Testes da tela visitante', () => {
    test('1º - procurar o botão de login', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('2º - verifica se o botão leva pra tela de login', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        const btnLogin = screen.getByText('Login');
        console.log("TESTE", vitest.mocked().useNavigate());
        // const navegou = vitest.spyOn(navigateMock, 'useNavigate');
        fireEvent.click(btnLogin);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});