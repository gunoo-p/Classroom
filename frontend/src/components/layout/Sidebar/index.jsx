import styles from './sidebar.module.css';

export default function sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>로고</div>
        <p className={styles.logoText}>대시보드</p>
      </div>

      <div className={styles.menuList}>
        <div className={styles.menuItem}>
          메뉴 아이콘
          <p>메뉴 이름</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.profile}>홈</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>홍길동</div>
            <div className={styles.userRole}>관리자</div>
          </div>
        </div>
        <button className={styles.logoutBtn}>로그아웃</button>
      </div>
    </div>
  );
}
