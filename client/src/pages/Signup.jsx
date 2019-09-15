import React from "react";
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from '../style/AuthForms';

function Signup() {
  return (
    <Card>
      <Form>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="password again" />
        <Button>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;