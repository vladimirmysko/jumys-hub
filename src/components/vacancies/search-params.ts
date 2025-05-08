import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'

export const coordinatesSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  category: parseAsString.withDefault(''),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)
