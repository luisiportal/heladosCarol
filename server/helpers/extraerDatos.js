export function extraerMonto(texto) {
  const regex = /Amount\s+\$([0-9]+\.[0-9]{2})/;
  const match = texto.match(regex);
  return match ? parseFloat(match[1]) : null;
}

export function extraerNombreZelle(texto) {
  const regex = /Zelle\s+®\s+payment\s+(.*?)\s+sent/i;
  const match = texto.match(regex);
  return match ? match[1].trim() : null;
}

export function extraerTransaction(texto) {
  const match = texto.match(/Transaction number\s+(\d+)/);
  return match ? match[1] : null;
}