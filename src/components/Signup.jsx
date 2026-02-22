import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react";


function Signup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm({ mode: "onChange" })

  const SignupDone = async (data) => {

    // const baseUrl = "http://localhost:3300"
    // const payload = {
    //   username: data.Name,
    //   email: data.Email,
    //   password: data.Password,
    //   contact: data.Contact,
    //   image: data.image[0]
    // }

    const formdata = new FormData();
    formdata.append('username', data.Name);
    formdata.append('email', data.Email);
    formdata.append('password', data.Password);
    formdata.append('contact', data.Contact);
    formdata.append('image', data.image[0]);

    try {
      const res = await fetch(`https://tasker-project-backend.vercel.app/api/v1/user/signup`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        // body: JSON.stringify(payload)
        body: formdata
      })
      const item = await res.json()
      console.log(item)

      if (res.ok) {
        toast.success("User Created Successfully")
        setShow(false)


      } else {
        toast.error("Failed to Create User")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to create User")
    }
  };


  return (

    <>
      <Button variant="primary" onClick={handleShow}>
        Signup
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton

          style={{ color: "white" }}
          className='bg-primary'
          closeVariant="white">
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form noValidate onSubmit={handleSubmit(SignupDone)}>
          <Form.Group className="mb-3" >
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text"
              placeholder="Enter your name"
              {...register("Name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long"
                }
              })}
            />
            {errors.Name && <p style={{ color: "red" }}>{errors.Name.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
              placeholder="Enter your Email Address"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address"
                }
              })} />
            {errors.Email && <p style={{ color: "red" }}>{errors.Email.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
            />
            {errors.Password && <p style={{ color: "red" }}>{errors.Password.message}</p>}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", position: "absolute", right: "10px", top: "190px" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text"
              placeholder="Enter your contact number"
              {...register("Contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "Enter a valid contact number"
                }
              })}
            />
            {errors.Contact && <p style={{ color: "red" }}>{errors.Contact.message}</p>}
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file"  {...register("image", {
              required: "Image is required",
            })} />
            {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
          </Form.Group>
        </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(SignupDone)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;

