import React from 'react';

export const LoginError = ({ msg }: { msg: string }) => {

  return (
    <div id="LoginFormError">
      {msg}&nbsp;
    </div>
  );
};
