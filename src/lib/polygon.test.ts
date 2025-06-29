import { beforeEach, describe, it, expect, vi } from 'vitest';
import { createPolygon, Polygon } from '@/lib/polygon';

// Mock the getArea function
vi.mock('./get-area', () => ({
  getArea: vi.fn((sides: number, lengthOfSides: number) => {
    // Simple mock implementation for testing
    return sides * lengthOfSides * 0.5;
  }),
}));

import { getArea } from './get-area';

type ContextWithPolygon = {
  polygon: Polygon;
};

describe('Polygon Class', () => {
  describe('Constructor', () => {
    it('should create a polygon with valid sides and length', () => {
      const polygon = new Polygon(3, 10);
      expect(polygon.sides).toBe(3);
      expect(polygon.lengthOfSides).toBe(10);
    });

    it('should throw error for sides less than 3', () => {
      expect(() => new Polygon(2, 10)).toThrow(
        'Polygons must have three or more sides.',
      );
      expect(() => new Polygon(1, 10)).toThrow(
        'Polygons must have three or more sides.',
      );
      expect(() => new Polygon(0, 10)).toThrow(
        'Polygons must have three or more sides.',
      );
      expect(() => new Polygon(-1, 10)).toThrow(
        'Polygons must have three or more sides.',
      );
    });

    it('should accept sides 3 and above', () => {
      expect(() => new Polygon(3, 10)).not.toThrow();
      expect(() => new Polygon(4, 10)).not.toThrow();
      expect(() => new Polygon(100, 10)).not.toThrow();
    });

    it('should accept zero and negative side lengths', () => {
      expect(() => new Polygon(3, 0)).not.toThrow();
      expect(() => new Polygon(3, -5)).not.toThrow();
    });
  });

  describe('type getter', () => {
    it.each([
      [3, 'triangle'],
      [4, 'quadrilateral'],
      [5, 'pentagon'],
      [6, 'hexagon'],
      [7, 'heptagon'],
      [8, 'octagon'],
      [9, 'nonagon'],
      [10, 'decagon'],
    ])('should return %s for polygon with %i sides', (sides, expectedType) => {
      const polygon = new Polygon(sides, 10);
      expect(polygon.type).toBe(expectedType);
    });

    it('should return undefined for sides not in named polygons', () => {
      const polygon = new Polygon(11, 10);
      expect(polygon.type).toBeUndefined();

      const polygon2 = new Polygon(100, 10);
      expect(polygon2.type).toBeUndefined();
    });
  });

  describe('sumOfAngles getter', () => {
    it.each([
      [3, 180], // triangle: 180 + (3-3) * 180 = 180
      [4, 360], // quadrilateral: 180 + (4-3) * 180 = 360
      [5, 540], // pentagon: 180 + (5-3) * 180 = 540
      [6, 720], // hexagon: 180 + (6-3) * 180 = 720
      [7, 900], // heptagon: 180 + (7-3) * 180 = 900
      [8, 1080], // octagon: 180 + (8-3) * 180 = 1080
      [9, 1260], // nonagon: 180 + (9-3) * 180 = 1260
      [10, 1440], // decagon: 180 + (10-3) * 180 = 1440
    ])(
      'should calculate correct sum of angles for %i-sided polygon',
      (sides, expectedSum) => {
        const polygon = new Polygon(sides, 10);
        expect(polygon.sumOfAngles).toBe(expectedSum);
      },
    );

    it('should work with non-standard polygon sides', () => {
      const polygon = new Polygon(15, 10);
      expect(polygon.sumOfAngles).toBe(180 + (15 - 3) * 180); // 2340
    });
  });

  describe('perimeter getter', () => {
    it('should calculate perimeter as sides * lengthOfSides', () => {
      const polygon = new Polygon(3, 10);
      expect(polygon.perimeter).toBe(30);
    });

    it.each([
      [3, 5, 15],
      [4, 7, 28],
      [6, 2.5, 15],
      [8, 0, 0],
    ])(
      'should calculate correct perimeter for %i sides with length %f',
      (sides, length, expectedPerimeter) => {
        const polygon = new Polygon(sides, length);
        expect(polygon.perimeter).toBe(expectedPerimeter);
      },
    );

    it('should handle negative side lengths', () => {
      const polygon = new Polygon(4, -5);
      expect(polygon.perimeter).toBe(-20);
    });
  });

  describe('area getter', () => {
    it('should call getArea function with correct parameters', () => {
      const polygon = new Polygon(3, 10);
      polygon.area;

      expect(getArea).toHaveBeenCalledWith(3, 10);
    });

    it('should return the result from getArea function', () => {
      const polygon = new Polygon(4, 5);
      const area = polygon.area;

      expect(area).toBe(4 * 5 * 0.5); // Based on our mock implementation
    });

    it('should call getArea each time area is accessed', () => {
      const polygon = new Polygon(3, 10);
      vi.clearAllMocks();

      polygon.area;
      polygon.area;

      expect(getArea).toHaveBeenCalledTimes(2);
    });
  });

  describe('toJSON method', () => {
    it('should return object with all polygon properties', () => {
      const polygon = new Polygon(3, 10);
      const json = polygon.toJSON();

      expect(json).toEqual({
        sides: 3,
        lengthOfSides: 10,
        sumOfAngles: 180,
        perimeter: 30,
        area: 15, // Based on mock implementation
      });
    });

    it('should include calculated values in JSON', () => {
      const polygon = new Polygon(4, 5);
      const json = polygon.toJSON();

      expect(json.sides).toBe(4);
      expect(json.lengthOfSides).toBe(5);
      expect(json.sumOfAngles).toBe(360);
      expect(json.perimeter).toBe(20);
      expect(json.area).toBe(10); // Based on mock implementation
    });

    it('should not include type in JSON', () => {
      const polygon = new Polygon(3, 10);
      const json = polygon.toJSON();

      expect(json).not.toHaveProperty('type');
    });
  });

  describe('Edge Cases and Boundary Values', () => {
    it('should handle very large side counts', () => {
      const polygon = new Polygon(1000, 1);
      expect(polygon.sides).toBe(1000);
      expect(polygon.perimeter).toBe(1000);
      expect(polygon.sumOfAngles).toBe(180 + (1000 - 3) * 180);
    });

    it('should handle very small side lengths', () => {
      const polygon = new Polygon(3, 0.001);
      expect(polygon.perimeter).toBe(0.003);
    });

    it('should handle very large side lengths', () => {
      const polygon = new Polygon(3, 1000000);
      expect(polygon.perimeter).toBe(3000000);
    });

    it('should handle decimal side lengths', () => {
      const polygon = new Polygon(4, 3.14159);
      expect(polygon.perimeter).toBe(4 * 3.14159);
    });
  });
});

