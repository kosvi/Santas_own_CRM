import React from 'react';
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import { apiServices } from '../../../services/apiServices';
import { Group } from '../../../types';
import { groupData } from '../../../utils/testHelpers/data/groups';
import { NewGroupForm } from '../../../routes/Permissions/NewGroupForm';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<NewGroupForm />', () => {

  test('adding name and submitting calls axios', async () => {
    // make mock response
    const newGroupResponse: { data: Group } = {
      data: groupData.defaultNewGroup
    };
    await mockedAxios.post.mockResolvedValue({ response: newGroupResponse });

    // render form
    const component = render(<NewGroupForm />);

    // Find input
    const groupInput = component.getByTestId('newGroupNameInput');
    const submitButton = component.getByTestId('submitNewGroup');
    await act(async () => {
      await fireEvent.change(groupInput, { target: { value: groupData.defaultNewGroup.name } });
      await fireEvent.click(submitButton);
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/groups', { name: groupData.defaultNewGroup.name }, apiServices.getAxiosRequestConfigWithToken());
    expect(groupInput.value).toBe('');
  });

});
