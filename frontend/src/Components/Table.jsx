import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../Store/Store';
import { Trash } from '@phosphor-icons/react';
import './Table.css';

function Table() {
  const { cart, products, removeFromCart } = useStore((state) => state);

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
            <th>{`${('00' + produto).slice(-2)} - ${products[produto - 1].nome}`}</th>
            <th>{quantidade}</th>
            <th>
              {products[produto - 1].valor.toLocaleString('pt-BR', {
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
                <Trash
                  size={20}
                  className='trash'
                  onClick={() => removeFromCart(produto)}
                />
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
            {cart
              .reduce(
                (acc, curr) =>
                  acc +
                  curr.total * (products[curr.produto - 1].percentual_imposto / 100),
                0
              )
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
