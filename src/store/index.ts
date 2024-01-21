import { combineReducers, createStore } from 'redux';
import { bookingFormReducer } from './booking-form/booking-form.reducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  bookingForm: bookingFormReducer
});

export default rootReducer;

export const store = createStore(rootReducer);
