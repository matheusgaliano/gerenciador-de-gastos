import React, { useState } from "react";

function TransactionForm({ onTransacaoAdicionada }) {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("entrada");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/transacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valor, descricao, tipo }),
      });
      const data = await response.json();
      if (response.ok) {
        onTransacaoAdicionada();
        setValor("");
        setDescricao("");
        setTipo("entrada");
      } else {
        console.error("Erro ao adicionar transação:", data.erro);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="valor"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Valor:
        </label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          placeholder="Ex: 150.00"
          required
        />
      </div>
      <div>
        <label
          htmlFor="descricao"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Descrição:
        </label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          placeholder="Ex: Aluguel, Salário, etc."
          required
        />
      </div>
      <div>
        <label
          htmlFor="tipo"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Tipo:
        </label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-white"
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
      >
        Adicionar
      </button>
    </form>
  );
}

export default TransactionForm;
