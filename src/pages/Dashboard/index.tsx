import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transacao {
  id: number;
  valor: number;
  observacao: string;
  tipo: 'income' | 'outcome';
  created_at: Date;
  categoria: { descricao : string };
}
interface Saldo {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [saldo, setSaldo] = useState<Saldo>({} as Saldo);

  useEffect(() => {
    async function loadTransacoes(): Promise<void> {
      api.get('/transacoes').then(response => {
        setTransacoes(response.data.listarTransacoes);
        setSaldo(response.data.saldo);
        console.log(transacoes);
      });
    }
   loadTransacoes();
  }, []);

  return (
    <>
<Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
            </header>
            <h1 data-testid="saldo-income">
              {`${formatValue(saldo.income)}`}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
            </header>
            <h1 data-testid="saldo-outcome">
              {`${formatValue(saldo.outcome)}`}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Saldo</p>
            </header>
            <h1 data-testid="saldo-total">
              {`${formatValue(saldo.total)}`}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Observação</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transacoes.map(transacao => (
                <tr key={transacao.id}>
                  <td className="title">{transacao.observacao}</td>
                  <td className="income">
                    {transacao.tipo === 'outcome' && ' - '}
                    {formatValue(transacao.valor)}
                  </td>
                  <td>{transacao.categoria.descricao}</td>
                  <td>
                    {new Date(transacao.created_at).toLocaleDateString(
                      'pt-br',
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
