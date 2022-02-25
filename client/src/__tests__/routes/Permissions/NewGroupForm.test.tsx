import React from 'react';
import { render, fireEvent, RenderResult, act } from '../../../utils/testHelpers/customRenderer';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import { apiServices } from '../../../services/apiServices';
import { Group, ErrorResponse } from '../../../types';
import { groupData } from '../../../utils/testHelpers/data/groups';
import { NewGroupForm } from '../../../routes/Permissions/NewGroupForm';

// Spy on dispatch
// https://medium.com/@szpytfire/react-redux-testing-mocking-useselector-and-usedispatch-e004c3f2b2e0
import * as reactRedux from 'react-redux';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ERROR_MESSAGE = 'Validation error: SequelizeUniqueConstraintError';

describe('<NewGroupForm />', () => {

  const mockedUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
  let component: RenderResult;
  let groupInput: HTMLInputElement, submitButton: HTMLElement;

  beforeEach(() => {
    mockedUseDispatch.mockClear();
    // render form
    component = render(<NewGroupForm />);
    // Find input
    groupInput = component.getByTestId('newGroupNameInput') as HTMLInputElement;
    submitButton = component.getByTestId('submitNewGroup');
  });

  test('adding name and submitting calls axios', async () => {
    // make mock response
    const newGroupResponse: { data: Group } = {
      data: groupData.defaultNewGroup
    };
    await mockedAxios.post.mockResolvedValue({ response: newGroupResponse });

    // make dummy dispatch function
    const dummyDispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dummyDispatch);
    // make sure it's not called yet
    expect(dummyDispatch).not.toHaveBeenCalled();

    await act(async () => {
      await fireEvent.change(groupInput, { target: { value: groupData.defaultNewGroup.name } });
      await fireEvent.click(submitButton);
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/groups', { name: groupData.defaultNewGroup.name }, apiServices.getAxiosRequestConfigWithToken());
    // dummyDispatch should have been called twice: once for storing the class and once for storing the notification
    expect(dummyDispatch).toHaveBeenCalledTimes(2);
    expect(groupInput.value).toBe('');
  });

  test('adding a group fails correctly', async () => {

    // make mock response
    const errorGroupResponse: { data: ErrorResponse } = {
      data: { error: ERROR_MESSAGE }
    };
    await mockedAxios.post.mockRejectedValue({ response: errorGroupResponse });

    // make dummy dispatch function
    const dummyDispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dummyDispatch);
    // make sure it's not called yet
    expect(dummyDispatch).not.toHaveBeenCalled();

    await act(async () => {
      await fireEvent.change(groupInput, { target: { value: 'foobar' } });
      await fireEvent.click(submitButton);
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/groups', { name: 'foobar' }, apiServices.getAxiosRequestConfigWithToken());
    expect(dummyDispatch).toHaveBeenCalledTimes(1);

  });

});
