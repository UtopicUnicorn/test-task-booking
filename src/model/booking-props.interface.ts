import React from 'react';
import { BookingFormInterface } from './booking-form.interface';

export interface BookingPropsInterface {
  backgroundImage: string | undefined;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  time: boolean;
  buttonText: string;
  disabled: boolean;
  isNotMobile: boolean;
  form: BookingFormInterface;
  requestResult: null | boolean;
  loading: boolean;
  errors: BookingFormInterface;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
