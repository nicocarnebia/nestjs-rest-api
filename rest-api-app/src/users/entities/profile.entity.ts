import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { Address } from './address.entity';
import { User } from './user.entity';

@Table
export class Profile extends Model {
  @PrimaryKey
  @Column
  id!: number;
  @ForeignKey(() => User)
  @Column
  userId: number;
  @ForeignKey(() => Address)
  @Column
  addressId: number;
  @Column
  name: string;
}
