import React from "react"
import axios from "axios"
import { Card, Badge } from "react-bootstrap"
import { IoTrashOutline } from "react-icons/io5"

export const TweetList = ({ date, author, tweetText, tweetImg, hashtag, _id, user }) => {
    const deletePost = async () => {
        try {
          const { data } = await axios.delete('http://localhost:3000/api/tweets/delete', { data: { _id, author } })
        } catch (e) {
          window.alert(e.response.data)
        }
      }

    return (
        <>
            <style>{`
                .delete {
                    color: red;
                    cursor: pointer;
                    float: right;
                }
            `}</style>
            <Card className='mx-2 my-2 shadow-sm' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={tweetImg} />
                <Card.Body>
                    <Card.Title className='mb-2'>
                        {author}{' '}
                        {
                            user === author && (
                                <IoTrashOutline
                                className="delete"
                                onClick={() => deletePost()}></IoTrashOutline>
                            )
                        }
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Posted at: {date}</Card.Subtitle>
                    <Card.Text>{tweetText}</Card.Text>
                    <Badge pill bg="primary">{hashtag}</Badge>
                </Card.Body>
            </Card>
        </>
    )
}