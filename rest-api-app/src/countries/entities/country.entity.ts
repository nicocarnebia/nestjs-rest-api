import { Table, Column, Model, PrimaryKey, HasOne } from 'sequelize-typescript';
import { City } from 'src/cities/entities/city.entity';

@Table
export class Country extends Model {
  @PrimaryKey
  @Column
  id!: number;
  @HasOne(() => City)
  @Column
  cityId: number;
  @Column
  street: string;
}
