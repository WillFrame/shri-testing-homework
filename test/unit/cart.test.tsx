import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {Cart} from "../../src/client/pages/Cart";

describe('Корзина', function () {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();

    const store = initStore(api, cart);

    it('Отображаются добавленные товары', async () => {

        const product1 = {
            id: 0,
            name: 'product',
            color: 'blue',
            price: 100,
            description: 'Описание',
            material: 'Бетон'
        };

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product1}/>
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Add to Cart'));

        const product2 = {
            id: 1,
            name: 'secondProduct',
            color: 'red',
            price: 150,
            description: 'Описание',
            material: 'Кирпич'
        };

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product2}/>
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.queryAllByText('Add to Cart')[1]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart/>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByRole('table')).toBeInTheDocument();

        expect(screen.getByRole('cell', {name: 'product'})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name: 'secondProduct'})).toBeInTheDocument();
    });

    it('При очищении корзины товары удалюятся и есть ссылка на каталог', async () => {
        const product1 = {
            id: 0,
            name: 'product',
            color: 'blue',
            price: 100,
            description: 'Описание',
            material: 'Бетон',
        };

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product1}/>
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Add to Cart'));

        const product2 = {
            id: 1,
            name: 'secondProduct',
            color: 'red',
            price: 150,
            description: 'Описание',
            material: 'Кирпич',
        };

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductDetails product={product2}/>
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.queryAllByText('Add to Cart')[1]);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart />
                </BrowserRouter>
            </Provider>
        );

        const clearButton = screen.getByText('Clear shopping cart');
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.queryByRole('table')).not.toBeInTheDocument();
            expect(screen.getByRole('link', {name: 'catalog'})).toBeInTheDocument();
            expect(screen.getByText(/Cart is empty\. Please select products in the \./i)).toBeInTheDocument();
        });
    });
});