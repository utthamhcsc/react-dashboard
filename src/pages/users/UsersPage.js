import {
  Add,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Button, Box, Divider, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import PageContent from '../../components/layout/dashboard/PageContent';
import { LocalStorageService } from '../../services/LocalStorageService';
import MyTable from '../../components/tables/MyTable';
export default function AdminPage() {
  const title = 'Admin';
  const { path } = useRouteMatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  const ls = new LocalStorageService('supplier', []);
  const handleDelete = (id) => {
    if (window.confirm('Are u sure?')) {
      const data = ls.data?.filter((item) => item.id != id);
      ls.set(data);
      setData(data);
    }
  };
  useEffect(() => {
    setData(ls.data);
  }, []);
  const mydata = React.useMemo(() => {
    return data;
  }, [data]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Code',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'vendorName',
      },
      {
        Header: 'Email ',
        accessor: 'vendorEmail',
      },
      {
        Header: 'Primary Address',
        accessor: 'vendorPrimaryAddress',
      },

      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            <Tooltip title="edit">
              <EditIcon
                onClick={() => history.push(`${path}/edit/${row.original?.id}`)}
                style={{ margin: '5px', cursor: 'pointer' }}
              />
            </Tooltip>
            <Tooltip title="delete">
              <DeleteIcon
                onClick={() => handleDelete(row.original?.id)}
                style={{ margin: '5px', cursor: 'pointer' }}
              />
            </Tooltip>
          </>
        ),
      },
    ],
    []
  );

  return (
    <PageContent
      history={history}
      title={title}
      columns={columns}
      data={mydata}
    />
  );
}
