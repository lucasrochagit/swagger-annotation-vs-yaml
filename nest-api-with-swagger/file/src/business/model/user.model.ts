export class UserModel {
  private _id: number;
  private _name: string;
  private _age: number;
  private _job: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get job(): string {
    return this._job;
  }

  set job(value: string) {
    this._job = value;
  }
}
