export function timeToString(date) {
  if (date === null) return;
  const dateFormatter = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit', minute: '2-digit'
  }).format(date);
  return dateFormatter;
}

export function dateToString(date) {
  if (date === null) return;
  const dateFormatter = new Intl.DateTimeFormat('es-AR', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(date);
  return dateFormatter;
}
