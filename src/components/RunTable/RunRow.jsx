import React from 'react';
import { MAIN_COLOR } from 'src/utils/const';
import { formatPace, titleForRun, colorFromType, formatRunTime } from 'src/utils/utils';
import styles from './style.module.scss';

const RunRow = ({ runs, run, locateActivity, runIndex, setRunIndex }) => {
  const distance = (run.distance / 1000.0).toFixed(1);
  const pace = run.average_speed;

  const paceParts = pace ? formatPace(pace) : null;

  const heartRate = run.average_heartrate;

  const ele = run.ele;

  const activityID = "https://www.strava.com/activities/" + run.run_id;

  const type = run.type;

  const runTime = formatRunTime(distance,pace);

  // change click color
  const handleClick = (e, runs, run) => {
    const elementIndex = runs.indexOf(run);
    e.target.parentElement.style.color = 'red';

    const elements = document.getElementsByClassName(styles.runRow);
    if (runIndex !== -1 && elementIndex !== runIndex) {
      elements[runIndex].style.color = colorFromType(runs[runIndex].type);
    }
    setRunIndex(elementIndex);
  };

  return (
    <tr
      className={styles.runRow}
      key={run.start_date_local}
      onClick={(e) => {
        handleClick(e, runs, run);
        locateActivity(run);
      }}
      style={{color: colorFromType(type)}}
    >
      <td>{run.name}
        <a className="moon-gray b" href={activityID} target="_blank">
          <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png" border="0" width="20px" height="20px"/>
        </a>
      </td>
      <td>{type}</td>
      <td>{distance}</td>
      {/*{pace && <td>{paceParts}</td>}*/}
      {/*<td>{heartRate && heartRate.toFixed(0)}</td>*/}
      <td>{ele}</td>
      <td>{runTime}</td>
      <td className={styles.runDate}>{run.start_date_local}</td>
    </tr>
  );
};

export default RunRow;
