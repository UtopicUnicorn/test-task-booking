import React from 'react';
import { BookingFormInterface } from './booking-form.interface';

export interface BookingPropsInterface {
  backgroundImage: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  time: boolean;
  buttonText: string;
  disabled: boolean;
  isNotMobile: boolean;
  form: BookingFormInterface;
}
