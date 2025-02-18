import Counter from '.';
import { render, screen } from 'test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  await user.click(incrementButton);
  expect(currentCount).toHaveTextContent('1');
});
