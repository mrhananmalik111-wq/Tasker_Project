import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react";


function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const LoginDone = async (data) => {
    const payload = {
      email: data.Email,
      password: data.Password,
    };

    try {
      const res = await fetch(`http://localhost:3300/api/v1/login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const item = await res.json();
      // console.log(item);

      if (res.ok) {
        toast.success("Login Successful");
        setShow(false);
      } else {
        toast.error(item.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ color: "white" }} className="bg-primary" closeVariant="white">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(LoginDone)}>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                 type={showPassword ? "text" : "password"}
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
              style={{ cursor: "pointer", position: "absolute", right: "10px", top: "105px" }}
            >{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit(LoginDone)}>Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
