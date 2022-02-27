import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DisplayPerson } from '../../../components/SearchForm/DisplayPerson';
import { peopleData } from '../../../utils/testHelpers/data/people';


// Had to use stack overflow to get this going:
// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  // For now we don't really need this
  //  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedNavigate
}));

describe('DisplayPerson tests (search results)', () => {

  test('make sure person is displayed correctly', () => {
    const clickAction = jest.fn();
    const component = render(<DisplayPerson person={peopleData.defaultPerson} closeResultMethod={clickAction} />);
    expect(component.container).toHaveTextContent(peopleData.defaultPerson.name);
    expect(component.container).toHaveTextContent(peopleData.defaultPerson.address);
    act(() => {
      fireEvent.click(component.getByTestId('display-person-click-name'));
      expect(clickAction.mock.calls).toHaveLength(1);
      expect(mockedNavigate.mock.calls).toHaveLength(1);
    });
  });
});