import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

beforeEach(() => {
  vi.setSystemTime(1739855180307);
});

afterEach(() => {
  vi.useRealTimers();
});
test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  const { container } = render(<TimeZone />);
  expect(container).toMatchSnapshot();
});
