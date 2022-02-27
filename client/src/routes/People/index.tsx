import React from 'react';
import { useParams } from 'react-router-dom';
import { AddPersonForm } from './AddPersonForm';
import usePermission from '../../hooks/usePermission';
import { DisplayPerson } from './DisplayPerson';
import { PeopleGrid } from './PeopleGrid';


export const People = () => {

  const { id } = useParams<'id'>();
  const { allowReadAccess, allowWriteAccess } = usePermission();

  // Display Access Denied -notice if user is not allowed to access this data
  if (!allowReadAccess('people')) {
    return (
      <div>
        Access denied
      </div>
    );
  }

  // if no id is set -> display AddPersonForm and list of people in redux state
  if (!id) {
    return (
      <div>
        {allowWriteAccess('people') &&
          <div>
            <AddPersonForm />
          </div>
        }
        <PeopleGrid />
      </div>
    );
  }

  // if id is set, display that person and full info
  return (
    <div>
      <DisplayPerson idString={id} />
    </div>
  );
};
