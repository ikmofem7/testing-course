import { describe, it, expect } from 'vitest';
import { processPayment } from './sample';

describe('processPayment', () => {
  // Test 1: Returns null for null/undefined order
  it('should return null for null order', () => {
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(null, user, config);

    expect(result).toBeNull();
  });

  it('should return null for undefined order', () => {
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(undefined, user, config);

    expect(result).toBeNull();
  });

  // Test 2: Throws error for blocked user
  it('should throw error for blocked user', () => {
    const order = { items: [{ price: 100 }] };
    const user = { blocked: true, limit: 1000 };
    const config = { tax: false };

    expect(() => processPayment(order, user, config)).toThrow('User blocked');
  });

  // Test 3: Basic order processing (no discounts, no tax)
  it('should calculate total for basic order without discounts or tax', () => {
    const order = {
      items: [{ price: 100 }, { price: 200 }, { price: 300 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(600);
  });

  // Test 4: Order with discounts applied
  it('should apply discounts to items', () => {
    const order = {
      items: [
        { price: 100, discount: 0.1 }, // 10% discount
        { price: 200, discount: 0.2 }, // 20% discount
        { price: 300 }, // no discount
      ],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    // 100 * 0.9 + 200 * 0.8 + 300 = 90 + 160 + 300 = 550
    expect(result).toBe(550);
  });

  // Test 5: Order with tax applied
  it('should apply tax when config.tax is true', () => {
    const order = {
      items: [{ price: 100 }, { price: 200 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: true };

    const result = processPayment(order, user, config);

    // (100 + 200) * 1.1 = 330
    expect(result).toBe(330);
  });

  // Test 6: Order with both discounts and tax
  it('should apply both discounts and tax', () => {
    const order = {
      items: [
        { price: 100, discount: 0.1 }, // 10% discount
        { price: 200, discount: 0.2 }, // 20% discount
      ],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: true };

    const result = processPayment(order, user, config);

    // (100 * 0.9 + 200 * 0.8) * 1.1 = (90 + 160) * 1.1 = 275
    expect(result).toBe(275);
  });

  // Test 7: Returns null when total exceeds user limit
  it('should return null when total exceeds user limit', () => {
    const order = {
      items: [{ price: 1000 }, { price: 2000 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBeNull();
  });

  // Test 8: Returns total when within user limit
  it('should return total when within user limit', () => {
    const order = {
      items: [{ price: 400 }, { price: 500 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(900);
  });

  // Test 9: Handles empty items array
  it('should handle empty items array', () => {
    const order = { items: [] };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(0);
  });

  // Test 10: Handles items with zero prices
  it('should handle items with zero prices', () => {
    const order = {
      items: [{ price: 0 }, { price: 100 }, { price: 0 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(100);
  });

  // Test 11: Handles items with 100% discount
  it('should handle items with 100% discount', () => {
    const order = {
      items: [
        { price: 100, discount: 1.0 }, // 100% discount
        { price: 200 },
      ],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    // 100 * 0 + 200 = 200
    expect(result).toBe(200);
  });

  // Test 12: Handles user limit exactly equal to total
  it('should return total when exactly at user limit', () => {
    const order = {
      items: [{ price: 500 }, { price: 500 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(1000);
  });

  // Test 13: Handles config with tax set to false
  it('should not apply tax when config.tax is false', () => {
    const order = {
      items: [{ price: 100 }, { price: 200 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(300);
  });

  // Test 14: Handles config with undefined tax
  it('should not apply tax when config.tax is undefined', () => {
    const order = {
      items: [{ price: 100 }, { price: 200 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = {};

    const result = processPayment(order, user, config);

    expect(result).toBe(300);
  });

  // Test 15: Handles total just below user limit
  it('should return total when just below user limit', () => {
    const order = {
      items: [{ price: 999 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBe(999);
  });

  // Test 16: Handles total just above user limit
  it('should return null when just above user limit', () => {
    const order = {
      items: [{ price: 1001 }],
    };
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBeNull();
  });

  // Test 17: Handles zero user limit
  it('should return null when user limit is zero', () => {
    const order = {
      items: [{ price: 100 }],
    };
    const user = { blocked: false, limit: 0 };
    const config = { tax: false };

    const result = processPayment(order, user, config);

    expect(result).toBeNull();
  });

  // Test 18: Handles missing order.items property
  it('should handle missing order.items property', () => {
    const order = {};
    const user = { blocked: false, limit: 1000 };
    const config = { tax: false };

    expect(() => processPayment(order, user, config)).toThrow();
  });
});
