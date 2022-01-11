import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import HelloWorld from '../components/HelloWorld';

test('simple test', () => {
  const renderedApp = render(<HelloWorld name='World' />);
  expect(renderedApp.container).toHaveTextContent('Hello World!');
});