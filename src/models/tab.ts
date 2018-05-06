import {List} from './list';

export interface Tab {
  name: string;
  listArray: List[];
  listShowedIdx: number;
}
