import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { peopleSelector } from '../../store/people';

// This is the AgGrid-stuff straight from the tutorial.
// THERE HAS TO BE BETTER TYPING AVAILABLE!!! Gotta read more...
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FullPerson } from '../../types';
import { logger } from '../../utils/logger';
import usePeople from '../../hooks/usePeople';


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
}


export const PeopleGrid = () => {

  const navigate = useNavigate();
  const { people } = useSelector(peopleSelector);
  const [rowData, setRowData] = useState<Array<GridPerson>>([]);
  const { updatePerson } = usePeople();

  // Define columns for our people-grid
  const [columnDefs] = useState<Array<GridColumn>>([
    { headerName: 'Name', field: 'name', sortable: true, editable: true, filter: true },
    { headerName: 'Age', field: 'age', sortable: true },
    { headerName: 'Address', field: 'address', sortable: true, editable: true, filter: true },
    { headerName: 'Entries', field: 'entries', sortable: true, cellRenderer: (params: { data: GridPerson }) => { return params.data.entries > 0 ? params.data.entries : '-'; } },
    { headerName: 'Wishes', field: 'wishes', sortable: true, cellRenderer: (params: { data: GridPerson }) => { return params.data.wishes > 0 ? params.data.wishes : '-'; } },
    { headerName: '', field: '', cellRenderer: (params: { data: GridPerson }) => { return (<div style={{ cursor: 'pointer' }} onClick={() => navigate(`/people/${params.data.id}`)}>Display</div>); } }
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


  const cellValueChanged = async (event: { data: GridPerson }) => {
    const person = people[event.data.id];
    if (!person) {
      logger.logError(`couldn't find person with id ${event.data.id}`);
      return;
    }
    const { name, address } = event.data;
    const fullPerson: FullPerson = {
      ...person,
      name: name,
      address: address
    };
    await updatePerson(fullPerson);
  };


  return (
    <div className='ag-theme-alpine' style={{ height: '70vh', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={cellValueChanged}
        onGridReady={(event) => event.api.sizeColumnsToFit()}
        pagination={true}
        paginationAutoPageSize={true}
        // onRowClicked={(event) => navigate(`/people/${event.data.id}`)}
      >
      </AgGridReact>
    </div>
  );
};