import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth/authActions';
import { authService } from '../services/authService';
import useNotification from './useNotification';
import { groupsActions } from '../store/groups/groupsActions';
import { peopleActions } from '../store/people/peopleActions';

function useLogout() {
  const dispatch = useDispatch();
  const { createNotification } = useNotification();

  const logout = async () => {
    // We wish to remove all caches while logging out

    // First clear groups
    dispatch(groupsActions.clearGroups());
    // next clear people
    dispatch(peopleActions.clearPeople());

    // now remove token & user information
    try {
      await authService.logout();
      authService.deleteUser();
    } catch (error) {
      createNotification('failed to logout', 'error');
    }
    dispatch(authActions.logoutUser());
  };

  return {
    logout
  };
}

export default useLogout;