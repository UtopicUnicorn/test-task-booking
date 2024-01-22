import React, { useEffect, useState } from 'react';
import Booking from './booking';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  bookFlat,
  breakpoint,
  dayTimeTitleEnum,
  validationMessages
} from '../../constants/template.constants';
import { bookingFormActions } from '../../store/booking-form/booking-form.reducer';
import Validation from './service/validation';
import http from './service/http';
import { apiImagesActions } from '../../store/images/images.reducer';
import { ApiImagesInterface } from '../../model/api-images.interface';

export default function BookingPage() {
  const [dayTime, setDayTime] = useState(dayTimeTitleEnum.day);
  const [clientTime, setClientTime] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [buttonTitle, setButtonTitle] = useState(`${bookFlat.firstPart}`);
  const [isNotMobile, setIsNotMobile] = useState(window.screen.width > breakpoint);

  const [apiCallResult, setApiCallResult] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  const form = useSelector((state: RootState) => state.bookingForm);
  const apiImages = useSelector((state: RootState) => state.apiImages);
  const dispatch = useDispatch();

  const [selectedImageItem, steSelectedImageItem] = useState<null | ApiImagesInterface>();
  const [url, setUrl] = useState<string | undefined>('');

  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    mail: '',
    flatsCount: ''
  });

  useEffect(() => {
    buttonTextChanger();
  }, [form.flatsCount]);

  useEffect(() => {
    generateTitle();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsNotMobile(window.screen.width > breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    getRandomImage();
  }, [apiImages]);

  useEffect(() => {
    return isNotMobile ? setUrl(selectedImageItem?.desktop) : setUrl(selectedImageItem?.mobile);
  }, [isNotMobile, selectedImageItem]);

  //update button title with amount of flats
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
        //validate only numbers and dispatch
        dispatch({ type: bookingFormActions.update, payload: { [name]: value.replace(/\D/, '') } });
        break;
      }
      case 'phone': {
        //validate phone number and dispatch
        dispatch({
          type: bookingFormActions.update,
          payload: { [name]: Validation.phoneInput(e) }
        });
        break;
      }
      default:
        dispatch({ type: bookingFormActions.update, payload: { [name]: value } });
    }
  };

  //deleting first elements of phone number
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'phone') {
      if (
        e.key == 'Backspace' &&
        (e.target as HTMLInputElement).value.replace(/\D/g, '').length == 1
      ) {
        dispatch({
          type: bookingFormActions.update,
          payload: { [e.currentTarget.name]: '' }
        });
      }
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

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
    setLoading(true);
    setDisabled(true);
    http
      .post(consoleObject)
      .then(() => {
        setApiCallResult(true);
      })
      .catch(() => {
        setApiCallResult(false);
      })
      .finally(() => {
        setLoading(false);
        setDisabled(false);
      });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      firstName: '',
      lastName: '',
      phone: '',
      mail: '',
      flatsCount: ''
    };
    if (!Validation.emailValidation(form.mail)) {
      errors.mail = validationMessages.mail;
      valid = false;
    }
    if (!Validation.phoneNumberValidation(form.phone)) {
      errors.phone = validationMessages.phone;
      valid = false;
    }
    if (!Validation.nameValidation(form.firstName)) {
      errors.firstName = validationMessages.input;
      valid = false;
    }
    if (!Validation.nameValidation(form.lastName)) {
      errors.lastName = validationMessages.input;
      valid = false;
    }
    if (form.flatsCount === '' || Number(form.flatsCount) < 1) {
      errors.flatsCount = validationMessages.input;
      valid = false;
    }
    setFormError({ ...formError, ...errors });
    return valid;
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

  const getImages = () => {
    http
      .getImages()
      .then(async (data) => {
        dispatch({ type: apiImagesActions.update, payload: data.data });
      })
      .catch((e) => {
        console.log('error receiving an error on image download', e);
      });
  };

  const getRandomImage = () => {
    const length = apiImages.length;
    if (length === 0) return;
    const generated = Math.ceil(Math.random() * (length - 1));
    return steSelectedImageItem(apiImages[generated]);
  };

  return (
    <Booking
      title={dayTime}
      time={clientTime}
      onChange={onChange}
      onSubmit={onSubmit}
      backgroundImage={url ? selectedImageItem?.desktop : ''}
      buttonText={buttonTitle}
      disabled={disabled}
      form={form}
      isNotMobile={isNotMobile}
      requestResult={apiCallResult}
      loading={loading}
      errors={formError}
      onKeyDown={onKeyDown}
    />
  );
}
