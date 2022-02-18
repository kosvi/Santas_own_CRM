import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { peopleSelector } from '../../store/people';
import { AddPersonForm } from './AddPersonForm';
import usePermission from '../../hooks/usePermission';
import { DisplayPerson } from './DisplayPerson';
import { PersonRow } from './PersonRow';
import moment from 'moment';

// This is the AgGrid-stuff straight from the tutorial.
// THERE HAS TO BE BETTER TYPING AVAILABLE!!! Gotta read more...
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FullPerson } from '../../types';

// This is just a Adhoc interface to define the data used by our grid
interface GridPerson extends Omit<FullPerson, 'wishes' | 'entries'> {
  wishes: number,
  entries: number,
  age: number
}

// and this interface defines the options for our grid columns (I expect this has to be build-in AgGrid!)
interface GridColumn {
  headerName?: string,
  field: string,
  flex?: number,
  sortable?: boolean,
  filter?: boolean,
  editable?: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  cellRenderer?: Function,
  // eslint-disable-next-line @typescript-eslint/ban-types
  cellRendererFramework?: Function
}

export const People = () => {

  const { id } = useParams<'id'>();
  const { people } = useSelector(peopleSelector);
  const { allowReadAccess, allowWriteAccess } = usePermission();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState<Array<GridPerson>>([]);

  // Define columns for our people-grid
  const [columnDefs] = useState<Array<GridColumn>>([
    { headerName: 'Name', field: 'name', sortable: true, editable: true, filter: true },
    { headerName: 'Age', field: 'age', sortable: true },
    { headerName: 'Address', field: 'address', sortable: true, editable: true, filter: true },
    { headerName: 'Entries', field: 'entries', sortable: true, cellRenderer: (params: { data: GridPerson }) => { return params.data.entries > 0 ? params.data.entries : '-'; } },
    { headerName: 'Wishes', field: 'wishes', sortable: true, cellRenderer: (params: { data: GridPerson }) => { return params.data.wishes > 0 ? params.data.wishes : '-'; } },
    { headerName: '', field: '', cellRendererFramework: (params: { data: GridPerson }) => { return (<div onClick={() => navigate(`/people/${params.data.id}`)}>View</div>); } }
  ]);

  // adjust people data just a bit to make our grid work as intended
  useEffect(() => {
    // We need to make people as array for AgGrid to handle
    // Also calculate age, entries and wishes here so our grid can sort by them
    // (doing that calculation in render-function makes sorting a nogo)
    const peopleAsArray = Object.values(people).map(p => {
      return {
        ...p,
        age: moment().diff(p.birthdate, 'years'),
        entries: p.entries.length,
        wishes: p.wishes.length
      };
    });
    setRowData(peopleAsArray);
  }, [people]);

  const cellValueChanged = (event: { data: GridPerson }) => {
    console.log(event.data);
  };

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
            columnDefs={columnDefs}
            onCellValueChanged={cellValueChanged}
            onGridReady={(event) => event.api.sizeColumnsToFit()}
          >
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
