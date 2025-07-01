type PersonOptions = {
  firstName: string;
  middleName?: string;
  lastName?: string;
  age?: string | number;
};

export const parseFullName = (fullName: string): PersonOptions => {
  if (!fullName.length) throw new Error('fullName cannot be an empty string.');

  const parts = fullName.split(' ').filter((part) => part.length > 0);

  if (parts.length === 0) {
    return { firstName: '', middleName: undefined, lastName: undefined };
  }

  const [firstName, ...rest] = parts;
  const lastName = rest.pop();
  let middleName: string | undefined;

  if (rest.length) {
    middleName = rest.join(' ');
  }

  return { firstName, middleName, lastName };
};

export const createPerson = (options: PersonOptions | string) => {
  return new Person(options);
};

export const areFriends = (a: Person, b: Person): boolean => {
  return a.friends.has(b);
};

export const isFriendOfFriend = (a: Person, b: Person): boolean => {
  for (const friend of a.friends) {
    if (areFriends(friend, b)) return true;
    if (isFriendOfFriend(b, friend)) return true;
  }

  return false;
};

export class Person {
  firstName: string;
  middleName?: string;
  lastName?: string;
  friends: Set<Person> = new Set();

  constructor(args: PersonOptions | string) {
    if (typeof args === 'string') {
      args = parseFullName(args);
    }

    const { firstName, middleName, lastName, age } = args;

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }

  get fullName() {
    let fullName = this.firstName;
    if (this.middleName) fullName = `${fullName} ${this.middleName}`;
    if (this.lastName) fullName = `${fullName} ${this.lastName}`;
    return fullName;
  }

  set fullName(fullName: string) {
    const { firstName, middleName, lastName } = parseFullName(fullName);

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }

  addFriend(friend: Person) {
    this.friends.add(friend);
    friend.friends.add(this);
  }

  removeFriend(formerFriend: Person) {
    this.friends.delete(formerFriend);
    formerFriend.friends.delete(this);
  }
}
