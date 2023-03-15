/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../Components/Layout';
import { reportStore } from './../Store/Report';
import request from '../Helpers/request';
import './Relatorio.css';

function Relatorio() {
  const { report, orders, setReport, setOrders } = reportStore((state) => state);

  const generateReport = (data, filename, code = '') => {
    //TODO  Melhorar formatação do PDF.
    const doc = new jsPDF();
    const head = Object.keys(data[0]).map((title) =>
      (title.charAt(0).toUpperCase() + title.slice(1)).replace(/[^A-Z0-9]+/gi, ' ')
    );
    const body = data.map((d) => Object.values(d));

    switch (filename) {
      case 'pedidos':
        head[2] = 'Código';
        body.forEach((arr) => {
          arr[0] = ('00' + arr[0]).slice(-2); // CODIGO PEDIDO
          arr[2] = ('00' + arr[2]).slice(-2); // CODIGO PRODUTO
          arr[3] = arr[3].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // VALOR PRODUTO
          arr[5] = arr[5].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // TOTAL PRODUTO
          arr[6] = arr[6].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // IMPOSTO PRODUTO
          const [year, month, day] = arr[7].slice(0, -9).split('-');
          arr[7] = new Date(year, month - 1, day).toLocaleDateString(); // DATA
        });
        break;
      case 'produtos':
        head[0] = 'Código';
        head[3] = 'Alíquota de Imposto';
        body.forEach((arr) => {
          arr[0] = ('00' + arr[0]).slice(-2); // CODIGO PRODUTO
          arr[2] = arr[2].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // VALOR PRODUTO
          arr[3] = (arr[3] / 100).toLocaleString('pt-BR', { style: 'percent' }); // ALIQUOTA
        });
        break;
      case 'tipos_produto':
        head[0] = 'Código';
        head[2] = 'Alíquota de Imposto';
        body.forEach((arr) => {
          arr[0] = ('00' + arr[0]).slice(-2); // CODIGO TIPO
          arr[2] = (arr[2] / 100).toLocaleString('pt-BR', { style: 'percent' }); // ALIQUOTA
        });
        break;
      default:
        break;
    }

    autoTable(doc, {
      head: [head],
      body,
    });

    doc.save(`relatorio_${filename}${code}.pdf`);
  };

  const handleGenerate = () => {
    switch (report.tipo) {
      case 'tipos':
        request('tipos_produto', 'GET').then((data) =>
          generateReport(data, 'tipos_produto')
        );
        break;
      case 'pedidos':
        if (report.qual !== 0) {
          request(`pedidos/${report.qual}`, 'GET').then((data) =>
            generateReport(data, 'pedidos', `_${report.qual}`)
          );
        } else {
          request('pedidos', 'GET').then((data) => generateReport(data, 'pedidos'));
        }
        break;
      default:
        request('produtos', 'GET').then((data) => generateReport(data, 'produtos'));
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
                  <option value={order} key={uuidv4()}>
                    {('00' + order).slice(-2)}
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
