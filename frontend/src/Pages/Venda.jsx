/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../Components/Layout';
import Table from './../Components/Table';

import { useStore } from '../Store/Store';
import './Venda.css';

function Venda() {
  const {
    products,
    cart,
    sale,
    fetchProducts,
    insertOnCart,
    updateCartItem,
    updateTotal,
    setMessage,
    setSale,
    clearSale,
  } = useStore((state) => state);

  const handleClick = (name) => {
    if (sale.total === null || sale.total > 0) {
      switch (name) {
        case 'incluir':
          const idx = [...cart].findIndex((c) => c.produto === sale.produto);
          if (idx === -1) {
            insertOnCart();
            setMessage({ text: 'Produto incluído com sucesso!', type: 'success' });
          } else {
            updateCartItem(sale.produto, sale.quantidade, sale.total);
            setMessage({ text: 'O produto foi atualizado!', type: 'success' });
          }
          clearSale();
          break;
        case 'concluir':
          // implementar esse case
          break;
        default:
          break;
      }
    } else {
      setMessage({ text: 'Verifique seus inputs.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    updateTotal();
  }, [sale.produto, sale.quantidade]);

  return (
    <Layout>
      <div id='venda'>
        <div className='display-block'>
          <div className='input-default'>
            <div>Produto</div>
            <select name='produto' onChange={setSale} value={sale.produto}>
              {products.map((product) => (
                <option value={product.codigo} key={uuidv4()}>
                  {`${('00' + product.codigo).slice(-2)} - ${product.nome}`}
                </option>
              ))}
            </select>
          </div>
          <div className='display-column'>
            <div className='input-default'>
              <div>Quantidade</div>
              <input
                type='number'
                name='quantidade'
                min='0'
                value={sale.quantidade}
                onChange={setSale}
              />
            </div>
            <div className='input-default'>
              <div>Valor (un)</div>
              <div>
                {sale.produto
                  ? products[sale.produto - 1]?.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 0}
              </div>
            </div>
            <div className='input-default'>
              <div>Total</div>
              <div>
                {sale?.total
                  ? sale.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 0}
              </div>
            </div>
          </div>
          <button
            className='button-default'
            name='incluir'
            onClick={({ target: { name } }) => handleClick(name)}
          >
            Incluir
          </button>
        </div>
        <hr id='divider' />
        <div className='display-block'>
          <Table />
          {/* Implementar botão Concluir Venda */}
        </div>
      </div>
    </Layout>
  );
}

export default Venda;
