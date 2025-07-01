import { describe, expect, it, test, beforeEach } from 'vitest';
import {
  areFriends,
  createPerson,
  isFriendOfFriend,
  Person,
  parseFullName,
} from './person';

const names = [
  {
    firstName: 'Madonna',
    middleName: undefined,
    lastName: undefined,
    fullName: 'Madonna',
  },

  {
    firstName: 'Madonna',
    middleName: undefined,
    lastName: 'Cicone',
    fullName: 'Madonna Cicone',
  },

  {
    firstName: 'Madonna',
    middleName: 'Louise',
    lastName: 'Cicone',
    fullName: 'Madonna Louise Cicone',
  },
] as const;

describe('Person', () => {
  test.each(names)(
    'creating a person with {firstName: $firstName, middleName: $middleName, lastName: $lastName} results in a full name of $fullName',
    ({ firstName, middleName, lastName, fullName }) => {
      const person = new Person({ firstName, middleName, lastName });
      expect(person.fullName).toBe(fullName);
    },
  );

  test.each(names)(
    'creating a person with full name of $fullName parses to [$firstName, $middleName, $lastName]',
    ({ firstName, middleName, lastName, fullName }) => {
      const person = new Person(fullName);
      expect(person.firstName).toBe(firstName);
      expect(person.middleName).toBe(middleName);
      expect(person.lastName).toBe(lastName);
    },
  );

  test.each(names)(
    'updating a full name parses correctly',
    ({ firstName, middleName, lastName, fullName }) => {
      const person = new Person('Cher');

      person.fullName = fullName;

      expect(person.fullName).toBe(fullName);
      expect(person.firstName).toBe(firstName);
      expect(person.middleName).toBe(middleName);
      expect(person.lastName).toBe(lastName);
    },
  );

  it('will throw if you provide an empty string', () => {
    expect(() => {
      new Person('');
    }).toThrow();
  });

  it('will throw a specific error message if you provide an empty string', () => {
    const errorMessage = 'fullName cannot be an empty string';

    expect(() => {
      new Person('');
    }).toThrowError(errorMessage);
  });

  it('will add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(john.friends).contain(paul);
  });

  it('will mutually add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(paul.friends).contain(john);
  });

  it('will remove a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    expect(john.friends).not.contain(paul);
  });

  it('will mutually remove friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    expect(paul.friends).not.contain(john);
  });
});

describe('createPerson', () => {
  it('should create an instance of a Person', () => {
    expect(createPerson('Brendan Kelly')).toBeInstanceOf(Person);
  });
});

describe('isFriend', () => {
  it('return true if two people are friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(areFriends(john, paul)).toBe(true);
  });
});

describe('isFriendOfFriend', () => {
  const john = new Person('John Lennon');
  const paul = new Person('Paul McCartney');
  const george = new Person('George Harrison');
  const ringo = new Person('Ringo Starr');
  const benjamin = new Person('Benjamin Oliver');

  john.addFriend(paul);
  paul.addFriend(george);
  george.addFriend(ringo);

  it.each([
    { source: john, target: paul, knowEachOther: true },
    { source: john, target: george, knowEachOther: true },
    { source: john, target: ringo, knowEachOther: true },
    { source: john, target: benjamin, knowEachOther: false },
  ])(
    'is $knowEachOther that $source.fullName knows $target.fullName',
    ({ source, target, knowEachOther }) => {
      expect(isFriendOfFriend(source, target)).toBe(knowEachOther);
    },
  );
});

