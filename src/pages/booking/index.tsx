import React, { useEffect, useState } from 'react';
import Booking from './booking';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  bookFlat,
  breakpoint,
  dayImageUrl,
  dayTimeTitleEnum,
  nightImageUrl
} from '../../constants/template.constants';
import { bookingFormActions } from '../../store/booking-form/booking-form.reducer';

export default function BookingPage() {
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [dayTime, setDayTime] = useState(dayTimeTitleEnum.day);
  const [clientTime, setClientTime] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [buttonTitle, setButtonTitle] = useState(`${bookFlat.firstPart}`);

  const form = useSelector((state: RootState) => state.bookingForm);

  const dispatch = useDispatch();

  const url = clientTime ? dayImageUrl : nightImageUrl;

  useEffect(() => {
    checkValid();
  }, [form]);

  useEffect(() => {
    buttonTextChanger();
  }, [form.flatsCount]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.screen.width);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const checkValid = () => {
    if (
      form.firstname != '' &&
      form.lastName != '' &&
      form.mail != '' &&
      Number(form.flatsCount) > 0 &&
      form.flatsCount != '' &&
      form.phone != ''
    )
      return setDisabled(false);
    return setDisabled(true);
  };

  const buttonTextChanger = () => {
    if (form.flatsCount <= 1) return setButtonTitle(bookFlat.oneFlat);
    else if (form.flatsCount > 1 && form.flatsCount <= 4)
      return setButtonTitle(
        `${bookFlat.firstPart} ${form.flatsCount} ${bookFlat.secondLittlePart}`
      );
    else
      return setButtonTitle(
        `${bookFlat.firstPart}  ${form.flatsCount} ${bookFlat.secondALotOfPart}`
      );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'flatsCount': {
        //validate only numbers
        dispatch({ type: bookingFormActions.update, payload: { [name]: value.replace(/\D/, '') } });
        break;
      }
      default:
        dispatch({ type: bookingFormActions.update, payload: { [name]: value } });
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user = {
      firstName: form.firstName,
      lastName: form.lastName,
      mail: form.mail,
      phone: form.phone
    };

    const order = {
      flatsCount: Number(form.flatsCount),
      time: new Date().getTime()
    };

    const consoleObject = { user: user, order: order };
    console.log(consoleObject);
  };

  const generateTitle = () => {
    const hours = new Date().getHours();
    if (hours >= 18 && hours < 24) {
      setDayTime(dayTimeTitleEnum.evening);
      setClientTime(false);
    } else if (hours >= 12 && hours < 18) {
      setDayTime(dayTimeTitleEnum.day);
    } else if (hours >= 6 && hours < 12) {
      setDayTime(dayTimeTitleEnum.morning);
      setClientTime(true);
    } else if (hours >= 0 && hours < 6) {
      setDayTime(dayTimeTitleEnum.night);
    }
  };
  useEffect(() => {
    generateTitle();
  }, []);

  return (
    <Booking
      title={dayTime}
      time={clientTime}
      onChange={onChange}
      onSubmit={onSubmit}
      backgroundImage={url}
      buttonText={buttonTitle}
      disabled={disabled}
      form={form}
      isNotMobile={windowSize > breakpoint}
    />
  );
}
