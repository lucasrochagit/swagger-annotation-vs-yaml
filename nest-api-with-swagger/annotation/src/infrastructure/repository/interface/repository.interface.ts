export interface IRepository<Entity, ID> {
  create(item: Entity): Promise<Entity>;

  find(): Promise<Entity[]>;

  findById(id: ID): Promise<Entity>;

  update(id: ID, item: Entity): Promise<Entity>;

  delete(id: ID): Promise<void>;

  checkExists(params: any): Promise<boolean>;
}
