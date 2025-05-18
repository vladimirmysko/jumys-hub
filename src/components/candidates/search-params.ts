import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const candidatesSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(''),
};

export const loadSearchParams = createLoader(candidatesSearchParams);
