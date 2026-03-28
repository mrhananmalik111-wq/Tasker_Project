import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox} from "@fortawesome/free-solid-svg-icons";

export default function NoData() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    },
    content: {
      textAlign: "center",
      padding: "40px",
    },
    icon: {
      fontSize: "64px",
      color: "#667eea",
      marginBottom: "20px",
      opacity: 0.7,
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
    },
    message: {
      fontSize: "16px",
      color: "#666",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <FontAwesomeIcon icon={faInbox} style={styles.icon} />
        <h2 style={styles.title}>No Data Found</h2>
        <em style={styles.message}>Please add your first task to get started</em>
      </div>
    </div>
  );
}