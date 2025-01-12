// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render } from 'test/utilities';
import { screen } from '@testing-library/react';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const initialCount = 25;
  render(<Counter initialCount={initialCount} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent(initialCount.toString());
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const initialCount = 25;
  const { user } = render(<Counter initialCount={initialCount} />);
  const resetButton = screen.getByRole('button', { name: /reset/i });
  const currentCount = screen.getByTestId('current-count');
  await user.click(resetButton);
  expect(currentCount).toHaveTextContent('0');
});
