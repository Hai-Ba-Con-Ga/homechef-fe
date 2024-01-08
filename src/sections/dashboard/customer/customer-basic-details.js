import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';

export const CustomerBasicDetails = (props) => {
  const { address, country, email, isVerified, phone, state, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <PropertyList>
        <PropertyListItem divider label="Email" value={email} />
        <PropertyListItem divider label="Phone" value={phone} />
        <PropertyListItem divider label="Country" value={country} />
        <PropertyListItem divider label="State/Region" value={state} />
        <PropertyListItem divider label="Address" value={state} />
      </PropertyList>
      <CardActions>
        <Button color="inherit" size="small">
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
};

CustomerBasicDetails.propTypes = {
  address: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string,
};
