export interface IModelMapper<Model, Entity> {
  serialize(item: Entity): Model;

  deserialize(item: Model): Entity;
}
