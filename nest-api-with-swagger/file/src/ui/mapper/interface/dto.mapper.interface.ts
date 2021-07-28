export interface IDTOMapper<DTO, Model> {
  serialize(item: Model): DTO;

  deserialize(item: DTO): Model;
}
