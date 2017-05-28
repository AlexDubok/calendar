import 'babel-polyfill';
import React            from 'react';
import ReactDOM         from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App              from './containers/App.jsx';
import configureStore from './store/configureStore';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            // Registration was successful

            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        } catch (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }
    });
}

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
            <App />
        </AppContainer>
    </Provider>,
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./containers/App.jsx', () => {
        const NextApp = require('./containers/App.jsx').default;

        ReactDOM.render(
            <Provider store={store}>
                <AppContainer>
                    <NextApp />
                </AppContainer>
            </Provider>,
            document.getElementById('root')
        );
    });
}
