import React from "react";

function TransactionList({ transacoes }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Histórico de Transações</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {transacoes.map((transacao) => (
          <li
            key={transacao.id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0",
              color: transacao.tipo === "saida" ? "red" : "green",
            }}
          >
            {transacao.descricao} - R$ {transacao.valor.toFixed(2)} (
            {transacao.tipo})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
