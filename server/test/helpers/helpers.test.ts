/*
 *  Since our tests heavily rely on this toApiGroup()-function, 
 *  we really should test that it works as intended. 
 * 
 *  Since it takes response.body from api, validates it 
 *  and returns ApiGroup-object, we have to make sure it returns
 *  all that the api returns and fails if something is missing 
 *  or incorrectly formatted
 */
import {
  apiUserWithInvalidDate,
  apiUserWithInvalidDisabled,
  apiUserWithNonArrayGroup,
  apiUserWithoutId,
  apiUserWithoutName,
  apiUserWithoutUsername,
  apiUserWithNonArrayGroups,
  apiUserWithMalformedGroup,
  groupObjectWithIncorrectPermission,
  groupObjectWithInvalidDate,
  groupObjectWithInvalidName,
  groupObjectWithMissingPermission,
  groupObjectWithoutFunctionalities,
  groupObjectWithoutId,
  personWithInvalidAddress,
  personWithInvalidBirthdate,
  personWithInvalidUpdateAt,
  personWithNumberAsName,
  personWithoutId,
  validPeopleArray,
  validPersonWithWishesAndEntries,
  personWishIsMissingItem,
  personWishNotGivenAsArray,
  validGroupArray,
  validUserArray,
  validItemArray,
  invalidItemMissingCount,
  invalidItemMalformedCount,
  invalidItemWithEmptyItem,
  invalidItemWithMissingName,
  invalidItemWithNumberAsName,
  personIsMissingEntries,
  personWithInvalidEntryId,
  personWithInvalidEntryNiceness,
  validEntryArray,
  invalidEntryWithoutId,
  invalidEntryWithStringAsNiceness,
  invalidEntryWithNullAsDesc,
  invalidEntryUserIdAsUndefined,
  invalidEntryWithInvalidUpdateDate,
  groupObjectWithPermissionMissingRead,
  validError,
  invalidErrorMissingError,
  invalidErrorWithBooleanError,
  invalidErrorWithUndefinedError,
  validApiWish
} from './data';
import { toApiGroup, toApiUser, toApiPerson, toApiItem, toApiEntry, toApiWish, toApiError } from './toApiObject';



