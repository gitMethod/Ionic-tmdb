export class AppList {
  private _name: string;
  private _responsePage: number;
  private _apiUrl: string;
  private _maxRange: number;
  private _minRange: number;


  constructor(name: string, apiUrl: string) {
    this._name = name;
    this._responsePage = 1;
    this._apiUrl = apiUrl;
    this._maxRange = (new Date()).getFullYear();
    this._minRange = 1900;
  }


  get name(): string {
    return this._name;
  }

  get responsePage(): number {
    return this._responsePage;
  }

  set responsePage(value: number) {
    this._responsePage = value;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  get maxRange(): number {
    return this._maxRange;
  }

  set maxRange(value: number) {
    this._maxRange = value;
  }

  get minRange(): number {
    return this._minRange;
  }

  set minRange(value: number) {
    this._minRange = value;
  }
}
