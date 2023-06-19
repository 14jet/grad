import styles from "./CloseButton.module.css";

function CloseButton({ className, ...props }) {
  let classes = styles.closeButton;
  if (className) {
    classes += " " + className;
  }
  return (
    <button className={classes} {...props}>
      x
    </button>
  );
}

export default CloseButton;
