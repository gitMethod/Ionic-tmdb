export class AppSettings {
  public static API_KEY= 'dbb539c09bc6d9e2e9e6bf360b705e5b';

  public static POPULAR_ENDPOINT='https://api.themoviedb.org/3/movie/popular?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static NOW_PLAYING_ENDPOINT='https://api.themoviedb.org/3/movie/now_playing?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static TOP_RATED_ENDPOINT='https://api.themoviedb.org/3/movie/top_rated?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static UPCOMING_ENDPOINT='https://api.themoviedb.org/3/movie/upcoming?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
}
