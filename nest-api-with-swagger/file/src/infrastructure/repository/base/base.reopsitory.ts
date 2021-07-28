import { IRepository } from '../interface/repository.interface';
import { Repository } from 'typeorm';

export abstract class BaseRepository<Entity, ID>
  implements IRepository<Entity, ID>
{
  protected constructor(readonly _repository: Repository<Entity>) {}

  async create(item: Entity): Promise<Entity> {
    return await this._repository.save(item);
  }

  async find(): Promise<Entity[]> {
    return await this._repository.find();
  }

  async findById(id: ID): Promise<Entity> {
    return await this._repository.findOne(id);
  }

  async update(id: ID, item: Entity): Promise<Entity> {
    await this._repository.update(id, item);
    return this.findById(id);
  }

  async delete(id: ID): Promise<void> {
    await this._repository.delete(id);
  }

  async checkExists(params: any): Promise<boolean> {
    const result: Entity = await this._repository.findOne(params);
    return !!result;
  }
}
