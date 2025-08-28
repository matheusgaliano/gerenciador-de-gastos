import React from "react";

function Balance({ balanco }) {
  const balancoFormatado = balanco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex flex-col items-end">
      <p className="text-lg font-medium text-white opacity-80 mb-1">
        Balanço Atual
      </p>
      <p className="text-4xl font-extrabold text-white">{balancoFormatado}</p>
    </div>
  );
}

export default Balance;