describe('createPolygon', () => {
  it('should create an object that is an instance of the Polygon class', () => {
    const polygon = createPolygon('triangle', 20);
    expect(polygon).toBeInstanceOf(Polygon);
  });

  it.each([
    ['triangle', 3],
    ['quadrilateral', 4],
    ['pentagon', 5],
    ['hexagon', 6],
    ['heptagon', 7],
    ['octagon', 8],
    ['nonagon', 9],
    ['decagon', 10],
  ])('should create %s with correct number of sides', (type, expectedSides) => {
    const polygon = createPolygon(type as any, 10);
    expect(polygon.sides).toBe(expectedSides);
    expect(polygon.type).toBe(type);
  });

  it('should set the correct length of sides', () => {
    const polygon = createPolygon('triangle', 15);
    expect(polygon.lengthOfSides).toBe(15);
  });

  it('should work with zero side length', () => {
    const polygon = createPolygon('quadrilateral', 0);
    expect(polygon.lengthOfSides).toBe(0);
    expect(polygon.perimeter).toBe(0);
  });

  it('should work with negative side length', () => {
    const polygon = createPolygon('triangle', -5);
    expect(polygon.lengthOfSides).toBe(-5);
    expect(polygon.perimeter).toBe(-15);
  });
});

describe.each`
  polygonType        | sides | lengthOfSide | sumOfAngles | perimeter | area
  ${'triangle'}      | ${3}  | ${10}        | ${180}      | ${30}     | ${43.3012701892219}
  ${'quadrilateral'} | ${4}  | ${10}        | ${360}      | ${40}     | ${100}
  ${'pentagon'}      | ${5}  | ${10}        | ${540}      | ${50}     | ${172.047740058897}
  ${'hexagon'}       | ${6}  | ${10}        | ${720}      | ${60}     | ${259.807621135332}
  ${'heptagon'}      | ${7}  | ${10}        | ${900}      | ${70}     | ${363.391244400159}
  ${'octagon'}       | ${8}  | ${10}        | ${1080}     | ${80}     | ${482.842712474619}
  ${'nonagon'}       | ${9}  | ${10}        | ${1260}     | ${90}     | ${618.18241937729}
  ${'decagon'}       | ${10} | ${10}        | ${1440}     | ${100}    | ${769.420884293813}
`(
  '$polygonType',
  ({ polygonType, sides, lengthOfSide, sumOfAngles, perimeter, area }) => {
    beforeEach<ContextWithPolygon>((context) => {
      context.polygon = createPolygon(polygonType, lengthOfSide);
    });

    it<ContextWithPolygon>(`should have ${sides} sides`, async ({
      polygon,
    }) => {
      expect(polygon.sides).toBe(sides);
    });

    it<ContextWithPolygon>(`should have the correct type`, async ({
      polygon,
    }) => {
      expect(polygon.type).toBe(polygonType);
    });

    it<ContextWithPolygon>(`should have the correct sum of its angles`, async ({
      polygon,
    }) => {
      expect(polygon.sumOfAngles).toBe(sumOfAngles);
    });

    it<ContextWithPolygon>(`should have the correct perimeter`, async ({
      polygon,
    }) => {
      expect(polygon.perimeter).toBe(perimeter);
    });

    it<ContextWithPolygon>(`should have the correct area`, async ({
      polygon,
    }) => {
      expect(polygon.area).toBeCloseTo(area);
    });

    it<ContextWithPolygon>(`should generate JSON that matches the snapshot`, ({
      polygon,
    }) => {
      expect(polygon.toJSON()).toMatchSnapshot();
    });
  },
);
