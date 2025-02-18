import { test, expect, vi } from 'vitest';
import { log } from './log';

test('it spies on the multiply method', () => {
  const mock = vi.fn((x: string) => {
    if (x) {
      return x.repeat(2);
    }
  });
  const result = mock('2');
  vi.spyOn(console, 'log');
  log('log', 1, 2, 3);
  expect(mock).toHaveBeenCalledWith('2');
  expect(result).toMatchInlineSnapshot('"22"');
  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});
