import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store';
import { ChangeGroup } from './ChangeGroup';
import { ChangePassword } from './ChangePassword';

export const Home = () => {

  const { user } = useSelector(authSelector);
  const [displayPasswordForm, setDisplayPasswordForm] = useState<boolean>(false);
  const [displayGroupForm, setDisplayGroupForm] = useState<boolean>(false);

  const togglePasswordForm = () => {
    setDisplayPasswordForm(!displayPasswordForm);
  };

  const toggleGroupForm = () => {
    setDisplayGroupForm(!displayGroupForm);
  };

  return (
    <div>
      <div data-testid="name-of-user"><h2>Welcome {user?.name}</h2></div>

      <div>
        <span onClick={togglePasswordForm} style={{ cursor: 'pointer' }}>Change password</span><br />
        {displayPasswordForm && <ChangePassword />}
        <br />
      </div>
      <div>
        <span onClick={toggleGroupForm} style={{ cursor: 'pointer' }}>Change active group</span><br />
        {displayGroupForm && <ChangeGroup />}
        <br />
      </div>

      <div style={{ marginBottom: '1em' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum neque quis felis efficitur, feugiat tempor metus sagittis. Etiam erat urna, pretium sit amet neque id, aliquam mollis metus. Aenean nisl arcu, lacinia at maximus malesuada, sagittis in diam. Duis faucibus lectus id ornare aliquet. Curabitur mattis vitae nunc imperdiet egestas. Sed porta mauris eu libero consectetur pharetra. Integer quis risus pellentesque, malesuada risus iaculis, scelerisque orci. Maecenas sit amet aliquet metus. Phasellus euismod suscipit dui, sagittis pulvinar risus tristique sit amet.
      </div>
      <div style={{ marginBottom: '1em' }}>
        Duis convallis, neque eget luctus laoreet, quam tellus tempor neque, nec porta odio orci ut ipsum. Ut consectetur eget dui eu facilisis. Quisque aliquet sagittis metus sed mollis. Vivamus aliquet vel nunc in placerat. Cras pharetra urna et sapien aliquam pulvinar. Aliquam pharetra magna pharetra fringilla feugiat. Morbi sagittis porta fringilla. Nulla dignissim dui mauris, quis placerat massa convallis eu. Integer id nunc eget purus commodo convallis. Duis cursus orci sit amet placerat consequat. Nullam lacinia, tellus sit amet suscipit lacinia, leo lacus laoreet ante, quis auctor enim lectus nec ipsum.
      </div>
      <div style={{ marginBottom: '1em' }}>
        Vestibulum in laoreet tortor. Nam scelerisque elit efficitur sollicitudin bibendum. Sed suscipit dapibus elit, at malesuada elit tempus a. Maecenas tincidunt odio et sem efficitur pharetra. Aenean scelerisque mi eget semper pharetra. Aenean nec feugiat sapien. In non mattis leo. Donec in odio ante. Morbi vitae molestie tellus. Etiam libero lectus, viverra non est vitae, condimentum lacinia nisi. Suspendisse quis vehicula magna. Maecenas ornare mauris non dictum mollis.
      </div>
      <div style={{ marginBottom: '1em' }}>
        Praesent nibh tortor, pulvinar non iaculis feugiat, porta quis nulla. Maecenas porta magna leo, quis convallis orci dignissim ac. Nam eu sagittis arcu. Fusce et ante mattis, commodo massa ac, efficitur orci. In vitae convallis purus. Aenean a magna elit. Ut auctor tortor nec elit eleifend, id lacinia massa fermentum.
      </div>
      <div style={{ marginBottom: '1em' }}>
        Nunc in enim justo. Duis tincidunt nisi nec facilisis varius. Curabitur vitae semper purus. Suspendisse potenti. Quisque iaculis, mauris a placerat euismod, risus arcu interdum massa, ac blandit ligula enim ac lectus. Nulla facilisi. Morbi pretium, lectus a vulputate interdum, turpis lorem fermentum libero, ut elementum est lacus eleifend ante. Suspendisse interdum tristique bibendum. Integer porttitor egestas libero vel tincidunt. Nulla dapibus cursus leo sit amet suscipit. Maecenas id ex non massa tempor pellentesque. Sed malesuada felis vitae massa mattis eleifend. Fusce tristique urna vitae eros rutrum aliquet. Cras tincidunt blandit arcu, et luctus elit porta ac. Ut ac venenatis nisi.
      </div>
    </div>
  );
};
