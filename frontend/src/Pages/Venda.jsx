/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import request from '../Helpers/request';
import Layout from '../Components/Layout';
import SaleTable from '../Components/SaleTable';
import { saleStore } from '../Store/Sale';
import { messageStore } from '../Store/Message';
import './Venda.css';

function Venda() {
  const {
    products,
    cart,
    sale,
    taxes,
    fetchProducts,
    insertOnCart,
    updateCartItem,
    emptyCart,
    updateTotal,
    setSale,
    clearSale,
  } = saleStore((state) => state);

  const { setMessage } = messageStore((state) => state);

  const handleClick = async (name) => {
    switch (name) {
      case 'incluir':
        if (sale.total === null || sale.total > 0) {
          const idx = [...cart].findIndex((c) => c.produto === sale.produto);
          if (idx === -1) {
            insertOnCart();
            setMessage({ text: 'Produto incluído com sucesso!', type: 'ok' });
          } else {
            updateCartItem(sale.produto, sale.quantidade, sale.total);
            setMessage({ text: 'O produto foi atualizado!', type: 'ok' });
          }
          clearSale();
        } else {
          setMessage({ text: 'Verifique seus inputs.', type: 'fail' });
        }
        break;
      case 'concluir':
        if (cart.length > 0) {
          const total = parseFloat(
            cart.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)
          );
          const pedido = await request('pedidos', 'POST', { total, imposto: taxes });
          cart.forEach(async (item) => {
            await request('produtos_pedido', 'POST', { pedido, ...item });
          });
          emptyCart();
          setMessage({ text: 'Venda concluída!', type: 'ok' });
        } else {
          setMessage({ text: 'Não há produtos em venda.', type: 'fail' });
        }
        break;
      default:
        setMessage({ text: 'Verifique seus inputs.', type: 'fail' });
        break;
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
                <option value={product.codigo} key={product.codigo}>
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
                  ? products[
                      products.findIndex((product) => product.codigo === sale.produto)
                    ]?.valor.toLocaleString('pt-BR', {
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
          <SaleTable />
          <button
            className='button-default'
            name='concluir'
            onClick={({ target: { name } }) => handleClick(name)}
          >
            Concluir Venda
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Venda;
