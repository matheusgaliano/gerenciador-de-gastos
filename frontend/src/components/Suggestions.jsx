import React from "react";

function Suggestions({ sugestoes }) {
  if (!sugestoes) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Sugestões de Otimização (IA)</h2>
        <p>Carregando sugestões...</p>
      </div>
    );
  }

  if (sugestoes.length === 0) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Sugestões de Otimização (IA)</h2>
        <p>Nenhuma sugestão encontrada.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Sugestões de Otimização (IA)</h2>
      <ul style={{ paddingLeft: "25px" }}>
        {sugestoes.map((sugestao, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {sugestao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
