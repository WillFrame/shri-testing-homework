import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CartApi, ExampleApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { render, screen } from '@testing-library/react';
import { getByRole } from '@testing-library/dom';

it("Открываться страница Home", () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    render (
        <MemoryRouter basename={basename} initialEntries={[basename]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const header = screen.getByRole('heading', {name: /stability/i});
    expect(header.textContent).toBe("Stability");
});

it("Открываться страница Catalog", () => {
    const basename = "/hw/store";
    const currentPath = "/hw/store/catalog"
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    render (
        <MemoryRouter basename={basename} initialEntries={[currentPath]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const header = screen.getByRole('heading', {name: /catalog/i});
    expect(header.textContent).toBe("Catalog");
});

it("Открываться страница Delivery", () => {
    const basename = "/hw/store";
    const currentPath = "/hw/store/delivery"
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    render (
        <MemoryRouter basename={basename} initialEntries={[currentPath]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const header = screen.getByRole('heading', {name: /delivery/i});
    expect(header.textContent).toBe("Delivery");
});

it("Открываться страница Contacts", () => {
    const basename = "/hw/store";
    const currentPath = "/hw/store/contacts"
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    render (
        <MemoryRouter basename={basename} initialEntries={[currentPath]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const header = screen.getByRole('heading', {name: /contacts/i});
    expect(header.textContent).toBe("Contacts");
});

it("Открываться страница Cart", () => {
    const basename = "/hw/store";
    const currentPath = "/hw/store/cart"
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    render (
        <MemoryRouter basename={basename} initialEntries={[currentPath]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    const header = screen.getByRole('heading', {name: /cart/i});
    expect(header.textContent).toBe("Shopping cart");
});

it("Все ссылки работают", async () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const getLinkByName = (name: RegExp | string) => screen.getByRole('link', {name});

    render (
        <MemoryRouter basename={basename} initialEntries={[basename]} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    expect(getLinkByName(/catalog/i).getAttribute('href')).toBe("/hw/store/catalog");
    expect(getLinkByName(/cart/i).getAttribute('href')).toBe("/hw/store/cart");
    expect(getLinkByName(/delivery/i).getAttribute('href')).toBe("/hw/store/delivery");
    expect(getLinkByName(/contacts/i).getAttribute('href')).toBe("/hw/store/contacts");
});