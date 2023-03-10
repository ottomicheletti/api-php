import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Vendas from './Pages/Vendas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to='vendas'/>} />
          <Route path='vendas' element={<Vendas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
