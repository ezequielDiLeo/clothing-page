import { parsePrice } from './price.js'

export const getProductDiscount = (product, promotion) => {
    const productDiscount = Number(product.discountPercent)
    if (Number.isFinite(productDiscount) && productDiscount > 0) {
        return Math.min(productDiscount, 100)
    }

    const storeDiscount = Number(promotion?.discountPercent)
    return promotion?.enabled && Number.isFinite(storeDiscount) && storeDiscount > 0
        ? Math.min(storeDiscount, 100)
        : 0
}

export const getDiscountedPrice = (product, promotion) => (
    Math.round(parsePrice(product.price) * (1 - getProductDiscount(product, promotion) / 100))
)
