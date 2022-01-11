import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from '../App';

test('simple test', () => {
  const renderedApp = render(<App />);
  expect(renderedApp.container).toHaveTextContent('Hello');
});