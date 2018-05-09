import {MovieList} from './movie-list';

export interface Tab {
  name: string;
  listArray: MovieList[];
  listShowedIdx: number;
}
