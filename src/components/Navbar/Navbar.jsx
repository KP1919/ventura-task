import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
        <div className="logo_container">
          <img
            className="logo"
            src="/favicon.gif"
            alt="Picture of the author"
          />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
