import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../../types';

interface closeMethod {
  (): void
}

export const Item = ({ item, closeMenuMethod }: { item: MenuItem, closeMenuMethod: closeMethod }) => {

  const navigate = useNavigate();

  const openRoute = (path: string | undefined) => {
    closeMenuMethod();
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="MenuItem" onClick={() => openRoute(item.to)}>
      {item.title}
    </div>
  );
};
