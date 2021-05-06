import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Chart } from 'react-google-charts';
import api from '../../../services/api';

interface Transacao {
    id: number;
    valor: number;
    observacao: string;
    tipo: 'income' | 'outcome';
    created_at: Date;
    categoria: { descricao : string };
}

const LevelTwo: React.FC = () => {

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    useEffect(() => {
        async function loadTransacoes(): Promise<void> {
          api.get('/transacoes').then(response => {
            setTransacoes(response.data.listarTransacoes);
            console.log(JSON.stringify(transacoes));
          });
        }
       loadTransacoes();
      }, []);
    //const obj = {categoria: transacoes.categoria.descricao, valor: '12'};
    
    const [options, setOptions] = useState({title: 'Graficos de entrada e saida'}) 
    const [data, setData] = useState([
        ['Linguagens', 'Quantidade'],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50],
    ]);



return (
    <>
       <Header />
          <div className="Graficos">
             <div>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    data={data}
                    options={options}
                />
            </div>
            <div>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    </>
   );
};

export default LevelTwo;