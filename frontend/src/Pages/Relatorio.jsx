/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Layout from '../Components/Layout';
import { reportStore } from './../Store/Report';
import request from '../Helpers/request';
import './Relatorio.css';

function Relatorio() {
  //TODO  INNER JOIN chaves: pedido.codigo = produtos_pedido.pedido
  //TODO  Melhorar formatação do PDF.

  const { report, orders, setReport, setOrders } = reportStore((state) => state);

  const generateReport = (data, filename) => {
    const doc = new jsPDF();
    const head = Object.keys(data[0]).map((title) =>
      (title.charAt(0).toUpperCase() + title.slice(1)).replace(/[^A-Z0-9]+/gi, ' ')
    );
    const body = data.map((d) => Object.values(d));

    autoTable(doc, {
      head: [head],
      body,
    });

    doc.save(`relatorio${filename}.pdf`);
  };

  const handleGenerate = () => {
    switch (report.tipo) {
      case 'tipos':
        request('tipos_produto', 'GET').then((data) =>
          generateReport(data, '_tipos_produto')
        );
        break;
      case 'pedidos':
        if (report.qual !== 0) {
          request(`pedidos/${report.qual}`, 'GET').then((data) =>
            generateReport(data, `_pedidos_${report.qual}`)
          );
        } else {
          request('pedidos', 'GET').then((data) => generateReport(data, '_pedidos'));
        }
        break;
      default:
        request('produtos', 'GET').then((data) => generateReport(data, '_produtos'));
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
            onClick={() => handleGenerate()}
          >
            Gerar Relatório
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Relatorio;
