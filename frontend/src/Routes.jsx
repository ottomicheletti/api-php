import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Routes() {
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/'>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="venda" element={<Venda />} /> */}
        {/* <Route path="produtos" element={<Produtos />} /> */}
        {/* <Route path="tipos_produtos" element={<TipoProdutos />} /> */}
        {/* <Route path="relatorio" element={<Relatorio />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default Routes;
