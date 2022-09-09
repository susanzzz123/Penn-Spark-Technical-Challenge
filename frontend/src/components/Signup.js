import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap'

export const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const timeOut = () => {
    navigate('/')
    setSuccess(false)
  }

  axios.defaults.withCredentials = true

  const createUser = async () => {
    try {
      await axios.post('http://localhost:3000/account/signup', { username, password })
      setMsg('User creation was successful!')
      setSuccess(true)
      window.setTimeout(() => timeOut(), 2500)
    } catch (e) {
      window.alert(e.response.data)
    }
  }

  return (
    <>
      {
        success && (
          <Alert variant='success'>{msg}{' '}Returning to home page in a few seconds.</Alert>
        )
      }
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <style type="text/css">
            {`
                .signup-form {
                    vertical-align: middle;
                    margin: auto;
                    width: 50%;
                }
            `}
        </style>
        <Container>
            <Card className='signup-form my-auto'>
                <Card.Body>
                    <Card.Title>Sign Up For An Account</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)} required/>
                        </Form.Group>
                        <Button variant="primary" onClick={() => createUser()}>
                            Sign up
                        </Button>
                    </Form>
                    <Card.Text className='mt-2'>
                      Already have an account? Log in <Link to='/login'>here</Link>!
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
      </div>
    </>
  )
}