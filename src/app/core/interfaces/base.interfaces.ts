export interface IBaseInterface<T> {
  get(): T[];
  getById(id: number): T | null;
  add(item: T): boolean;
  update(item: T): boolean;
  delete(id: number): boolean;
}
