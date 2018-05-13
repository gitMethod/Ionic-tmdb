export class AppList {
  private _name: string;
  private _responsePage: number;
  private _apiUrl: string;
  private _maxRange: string;
  private _minRange: string;


  constructor(name: string, apiUrl: string) {
    this._name = name;
    this._responsePage = 1;
    this._apiUrl = apiUrl;
    this._maxRange = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().substring(0, 10);
    this._minRange = '1900';
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

  get maxRange(): string {
    return this._maxRange;
  }

  set maxRange(value: string) {
    this._maxRange = value;
  }

  get minRange(): string {
    return this._minRange;
  }

  set minRange(value: string) {
    this._minRange = value;
  }
}
