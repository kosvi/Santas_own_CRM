import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { peopleSelector } from '../../store/people';
import { AddPersonForm } from './AddPersonForm';
import usePermission from '../../hooks/usePermission';
import { DisplayPerson } from './DisplayPerson';
import { PersonRow } from './PersonRow';

export const People = () => {

  const { id } = useParams<'id'>();
  const { people } = useSelector(peopleSelector);
  const { allowReadAccess, allowWriteAccess } = usePermission();

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
        <div>
          <table id="PeopleTable">
            <thead>
              <tr>
                <td>Name</td>
                <td>Date of birth</td>
                <td>Address</td>
                <td>Entries</td>
                <td>Wishes</td>
              </tr>
            </thead>
            <tbody>
              {Object.values(people).map(p => <PersonRow key={p.id} person={p} />)}
            </tbody>
          </table>
        </div>
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
