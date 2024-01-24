import { HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItem from '@mui/material/ListItem';

const HealthCheckEntryComp = ({ entry }: { entry: HealthCheckEntry }) => {
  // const style = {
  //   backgroundColor:
  //     entry.healthCheckRating === 0
  //       ? 'green'
  //       : entry.healthCheckRating === 1
  //       ? ' yellow'
  //       : entry.healthCheckRating === 2
  //       ? 'orange'
  //       : entry.healthCheckRating === 3
  //       ? 'red'
  //       : null,
  // };

  return (
    <ListItem>
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
