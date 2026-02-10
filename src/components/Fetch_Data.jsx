import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import CardItem from './Card';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
function Fetch_Data() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const DataHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3300/api/v1/createCard/getAll");
      const data = await res.json();
      setItem(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    DataHandler();
  }, []);
  return (
    <div className="container my-2">
      {/* <div className="text-center">
        <Button className='m-3' variant="primary" onClick={DataHandler}>
          Fetch Data <i class="fa-solid fa-spinner"></i>
        </Button>
      </div> */}
      
      {loading && (<div className='d-flex justify-content-center align-items-center mt-3'> <Spinner style={{color:"gray", margin:"200px"}}  animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></div>)}

      {!loading && item && item.length > 0 ? (
  <div className="row my-4 g-3 ">
    {item.map((card) => (
      <div key={card._id} className="col-12 col-sm-6 col-md-6 col-lg-4">
        <CardItem data={card} />
      </div>
    ))}
  </div>
) : (
  !loading && <p style={{ color: "grey" , margin:"200px" }} className='text-center'> No card exist Now <i class="fa-solid fa-folder-open"></i></p>
)}

    </div>
  );
}

export default Fetch_Data;
