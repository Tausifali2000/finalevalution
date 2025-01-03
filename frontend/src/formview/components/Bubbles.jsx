import styles from "./cssModules/bubble.module.css";

const Bubbles = ({ content, isImage = false }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src="/SVG.png" alt="Profile" />
      </div>
      <div className={styles.content}>
        {/* Conditionally render image or text */}
        {isImage ? (
          <img src={content} alt="Bubble content" className={styles.imageBubble} />
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

export default Bubbles;
