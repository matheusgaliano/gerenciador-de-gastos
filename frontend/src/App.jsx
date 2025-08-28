import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import Balance from "./components/Balance";
import TransactionList from "./components/TransactionList";
import Suggestions from "./components/Suggestions";

import { Wallet, DollarSign, ListChecks, Lightbulb } from "lucide-react";

function App() {
  const [balanco, setBalanco] = useState(0);
  const [transacoes, setTransacoes] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);

  const fetchDados = async () => {
    try {
      const balancoResponse = await fetch("http://localhost:5000/api/balanco");
      const balancoData = await balancoResponse.json();
      setBalanco(balancoData.balanco);

      const transacoesResponse = await fetch(
        "http://localhost:5000/api/transacoes"
      );
      const transacoesData = await transacoesResponse.json();
      setTransacoes(transacoesData);

      const sugestoesResponse = await fetch(
        "http://localhost:5000/api/sugestoes-ia"
      );
      if (!sugestoesResponse.ok) {
        throw new Error(
          "Erro ao buscar sugestões: " + sugestoesResponse.status
        );
      }
      const sugestoesData = await sugestoesResponse.json();
      setSugestoes(sugestoesData.sugestoes);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
      setSugestoes([]);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center py-10 px-4 font-inter antialiased">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100">
        <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight">
          Gerenciador de Gastos
        </h1>

        <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Wallet size={36} />
            <span className="text-3xl font-bold">Balanço Atual</span>
          </div>
          <Balance balanco={balanco} />
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <DollarSign size={28} className="text-green-600" />
            <span>Adicionar Nova Transação</span>
          </h2>
          <TransactionForm onTransacaoAdicionada={fetchDados} />
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <ListChecks size={28} className="text-blue-600" />
            <span>Histórico de Transações</span>
          </h2>
          <TransactionList transacoes={transacoes} />
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <Lightbulb size={28} className="text-yellow-600" />
            <span>Sugestões de Otimização (IA)</span>
          </h2>
          <Suggestions sugestoes={sugestoes} />
        </div>
      </div>
    </div>
  );
}

export default App;
