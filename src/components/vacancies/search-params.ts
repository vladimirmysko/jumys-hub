import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs/server';

export const vacanciesSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  category: parseAsString.withDefault('all').withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault(''),
  orderBy: parseAsStringEnum(['desc', 'asc', 'relevance'])
    .withDefault('desc')
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(vacanciesSearchParams);
