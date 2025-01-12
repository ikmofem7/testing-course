import { render, screen } from 'test/utilities';
import { PackingList } from '.';
import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { configStore } from './store';

const renderWithProviders = (ui: ReactElement) => {
  const store = configStore();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, {
    wrapper: Wrapper,
  });
};

it('renders the Packing List application', () => {
  renderWithProviders(<PackingList />);
});

it('has the correct title', async () => {
  renderWithProviders(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  renderWithProviders(<PackingList />);
  screen.getByLabelText(/new item name/i);
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  renderWithProviders(<PackingList />);
  const itemInput = screen.getByLabelText(/new item name/i);
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });

  expect(itemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = renderWithProviders(<PackingList />);
  const itemInput = screen.getByLabelText(/new item name/i);
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  await user.type(itemInput, 'MacBook Pro');
  expect(addNewItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = renderWithProviders(<PackingList />);
  const itemInput = screen.getByLabelText(/new item name/i);
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  await user.type(itemInput, 'MacBook Pro');
  expect(addNewItemButton).toBeEnabled();
  await user.click(addNewItemButton);
  const item = screen.getByLabelText('MacBook Pro');

  expect(item).toBeInTheDocument();
  expect(item).not.toBeChecked();
});

it('remove the item from list', async () => {
  const { user } = renderWithProviders(<PackingList />);
  const itemInput = screen.getByLabelText(/new item name/i);
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });
  await user.type(itemInput, 'MacBook Pro');
  expect(addNewItemButton).toBeEnabled();
  await user.click(addNewItemButton);
  const item = screen.getByLabelText('MacBook Pro');

  expect(item).toBeInTheDocument();
  expect(item).not.toBeChecked();
});
