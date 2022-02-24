import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// we need our custom renderer to provide wrap our Menu inside Redux Provider
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';

// import component and rest of helpers
import { TopBar } from '../../../components/TopBar';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';
import { apiServices } from '../../../services/apiServices';

// import requirements for API-mocking
import axios from 'axios';
jest.mock('axios');

describe('TopBar tests', () => {

  test('logout button works', async () => {
    const component = render(<TopBar />);
    const logoutButton = component.getByTestId('logoutButton');
    await act(async () => {
      await fireEvent.click(logoutButton);
      await testHelpers.waitGivenTime();
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith('/logout', apiServices.getAxiosRequestConfigWithToken());
    });
  });

});
