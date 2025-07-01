import { describe, it, expect, vi } from 'vitest';
import Arithmetic from './arithmetic';

describe('Arithmetic', () => {
  describe('add method', () => {
    test('should add two positive numbers', () => {
      // Arrange
      const a = 5;
      const b = 3;

      // Act
      const result = Arithmetic.add(a, b);

      // Assert
      expect(result).toBe(8);
    });

    it('should add positive and negative numbers', () => {
      // Arrange
      const a = 10;
      const b = -3;

      // Act
      const result = Arithmetic.add(a, b);

      // Assert
      expect(result).toBe(7);
    });

    it('should add zero to a number', () => {
      // Arrange
      const a = 15;
      const b = 0;

      // Act
      const result = Arithmetic.add(a, b);

      // Assert
      expect(result).toBe(15);
    });

    it('should add two negative numbers', () => {
      // Arrange
      const a = -5;
      const b = -3;

      // Act
      const result = Arithmetic.add(a, b);

      // Assert
      expect(result).toBe(-8);
    });
  });

  describe('multiply method', () => {
    it('should multiply two positive numbers', () => {
      // Arrange
      const a = 4;
      const b = 3;

      // Act
      const result = Arithmetic.multiply(a, b);

      // Assert
      expect(result).toBe(12);
    });

    it('should multiply by zero', () => {
      // Arrange
      const a = 7;
      const b = 0;

      // Act
      const result = Arithmetic.multiply(a, b);

      // Assert
      expect(result).toBe(0);
    });

    it('should multiply by one', () => {
      // Arrange
      const a = 9;
      const b = 1;

      // Act
      const result = Arithmetic.multiply(a, b);

      // Assert
      expect(result).toBe(9);
    });

    it('should handle negative multiplier', () => {
      // Arrange
      const a = 6;
      const b = -2;

      // Act
      const result = Arithmetic.multiply(a, b);

      // Assert
      expect(result).toBe(-12);
    });

    it('should handle zero multiplicand', () => {
      // Arrange
      const a = 0;
      const b = 5;

      // Act
      const result = Arithmetic.multiply(a, b);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('double method', () => {
    it('should double a positive number', () => {
      // Arrange
      const a = 8;

      // Act
      const result = Arithmetic.double(a);

      // Assert
      expect(result).toBe(16);
    });

    it('should double a negative number', () => {
      // Arrange
      const a = -6;

      // Act
      const result = Arithmetic.double(a);

      // Assert
      expect(result).toBe(-12);
    });

    it('should double zero', () => {
      // Arrange
      const a = 0;

      // Act
      const result = Arithmetic.double(a);

      // Assert
      expect(result).toBe(0);
    });

    it('should double a decimal number', () => {
      // Arrange
      const a = 3.5;

      // Act
      const result = Arithmetic.double(a);

      // Assert
      expect(result).toBe(7);
    });
  });

  describe('method dependencies', () => {
    it('should use add method in multiply implementation', () => {
      // Arrange
      const addSpy = vi.spyOn(Arithmetic, 'add');
      const a = 3;
      const b = 4;

      // Act
      Arithmetic.multiply(a, b);

      // Assert
      expect(addSpy).toHaveBeenCalledTimes(4);
      expect(addSpy).toHaveBeenCalledWith(0, 3);
      expect(addSpy).toHaveBeenCalledWith(3, 3);
      expect(addSpy).toHaveBeenCalledWith(6, 3);
      expect(addSpy).toHaveBeenCalledWith(9, 3);

      // Cleanup
      addSpy.mockRestore();
    });

    it('should use multiply method in double implementation', () => {
      // Arrange
      const multiplySpy = vi.spyOn(Arithmetic, 'multiply');
      const a = 5;

      // Act
      Arithmetic.double(a);

      // Assert
      expect(multiplySpy).toHaveBeenCalledTimes(1);
      expect(multiplySpy).toHaveBeenCalledWith(5, 2);

      // Cleanup
      multiplySpy.mockRestore();
    });
  });
});
