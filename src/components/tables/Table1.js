import React, { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTable } from 'react-table';
function MyTable({ columns, data, loadMoreData = undefined }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data,
  });
  const ref = useRef(null);
  const ref2 = useRef(null);
  // const callback=(entries)=>{
  //   const dat=entries[0]
  //   if(dat?.isIntersecting){
  //     loadMoreData && loadMoreData();
  //   }
  // }

  // React.useEffect(()=>{

  //   const Observer= new IntersectionObserver(callback,{threshold:0.2,
  //   root:ref2.current
  //   })
  //   ref?.current && Observer.observe(ref.current);
  //   return ()=>{
  //     ref.current && Observer.unobserve(ref.current);
  //   }
  // },[ref?.current])

  return (
    <>
      <TableContainer component={Paper} style={{ maxHeight: 550 }} ref={ref2}>
        <Table
          stickyHeader
          {...getTableProps()}

          //  className="table table-bordered"
        >
          <TableHead style={{ zIndex: '1 !important' }}>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                <TableCell style={{ fontWeight: 500 }}>Sl. No.</TableCell>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={{
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                    }}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    <TableCell>{i + 1}</TableCell>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            // whiteSpace: "nowrap",
                          }}
                        >
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
            {/* {rows.length>5 &&
              <TableRow ref={ref}>
              <TableCell colSpan={8} style={{ textAlign: "center" }}>
                load More Data
              </TableCell>
            </TableRow>
            } */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MyTable;
