import React from "react"
import { Card, Badge } from "react-bootstrap"

export const TweetList = ({ date, author, tweetText, tweetImg, hashtag }) => {
    return (
        <Card className='mx-2' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={tweetImg} />
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Posted at: {date}</Card.Subtitle>
                <Card.Text>{tweetText}</Card.Text>
                <Badge pill bg="primary">{hashtag}</Badge>
            </Card.Body>
        </Card>
    )
}