import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saleStore } from '../Store/Sale';
import { messageStore } from '../Store/Message';
import { Trash } from '@phosphor-icons/react';
import './Tables.css';

function SaleTable() {
  const { cart, products, removeFromCart, calculateTaxes, taxes } = saleStore(
    (state) => state
  );

  const { setMessage } = messageStore((state) => state);

  const removeItem = (produto) => {
    removeFromCart(produto);
    setMessage({ text: 'Produto excluído da venda.', type: 'ok' });
  };

  useEffect(() => {
    calculateTaxes();
  }, [calculateTaxes, cart]);

  return (
    <table>
      <thead>
        <tr className='table-divider'>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Valor (un)</th>
          <th>Total</th>
        </tr>
        <tr>
          <th colSpan={4}>
            <hr />
          </th>
        </tr>
      </thead>
      <tbody>
        {cart.map(({ produto, quantidade, total }) => (
          <tr key={uuidv4()} className='table-data'>
            <th>{`${('00' + produto).slice(-2)} - ${
              products[products.findIndex((product) => product.codigo === produto)].nome
            }`}</th>
            <th>{quantidade}</th>
            <th>
              {products[
                products.findIndex((product) => product.codigo === produto)
              ].valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </th>
            <th>
              <div className='row-total'>
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                <Trash size={20} className='trash' onClick={() => removeItem(produto)} />
              </div>
            </th>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={4}>
            <hr />
          </th>
        </tr>
        <tr>
          <th colSpan={3}>Imposto Estimado</th>
          <th>
            {taxes.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default SaleTable;
