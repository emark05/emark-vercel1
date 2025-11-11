// Payment Methods Configuration

export const PAYMENT_METHODS = {
  credit_card: {
    id: "credit_card",
    name: "Tarjeta de Crédito/Débito",
    description: "Pago seguro con tarjeta de crédito o débito",
    icon: "💳",
    fee: 0.029, // 2.9% fee
  },
  bank_transfer: {
    id: "bank_transfer",
    name: "Transferencia Bancaria",
    description: "CBU o Alias bancario",
    icon: "🏦",
    fee: 0, // No fee
  },
  pagofacil: {
    id: "pagofacil",
    name: "Pago Fácil",
    description: "Pago en efectivo en comercios autorizados",
    icon: "🏪",
    fee: 0.025, // 2.5% fee
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    description: "Procesador de pagos internacional",
    icon: "💰",
    fee: 0.029,
  },
}

export const SHIPPING_PROVIDERS = {
  correo_argentino: {
    id: "correo_argentino",
    name: "Correo Argentino",
    estimatedDays: 3,
    baseCost: 500,
  },
  andreani: {
    id: "andreani",
    name: "Andreani",
    estimatedDays: 2,
    baseCost: 600,
  },
  oca: {
    id: "oca",
    name: "OCA",
    estimatedDays: 2,
    baseCost: 550,
  },
  pickit: {
    id: "pickit",
    name: "Pickit",
    estimatedDays: 1,
    baseCost: 800,
  },
}

// Calculate payment fee
export function calculatePaymentFee(amount: number, method: string): number {
  const paymentConfig = PAYMENT_METHODS[method as keyof typeof PAYMENT_METHODS]
  if (!paymentConfig) return 0
  return Math.round(amount * paymentConfig.fee)
}

// Get shipping cost (simplified - in production would call API)
export function getShippingCost(provider: string, weight = 1): number {
  const providerConfig = SHIPPING_PROVIDERS[provider as keyof typeof SHIPPING_PROVIDERS]
  if (!providerConfig) return 0
  // Base cost + weight multiplier
  return providerConfig.baseCost + weight * 100
}
