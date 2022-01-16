import { validateToString } from '../../src/utils/validators';

const STRING_ERROR = 'Malformed string';

describe('validator tests', () => {
  test('validate valid strings', () => {
    expect(validateToString('foo')).toEqual('foo');
    expect(validateToString(String('bar'))).toEqual('bar');
    expect(() => { validateToString('foobar'); }).not.toThrow(STRING_ERROR);
  });
  test('validate invalid strings', () => {
    expect(() => { validateToString(3); }).toThrow(STRING_ERROR);
    expect(() => { validateToString(undefined); }).toThrow(STRING_ERROR);
    expect(() => { validateToString(new Error('foobar')); }).toThrow(STRING_ERROR);
    expect(() => { validateToString(''); }).toThrow(STRING_ERROR);
  });
});
