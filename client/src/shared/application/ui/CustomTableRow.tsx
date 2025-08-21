import { TableRow, TableRowProps } from '@mui/material';
import React from 'react';

interface TableRowCustomProps extends TableRowProps {
  isLast?: boolean;
}

/**
 * A TableRow that removes borders from all cells if isLast is true.
 * Usage: <TableRowCustom isLast={idx === arr.length - 1} ... />
 */
const TableRowCustom: React.FC<TableRowCustomProps> = ({ isLast, children, ...props }) => (
  <TableRow
    {...props}
    sx={{ ...(props.sx || {}), ...(isLast ? { '& td, & th': { border: 0 } } : {}) }}
  >
    {children}
  </TableRow>
);

export default TableRowCustom;
