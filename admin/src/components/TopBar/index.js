import styles from "./TopBar.module.css";

function TopBar({ children, title }) {
  return (
    <div
      style={{ minHeight: "50px" }}
      className={
        styles.topBar +
        " p-2 bg-light rounded-bottom text-dark border shadow mx-2 mb-4 d-flex align-items-center justify-content-between"
      }
    >
      <h1 className="fs-5 m-0">{title}</h1>
      <div className="d-flex align-items-center gap-2">{children}</div>
    </div>
  );
}

export default TopBar;
