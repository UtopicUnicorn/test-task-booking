import React from 'react';

import './styles/style.css';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Form } from '../../components/form';
import { BookingPropsInterface } from '../../model/booking-props.interface';
import { Container } from '../../components/container';
import { Text } from '../../components/text';

export default function Booking(props: BookingPropsInterface) {
  return (
    <Container style={{ backgroundImage: `url(${props.backgroundImage})` }}>
      <Form
        onSubmit={props.onSubmit}
        width={props.isNotMobile ? '30%' : '100%'}
        height={props.isNotMobile ? 'auto' : '100%'}>
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
            />
            <Input
              id={'lastName'}
              label={'Фамилия'}
              inputMode={'text'}
              onChange={props.onChange}
              value={props.form.lastName || ''}
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
            />
            <Input
              id={'lastName'}
              label={'Фамилия'}
              inputMode={'text'}
              onChange={props.onChange}
              value={props.form.lastName || ''}
            />
          </>
        )}

        <Input
          id={'phone'}
          placeholder={'+7'}
          inputMode={'tel'}
          onChange={props.onChange}
          value={props.form.phone}
        />
        <Input
          id={'mail'}
          placeholder={'Email'}
          inputMode={'email'}
          onChange={props.onChange}
          value={props.form.mail}
          background={'rgba(121,121,121,0.2)'}
        />
        <Input
          id={'flatsCount'}
          placeholder={'Количество помещений'}
          inputMode={'numeric'}
          onChange={props.onChange}
          value={props.form.flatsCount}
          background={'rgba(121,121,121,0.2)'}
        />
        <Button disabled={props.disabled} type={'submit'} title={props.buttonText} />
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
    </Container>
  );
}
