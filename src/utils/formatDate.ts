export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
  }).format(date)
}
