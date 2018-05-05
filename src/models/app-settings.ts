export class AppSettings {
  public static API_KEY= 'dbb539c09bc6d9e2e9e6bf360b705e5b';

  public static MOVIES_POPULAR_ENDPOINT='https://api.themoviedb.org/3/movie/popular?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static MOVIES_NOW_PLAYING_ENDPOINT='https://api.themoviedb.org/3/movie/now_playing?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static MOVIES_TOP_RATED_ENDPOINT='https://api.themoviedb.org/3/movie/top_rated?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static MOVIES_UPCOMING_ENDPOINT='https://api.themoviedb.org/3/movie/upcoming?api_key='+AppSettings.API_KEY+'&language=en-US&page=';

  public static TV_POPULAR='https://api.themoviedb.org/3/tv/popular?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static TV_TOP_RATED='https://api.themoviedb.org/3/tv/top_rated?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static TV_ON_THE_AIR='https://api.themoviedb.org/3/tv/on_the_air?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
  public static TV_AIRING_TODAY='https://api.themoviedb.org/3/tv/airing_today?api_key='+AppSettings.API_KEY+'&language=en-US&page=';

  public static PEOPLE_POPULAR='https://api.themoviedb.org/3/person/popular?api_key='+AppSettings.API_KEY+'&language=en-US&page=';
}
