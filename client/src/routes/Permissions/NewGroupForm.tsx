import React, { useState } from 'react';

export const NewGroupForm = () => {

  const [name, setName] = useState<string>('');

  return (
    <div id="NewGroupForm">
      <h2>Add new group</h2>
      <input type="text" name="name" onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} placeholder="name" />
      <button>Save</button>
      name: {name}
    </div>
  );
};
