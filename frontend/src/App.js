import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Venda from './Pages/Venda';

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<Navigate to='venda' />} />
        <Route path="venda" element={<Venda />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
