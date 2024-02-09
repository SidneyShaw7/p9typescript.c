import { HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItem from '@mui/material/ListItem';

const style = {
  paddingTop: 0,
  paddingBottom: 0
};

const HealthCheckEntryComp = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <ListItem style={style}>
      <FavoriteIcon
        sx={{
          color:
            entry.healthCheckRating === 0
              ? 'green'
              : entry.healthCheckRating === 1
              ? ' yellow'
              : entry.healthCheckRating === 2
              ? 'orange'
              : entry.healthCheckRating === 3
              ? 'red'
              : null,
        }}
      />
    </ListItem>
  );
};

export default HealthCheckEntryComp;
