import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import store from '~/store';

import App from './App';

const app = document.querySelector('#app');

if (app) {
  render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>,
    app,
  );
}
