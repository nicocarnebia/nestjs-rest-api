import { Address } from './entities/address.entity';

export const addressesProviders = [
  {
    provide: 'ADDRESSES_REPOSITORY',
    useValue: Address,
  },
];
