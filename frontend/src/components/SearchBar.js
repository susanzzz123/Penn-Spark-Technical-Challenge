import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Container } from 'react-bootstrap'
import { AiOutlineSearch } from "react-icons/ai"
import { BsArrowReturnLeft } from "react-icons/bs"

export const SearchBar = ({ show, setShow, setDisplayedTweets }) => {
    const [searchTag, setSearchTag] = useState('')

    const handleSearch = async () => {
        // try {
        //     const { data } = await axios.get('http://localhost:3000/api/tweets/hashtag', { hashtag: searchTag })
        //     setDisplayedTweets(data)
        // } catch (e) {
        //     window.alert(e.response.data)
        // }
        
    }

    return (
        <>
            <style>{`
                .search {
                    width: 30%;
                }
                .return {
                    font-size: 2rem;
                    color: #696969;
                }
            `}</style>
            <Container className='search d-flex justify-content-center'>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Search tweets in a #topic:"
                    aria-describedby="basic-addon2"
                    onChange={e => setSearchTag(e.target.value)}
                    />
                    <Button
                    variant="primary"
                    id="button-addon2"
                    onClick={() => handleSearch()}>
                        <AiOutlineSearch></AiOutlineSearch>{' '}Search
                    </Button>
                </InputGroup>
                {
                    show && (
                        <BsArrowReturnLeft
                        className='return'
                        onClick={() => setShow(false)}></BsArrowReturnLeft>
                    )
                }
            </Container>
            
        </>
    )
}