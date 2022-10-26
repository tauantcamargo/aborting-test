import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoProvider from './providers/todoProvider';
import TodosProvider from './providers/todosProvider';
import reportWebVitals from './reportWebVitals';
import MainRoute from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodosProvider>
    <TodoProvider>
      <MainRoute />
    </TodoProvider>
  </TodosProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
