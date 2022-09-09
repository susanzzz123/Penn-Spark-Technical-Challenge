import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TweetList } from './components/TweetList'
import { SearchBar } from './components/SearchBar'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'

export const App = () => {
  const [tweets, setTweets] = useState([])
  const [user, setUser] = useState('')
  const [clicked, setClicked] = useState(false)
  const [tweetText, setTweetText] = useState('')
  const [tweetImg, setTweetImg] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [selected, setSelected] = useState('')
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('')
  const [deleteNotif, showDeleteNotif] = useState(false)

  const loggedIn = (user !== '' && user !== undefined)
  const filteredTweets = tweets.filter(tweet => tweet.hashtag === selected)
  axios.defaults.withCredentials = true


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
      await axios.post('http://localhost:3000/api/tweets/add', { tweetText, tweetImg, hashtag, created_at: Date() })
      setClicked(false)
      setTweetText('')
      setTweetImg('')
      setHashtag('')
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
            .nav-width {
              width: 100vw
            }
          `}
        </style>
        <Navbar className='mb-3 nav-width' bg="light">
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
                    <Link to='/signup'><Button className='button'>Sign up</Button></Link>
                  </Navbar.Collapse>
                </>
              )
            }
          </Container>
        </Navbar>
        <div className='overflow-auto'>
          <SearchBar setSelected={setSelected} show={show} setShow={setShow}></SearchBar>
          {
            loggedIn && (
              <div className='d-flex justify-content-center mb-4'>
                <Button onClick={() => setClicked(true)}>
                  New Tweet
                </Button>
                <Modal
                aria-labelledby="contained-modal-title-vcenter"
                show={clicked}
                onHide={() => setClicked(false)}
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        New Tweet
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control
                          placeholder='Add an image:'
                          onChange={e => setTweetImg(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                          <Form.Control
                          as="textarea"
                          placeholder='Write down some thoughts:'
                          onChange={e => setTweetText(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                          <Form.Control
                          placeholder='#hashtag:'
                          onChange={e => setHashtag(e.target.value)} required/>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => add()}>Post</Button>
                    </Modal.Footer>
                </Modal>
                
              </div>
            )
          }
          {
            show && (
              <Container className='d-grid justify-content-center'>
                <Row>
                  {filteredTweets.map(tweet =>
                    <Col key={tweet._id}>
                      <TweetList
                      date={tweet.created_at}
                      author={tweet.author}
                      tweetText={tweet.tweetText}
                      tweetImg={tweet.tweetImg}
                      hashtag={tweet.hashtag}
                      _id={tweet._id}
                      key={tweet._id}
                      user={user}>
                      </TweetList>
                  </Col>
                  )}
                </Row>
              </Container>
            )
          }
          {
            tweets.length === 0 && (<Spinner animation="border" variant="primary" />)
          }
          {
            !show && (
              <Container className='d-grid justify-content-center'>
              <Row>
                {tweets.map(tweet =>
                  <Col key={tweet._id}>
                    <TweetList
                    date={tweet.created_at}
                    author={tweet.author}
                    tweetText={tweet.tweetText}
                    tweetImg={tweet.tweetImg}
                    hashtag={tweet.hashtag}
                    _id={tweet._id}
                    key={tweet._id}
                    user={user}>
                    </TweetList>
                  </Col>
                )}
              </Row>
            </Container>
            )
          }
        </div>
      </>
    );
  }