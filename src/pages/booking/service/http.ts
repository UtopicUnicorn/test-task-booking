import axios from 'axios';
import { imagesUrl, postUrl } from '../../../constants/api.constants';
import { OrderInterface } from '../../../model/order.interface';

export default {
  getImages() {
    return axios.get(imagesUrl);
  },
  post(object: OrderInterface) {
    return axios.post(postUrl, object);
  }
};
