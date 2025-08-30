export function formatNumber(num: number | string | undefined | null): string {
  if (num == null) {
    return "0"
  }

  // Convert string to number if needed
  const numericValue = typeof num === 'string' ? parseFloat(num) : num

  if (isNaN(numericValue)) {
    return "0"
  }

  if (numericValue >= 1000000) {
    return (numericValue / 1000000).toFixed(1) + "M"
  } else if (numericValue >= 1000) {
    return (numericValue / 1000).toFixed(1) + "K"
  }
  return numericValue.toLocaleString()
}

export function formatPercent(num: number | string | undefined | null): string {
  if (num == null) {
    return "0.00%"
  }

  // Convert string to number if needed
  const numericValue = typeof num === 'string' ? parseFloat(num) : num

  if (isNaN(numericValue)) {
    return "0.00%"
  }

  return numericValue.toFixed(2) + "%"
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString()
}
