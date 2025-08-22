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
  const CSS_OVERRIDE_BORDER_DELETION = {
    '& td, & th': { borderBottom: 0 },
  };

  const overrideCSS = () => {
    if (isLast) {
      return CSS_OVERRIDE_BORDER_DELETION;
    }
    return null;
  };

  return (
    <TableRow {...props} sx={{ ...(props.sx || {}), ...overrideCSS() }}>
      {children}
    </TableRow>
  );
};

export default TableRowCustom;
