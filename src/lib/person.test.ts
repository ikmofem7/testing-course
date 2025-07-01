import { describe, it, expect } from 'vitest';
import { parseFullName } from './person';

describe('parseFullName', () => {
  describe('domain logic', () => {
    it('should parse first and last name correctly', () => {
      // Arrange
      const fullName = 'John Doe';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: undefined,
        lastName: 'Doe',
      });
    });

    it('should parse first, middle, and last name correctly', () => {
      // Arrange
      const fullName = 'John Michael Doe';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
      });
    });

    it('should handle single name (first name only)', () => {
      // Arrange
      const fullName = 'John';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: undefined,
        lastName: undefined,
      });
    });
  });

  describe('logic paths', () => {
    it('should handle multiple middle names by joining them', () => {
      // Arrange
      const fullName = 'John Michael James Doe';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael James',
        lastName: 'Doe',
      });
    });

    it('should handle names with extra spaces between parts', () => {
      // Arrange
      const fullName = 'John   Michael   Doe';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
      });
    });

    it('should handle trailing and leading spaces', () => {
      // Arrange
      const fullName = '  John Michael Doe  ';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
      });
    });
  });

  describe('edge cases', () => {
    it('should throw error for empty string', () => {
      // Arrange
      const fullName = '';

      // Act & Assert
      expect(() => parseFullName(fullName)).toThrow(
        'fullName cannot be an empty string.',
      );
    });

    it('should return empty firstName for whitespace-only input', () => {
      // Arrange
      const fullName = '   ';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: '',
        middleName: undefined,
        lastName: undefined,
      });
    });

    it('should handle single space character', () => {
      // Arrange
      const fullName = ' ';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: '',
        middleName: undefined,
        lastName: undefined,
      });
    });
  });

  describe('boundary conditions', () => {
    it('should handle very long names', () => {
      // Arrange
      const fullName = 'John Michael James Robert William Doe';

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael James Robert William',
        lastName: 'Doe',
      });
    });

    it('should handle names with special characters', () => {
      // Arrange
      const fullName = "Jean-Pierre O'Connor-Smith";

      // Act
      const result = parseFullName(fullName);

      // Assert
      expect(result).toEqual({
        firstName: 'Jean-Pierre',
        middleName: undefined,
        lastName: "O'Connor-Smith",
      });
    });
  });
});
