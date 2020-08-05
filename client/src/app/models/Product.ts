import {Price} from './Price';

export class Product {
  id: number;
  userId: number;
  name: string;
  description: string;
  imgPath: string;
  imgUrl: string;
  prices: Price[];
}
