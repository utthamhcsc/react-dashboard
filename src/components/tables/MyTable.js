import React from 'react';
import {
  Table as MuiTable,
  TableSortLabel,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TextField,
  TableContainer,
  Box,
  Button,
  Toolbar,
  InputAdornment,
} from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableSearchHeader from './TableSearchHeader';

import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const {
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    gotoPage,
    pageCount,
  } = props;

  const handleBackButtonClick = previousPage;

  const handleNextButtonClick = nextPage;

  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={!canPreviousPage}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!canNextPage}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Table({ columns = [], data = [], add, search = false }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    state,
    pageOptions,
    setPageSize,
    gotoPage,
    setGlobalFilter,
    pageCount,
    canPreviousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  const classes = useStyles();

  return (
    <Box>
      {search && (
        <TableSearchHeader
          filter={state.globalFilter}
          setFilter={setGlobalFilter}
          add={add}
          classes={classes}
        />
      )}
      <TableContainer>
        <MuiTable {...getTableProps()} stickyHeader>
          <TableHead
            style={{ zIndex: '1 !important', backgroundColor: '#f0f4f5' }}
          >
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps)}
                  >
                    {column.render('Header')}

                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardIcon fontSize="small" />
                      )
                    ) : (
                      ''
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                  No Data In Table
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              page={state.pageIndex}
              onChangeRowsPerPage={(e) => {
                setPageSize(e.target.value);
                gotoPage(0);
              }}
              rowsPerPage={state.pageSize}
              count={data.length}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              ActionsComponent={() => (
                <TablePaginationActions
                  nextPage={nextPage}
                  previousPage={previousPage}
                  canNextPage={canNextPage}
                  canPreviousPage={canPreviousPage}
                  gotoPage={gotoPage}
                  pageCount={pageCount}
                />
              )}
            />
          </TableFooter>
        </MuiTable>
      </TableContainer>
    </Box>
  );
}

function App({ data, columns, add, search }) {
  return <Table columns={columns} data={data} add={add} search={search} />;
}

export default App;
