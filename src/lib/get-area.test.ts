import { describe, it, expect } from 'vitest';
import { getArea } from './get-area';

describe('getArea', () => {
  describe('domain logic', () => {
    it('calculates area of a square correctly', () => {
      // Square with 4 sides, each 5 units long
      const result = getArea(4, 5);
      expect(result).toBeCloseTo(25, 5); // Area = 5² = 25
    });

    it('calculates area of a triangle correctly', () => {
      // Equilateral triangle with 3 sides, each 6 units long
      const result = getArea(3, 6);
      expect(result).toBeCloseTo(15.588457268119896, 5);
    });

    it('calculates area of a hexagon correctly', () => {
      // Regular hexagon with 6 sides, each 4 units long
      const result = getArea(6, 4);
      expect(result).toBeCloseTo(41.569219381653056, 5);
    });
  });

  describe('logic paths', () => {
    it('handles different side lengths', () => {
      const sides = 4; // Square
      const length1 = 2;
      const length2 = 8;

      const area1 = getArea(sides, length1);
      const area2 = getArea(sides, length2);

      expect(area1).toBeCloseTo(4, 5); // 2² = 4
      expect(area2).toBeCloseTo(64, 5); // 8² = 64
      expect(area2).toBeGreaterThan(area1);
    });

    it('handles different number of sides', () => {
      const sideLength = 5;
      const triangleArea = getArea(3, sideLength);
      const squareArea = getArea(4, sideLength);
      const pentagonArea = getArea(5, sideLength);

      expect(triangleArea).toBeLessThan(squareArea);
      expect(squareArea).toBeLessThan(pentagonArea);
    });
  });

  describe('edge cases', () => {
    it('handles zero sides (invalid input)', () => {
      const result = getArea(0, 5);
      expect(result).toBeNaN();
    });

    it('handles negative sides (invalid input)', () => {
      const result = getArea(-3, 5);
      expect(result).toBeNaN();
    });

    it('handles zero side length (invalid input)', () => {
      const result = getArea(4, 0);
      expect(result).toBe(0);
    });

    it('handles negative side length (invalid input)', () => {
      const result = getArea(4, -5);
      expect(result).toBeNaN();
    });
  });

  describe('boundary conditions', () => {
    it('handles very small side lengths', () => {
      const result = getArea(4, 0.001);
      expect(result).toBeCloseTo(0.000001, 10); // (0.001)² = 0.000001
    });

    it('handles very large side lengths', () => {
      const result = getArea(4, 1000000);
      expect(result).toBeCloseTo(1000000000000, 5); // (1000000)² = 10^12
    });

    it('handles minimum valid sides (3)', () => {
      const result = getArea(3, 1);
      expect(result).toBeCloseTo(0.4330127018922193, 5);
    });

    it('handles very large number of sides (approaches circle)', () => {
      const sideLength = 1;
      const triangleArea = getArea(3, sideLength);
      const squareArea = getArea(4, sideLength);
      const octagonArea = getArea(8, sideLength);
      const dodecagonArea = getArea(12, sideLength);
      const manySidesArea = getArea(100, sideLength);

      // Areas should increase with more sides (for same side length)
      expect(triangleArea).toBeLessThan(squareArea);
      expect(squareArea).toBeLessThan(octagonArea);
      expect(octagonArea).toBeLessThan(dodecagonArea);
      expect(dodecagonArea).toBeLessThan(manySidesArea);

      // Verify the areas are reasonable positive values
      expect(triangleArea).toBeGreaterThan(0);
      expect(manySidesArea).toBeGreaterThan(0);
    });
  });
});
