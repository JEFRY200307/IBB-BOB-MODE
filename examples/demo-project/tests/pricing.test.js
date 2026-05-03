/**
 * Test Suite for Pricing Module
 * 
 * These tests validate the pricing calculations and discount logic.
 * IMPORTANT: These tests will break if calculateDiscount() logic changes!
 */

const { calculateDiscount, calculateTotal, applyPromoCode } = require('../src/pricing');

describe('Pricing Module', () => {
  
  describe('calculateDiscount', () => {
    
    test('should calculate correct discount for single item', () => {
      // Base price: $100, Quantity: 1
      // Expected: $100 * 1 * 0.90 = $90
      const result = calculateDiscount(100, 1);
      expect(result).toBe(90);
    });
    
    test('should calculate correct discount for multiple items', () => {
      // Base price: $50, Quantity: 3
      // Expected: $50 * 3 * 0.90 = $135
      const result = calculateDiscount(50, 3);
      expect(result).toBe(135);
    });
    
    test('should return 0 for zero quantity', () => {
      const result = calculateDiscount(100, 0);
      expect(result).toBe(0);
    });
    
    test('should throw error for negative price', () => {
      expect(() => calculateDiscount(-10, 1)).toThrow('Base price must be positive');
    });
    
    test('should throw error for negative quantity', () => {
      expect(() => calculateDiscount(100, -1)).toThrow('Quantity cannot be negative');
    });
    
    test('should round to 2 decimal places', () => {
      // Base price: $10.99, Quantity: 3
      // Expected: $10.99 * 3 * 0.90 = $29.673 → $29.67
      const result = calculateDiscount(10.99, 3);
      expect(result).toBe(29.67);
    });
    
  });
  
  describe('calculateTotal', () => {
    
    test('should calculate total for multiple items', () => {
      const items = [
        { price: 100, quantity: 1 },  // $90
        { price: 50, quantity: 2 }    // $90
      ];
      // Expected: $90 + $90 = $180
      const result = calculateTotal(items);
      expect(result).toBe(180);
    });
    
    test('should return 0 for empty array', () => {
      const result = calculateTotal([]);
      expect(result).toBe(0);
    });
    
    test('should throw error for non-array input', () => {
      expect(() => calculateTotal('not an array')).toThrow('Items must be an array');
    });
    
    test('should handle items with zero quantity', () => {
      const items = [
        { price: 100, quantity: 1 },  // $90
        { price: 50, quantity: 0 }    // $0
      ];
      const result = calculateTotal(items);
      expect(result).toBe(90);
    });
    
  });
  
  describe('applyPromoCode', () => {
    
    test('should apply SAVE10 promo code', () => {
      const result = applyPromoCode(100, 'SAVE10');
      expect(result).toBe(90);
    });
    
    test('should apply SAVE20 promo code', () => {
      const result = applyPromoCode(100, 'SAVE20');
      expect(result).toBe(80);
    });
    
    test('should apply SAVE30 promo code', () => {
      const result = applyPromoCode(100, 'SAVE30');
      expect(result).toBe(70);
    });
    
    test('should be case insensitive', () => {
      const result = applyPromoCode(100, 'save10');
      expect(result).toBe(90);
    });
    
    test('should return original price for empty promo code', () => {
      const result = applyPromoCode(100, '');
      expect(result).toBe(100);
    });
    
    test('should throw error for invalid promo code', () => {
      expect(() => applyPromoCode(100, 'INVALID')).toThrow('Invalid promo code');
    });
    
    test('should throw error for negative price', () => {
      expect(() => applyPromoCode(-10, 'SAVE10')).toThrow('Price must be positive');
    });
    
  });
  
});

/**
 * Integration Tests
 * 
 * These tests validate the interaction between different pricing functions
 */
describe('Pricing Integration', () => {
  
  test('should calculate total with promo code applied to each item', () => {
    const items = [
      { price: 100, quantity: 1 },
      { price: 50, quantity: 2 }
    ];
    
    // Calculate base total
    const baseTotal = calculateTotal(items); // $180
    
    // Apply promo code to total
    const finalTotal = applyPromoCode(baseTotal, 'SAVE10'); // $162
    
    expect(finalTotal).toBe(162);
  });
  
  test('should handle complex pricing scenario', () => {
    // Scenario: Shopping cart with multiple items and promo code
    const cartItems = [
      { price: 29.99, quantity: 2 },  // ~$53.98
      { price: 15.50, quantity: 3 },  // ~$41.85
      { price: 99.99, quantity: 1 }   // ~$89.99
    ];
    
    const subtotal = calculateTotal(cartItems);
    const finalPrice = applyPromoCode(subtotal, 'SAVE20');
    
    // Verify final price is reasonable
    expect(finalPrice).toBeGreaterThan(0);
    expect(finalPrice).toBeLessThan(200);
  });
  
});

// Made with Bob
