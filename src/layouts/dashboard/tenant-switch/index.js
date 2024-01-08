import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";

export const TenantSwitch = (props) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  const handleTenantChange = useCallback((tenant) => {
    setOpenPopover(false);
  }, []);

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="h6">
            Admin
          </Typography>
          <Typography color="neutral.400" variant="body2">
            HomeChef
          </Typography>
        </Box>
        <IconButton onClick={handlePopoverOpen} ref={anchorRef}></IconButton>
      </Stack>
    </>
  );
};

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object
};
