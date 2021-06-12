import { Table, Column, Model, PrimaryKey, HasOne } from 'sequelize-typescript';
import { Country } from 'src/countries/entities/country.entity';

@Table
export class City extends Model {
  @PrimaryKey
  @Column
  id!: number;
  @HasOne(() => Country)
  @Column
  countryId: number;
  @Column
  name: string;
}
