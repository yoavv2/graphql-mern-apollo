import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

// import { useForm } from "../util/hooks";

function Register(props) {
  // const [errors, setErrors] = useState({});

  // const { onChange, onSubmit, values } = useForm(registerUser, {
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const [addUser, { loading }] = useMutation(REGISTER_USER, {
  //   update(_, result) {
  //     props.history.push("/");
  //   },
  //   onError(err) {
  //     setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //   },
  //   variables: values,
  // });

  // function registerUser() {
  //   addUser();
  // }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (object) => {
      console.log(`object`, object);
    },
  });
  return (
    <div className="form-container">
      <Form onSubmit={formik.handleSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          lable="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={formik.values.username}
          error={formik.errors.username}
          onChange={formik.handleChange}
        />
        <Form.Input
          lable="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={formik.values.email}
          // error={errors.email ? true : false}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />

        <Form.Input
          lable="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={formik.values.password}
          // error={errors.password ? true : false}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <Form.Input
          lable="ConfirmPassword"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          // error={errors.confirmPassword ? true : false}
          error={formik.errors.confirmPassword}
          onChange={formik.handleChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {/* {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list"></ul>
          {Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))} */}
      {/* </div>
      )} */}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
