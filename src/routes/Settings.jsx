import { useSelector, useDispatch } from 'react-redux';
import {
  citySelector,
  defaultWeatherSelector,
  updateCity,
  updateWeather,
  weatherSelector,
} from '../features/weather/weatherSlice';
import { changeCitySelector, changeCity } from './settingsSlice';
import { NavigationSettings } from '../components/Navigation/Navigation';
import styles from './Settings.module.css';
import WeatherForm from '../components/WeatherForm/WeatherForm';
import StyledCard from '../components/LayoutComponents/FeatureCard';

export default function Settings() {
  const city = useSelector(citySelector);
  const wantToChangeCity = useSelector(changeCitySelector);
  const weather = useSelector(weatherSelector);
  const defaultWeather = useSelector(defaultWeatherSelector);

  const dispatch = useDispatch();

  const setCity = () => {
    dispatch(updateCity(''));
    dispatch(updateWeather(defaultWeather));
    dispatch(changeCity(!wantToChangeCity));
  };

  const CurrentCity = () => {
    return (
      <>
        <p>Current City: {city}</p>
        <button onClick={setCity}>Change city</button>
      </>
    );
  };

  return (
    <>
      <NavigationSettings />
      <div className={styles.Settings}>
        <h1>Settings</h1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <StyledCard
              content={wantToChangeCity ? <WeatherForm /> : <CurrentCity />}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
