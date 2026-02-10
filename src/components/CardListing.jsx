import { Container, Row, Col } from "react-bootstrap";
import Loader from "./Loader";
import CardItem from "./Card";

export default function CardListing({ tasks }) {
  return (
    <Container className="mt-4">
      {tasks && tasks.length > 0 ? (
        <Row className="g-4 justify-content-center">
          {tasks.map((task) => (
            <Col
              key={task._id}
              xs={12}   // mobile: 1 card per row
              sm={6}    // tablet: 2 cards per row
              md={6}    // medium screens: 2 cards per row
              lg={4}    // large screens: 3 cards per row
            >
              <CardItem task={task} />
            </Col>
          ))}
        </Row>
      ) : (
        <Loader />
      )}
    </Container>
  );
}
