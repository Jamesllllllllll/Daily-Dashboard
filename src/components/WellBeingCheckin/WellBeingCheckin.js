import EmotionsCheckin from '../../features/emotionsCheckin/EmotionsCheckin';
import EnergyCheckin from '../../features/energyCheckin/EnergyCheckin';
import Calendar from '../../features/calendar/Calendar';
import StyledCard from '../LayoutComponents/FeatureCard';
import Box from '@mui/material/Box';
export default function WellBeingCheckin() {
  return (
    <>
      <Box sx={{ minWidth: 550 }} className="cardContainer">
        <h2 className="cardTitle">Well Being Check-in</h2>
        <StyledCard
          content={
            <>
              <EmotionsCheckin />
              <EnergyCheckin />
              <Calendar />
            </>
          }
        />
      </Box>
    </>
  );
}
