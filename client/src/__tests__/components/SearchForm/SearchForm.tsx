/*
 * Test that searchform uses axios to get list of results
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import { fireEvent, render, RenderResult, act } from '@testing-library/react';
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';

// import requirements for API-mocking
import axios from 'axios';

// Import components that are tested
import { SearchForm } from '../../../components/SearchForm';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';
import { apiServices } from '../../../services/apiServices';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}));

describe('<SearchForm />', () => {

  test('list matches on update', async () => {

    // This is the default response from axios
    await mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'John Doe',
          birthdate: '2020-12-12',
          address: 'Nonstreet 313',
          createdAt: '2022-01-24T07:53:48.355Z',
          updatedAt: '2022-01-24T07:53:48.355Z'
        },
        {
          id: 2,
          name: 'Jane Doe',
          birthdate: '2020-12-12',
          address: 'Nonstreet 313',
          createdAt: '2022-01-24T07:53:48.355Z',
          updatedAt: '2022-01-24T07:53:48.355Z'
        }
      ]
    });

    const component = render(<SearchForm />);
    const input = component.getByTestId('searchInput');
    await act(async () => {
      await fireEvent.change(input, { target: { value: 'doe' } });
      await testHelpers.waitGivenTime(1100);
      const result = component.getByTestId('searchResults');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/people/?name=doe', apiServices.getAxiosRequestConfigWithToken());
      expect(result.childNodes.length).toBe(3);
      expect(result.childNodes[0]).toHaveTextContent('clear results');
      expect(result.childNodes[1]).toHaveTextContent('John Doe');
      expect(result.childNodes[2]).toHaveTextContent('Jane Doe');
    });
  });

});
