import React from 'react';
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import { apiServices } from '../../../services/apiServices';
import { Functionality, Group } from '../../../types';
import { groupData } from '../../../utils/testHelpers/data/groups';
import { AddPermission } from '../../../routes/Permissions/AddPermission';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<AddPermission />', () => {

  test('new permission can be added', async () => {
    // make mock response
    const newPermissionResponse: { data: Group } = {
      data: groupData.defaultFullGroup
    };
    await mockedAxios.post.mockResolvedValue({ response: newPermissionResponse });

    // create props for component
    const functionality: Functionality = {
      id: groupData.defaultFullGroup.functionalities[0].id,
      code: groupData.defaultFullGroup.functionalities[0].code,
      name: groupData.defaultFullGroup.functionalities[0].name
    };

    // render form
    const component = render(<AddPermission functionality={functionality} group={groupData.defaultFullGroup.id} />);

    // make sure functionalitys name renders
    component.getByText(groupData.defaultFullGroup.functionalities[0].name, { exact: false });
    // make sure that when pressing button, axios makes request with valid parameters
    const button = component.container.querySelector('button');
    if (button === null) {
      expect(button).not.toBe(null);
    } else {
      expect(button.textContent).toBe('add permission');
      await act(async () => {
        await fireEvent.click(button);
      });
    }
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`/groups/${groupData.defaultFullGroup.id}`, {
      functionalityId: functionality.id,
      read: false,
      write: false
    }, apiServices.getAxiosRequestConfigWithToken());

  });

});
