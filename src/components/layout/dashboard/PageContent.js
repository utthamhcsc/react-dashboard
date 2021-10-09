import {
  Breadcrumbs,
  Card,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Link,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import MyTable from '../../tables/MyTable';
export default function PageContent({
  history,
  title,
  data,
  columns,
  canAdd = false,
}) {
  const { path } = useRouteMatch();
  const breadcum = path?.split('/') || [];
  return (
    <div>
      <Paper sx={{ mb: 2 }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="initial"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              boxSizing: 'border-box',
            }}
          >
            Welcome
          </Typography>
          <Box sx={{ textDecoration: 'capitalize' }}>
            <Breadcrumbs>
              {breadcum?.map((menu, index) => {
                if (index == breadcum.length - 1) {
                  return (
                    <Link
                      component={RouterLink}
                      underline="hover"
                      color="inherit"
                      to="/admin"
                    >
                      {menu}
                    </Link>
                  );
                } else {
                  return <Typography color="text.primary">{menu}</Typography>;
                }
              })}
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </Paper>

      <Card sx={{ maxHeight: '440px' }}>
        {canAdd && (
          <Box sx={{ textAlign: 'end', p: 1 }}>
            <Button
              variant="contained"
              onClick={() => history.push(`${path}/add`)}
              startIcon={<Add />}
            >
              Add
            </Button>
          </Box>
        )}
        <MyTable columns={columns} data={data} />
      </Card>
    </div>
  );
}
