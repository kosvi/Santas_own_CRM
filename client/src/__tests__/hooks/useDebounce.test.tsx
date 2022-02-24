import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '@testing-library/react';

import { testHelpers } from '../../utils/testHelpers/testHelpers';
import useDebounce from '../../hooks/useDebounce';

interface TestObj {
  name: string,
  age: number
}

// helper component
const DebounceTestHelper = () => {
  const [obj, setObj] = useState<TestObj | null>(null);
  const debounceObj = useDebounce<TestObj | null>(obj, 100);

  useEffect(() => {
    setObj({ name: 'Foo', age: 10 });
  }, []);

  if (!debounceObj) {
    return (
      <div data-testid="Content">
      </div>
    );
  }

  return (
    <div data-testid="Content">
      <span data-testid="name">{debounceObj.name}</span>
      <span data-testid="age">{debounceObj.age}</span>
    </div>
  );

};

describe('useDebounce hook', () => {

  test('useDebounce works', async () => {
    const helperComponent = render(<DebounceTestHelper />);
    const content = helperComponent.getByTestId('Content');
    expect(content.childNodes.length).toBe(0);
    await act(async () => {
      await testHelpers.waitGivenTime();
      expect(content.childNodes.length).toBe(2);
      const nameComponent = helperComponent.getByTestId('name');
      const ageComponent = helperComponent.getByTestId('age');
      expect(nameComponent).toHaveTextContent('Foo');
      expect(ageComponent).toHaveTextContent('10');
    });
  });

});
