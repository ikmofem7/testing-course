import { configureStore } from '@reduxjs/toolkit';
import reducer from './items-slice';

const configStore = () => {
  return configureStore({
    reducer: { items: reducer },
  });
};

const store = configStore();

type ApplicationState = ReturnType<typeof store.getState>;
type ApplicationDispatch = typeof store.dispatch;

export { configStore, store, ApplicationState, ApplicationDispatch };
