import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <button className={styles.button}>사이드바 토클 버튼</button>
      <div className={styles.spacer}></div>

      <div className={styles.action}></div>
    </div>
  );
}
