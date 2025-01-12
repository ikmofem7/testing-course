import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Input from './Input';

expect.extend(toHaveNoViolations);

test('Input', async () => {
  const { container } = render(<Input />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
