/**
 * Pricing Module - Handles product pricing and discounts
 * 
 * This module is used across multiple components:
 * - Shopping cart
 * - Invoice generation
 * - Reporting dashboard
 * - Admin panel
 * 
 * IMPORTANT: Changes to this module can affect billing accuracy!
 */

/**
 * Calculate the final price with discount applied
 * 
 * @param {number} basePrice - The original price before discount
 * @param {number} quantity - Number of items
 * @returns {number} Final price after discount
 */
function calculateDiscount(basePrice, quantity) {
  // Cyclomatic Complexity: 6 (Medium)
  
  if (basePrice <= 0) {
    throw new Error('Base price must be positive');
  }
  
  if (quantity < 0) {
    throw new Error('Quantity cannot be negative');
  }
  
  if (quantity === 0) {
    return 0;
  }
  
  // Simple discount: 10% off for any purchase
  const discount = 0.10;
  const total = basePrice * quantity;
  const discountedPrice = total * (1 - discount);
  
  return Math.round(discountedPrice * 100) / 100; // Round to 2 decimals
}

/**
 * Calculate total price for multiple items
 * 
 * @param {Array<{price: number, quantity: number}>} items - Array of items
 * @returns {number} Total price for all items
 */
function calculateTotal(items) {
  // Cyclomatic Complexity: 4 (Low)
  
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  if (items.length === 0) {
    return 0;
  }
  
  let total = 0;
  for (const item of items) {
    total += calculateDiscount(item.price, item.quantity);
  }
  
  return Math.round(total * 100) / 100;
}

/**
 * Apply special promotional discount
 * 
 * @param {number} price - Original price
 * @param {string} promoCode - Promotional code
 * @returns {number} Price after promo discount
 */
function applyPromoCode(price, promoCode) {
  // Cyclomatic Complexity: 5 (Low)
  
  if (price <= 0) {
    throw new Error('Price must be positive');
  }
  
  if (!promoCode) {
    return price;
  }
  
  const validCodes = {
    'SAVE10': 0.10,
    'SAVE20': 0.20,
    'SAVE30': 0.30
  };
  
  const discount = validCodes[promoCode.toUpperCase()];
  
  if (!discount) {
    throw new Error('Invalid promo code');
  }
  
  return Math.round(price * (1 - discount) * 100) / 100;
}

module.exports = {
  calculateDiscount,
  calculateTotal,
  applyPromoCode
};

// Made with Bob
