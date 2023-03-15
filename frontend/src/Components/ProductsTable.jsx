/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { messageStore } from '../Store/Message';
import { productsStore } from '../Store/Products';
import {
  Trash,
  Pencil,
  CheckFat,
  PlusCircle,
  XCircle,
  CheckCircle,
} from '@phosphor-icons/react';
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

  const [enabled, setEnabled] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nome: '',
    valor: 0,
    tipo: 1,
  });

  const editProduct = (index) => {
    setProduct(index);
    setOnEdit(index, true);
  };

  const acceptEdit = async (index) => {
    if (!['', "'"].includes(product.nome) && product.valor > 0) {
      confirmOnEdit(index, false);
      await request(`produtos/${product.codigo}`, 'PUT', {
        nome: product.nome,
        valor: product.valor,
        tipo: product.tipo,
      });
      fetchProducts();
      setMessage({ text: 'Produto editado!', type: 'ok' });
    } else {
      setMessage({ text: 'Verifique seus inputs.', type: 'fail' });
    }
  };

  const removeProduct = async (code) => {
    try {
      await request(`produtos/${code}`, 'DELETE');
      fetchProducts();
      setMessage({ text: 'Produto excluído!', type: 'ok' });
    } catch {
      setMessage({ text: 'Existem pedidos com esse produto.', type: 'fail' });
    }
  };

  const insertNewProduct = async () => {
    if (!['', "'"].includes(newProduct.nome) && newProduct.valor > 0) {
      await request('produtos', 'POST', {
        nome: newProduct.nome,
        valor: newProduct.valor,
        tipo: newProduct.tipo,
      });
      setMessage({ text: 'Produto adicionado!', type: 'ok' });
      setEnabled(false);
      setNewProduct({
        nome: '',
        valor: 0,
        tipo: 1,
      });
      fetchProducts();
    } else {
      setMessage({ text: 'Verifique seus inputs.', type: 'fail' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div id='table'>
      <table>
        <thead>
          <tr className='table-divider'>
            <th>Produto</th>
            <th>Valor (un)</th>
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
              ({ codigo, nome, valor, categoria, percentual_imposto }, index) => (
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
                        value={parseFloat(product.valor) || 0}
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
          {enabled ? (
            <tr>
              <th>
                <input
                  type='text'
                  name='nome'
                  placeholder='Produto'
                  value={newProduct.nome}
                  onChange={({ target: { name, value } }) =>
                    setNewProduct({ ...newProduct, [name]: value })
                  }
                />
              </th>
              <th>
                <input
                  type='number'
                  name='valor'
                  value={newProduct.valor}
                  onChange={({ target: { name, value } }) =>
                    setNewProduct({ ...newProduct, [name]: value })
                  }
                />
              </th>
              <th>
                <select
                  name='tipo'
                  value={newProduct.tipo}
                  onChange={({ target: { name, value } }) =>
                    setNewProduct({ ...newProduct, [name]: value })
                  }
                >
                  {types.map((type) => (
                    <option value={type.codigo} key={uuidv4()}>
                      {type.nome}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
          ) : (
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          )}
        </tfoot>
      </table>
      {enabled ? (
        <div id='produto-buttons'>
          <div className='add-produto' onClick={() => insertNewProduct()}>
            <CheckCircle size={20} />
            <span>Confirmar</span>
          </div>
          <div className='add-produto close' onClick={() => setEnabled(false)}>
            <XCircle size={20} />
            <span>Cancelar</span>
          </div>
        </div>
      ) : (
        <div className='add-produto' onClick={() => setEnabled(true)}>
          <PlusCircle size={20} />
          <span>Novo Produto</span>
        </div>
      )}
    </div>
  );
}

export default ProductsTable;
