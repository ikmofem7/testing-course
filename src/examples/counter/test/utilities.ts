// @vitest-environment jsdom

import { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/**
 * For a complete example, see: test/utilities.ts
 */

const render = (
  ui: ReactElement,
  options?: Parameters<typeof renderComponent>[1],
) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};
export { render };
