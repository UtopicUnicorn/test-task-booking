import React from 'react';

import './styles/style.css';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Form } from '../../components/form';
import { BookingPropsInterface } from '../../model/booking-props.interface';
import { Container } from '../../components/container';
import { Text } from '../../components/text';
import { RequestResultContainer } from '../../components/request-result-container';
import { requestResult } from '../../constants/template.constants';
import successImage from '../../assets/success.svg';
import failImage from '../../assets/fail.svg';

export default function Booking(props: BookingPropsInterface) {
  return (
    <Container
      style={{ backgroundImage: `url(${props.backgroundImage})`, backgroundRepeat: 'no-repeat' }}>
      {props.requestResult === null ? (
        <Form
          onSubmit={props.onSubmit}
          width={props.isNotMobile ? '30%' : '80%'}
          height={props.isNotMobile ? 'auto' : 'auto'}>
          <Text color={'#000'} fontSize={44} lineHeight={48} fontWeight={600}>
            {props.title}
          </Text>
          <Text
            align={'center'}
            width={'70%'}
            color={'#000'}
            fontSize={16}
            lineHeight={24}
            fontWeight={400}>
            Для бронирония помещений заполните форму
          </Text>
          {props.isNotMobile ? (
            <div className="pairBlock">
              <Input
                id={'firstName'}
                background={'rgba(121,121,121,0.2)'}
                placeholder={'Ваше имя'}
                inputMode={'text'}
                value={props.form.firstName || ''}
                onChange={props.onChange}
                error={props.errors.firstName}
              />
              <Input
                id={'lastName'}
                label={'Фамилия'}
                inputMode={'text'}
                onChange={props.onChange}
                value={props.form.lastName || ''}
                error={props.errors.lastName}
              />
            </div>
          ) : (
            <>
              <Input
                id={'firstName'}
                placeholder={'Ваше имя'}
                inputMode={'text'}
                onChange={props.onChange}
                value={props.form.firstName || ''}
                background={'rgba(121,121,121,0.2)'}
                error={props.errors.firstName}
              />
              <Input
                id={'lastName'}
                label={'Фамилия'}
                inputMode={'text'}
                onChange={props.onChange}
                value={props.form.lastName || ''}
                error={props.errors.lastName}
              />
            </>
          )}

          <Input
            id={'phone'}
            placeholder={'+7'}
            inputMode={'tel'}
            onChange={props.onChange}
            value={props.form.phone}
            error={props.errors.phone}
            onKeyDown={props.onKeyDown}
          />
          <Input
            id={'mail'}
            placeholder={'Email'}
            inputMode={'email'}
            onChange={props.onChange}
            value={props.form.mail}
            background={'rgba(121,121,121,0.2)'}
            error={props.errors.mail}
          />
          <Input
            id={'flatsCount'}
            placeholder={'Количество помещений'}
            inputMode={'numeric'}
            onChange={props.onChange}
            value={props.form.flatsCount}
            background={'rgba(121,121,121,0.2)'}
            error={props.errors.flatsCount}
          />
          <Button
            loading={props.loading}
            disabled={props.disabled}
            type={'submit'}
            title={props.buttonText}
          />
          <Text
            width={'80%'}
            lineHeight={16}
            fontSize={12}
            color={'#000'}
            fontWeight={400}
            align={'center'}>
            Это дисклеймер, который есть во всех формах
          </Text>
        </Form>
      ) : (
        <RequestResultContainer
          width={props.isNotMobile ? '30%' : '80%'}
          height={props.isNotMobile ? 'auto' : '80%'}>
          {props.requestResult ? (
            <>
              <Text color={'#000'} fontSize={44} lineHeight={48} fontWeight={600}>
                {requestResult.success}
              </Text>
              <img src={successImage} alt={''} />
            </>
          ) : (
            <>
              <Text color={'#000'} fontSize={44} lineHeight={48} fontWeight={600}>
                {requestResult.fail}
              </Text>
              <img src={failImage} alt={''} />
            </>
          )}
        </RequestResultContainer>
      )}
    </Container>
  );
}
