import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasOne,
  ForeignKey,
} from 'sequelize-typescript';
import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/users/entities/user.entity';

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
