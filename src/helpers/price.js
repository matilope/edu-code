export function numberToCurrency(value) {
  return parseInt(value).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  });
}