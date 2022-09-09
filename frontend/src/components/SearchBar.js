import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Container } from 'react-bootstrap'
import { AiOutlineSearch } from "react-icons/ai"

export const SearchBar = ({ setSearchTag }) => {
    return (
        <>
            <style>{`
                .search {
                    width: 30%;
                }
            `}</style>
            <Container className='search d-flex justify-content-center'>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Search tweets in a #topic:"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="primary" id="button-addon2">
                    <AiOutlineSearch></AiOutlineSearch>{' '}Search
                    </Button>
                </InputGroup>
            </Container>
            
        </>
    )
}