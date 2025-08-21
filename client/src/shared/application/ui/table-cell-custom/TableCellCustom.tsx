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
  const handleMobileTruncation = () => {
    if (truncateOnMobile) {
      return {
        '@media (max-width: 768px) and (orientation: portrait)': {
          maxWidth: '80px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      };
    }
    return null;
  };

  return (
    <TableCell {...props} sx={{ ...(props.sx || {}), ...handleMobileTruncation() }}>
      {children}
    </TableCell>
  );
};

export default TableCellCustom;
