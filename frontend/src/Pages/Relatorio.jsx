/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Layout from '../Components/Layout';
import { reportStore } from './../Store/Report';
import './Relatorio.css';

function Relatorio() {
  //TODO  INNER JOIN chaves: pedido.codigo = produtos_pedido.pedido

  const { report, orders, data, setReport, setOrders, fetchData } = reportStore(
    (state) => state
  );

  const generateReport = async () => {
    switch (report.tipo) {
      case 'tipos':
        console.log('Gerando relatório de tipos de produtos');

        await fetchData('tipos_produto');

        break;
      case 'pedidos':
        console.log('Gerando relatório de pedido(s)');

        if (report.qual !== 0) {
          await fetchData(`pedidos/${report.qual}`);
        } else {
          await fetchData('pedidos');
        }

        break;
      default:
        console.log('Gerando relatório de produtos');

        await fetchData('produtos');

        break;
    }
  };

  useEffect(() => {
    setOrders();
  }, []);

  return (
    <Layout>
      <div id='report'>
        <div id='inputs-container'>
          <div className='input-default'>
            <div>Tipo de relatório</div>
            <select name='tipo' onChange={setReport} value={report.tipo}>
              <option value='produtos'>Produtos</option>
              <option value='tipos'>Tipos de Produtos</option>
              <option value='pedidos'>Pedido(s)</option>
            </select>
          </div>
          {report.tipo === 'pedidos' && (
            <div className='input-default'>
              <div>Pedido(s)</div>
              <select name='qual' onChange={setReport} value={report.qual}>
                <option value='0'>Todos</option>
                {orders.map((order) => (
                  <option value={order.codigo} key={order.codigo}>
                    {('00' + order.codigo).slice(-2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            className='button-default'
            name='incluir'
            onClick={() => generateReport()}
          >
            Gerar Relatório
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Relatorio;
