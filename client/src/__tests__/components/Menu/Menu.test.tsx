import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// we need our custom renderer to provide wrap our Menu inside Redux Provider
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';

// import component and rest of helpers
import { Menu } from '../../../components/Menu';

// Our menu uses useNavigate() to handle clicks
// -> Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}));

describe('<Menu />', () => {

  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  test('Menu opens and closes when clicked', async () => {
    const menuComponent = render(<Menu />);
    const menuItems = menuComponent.getByTestId('MenuItems');
    const menuButton = menuComponent.getByTestId('MenuButton');
    expect(menuItems.childNodes.length).toBe(0);
    await act(async () => {
      await fireEvent.click(menuButton);
      expect(menuItems.childNodes.length).toBeGreaterThan(0);
      expect(menuItems.childNodes[0]).toHaveTextContent('Home');
      await fireEvent.click(menuButton);
      expect(menuItems.childNodes.length).toBe(0);
    });
  });

  // Add this test!
  test('Name from Redux store is rendered to Menu', async () => {
  });

  // Add a test where 'Home' is clicked and see what will happen...
  test('Click on menu-item closes menu and runs navigate() once', async () => {
    const menuComponent = render(<Menu />);
    const menuItems = menuComponent.getByTestId('MenuItems');
    const menuButton = menuComponent.getByTestId('MenuButton');
    // make sure navigate is not called yet
    expect(mockedNavigate.mock.calls).toHaveLength(0);
    await act(async () => {
      await fireEvent.click(menuButton);
      // this contains the list that is rendered inside 'MenuItems'
      const menuItemsList = menuComponent.getByTestId('MenuItemsList');
      const homeButton = menuItemsList.childNodes[0];
      await fireEvent.click(homeButton);
      // menu should be closed by now
      expect(menuItems.childNodes.length).toBe(0);
      // and our mockedNavigate should be called once
      expect(mockedNavigate.mock.calls).toHaveLength(1);
    });
  });

});
