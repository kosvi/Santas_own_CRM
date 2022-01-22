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
  groupObjectWithIncorrectPermission,
  groupObjectWithInvalidDate,
  groupObjectWithInvalidName,
  groupObjectWithMissingPermission,
  groupObjectWithoutFunctionalities,
  groupObjectWithoutId,
  validGroupArray
} from './data';
import { toApiGroup } from './toApiObject';



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
    expect(() => { toApiGroup(groupObjectWithIncorrectPermission); }).toThrow(Error);
    // This should work and it should return an empty array as functionalities
    validGroupData = toApiGroup(groupObjectWithoutFunctionalities);
    expect(validGroupData.functionalities).toHaveLength(0);
  });
});
