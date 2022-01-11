import React from 'react';

type HelloWorldProps = {
  name: string
};

const HelloWorld = ({ name }: HelloWorldProps) => {
  return (
    <div>
      Hello {name}!
    </div>
  );
};

export default HelloWorld;