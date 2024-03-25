export const formatFeedDate = (date: string) => {
  const obj = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Intl.DateTimeFormat('en-US', options).format(obj)
}