describe('make sure helper functions for tests work as supposed to', () => {
  test('toApiGroup tests', () => {
    // check ./data/groupApi.ts to see what kind of Array validGroupArray is
    // validGroupData should be all valid 
    let validGroupData = toApiGroup(validGroupArray[0]);
    expect(validGroupData).toHaveProperty('name');
    expect(validGroupData.functionalities).toHaveLength(2);
    expect(validGroupData.functionalities[1].permission.read).toBe(false);
    // also check the second object in the array
    validGroupData = toApiGroup(validGroupArray[1]);
    expect(validGroupData).toHaveProperty('updatedAt');
    expect(validGroupData.createdAt).toBeInstanceOf(Date);
    expect(validGroupData.functionalities).toBeInstanceOf(Array);
    expect(validGroupData.functionalities).toHaveLength(0);
    // passing the whole array to 'toApiGroup()' should throw an Error
    expect(() => { toApiGroup(validGroupArray); }).toThrow(Error);
    // Now let's start converting invalid objects and ALL should throw errors
    expect(() => { toApiGroup(groupObjectWithInvalidName); }).toThrow(Error);
    expect(() => { toApiGroup(groupObjectWithInvalidDate); }).toThrow(Error);
    expect(() => { toApiGroup(groupObjectWithoutId); }).toThrow(Error);
    expect(() => { toApiGroup(groupObjectWithMissingPermission); }).toThrow(Error);
    expect(() => { toApiGroup(groupObjectWithPermissionMissingRead); }).toThrow(Error);
    expect(() => { toApiGroup(groupObjectWithIncorrectPermission); }).toThrow(Error);
    // This should work and it should return an empty array as functionalities
    validGroupData = toApiGroup(groupObjectWithoutFunctionalities);
    expect(validGroupData.functionalities).toHaveLength(0);
  });

  test('toApiUser tests', () => {
    // valid Array should be easy to handle
    const validUserDataWithGroups = toApiUser(validUserArray[0]);
    expect(validUserDataWithGroups).toHaveProperty('username');
    // forgive my magic numbers. See the data at './data/userApi.ts'
    expect(validUserDataWithGroups.groups).toHaveLength(2);
    expect(validUserDataWithGroups.groups[0].id).toBe(1);
    const validUserDataWithoutGroups = toApiUser(validUserArray[1]);
    expect(validUserDataWithoutGroups.groups).toBeInstanceOf(Array);
    expect(validUserDataWithoutGroups.groups).toHaveLength(0);
    expect(validUserDataWithoutGroups.createdAt).toBeInstanceOf(Date);
    // I guess we can be sure that at least something works correctly
    // => we can at least parse the data if it's given in the format the API is (supposed to be) giving us
    // Now the interesting part: toApiUser should fail with all to following data:
    expect(() => { toApiUser(apiUserWithoutId); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithoutUsername); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithoutName); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithInvalidDisabled); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithInvalidDate); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithNonArrayGroup); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithNonArrayGroups); }).toThrow(Error);
    expect(() => { toApiUser(apiUserWithMalformedGroup); }).toThrow(Error);
    // also trying to parse the Array should fail
    expect(() => { toApiUser(validUserDataWithGroups); }).toThrow(Error);
  });

  test('toApiPerson tests', () => {
    const validPeopleData = toApiPerson(validPeopleArray[0]);
    expect(validPeopleData).toHaveProperty('name');
    expect(validPeopleData.birthdate).toBeInstanceOf(Date);
    // Also check person with wishes
    const validPersonDataWithWishesAndEntries = toApiPerson(validPersonWithWishesAndEntries);
    expect(validPersonDataWithWishesAndEntries).toHaveProperty('name');
    expect(validPersonDataWithWishesAndEntries.wishes).toBeInstanceOf(Array);
    expect(validPersonDataWithWishesAndEntries.wishes).toHaveLength(2);
    expect(validPersonDataWithWishesAndEntries.entries).toBeInstanceOf(Array);
    expect(validPersonDataWithWishesAndEntries.entries).toHaveLength(2);
    // I think we are more interested in that toApiPerson fails with incorrect data
    // First we must fail if whole array is given as param
    expect(() => { toApiPerson(validPeopleArray); }).toThrow(Error);
    // then all the invalid people we have
    expect(() => { toApiPerson(personWithoutId); }).toThrow(Error);
    expect(() => { toApiPerson(personWithNumberAsName); }).toThrow(Error);
    expect(() => { toApiPerson(personWithInvalidBirthdate); }).toThrow(Error);
    expect(() => { toApiPerson(personWithInvalidAddress); }).toThrow(Error);
    expect(() => { toApiPerson(personWithInvalidUpdateAt); }).toThrow(Error);
    expect(() => { toApiPerson(undefined); }).toThrow(Error);
    expect(() => { toApiPerson(null); }).toThrow(Error);
    expect(() => { toApiPerson(personWishIsMissingItem); }).toThrow(Error);
    expect(() => { toApiPerson(personWishNotGivenAsArray); }).toThrow(Error);
    expect(() => { toApiPerson(personIsMissingEntries); }).toThrow(Error);
    expect(() => { toApiPerson(personWithInvalidEntryId); }).toThrow(Error);
    expect(() => { toApiPerson(personWithInvalidEntryNiceness); }).toThrow(Error);
  });

  test('toApiItem tests', () => {
    const validItemData = toApiItem(validItemArray[0]);
    expect(validItemData).toHaveProperty('count');
    // Let's check all that should fail
    expect(() => { toApiItem(validItemArray); }).toThrow(Error);
    expect(() => { toApiItem(invalidItemMissingCount); }).toThrow(Error);
    expect(() => { toApiItem(invalidItemMalformedCount); }).toThrow(Error);
    expect(() => { toApiItem(invalidItemWithEmptyItem); }).toThrow(Error);
    expect(() => { toApiItem(invalidItemWithMissingName); }).toThrow(Error);
    expect(() => { toApiItem(invalidItemWithNumberAsName); }).toThrow(Error);
  });

  test('toApiEntry tests', () => {
    const validEntryData = toApiEntry(validEntryArray[0]);
    expect(validEntryData).toHaveProperty('niceness');
    // ok, at least parser didn't fail
    // now let's make sure errors are thrown
    expect(() => { toApiEntry(invalidEntryWithoutId); }).toThrow(Error);
    expect(() => { toApiEntry(invalidEntryWithStringAsNiceness); }).toThrow(Error);
    expect(() => { toApiEntry(invalidEntryWithNullAsDesc); }).toThrow(Error);
    expect(() => { toApiEntry(invalidEntryUserIdAsUndefined); }).toThrow(Error);
    expect(() => { toApiEntry(invalidEntryWithInvalidUpdateDate); }).toThrow(Error);
    // also giving the whole array should throw error
    expect(() => { toApiEntry(validEntryArray); }).toThrow(Error);
  });

  test('toApiWish tests', () => {
    const validWishData = toApiWish(validApiWish);
    expect(validWishData).toHaveProperty('id');
    expect(validWishData).toHaveProperty('personId');
    expect(validWishData).toHaveProperty('itemId');
    expect(validWishData).toHaveProperty('description');
    // add error-tests later(?)
  });

  test('toApiError tests', () => {
    const validErrorData = toApiError(validError);
    expect(validErrorData.error).toBe('string');
    // these should fail
    expect(() => { toApiError(invalidErrorMissingError); }).toThrow(Error);
    expect(() => { toApiError(invalidErrorWithBooleanError); }).toThrow(Error);
    expect(() => { toApiError(invalidErrorWithUndefinedError); }).toThrow(Error);
  });

});
