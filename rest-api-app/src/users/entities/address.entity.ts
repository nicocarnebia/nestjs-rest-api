import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { City } from './city.entity';

@Table
export class Address extends Model {
  @PrimaryKey
  @Column
  id!: number;
  @ForeignKey(() => City)
  @Column
  cityId: number;
  @Column
  street: string;
}
