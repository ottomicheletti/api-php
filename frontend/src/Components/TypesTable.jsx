/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { messageStore } from '../Store/Message';
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
import { typesStore } from '../Store/Types';

function TypesTable() {
  const { types, type, edit, fetchTypes, setOnEdit, confirmOnEdit, setType, onEditType } =
    typesStore((state) => state);
  const { setMessage } = messageStore((state) => state);

  const [enabled, setEnabled] = useState(false);
  const [newType, setNewType] = useState({
    nome: '',
    percentual: 0,
  });

  const editType = (index) => {
    setType(index);
    setOnEdit(index, true);
  };

  const acceptEdit = async (index) => {
    confirmOnEdit(index, false);
    await request(`tipos_produto/${type.codigo}`, 'PUT', {
      nome: type.nome,
      percentual_imposto: type.percentual_imposto,
    });
    fetchTypes();
    setMessage({ text: 'Tipo editado!', type: 'ok' });
  };

  const removeType = async (code) => {
    try {
      await request(`tipos_produto/${code}`, 'DELETE');
      setMessage({ text: 'Tipo excluído!', type: 'ok' });
    } catch {
      setMessage({ text: 'Ainda existem produtos com esse tipo.', type: 'fail' });
    }
    fetchTypes();
  };

  const insertNewType = async () => {
    if (newType.nome !== '' && newType.percentual > 0) {
      await request('tipos_produto', 'POST', {
        nome: newType.nome,
        percentual_imposto: newType.percentual,
      });
      setMessage({ text: 'Tipo adicionado!', type: 'ok' });
      setEnabled(false);
      setNewType({
        nome: '',
        percentual: 0,
      });
      fetchTypes();
    } else {
      setMessage({ text: 'Verifique seus inputs.', type: 'fail' });
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div id='table'>
      <table>
        <thead>
          <tr className='table-divider'>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>% de Imposto</th>
          </tr>
          <tr>
            <th colSpan={3}>
              <hr />
            </th>
          </tr>
        </thead>
        <tbody>
          {types &&
            types.map(({ codigo, nome, percentual_imposto }, index) => (
              <tr key={uuidv4()} className='table-data'>
                <th>{('00' + codigo).slice(-2)}</th>
                <th>
                  {edit[index] ? (
                    <input name='nome' onChange={onEditType} value={type.nome} />
                  ) : (
                    <span>{nome}</span>
                  )}
                </th>
                <th>
                  <div className='row-total'>
                    {edit[index] ? (
                      <input
                        id='percent'
                        type='number'
                        name='percentual_imposto'
                        onChange={onEditType}
                        value={type.percentual_imposto || 0}
                      />
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
                        onClick={() => editType(index)}
                      />
                    )}
                    <Trash
                      size={20}
                      className='trash'
                      onClick={() => removeType(codigo)}
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
          {enabled ? (
            <tr>
              <th></th>
              <th>
                <input
                  type='text'
                  name='nome'
                  placeholder='Categoria'
                  value={newType.nome}
                  onChange={({ target: { name, value } }) =>
                    setNewType({ ...newType, [name]: value })
                  }
                />
              </th>
              <th>
                <input
                  type='number'
                  name='percentual'
                  value={newType.percentual}
                  onChange={({ target: { name, value } }) =>
                    setNewType({ ...newType, [name]: parseFloat(value) })
                  }
                />
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
          <div className='add-produto' onClick={() => insertNewType()}>
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
          <span>Novo Tipo</span>
        </div>
      )}
    </div>
  );
}

export default TypesTable;