describe('parseFullName', () => {
  describe('domain logic', () => {
    it('parses three-part name correctly', () => {
      const result = parseFullName('John Michael Doe');
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
      });
    });

    it('parses two-part name correctly', () => {
      const result = parseFullName('Jane Smith');
      expect(result).toEqual({
        firstName: 'Jane',
        middleName: undefined,
        lastName: 'Smith',
      });
    });
  });

  describe('logic paths', () => {
    it('handles single name (first name only)', () => {
      const result = parseFullName('Alice');
      expect(result).toEqual({
        firstName: 'Alice',
        middleName: undefined,
        lastName: undefined,
      });
    });

    it('handles multiple middle names', () => {
      const result = parseFullName('John Michael James Doe');
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'Michael James',
        lastName: 'Doe',
      });
    });

    it('handles names with extra spaces', () => {
      const result = parseFullName('  John   Doe  ');
      expect(result).toEqual({
        firstName: 'John',
        middleName: undefined,
        lastName: 'Doe',
      });
    });
  });

  describe('edge cases', () => {
    it('throws error for empty string', () => {
      expect(() => parseFullName('')).toThrow(
        'fullName cannot be an empty string.',
      );
    });

    it('handles whitespace-only string', () => {
      const result = parseFullName('   ');
      expect(result).toEqual({
        firstName: '',
        middleName: undefined,
        lastName: undefined,
      });
    });

    it('handles single character names', () => {
      const result = parseFullName('A');
      expect(result).toEqual({
        firstName: 'A',
        middleName: undefined,
        lastName: undefined,
      });
    });
  });

  describe('boundary conditions', () => {
    it('handles very long names', () => {
      const longName =
        'John Michael James Robert William David Richard Joseph Thomas Christopher Daniel Paul Mark Donald George Kenneth Steven Edward Brian Ronald Anthony Kevin Jason Matthew Gary Timothy Jose Larry Jeffrey Frank Scott Eric Stephen Andrew Raymond Gregory Joshua Jerry Dennis Walter Peter Harold Douglas Henry Carl Arthur Ryan Roger Joe Juan Jack Albert Jonathan Justin Terry Gerald Keith Samuel Willie Ralph Lawrence Nicholas Roy Benjamin Bruce Brandon Adam Harry Fred Wayne Billy Steve Louis Jeremy Aaron Randy Howard Eugene Carlos Russell Bobby Victor Martin Ernest Phillip Todd Jesse Craig Alan Shawn Clarence Sean Philip Chris Johnny Earl Jimmy Antonio Danny Bryan Tony Luis Mike Stanley Leonard Nathan Dale Manuel Rodney Curtis Norman Allen Marvin Vincent Glenn Jeffery Travis Jeff Chad Jacob Lee Melvin Alfred Kyle Francis Bradley Jesus Herbert Frederick Ray Joel Edwin Don Eddie Ricky Troy Randall Barry Alexander Bernard Mario Leroy Francisco Marcus Micheal Theodore Clifford Miguel Jamal Jody Byron Ed Cole Quinn Denny Davis Gavin Emery Emerson Grant Kody Luis Malcolm Solomon Grady Noe Ahmed Samir Darian Pierce Urijah Nehemiah Azariah Malaki Devin Skylar Pierce Armani Hassan Jamison Kyson Sanai Makhi Bodhi Colson Chaim Dominik Hendrix Atticus Zahir Ayaan Dylan Luis Malcolm Solomon Grady Noe Ahmed Samir Darian Pierce Urijah Nehemiah Azariah Malaki Devin Skylar Pierce Armani Hassan Jamison Kyson Sanai Makhi Bodhi Colson Chaim Dominik Hendrix Atticus Zahir Ayaan Dylan';
      const result = parseFullName(longName);
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Dylan');
      expect(result.middleName).toBeDefined();
      expect(result.middleName?.length).toBeGreaterThan(100);
    });

    it('handles names with special characters', () => {
      const result = parseFullName("Jean-Pierre O'Connor");
      expect(result).toEqual({
        firstName: 'Jean-Pierre',
        middleName: undefined,
        lastName: "O'Connor",
      });
    });

    it('handles names with numbers', () => {
      const result = parseFullName('John 2nd Smith');
      expect(result).toEqual({
        firstName: 'John',
        middleName: '2nd',
        lastName: 'Smith',
      });
    });

    it('handles names with unicode characters', () => {
      const result = parseFullName('José María García');
      expect(result).toEqual({
        firstName: 'José',
        middleName: 'María',
        lastName: 'García',
      });
    });

    it('handles names with multiple consecutive spaces', () => {
      const result = parseFullName('John    Doe');
      expect(result).toEqual({
        firstName: 'John',
        middleName: undefined,
        lastName: 'Doe',
      });
    });

    it('handles names with tabs and newlines', () => {
      const result = parseFullName('John\tDoe\nSmith');
      expect(result).toEqual({
        firstName: 'John\tDoe\nSmith',
        middleName: undefined,
        lastName: undefined,
      });
    });

    it('handles extremely long single word names', () => {
      const longWord = 'A'.repeat(1000);
      const result = parseFullName(longWord);
      expect(result).toEqual({
        firstName: longWord,
        middleName: undefined,
        lastName: undefined,
      });
    });

    it('handles names with punctuation marks', () => {
      const result = parseFullName('Dr. John Smith, Jr.');
      expect(result).toEqual({
        firstName: 'Dr.',
        middleName: 'John Smith,',
        lastName: 'Jr.',
      });
    });

    it('handles names with emojis', () => {
      const result = parseFullName('John 🎭 Smith');
      expect(result).toEqual({
        firstName: 'John',
        middleName: '🎭',
        lastName: 'Smith',
      });
    });
  });
});
