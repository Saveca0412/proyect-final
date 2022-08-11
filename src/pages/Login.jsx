import '../styles/login.css'
import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
      .then((res) => {
        navigate("/");
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("Usuario no valido");
        }
        console.log(error.response);
      });
    reset({
      email: "",
      password: ""
    });
  };

//   `"email": "mason@gmail.com",
//     "password": "mason1234"

    return (
        <div>
            <h1>Login</h1>
            <br />
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <h2>Email</h2>
                    <Form.Control className='Email' type="email" placeholder="Enter email" {...register("email")} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <h2>Password</h2>
                    <Form.Control className='Password' type="password" placeholder=" Enter password" {...register("password")} />
                </Form.Group>
                <Button className='SUBMIT' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;