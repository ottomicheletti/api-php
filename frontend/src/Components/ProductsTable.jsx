/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { messageStore } from '../Store/Message';
import { productsStore } from '../Store/Products';
import { Trash, Pencil, CheckFat } from '@phosphor-icons/react';
import './Tables.css';

function ProductsTable() {
  const { products, fetchProducts, edit, setOnEdit, confirmOnEdit } = productsStore(
    (state) => state
  );
  const { setMessage } = messageStore((state) => state);

  const editProduct = (index) => {
    setOnEdit(index, true);
  };

  const acceptEdit = (index) => {
    confirmOnEdit(index, false);
    // logica
    setMessage({ text: 'Produto editado!', type: 'ok' });
  };

  const removeProduct = (code) => {
    // removeFromCart(produto);
    setMessage({ text: 'Produto excluído!', type: 'ok' });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <table>
      <thead>
        <tr className='table-divider'>
          <th>Produto</th>
          <th>Valor (un)</th>
          <th>Tipo</th>
          <th>Categoria</th>
          <th>% de Imposto</th>
        </tr>
        <tr>
          <th colSpan={5}>
            <hr />
          </th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map(
            ({ codigo, nome, valor, tipo, categoria, percentual_imposto }, index) => (
              <tr key={uuidv4()} className='table-data'>
                <th>{`${('00' + codigo).slice(-2)} - ${nome}`}</th>
                <th>
                  {valor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </th>
                <th>{tipo}</th>
                <th>{categoria}</th>
                <th>
                  <div className='row-total'>
                    {(percentual_imposto / 100).toLocaleString('pt-BR', {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {edit[index] ? (
                      <CheckFat
                        size={20}
                        className='check'
                        onClick={() => acceptEdit(index)}
                      />
                    ) : (
                      <Pencil
                        size={20}
                        className='pencil'
                        onClick={() => editProduct(index)}
                      />
                    )}
                    <Trash
                      size={20}
                      className='trash'
                      onClick={() => removeProduct(index)}
                    />
                  </div>
                </th>
              </tr>
            )
          )}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={5}>
            <hr />
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductsTable;
