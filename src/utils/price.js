export const parsePrice = (value) => {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return 0
    const fraction = String(value).split('.')[1]
    return Math.abs(value) < 1000 && fraction?.length === 3
      ? Math.round(value * 1000)
      : value
  }

  const normalized = String(value ?? '').trim().replace(/[^\d.,-]/g, '')
  if (!normalized) return 0

  const lastDot = normalized.lastIndexOf('.')
  const lastComma = normalized.lastIndexOf(',')
  const lastSeparator = Math.max(lastDot, lastComma)
  const hasBothSeparators = lastDot >= 0 && lastComma >= 0

  if (hasBothSeparators) {
    const decimalDigits = normalized.length - lastSeparator - 1
    if (decimalDigits > 0 && decimalDigits <= 2) {
      const decimalValue = normalized.slice(0, lastSeparator).replace(/[.,]/g, '')
      return Number(`${decimalValue}.${normalized.slice(lastSeparator + 1)}`) || 0
    }
    return Number(normalized.replace(/[.,]/g, '')) || 0
  }

  if (lastSeparator >= 0) {
    const decimalDigits = normalized.length - lastSeparator - 1
    if (decimalDigits === 3) return Number(normalized.replace(/[.,]/g, '')) || 0
    if (decimalDigits > 0) {
      const decimalValue = normalized.slice(0, lastSeparator).replace(/[.,]/g, '')
      return Number(`${decimalValue}.${normalized.slice(lastSeparator + 1)}`) || 0
    }
  }

  return Number(normalized) || 0
}

export const formatPrice = (value) => (
  parsePrice(value).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })
)
