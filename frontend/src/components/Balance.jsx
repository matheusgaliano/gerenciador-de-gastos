import React from "react";

function Balance({ balanco }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3>Balanço Atual</h3>
      <h2 style={{ color: balanco >= 0 ? "green" : "red" }}>
        R$ {balanco.toFixed(2)}
      </h2>
    </div>
  );
}

export default Balance;
