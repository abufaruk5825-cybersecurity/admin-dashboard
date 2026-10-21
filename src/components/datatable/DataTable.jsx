import './DataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DataTable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/users/${params.row.id}`} style={{ textDecoration: 'none' }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
        </div>
      ),
    },
  ];

  return (
    <div className="DataTable">
      <div className="datatableTtitle">
        User List
        <Link to="/users/new" className="link">+ Add New</Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 9 } },
        }}
        pageSizeOptions={[9, 18]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
