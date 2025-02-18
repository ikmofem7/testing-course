import { axe, toHaveNoViolations } from 'jest-axe';
import ObstacleCourse from '.';
import { render } from 'test/utilities';

expect.extend(toHaveNoViolations);

it('should demonstrate this matcher`s usage', async () => {
  const { container } = render(<ObstacleCourse />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
