import { TableRow, TableRowProps } from '@mui/material';
import React from 'react';

interface TableRowCustomProps extends TableRowProps {
  isLast?: boolean;
}

/**
 * A TableRow that removes border bottom from all cells if isLast is true.
 * Usage: <TableRowCustom isLast={idx === arr.length - 1} ... />
 */
const TableRowCustom: React.FC<TableRowCustomProps> = ({ isLast, children, ...props }) => {
  const handleBorder = () => {
    if (isLast) {
      return { '& td, & th': { borderBottom: 0 } };
    }
    return null;
  };

  return (
    <TableRow {...props} sx={{ ...(props.sx || {}), ...handleBorder() }}>
      {children}
    </TableRow>
  );
};

export default TableRowCustom;
