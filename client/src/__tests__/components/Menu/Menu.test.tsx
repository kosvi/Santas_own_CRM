import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// we need our custom renderer to provide wrap our Menu inside Redux Provider
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';

// import component and rest of helpers
import { Menu } from '../../../components/Menu';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';

// Our menu uses useNavigate() to handle clicks
// -> Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}));

describe('<Menu />', () => {

  test('Menu opens and closes when clicked', async () => {
    const menuComponent = render(<Menu />);
    const menuItems = menuComponent.getByTestId('MenuItems');
    const menuButton = menuComponent.getByTestId('MenuButton');
    expect(menuItems.childNodes.length).toBe(0);
    await act(async () => {
      await fireEvent.click(menuButton);
      testHelpers.waitGivenTime(100);
      expect(menuItems.childNodes.length).toBeGreaterThan(0);
      expect(menuItems.childNodes[0]).toHaveTextContent('Home');
      await fireEvent.click(menuButton);
      testHelpers.waitGivenTime(100);
      expect(menuItems.childNodes.length).toBe(0);
    });
  });

  // Add a test where 'Home' is clicked and see what will happen...

});