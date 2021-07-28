export interface IService<Model> {
  create(item: Model): Promise<Model>;

  find(): Promise<Model[]>;

  findById(id: number): Promise<Model>;

  update(id: number, item: Model): Promise<Model>;

  delete(id: number): Promise<void>;
}
