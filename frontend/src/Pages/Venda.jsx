/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Layout from '../Components/Layout';
import request from '../Helpers/request';
import { useStore } from '../Store/Store';
import { v4 as uuidv4 } from 'uuid';
import './Venda.css';

function Venda() {
  const {
    produtos,
    // carrinho,
    venda,
    setProdutos,
    setTotal,
    setCarrinho,
    setMessage,
    clearVenda,
    handleChange,
  } = useStore((state) => state);

  const handleClick = (name) => {
    if (venda.total === null || venda.total > 0) {
      switch (name) {
        case 'incluir':
          setCarrinho();
          setMessage({ text: 'Produto incluído com sucesso!', type: 'success' });
          clearVenda();
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
    request('produtos', 'GET').then((response) => setProdutos(response));
  }, []);

  useEffect(() => {
    setTotal();
  }, [venda.produto, venda.quantidade]);

  return (
    <Layout>
      <div id='venda'>
        <div className='display-block'>
          <div className='input-default'>
            <div>Produto</div>
            <select
              name='produto'
              id='produto'
              onChange={handleChange}
              value={venda.produto}
            >
              {produtos.map((produto) => (
                <option value={produto.codigo} key={uuidv4()}>
                  {`${('00' + produto.codigo).slice(-2)} - ${produto.nome}`}
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
                value={venda.quantidade}
                onChange={handleChange}
              />
            </div>
            <div className='input-default'>
              <div>Valor (un)</div>
              <div>{`R$${venda.produto ? produtos[venda.produto - 1]?.valor : 0}`}</div>
            </div>
            <div className='input-default'>
              <div>Total</div>
              <div>{`R$${venda?.total ? venda.total : 0}`}</div>
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
        <div id='divider'></div>
        <div className='stack'></div>
      </div>
    </Layout>
  );
}

export default Venda;
