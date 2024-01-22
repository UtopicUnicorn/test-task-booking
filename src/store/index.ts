import { combineReducers, createStore } from 'redux';
import { bookingFormReducer } from './booking-form/booking-form.reducer';
import { apiImagesReducer } from './images/images.reducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  bookingForm: bookingFormReducer,
  apiImages: apiImagesReducer
});

export default rootReducer;

export const store = createStore(rootReducer);
