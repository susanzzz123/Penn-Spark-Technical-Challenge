import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'

export const App = () => {
  const [tweets, setTweets] = useState([])
  const [hashtag, setHashtag] = useState('')
  const [user, setUser] = useState('')

  const loggedIn = (user !== '' && user !== undefined)

  useEffect(() => {
    const intervalID = setInterval(async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/tweets')
        setTweets(data)
      } catch (e) {
        setMsg('error while fetching questions')
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/status')
        setUser(data)
      } catch (e) {
        setMsg('error while fetching logged in user')
      }
    }
    getSession()
  }, [])

  const logOut = async () => {
    try {
      await axios.post('http://localhost:3000/account/logout')
      setUser('')
    } catch (e) {
      window.alert(e.response.data)
    }
  }

  const add = async () => {
    try {
      await axios.post('http://localhost:3000/api/tweets/add', { tweetText, hashtag })
    } catch (e) {
      window.alert(e.response.data)
    }
  }

    return (
      <>
        <style>
          {`
            .header {
              font-size: 1.75rem;
              font-weight: bold;
            }
            .button {
              margin-left: 10px;
            }
          `}
        </style>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand className='header'>Tweetoe</Navbar.Brand>
            {
              loggedIn && (
                <>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      Signed in as: {user}
                    </Navbar.Text>
                    <Button
                    className='button'
                    variant='danger'
                    onClick={() => logOut()}>
                      Log out
                    </Button>
                  </Navbar.Collapse>
                </>
              )
            }
            {
              !loggedIn && (
                <>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Link to='/login'><Button>Log in</Button></Link>
                    <Link to='/signup'><Button>Sign up</Button></Link>
                  </Navbar.Collapse>
                </>
              )
            }
          </Container>
        </Navbar>

        
      </>
    );
  }