import { AnyAction } from 'redux';
import { ApiImagesInterface } from '../../model/api-images.interface';

export const imagesInitialState: ApiImagesInterface[] = [];

export enum apiImagesActions {
  update = 'IMAGES_UPDATE'
}

export const apiImagesReducer = (state = imagesInitialState, action: AnyAction) => {
  switch (action.type) {
    case apiImagesActions.update: {
      state = [];
      state.push(...action.payload);
      return state;
    }
    default: {
      return state;
    }
  }
};
