/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { messageStore } from '../Store/Message';
import { productsStore } from '../Store/Products';
import { Trash, Pencil, CheckFat } from '@phosphor-icons/react';
import request from '../Helpers/request';
import './Tables.css';

function ProductsTable() {
  const {
    products,
    edit,
    types,
    product,
    fetchProducts,
    setOnEdit,
    confirmOnEdit,
    setProduct,
    onEditProduct,
  } = productsStore((state) => state);
  const { setMessage } = messageStore((state) => state);

  const editProduct = (index) => {
    setProduct(index);
    setOnEdit(index, true);
  };

  const acceptEdit = async (index) => {
    confirmOnEdit(index, false);
    await request(`produtos/${product.codigo}`, 'PUT', {
      nome: product.nome,
      valor: product.valor,
      tipo: product.tipo,
    });
    fetchProducts();
    setMessage({ text: 'Produto editado!', type: 'ok' });
  };

  const removeProduct = async (code) => {
    await request(`produtos/${code}`, 'DELETE');
    fetchProducts();
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
          {/* <th>Tipo</th> */}
          <th>Categoria</th>
          <th>% de Imposto</th>
        </tr>
        <tr>
          <th colSpan={4}>
            <hr />
          </th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map(
            ({ codigo, nome, valor, tipo, categoria, percentual_imposto }, index) => (
              <tr key={codigo} className='table-data'>
                <th>
                  {`${('00' + codigo).slice(-2)} - `}
                  {edit[index] ? (
                    <input
                      type='text'
                      name='nome'
                      value={product.nome}
                      onChange={onEditProduct}
                    />
                  ) : (
                    <span>{nome}</span>
                  )}
                </th>
                <th>
                  {edit[index] ? (
                    <input
                      type='number'
                      name='valor'
                      value={parseFloat(product.valor)}
                      onChange={onEditProduct}
                    />
                  ) : (
                    <span>
                      {valor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  )}
                </th>
                {/* <th>{tipo}</th> */}
                <th>
                  {edit[index] ? (
                    <select name='tipo' onChange={onEditProduct} value={product.tipo}>
                      {types.map((type) => (
                        <option value={type.codigo} key={uuidv4()}>
                          {type.nome}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{categoria}</span>
                  )}
                </th>
                <th>
                  <div className='row-total'>
                    {edit[index] ? (
                      <span>
                        {(
                          types.find((type) => type.codigo === product.tipo)
                            ?.percentual_imposto / 100
                        ).toLocaleString('pt-BR', {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    ) : (
                      <span>
                        {(percentual_imposto / 100).toLocaleString('pt-BR', {
                          style: 'percent',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    )}
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
                      onClick={() => removeProduct(codigo)}
                    />
                  </div>
                </th>
              </tr>
            )
          )}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={4}>
            <hr />
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductsTable;
