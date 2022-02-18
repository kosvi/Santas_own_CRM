import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import usePeople from '../../hooks/usePeople';
import { peopleSelector } from '../../store/people';
import { FullPerson, Person } from '../../types';
import { parseNumber } from '../../utils/validators';
import { AddPersonForm } from './AddPersonForm';
import usePermission from '../../hooks/usePermission';
import useNotification from '../../hooks/useNotification';
import { DisplayPerson } from './DisplayPerson';
import { PersonRow } from './PersonRow';

export const People = () => {

  const { id } = useParams<'id'>();
  const { people } = useSelector(peopleSelector);
  const { allowReadAccess, allowWriteAccess } = usePermission();
  const { createNotification } = useNotification();

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
	    <td>
	      Name
	    </td>
	    <td>
	    Date of birth
	    </td>
	    <td>
	    Address
	    </td>
	    <td>
	    Entries
	    </td>
	    <td>
	    Wishes
	    </td>
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

  return (
    <div>
      <DisplayPerson idString={id} />
    </div>
  );
};
