import { Injectable, Inject } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { CreateAddressDto } from './dto/create-address.dto';

import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESSES_REPOSITORY')
    private addressesRepository: typeof Address,
  ) {}

  async create(createAddress: CreateAddressDto): Promise<Address> {
    const id = await this.addressesRepository.sequelize.query(
      'INSERT INTO Addresses(cityId, street) VALUES (?,?)',
      {
        type: QueryTypes.INSERT,
        replacements: [createAddress.cityId, createAddress.street],
      },
    );
    const address = new Address();
    address.id = id[0];
    return address;
  }
}
