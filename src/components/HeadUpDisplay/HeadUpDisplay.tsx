import {Accessor, createSignal} from "solid-js";
import styles from './HeadUpDisplay.module.css'


export const HeadUpDisplay = ({numSuccessfulQuestions}: {numSuccessfulQuestions: Accessor<number>}) => {

  const [currentTime, setCurrentTime] = createSignal('');

  function updateTime() {
    const currentDate = new Date();
    const hrs = leftPadTwoDigit(currentDate.getHours());
    const mins = leftPadTwoDigit(currentDate.getMinutes());
    const secs = leftPadTwoDigit(currentDate.getSeconds());
    setCurrentTime(`${hrs}:${mins}:${secs}`);
  }

  function leftPadTwoDigit(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  updateTime();
  setInterval(() => {
    updateTime();
  }, 1000);

  return (
    <div class={styles.HeadUpDisplay}>
      <div class={styles.clock}>
        <div class={styles.time}>{currentTime()}</div>
        <div class={styles.timezone}>UTC+0100</div>
      </div>
      <div class={styles.successfulJobs}>
        <div class={styles.successfulJobsTitle}>Erfolgreiche Aufträge</div>
        <div class={styles.successfulJobsCount}>{numSuccessfulQuestions()}</div>
      </div>
      <div class={styles.branding}>
        <div class={styles.brandingVersion}>secureLINK v3.14-alpha</div>
      </div>
    </div>
  );
}
