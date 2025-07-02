import React from 'react';
import { Tooltip, Typography } from '@mui/material';

interface ExcerptProps {
  text: string;
  maxLength?: number;
  tooltip?: boolean;
}

const Excerpt: React.FC<ExcerptProps> = ({
  text,
  maxLength = 100,
  tooltip = true,
}) => {
  const isLongText = text.length > maxLength;
  const displayText = isLongText ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Tooltip title={tooltip && isLongText ? text : ''} arrow>
      <Typography variant="body2" component="span">
        {displayText}
      </Typography>
    </Tooltip>
  );
};

export default Excerpt;
