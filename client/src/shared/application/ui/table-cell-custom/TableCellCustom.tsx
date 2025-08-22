import { TableCell, TableCellProps } from '@mui/material';
import React from 'react';

interface TableCellCustomProps extends TableCellProps {
  truncateOnMobile?: boolean;
}

/**
 * A TableCell that truncates text on mobile portrait orientation if truncateOnMobile is true.
 * Usage: <TableCellCustom truncateOnMobile size="small">...</TableCellCustom>
 */
const TableCellCustom: React.FC<TableCellCustomProps> = ({
  truncateOnMobile,
  children,
  ...props
}) => {
  const CSS_OVERRIDE_TEXT_TRUNCATION = {
    '@media (max-width: 768px) and (orientation: portrait)': {
      maxWidth: '80px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };

  const overrideCSS = () => {
    if (truncateOnMobile) {
      return CSS_OVERRIDE_TEXT_TRUNCATION;
    }
    return null;
  };

  return (
    <TableCell {...props} sx={{ ...(props.sx || {}), ...overrideCSS() }}>
      {children}
    </TableCell>
  );
};

export default TableCellCustom;
