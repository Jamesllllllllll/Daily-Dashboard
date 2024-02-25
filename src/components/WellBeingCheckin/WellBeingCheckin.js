import EmotionsCheckin from '../../features/emotionsCheckin/EmotionsCheckin';
import EnergyCheckin from '../../features/energyCheckin/EnergyCheckin';
import Calendar from '../../features/calendar/Calendar';
import StyledCard from '../LayoutComponents/FeatureCard';
import styles from './WellBeingCheckin.module.css'
import Box from '@mui/material/Box';
export default function WellBeingCheckin() {
  return (
      <Box className="cardContainer" data-testid='wellBeingCheckin'>
        <h2 className="cardTitle">Well Being Check-in</h2>
        <StyledCard
          content={
            <div className = {styles.checkinContainer}>
              <EmotionsCheckin />
              <EnergyCheckin />
              <Calendar />
            </div>
          }
        />
      </Box>
  );
}
