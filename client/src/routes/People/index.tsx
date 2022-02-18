import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { peopleSelector } from '../../store/people';
import { AddPersonForm } from './AddPersonForm';
import usePermission from '../../hooks/usePermission';
import { DisplayPerson } from './DisplayPerson';
import { PersonRow } from './PersonRow';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FullPerson } from '../../types';

export const People = () => {

  const { id } = useParams<'id'>();
  const { people } = useSelector(peopleSelector);
  const { allowReadAccess, allowWriteAccess } = usePermission();
  const [rowData, setRowData] = useState<Array<FullPerson>>([]);

  // Define columns for our people-grid
  const [columnDefs] = useState<Array<{
    headerName?: string,
    field: string,
    flex?: number,
    sortable?: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    cellRenderer?: Function
  }>>([
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Age', field: 'age', sortable: true, cellRenderer: (params: { data: FullPerson }) => { return moment().diff(params.data.birthdate, 'years'); } },
    { headerName: 'Address', field: 'address', sortable: true }
  ]);

  useEffect(() => {
    // We need to make people as array for AgGrid to handle
    const peopleAsArray = Object.values(people).map(p => p);
    setRowData(peopleAsArray);
  }, [people]);

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
        <div>
          <table id="PeopleTable">
            <thead>
              <tr>
                <td>Name</td>
                <td>Age</td>
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
        <div className='ag-theme-alpine' style={{ height: 400, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}>
          </AgGridReact>
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
