import { useSelector, useDispatch } from 'react-redux';
import {
  citySelector,
  updateCity
} from '../features/weather/weatherSlice';
import { changeCitySelector, changeCity } from './settingsSlice';
import Navigation from '../components/Navigation/Navigation';
import styles from './Settings.module.css';
import WeatherForm from '../components/WeatherForm/WeatherForm';

export default function Settings() {
  const city = useSelector(citySelector);
  const wantToChangeCity = useSelector(changeCitySelector);

  const dispatch = useDispatch();

  const setCity = () => {
    dispatch(updateCity(''));
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
      <Navigation />
      <div className={styles.Settings}>
        <h1>Settings</h1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            {wantToChangeCity ? <WeatherForm /> : <CurrentCity />}
          </li>
        </ul>
      </div>
    </>
  );
}
