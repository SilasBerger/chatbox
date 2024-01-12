import styles from './styles.module.scss';

export default ({text, isUser}: {text: string, isUser: boolean}) => {
  return (
    <div classList={{[styles.OutputLine]: true, [styles.byUser]: isUser}}>
      <div class={styles.prefix}>&gt;</div>
      <div>{text}</div>
    </div>
  );
}
