import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../types';

export const Item = ({ item }: { item: MenuItem }) => {
  return (
    <div className="MenuItem">
      {item.to && <Link to={item.to}>{item.title}</Link>}
      {item.url && <a href={item.url}>{item.title}</a>}
    </div>
  );
};
