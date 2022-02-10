import React from 'react';
import { useParams } from 'react-router-dom';

export const People = () => {

  const { id } = useParams<'id'>();

  if (!id) {
    return (
      <div>
        Hello People!
      </div>
    );
  }

  return (
    <div>
      Gimme the person with id {id}
    </div>
  );
};