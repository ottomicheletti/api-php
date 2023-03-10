import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Produtos from './Pages/Produtos';
import Relatorio from './Pages/Relatorio';
import Tipos from './Pages/Tipos';
import Venda from './Pages/Venda';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to='venda'/>} />
          <Route path='venda' element={<Venda />} />
          <Route path='produtos' element={<Produtos />} />
          <Route path='tipos' element={<Tipos />} />
          <Route path='relatorio' element={<Relatorio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
