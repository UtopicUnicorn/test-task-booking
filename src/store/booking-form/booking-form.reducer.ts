import { AnyAction } from 'redux';
import { BookingFormInterface } from '../../model/booking-form.interface';

export const bookingFormInitialState: BookingFormInterface = {
  firstName: '',
  lastName: '',
  flatsCount: '',
  mail: '',
  phone: ''
};

export enum bookingFormActions {
  update = 'FORM_UPDATE'
}

export const bookingFormReducer = (state = bookingFormInitialState, action: AnyAction) => {
  switch (action.type) {
    case 'FORM_UPDATE': {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};
