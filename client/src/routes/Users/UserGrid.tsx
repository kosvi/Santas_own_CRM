import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usersSelector } from '../../store';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { UserWithGroups } from '../../types';

interface GridColumn {
  headerName: string,
  field: string,
  flex?: number,
  sortable?: boolean,
  filter?: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  cellRenderer?: Function
}

export const UserGrid = () => {

  const navigate = useNavigate();
  const { users } = useSelector(usersSelector);

  const [columnDefs] = useState<Array<GridColumn>>([
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Username', field: 'username', sortable: true },
    { headerName: 'Disabled', field: 'disabled', sortable: true, filter: true, cellRenderer: (params: { data: UserWithGroups }) => { return params.data.disabled ? 'true' : 'false'; } }
  ]);

  return (
    <div className='ag-theme-alpine' style={{ height: '70vh', width: '100%' }}>
      <AgGridReact
        rowData={users}
        columnDefs={columnDefs}
        onGridReady={(event) => event.api.sizeColumnsToFit()}
        pagination={true}
        paginationAutoPageSize={true}
        onRowClicked={(event) => navigate(`/users/${event.data.id}`)}
      >
      </AgGridReact>
    </div>
  );
};
