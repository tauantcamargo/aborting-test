import loadable from '@loadable/component';
import {
  BrowserRouter, Navigate, Route, Routes
} from 'react-router-dom';

const LoadableTodos = loadable(() => import('./pages/todos'), {
  fallback: <h1>Fallback Loading</h1>
})

export default function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/todos' element={<LoadableTodos />} />
        <Route path="/" element={<Navigate to="/todos" />} />
      </Routes>
    </BrowserRouter>
  )
}
