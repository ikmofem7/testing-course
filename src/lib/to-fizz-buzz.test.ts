import { describe, it, expect } from 'vitest';
import { toFizzBuzz } from './to-fizz-buzz';

describe('toFizzBuzz', () => {
  describe('Happy Path Scenarios', () => {
    it('should return "Fizz" for numbers divisible by 3 only', () => {
      expect(toFizzBuzz(3)).toBe('Fizz');
      expect(toFizzBuzz(6)).toBe('Fizz');
      expect(toFizzBuzz(9)).toBe('Fizz');
      expect(toFizzBuzz(12)).toBe('Fizz');
      expect(toFizzBuzz(18)).toBe('Fizz');
    });

    it('should return "Buzz" for numbers divisible by 5 only', () => {
      expect(toFizzBuzz(5)).toBe('Buzz');
      expect(toFizzBuzz(10)).toBe('Buzz');
      expect(toFizzBuzz(20)).toBe('Buzz');
      expect(toFizzBuzz(25)).toBe('Buzz');
      expect(toFizzBuzz(35)).toBe('Buzz');
    });

    it('should return "FizzBuzz" for numbers divisible by both 3 and 5', () => {
      expect(toFizzBuzz(15)).toBe('FizzBuzz');
      expect(toFizzBuzz(30)).toBe('FizzBuzz');
      expect(toFizzBuzz(45)).toBe('FizzBuzz');
      expect(toFizzBuzz(60)).toBe('FizzBuzz');
      expect(toFizzBuzz(75)).toBe('FizzBuzz');
    });

    it('should return the number for numbers not divisible by 3 or 5', () => {
      expect(toFizzBuzz(1)).toBe(1);
      expect(toFizzBuzz(2)).toBe(2);
      expect(toFizzBuzz(4)).toBe(4);
      expect(toFizzBuzz(7)).toBe(7);
      expect(toFizzBuzz(8)).toBe(8);
      expect(toFizzBuzz(11)).toBe(11);
      expect(toFizzBuzz(13)).toBe(13);
      expect(toFizzBuzz(14)).toBe(14);
      expect(toFizzBuzz(16)).toBe(16);
      expect(toFizzBuzz(17)).toBe(17);
      expect(toFizzBuzz(19)).toBe(19);
    });
  });

  describe('Edge Cases', () => {
    it('should return "FizzBuzz" for zero (divisible by both 3 and 5)', () => {
      expect(toFizzBuzz(0)).toBe('FizzBuzz');
    });

    it('should handle negative numbers correctly', () => {
      expect(toFizzBuzz(-3)).toBe('Fizz');
      expect(toFizzBuzz(-5)).toBe('Buzz');
      expect(toFizzBuzz(-15)).toBe('FizzBuzz');
      expect(toFizzBuzz(-1)).toBe(-1);
      expect(toFizzBuzz(-2)).toBe(-2);
    });

    it('should handle large numbers', () => {
      expect(toFizzBuzz(999)).toBe('Fizz');
      expect(toFizzBuzz(1000)).toBe('Buzz');
      expect(toFizzBuzz(1005)).toBe('FizzBuzz');
      expect(toFizzBuzz(1001)).toBe(1001);
    });
  });

  describe('Boundary Values', () => {
    it('should handle numbers just below multiples of 3', () => {
      expect(toFizzBuzz(2)).toBe(2);
      expect(toFizzBuzz(5)).toBe('Buzz');
      expect(toFizzBuzz(8)).toBe(8);
      expect(toFizzBuzz(11)).toBe(11);
      expect(toFizzBuzz(14)).toBe(14);
    });

    it('should handle numbers just above multiples of 3', () => {
      expect(toFizzBuzz(4)).toBe(4);
      expect(toFizzBuzz(7)).toBe(7);
      expect(toFizzBuzz(10)).toBe('Buzz');
      expect(toFizzBuzz(13)).toBe(13);
      expect(toFizzBuzz(16)).toBe(16);
    });

    it('should handle numbers just below multiples of 5', () => {
      expect(toFizzBuzz(4)).toBe(4);
      expect(toFizzBuzz(9)).toBe('Fizz');
      expect(toFizzBuzz(14)).toBe(14);
      expect(toFizzBuzz(19)).toBe(19);
      expect(toFizzBuzz(24)).toBe('Fizz');
    });

    it('should handle numbers just above multiples of 5', () => {
      expect(toFizzBuzz(6)).toBe('Fizz');
      expect(toFizzBuzz(11)).toBe(11);
      expect(toFizzBuzz(16)).toBe(16);
      expect(toFizzBuzz(21)).toBe('Fizz');
      expect(toFizzBuzz(26)).toBe(26);
    });
  });

  describe('Classic FizzBuzz Sequence (1-20)', () => {
    it('should produce the correct FizzBuzz sequence for numbers 1-20', () => {
      const expected = [
        1,
        2,
        'Fizz',
        4,
        'Buzz',
        'Fizz',
        7,
        8,
        'Fizz',
        'Buzz',
        11,
        'Fizz',
        13,
        14,
        'FizzBuzz',
        16,
        17,
        'Fizz',
        19,
        'Buzz',
      ];

      for (let i = 1; i <= 20; i++) {
        expect(toFizzBuzz(i)).toBe(expected[i - 1]);
      }
    });
  });

  describe('Special Number Values', () => {
    it('should handle NaN (should return NaN)', () => {
      expect(toFizzBuzz(NaN)).toBe(NaN);
    });

    it('should handle Infinity (should return Infinity)', () => {
      expect(toFizzBuzz(Infinity)).toBe(Infinity);
    });

    it('should handle negative Infinity (should return -Infinity)', () => {
      expect(toFizzBuzz(-Infinity)).toBe(-Infinity);
    });
  });

  describe('Code Coverage Verification', () => {
    it('should test all branches of the conditional logic', () => {
      // Test the first condition: isMultipleOfThree && isMultipleOfFive
      expect(toFizzBuzz(15)).toBe('FizzBuzz');

      // Test the second condition: isMultipleOfThree (but not isMultipleOfFive)
      expect(toFizzBuzz(3)).toBe('Fizz');

      // Test the third condition: isMultipleOfFive (but not isMultipleOfThree)
      expect(toFizzBuzz(5)).toBe('Buzz');

      // Test the default case: neither isMultipleOfThree nor isMultipleOfFive
      expect(toFizzBuzz(1)).toBe(1);
    });
  });
});
