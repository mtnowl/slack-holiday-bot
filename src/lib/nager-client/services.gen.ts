// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { CountryCountryInfoData, CountryCountryInfoError, CountryCountryInfoResponse, CountryAvailableCountriesError, CountryAvailableCountriesResponse, LongWeekendLongWeekendData, LongWeekendLongWeekendError, LongWeekendLongWeekendResponse, PublicHolidayPublicHolidaysV3Data, PublicHolidayPublicHolidaysV3Error, PublicHolidayPublicHolidaysV3Response, PublicHolidayIsTodayPublicHolidayData, PublicHolidayIsTodayPublicHolidayError, PublicHolidayIsTodayPublicHolidayResponse, PublicHolidayNextPublicHolidaysData, PublicHolidayNextPublicHolidaysError, PublicHolidayNextPublicHolidaysResponse, PublicHolidayNextPublicHolidaysWorldwideError, PublicHolidayNextPublicHolidaysWorldwideResponse, VersionGetVersionError, VersionGetVersionResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Get country info for the given country
 */
export const countryCountryInfo = <ThrowOnError extends boolean = false>(options: Options<CountryCountryInfoData, ThrowOnError>) => { return (options?.client ?? client).get<CountryCountryInfoResponse, CountryCountryInfoError, ThrowOnError>({
    ...options,
    url: '/api/v3/CountryInfo/{countryCode}'
}); };

/**
 * Get all available countries
 */
export const countryAvailableCountries = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<CountryAvailableCountriesResponse, CountryAvailableCountriesError, ThrowOnError>({
    ...options,
    url: '/api/v3/AvailableCountries'
}); };

/**
 * Get long weekends for a given country
 */
export const longWeekendLongWeekend = <ThrowOnError extends boolean = false>(options: Options<LongWeekendLongWeekendData, ThrowOnError>) => { return (options?.client ?? client).get<LongWeekendLongWeekendResponse, LongWeekendLongWeekendError, ThrowOnError>({
    ...options,
    url: '/api/v3/LongWeekend/{year}/{countryCode}'
}); };

/**
 * Get public holidays
 */
export const publicHolidayPublicHolidaysV3 = <ThrowOnError extends boolean = false>(options: Options<PublicHolidayPublicHolidaysV3Data, ThrowOnError>) => { return (options?.client ?? client).get<PublicHolidayPublicHolidaysV3Response, PublicHolidayPublicHolidaysV3Error, ThrowOnError>({
    ...options,
    url: '/api/v3/PublicHolidays/{year}/{countryCode}'
}); };

/**
 * Is today a public holiday
 * The calculation is made on the basis of UTC time to adjust the time please use the offset.
 *
 * This is a special endpoint for `curl`
 *
 *
 * 200 = Today is a public holiday
 *
 * 204 = Today is not a public holiday
 *
 *
 * `STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" https://date.nager.at/Api/v3/IsTodayPublicHoliday/AT)`
 *
 *
 * `if [ $STATUSCODE -ne 200 ]; then # error handling; fi`
 */
export const publicHolidayIsTodayPublicHoliday = <ThrowOnError extends boolean = false>(options: Options<PublicHolidayIsTodayPublicHolidayData, ThrowOnError>) => { return (options?.client ?? client).get<PublicHolidayIsTodayPublicHolidayResponse, PublicHolidayIsTodayPublicHolidayError, ThrowOnError>({
    ...options,
    url: '/api/v3/IsTodayPublicHoliday/{countryCode}'
}); };

/**
 * Returns the upcoming public holidays for the next 365 days for the given country
 */
export const publicHolidayNextPublicHolidays = <ThrowOnError extends boolean = false>(options: Options<PublicHolidayNextPublicHolidaysData, ThrowOnError>) => { return (options?.client ?? client).get<PublicHolidayNextPublicHolidaysResponse, PublicHolidayNextPublicHolidaysError, ThrowOnError>({
    ...options,
    url: '/api/v3/NextPublicHolidays/{countryCode}'
}); };

/**
 * Returns the upcoming public holidays for the next 7 days
 */
export const publicHolidayNextPublicHolidaysWorldwide = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<PublicHolidayNextPublicHolidaysWorldwideResponse, PublicHolidayNextPublicHolidaysWorldwideError, ThrowOnError>({
    ...options,
    url: '/api/v3/NextPublicHolidaysWorldwide'
}); };

/**
 * Get the version of the used Nager.Date library
 */
export const versionGetVersion = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<VersionGetVersionResponse, VersionGetVersionError, ThrowOnError>({
    ...options,
    url: '/api/v3/Version'
}); };