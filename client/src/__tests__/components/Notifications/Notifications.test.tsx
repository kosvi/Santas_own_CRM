import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';

// import component and rest of helpers
import { Notifications } from '../../../components/Notifications';
import useNotification from '../../../hooks/useNotification';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';

// This is our custom component used to test useNotification-hook
const NotificationTestHelper = () => {
  const { createNotification } = useNotification();

  const addNotification = () => {
    createNotification('foobar', 'msg');
  };

  return (
    <div>
      <div data-testid="newNotification" onClick={addNotification}>
        Hello Notification Tests!
      </div>
      <Notifications />
    </div>
  );
};

describe('<Notifications />', () => {

  test('Notifications are rendered on dispatch', async () => {
    const notificationHookComponent = render(<NotificationTestHelper />);
    const notificationList = notificationHookComponent.getByTestId('Notifications');
    const newNotification = notificationHookComponent.getByTestId('newNotification');
    expect(notificationList.childNodes.length).toBe(0);
    await act(async () => {
      await fireEvent.click(newNotification);
      await fireEvent.click(newNotification);
      await testHelpers.waitGivenTime();
      // We should have two notifications to display
      expect(notificationList.childNodes.length).toBe(2);
      await testHelpers.waitGivenTime(500);
      // ...and now they should have been removed
      expect(notificationList.childNodes.length).toBe(0);
    });
  });

});
