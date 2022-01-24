import { validateToDate, validateToNumber, validateToString, validateToBoolean } from '../../src/utils/validators';

const STRING_ERROR = 'Malformed string';
const NUMBER_ERROR = 'Incorrect or missing number';

describe('validator tests', () => {
  test('validate valid strings', () => {
    expect(validateToString('foo')).toEqual('foo');
    expect(validateToString(new String('bar'))).toEqual('bar');
    expect(() => { validateToString(''); }).not.toThrow(STRING_ERROR);
    expect(() => { validateToString('foobar'); }).not.toThrow(STRING_ERROR);
  });
  test('validate invalid strings', () => {
    expect(() => { validateToString(3); }).toThrow(STRING_ERROR);
    expect(() => { validateToString(undefined); }).toThrow(STRING_ERROR);
    expect(() => { validateToString(new Error('foobar')); }).toThrow(STRING_ERROR);
  });
  test('validate valid numbers', () => {
    expect(validateToNumber(0)).toEqual(0);
    expect(validateToNumber(100)).toEqual(100);
    expect(validateToNumber(-100)).toEqual(-100);
    expect(validateToNumber(new Number('100'))).toEqual(100);
    expect(validateToNumber(1.9314)).toEqual(1.9314);
  });
  test('validate invalid numbers', () => {
    expect(() => { validateToNumber('string'); }).toThrow(NUMBER_ERROR);
    expect(() => { validateToNumber(undefined); }).toThrow(NUMBER_ERROR);
    expect(() => { validateToNumber(null); }).toThrow(NUMBER_ERROR);
  });
  test('validate valid dates', () => {
    if (!(validateToDate('2022-01-18T20:05:21.660Z') instanceof Date)) {
      fail('validateToDate didn\'t return a date');
    }
    if (!(validateToDate('2020-12-10') instanceof Date)) {
      fail('validateToDate didn\'t return a date');
    }
  });
  test('validate invalid dates', () => {
    expect(() => { validateToDate('no-real-date'); }).toThrow(Error);
    expect(() => { validateToDate(undefined); }).toThrow(Error);
  });
  test('validate booleans', () => {
    expect(validateToBoolean(false)).toBe(false);
    expect(validateToBoolean(true)).toBe(true);
    expect(validateToBoolean(false)).not.toBe(true);
    expect(validateToBoolean(true)).not.toBe(false);
    expect(validateToBoolean(new Boolean(true)).toBe(true);
  });
  test('invalid boolean gives Error', () => {
    expect(() => { validateToBoolean('string'); }).toThrow(Error);
    expect(() => { validateToBoolean(100); }).toThrow(Error);
    expect(() => { validateToBoolean(undefined); }).toThrow(Error);
  });
});
