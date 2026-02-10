import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Loader() {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        <h2>No Data</h2>
        <em>First enter your Data</em>
      </div>
    </>
  );
}
