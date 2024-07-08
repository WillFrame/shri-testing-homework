import React from 'react';
import { render, screen } from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import {Application} from "../../src/client/Application";
import {BrowserRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";

describe('Header', () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const getLinkByName = (name: string) => screen.getByRole('link', {name});

    it('Есть все ссылки в меню', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Application/>
                </BrowserRouter>
            </Provider>
        );

        expect(getLinkByName('Catalog')).toBeInTheDocument();
        expect(getLinkByName('Delivery')).toBeInTheDocument();
        expect(getLinkByName('Cart')).toBeInTheDocument();
        expect(getLinkByName('Contacts')).toBeInTheDocument();
        expect(getLinkByName('Kogtetochka store')).toBeInTheDocument();
    });

    it('Есть корзина с количеством', () => {
        const mock = {
            cart: [
                {name: 'Product', price: 100, count: 1},
                {name: 'ProductSecond', price: 200, count: 1},
            ],
        };

        cart.setState(mock.cart);
        const store = initStore(api, cart);

        const count = mock.cart.length; // 2;

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Application/>
                </BrowserRouter>
            </Provider>
        );

        expect(getLinkByName(`Cart (${count})`)).toBeInTheDocument();
    });
});