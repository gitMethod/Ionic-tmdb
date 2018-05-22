export class AppSettings {
  public static API_KEY= '?api_key=dbb539c09bc6d9e2e9e6bf360b705e5b';
  public static API_BASE= 'https://api.themoviedb.org/3/';
  public static LANGUAGE= '&language=en-US';
  public static IMAGE= 'http://image.tmdb.org/t/p/w154';

  public static MOVIES_POPULAR_ENDPOINT= AppSettings.API_BASE+'discover/movie'+AppSettings.API_KEY +AppSettings.LANGUAGE
  +'&sort_by=popularity.desc&include_adult=false';
  public static MOVIES_TOP_RATED_ENDPOINT= AppSettings.API_BASE+'discover/movie'+AppSettings.API_KEY +AppSettings.LANGUAGE
  +'&vote_count.gte=100&sort_by=vote_average.desc&include_adult=false';
  public static MOVIES_NOW_PLAYING_ENDPOINT= AppSettings.API_BASE+'movie/now_playing'+AppSettings.API_KEY +AppSettings.LANGUAGE;
  public static MOVIES_UPCOMING_ENDPOINT= AppSettings.API_BASE+'movie/upcoming'+AppSettings.API_KEY +AppSettings.LANGUAGE;

  public static TV_POPULAR= AppSettings.API_BASE+'discover/tv'+AppSettings.API_KEY +AppSettings.LANGUAGE
    +'&sort_by=popularity.desc&include_adult=false';
  public static TV_TOP_RATED= AppSettings.API_BASE+'discover/tv'+AppSettings.API_KEY +AppSettings.LANGUAGE
    +'&vote_count.gte=100&sort_by=vote_average.desc&include_adult=false';
  public static TV_ON_THE_AIR= AppSettings.API_BASE+'tv/on_the_air'+AppSettings.API_KEY +AppSettings.LANGUAGE;
  public static TV_AIRING_TODAY= AppSettings.API_BASE+'tv/airing_today'+AppSettings.API_KEY +AppSettings.LANGUAGE;

  public static PEOPLE_POPULAR= AppSettings.API_BASE+'person/popular'+AppSettings.API_KEY +AppSettings.LANGUAGE;

}
