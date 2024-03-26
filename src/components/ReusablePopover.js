import React from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ReusablePopover = ({ open, anchorEl, onClose, anchorOrigin, transformOrigin, content }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <Box sx={{ p: 2 }}>
        <Typography>{content}</Typography>
      </Box>
    </Popover>
  );
};

export default ReusablePopover;
