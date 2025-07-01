import { describe, it, expect } from 'vitest';
import Arithmetic from './arithmetic';

describe('Arithmetic', () => {
  describe('add method', () => {
    it('adds two positive numbers', () => {
      expect(Arithmetic.add(2, 3)).toBe(5);
      expect(Arithmetic.add(10, 20)).toBe(30);
    });

    it('adds positive and negative numbers', () => {
      expect(Arithmetic.add(5, -3)).toBe(2);
      expect(Arithmetic.add(-10, 15)).toBe(5);
    });

    it('adds zero to a number', () => {
      expect(Arithmetic.add(7, 0)).toBe(7);
      expect(Arithmetic.add(0, 12)).toBe(12);
    });
  });

  describe('multiply method', () => {
    it('multiplies two positive numbers', () => {
      expect(Arithmetic.multiply(3, 4)).toBe(12);
      expect(Arithmetic.multiply(5, 6)).toBe(30);
    });

    it('multiplies by zero', () => {
      expect(Arithmetic.multiply(7, 0)).toBe(0);
      expect(Arithmetic.multiply(0, 8)).toBe(0);
    });

    it('multiplies by one', () => {
      expect(Arithmetic.multiply(9, 1)).toBe(9);
      expect(Arithmetic.multiply(1, 10)).toBe(10);
    });

    it('handles negative multiplier', () => {
      // Note: This will cause infinite loop due to while (b--) with negative b
      // The current implementation doesn't handle negative numbers properly
      expect(() => Arithmetic.multiply(3, -2)).toThrow();
    });
  });

  describe('double method', () => {
    it('doubles a positive number', () => {
      expect(Arithmetic.double(4)).toBe(8);
      expect(Arithmetic.double(10)).toBe(20);
    });

    it('doubles zero', () => {
      expect(Arithmetic.double(0)).toBe(0);
    });

    it('doubles a negative number', () => {
      expect(Arithmetic.double(-3)).toBe(-6);
      expect(Arithmetic.double(-7)).toBe(-14);
    });
  });
});
