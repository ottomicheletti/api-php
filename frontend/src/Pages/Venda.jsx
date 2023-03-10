/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import request from '../Helpers/request';
import { useStore } from '../Store/Store';
import { v4 as uuidv4 } from 'uuid';
import './Venda.css';

function Venda() {
  const { produtos, setProdutos, venda, setVenda, setTotal } = useStore((state) => state);

  // const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    request('produtos', 'GET').then((response) => setProdutos(response));
  }, []);

  useEffect(() => {
    setTotal();
  }, [venda.produto, venda.quantidade]);

  return (
    <Layout>
      <div id='venda'>
        <div className='stack'>
          <div className='input-default'>
            <div>Produto</div>
            <select name='produto' onChange={(e) => setVenda(e)} defaultValue='DEFAULT'>
              <option value='DEFAULT' disabled hidden>
                Escolha um produto
              </option>
              {produtos.map((produto) => (
                <option value={produto.codigo} key={uuidv4()}>
                  {`${('00' + produto.codigo).slice(-2)} - ${produto.nome}`}
                </option>
              ))}
            </select>
          </div>
          <div className='input-default'>
            <div>Quantidade</div>
            <input
              type='number'
              name='quantidade'
              min='0'
              value={venda.quantidade}
              onChange={(e) => setVenda(e)}
            />
          </div>
        </div>
        <div id='divider'></div>
        <div className='stack'></div>
      </div>
    </Layout>
  );
}

export default Venda;
