import Navigation from '../components/Navigation/Navigation';
import styles from './Settings.module.css';

export default function Settings() {
  return (
    <>
      <Navigation />
      <div className={styles.Settings}>
        <h1>Settings</h1>
        <ul>
          <li>Setting 1</li>
          <li>Setting 2</li>
          <li>Setting 3</li>
        </ul>
      </div>
    </>
  );
}
