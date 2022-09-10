import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Container } from 'react-bootstrap'
import { AiOutlineSearch } from "react-icons/ai"
import { BsArrowReturnLeft } from "react-icons/bs"

export const SearchBar = ({ show, setShow, setSelected }) => {
    const [searchTag, setSearchTag] = useState('')

    const handleSearch = () => {
        if (searchTag !== '') {
            setSelected(searchTag)
            setShow(true)
        }
    }
    
    const handleReturn = () => {
        setShow(false)
        setSearchTag('')
    }

    return (
        <>
            <style>{`
                .search {
                    width: 30%;
                }
                .return {
                    font-size: 1.75rem;
                    color: #696969;
                    cursor: pointer;
                    margin-left: 30px;
                }
            `}</style>
            <Container className='search d-flex justify-content-center mt-3'>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Search tweets in a #topic:"
                    aria-describedby="basic-addon2"
                    onChange={e => setSearchTag(e.target.value)}
                    value={searchTag}/>
                    <Button
                    variant="primary"
                    id="button-addon2"
                    onClick={() => handleSearch()}>
                        <AiOutlineSearch></AiOutlineSearch>{' '}Search
                    </Button>
                </InputGroup>
                {
                    show && (
                        <div className='d-flex'>
                            <BsArrowReturnLeft
                            className='return'
                            onClick={() => handleReturn()}></BsArrowReturnLeft>
                        </div>
                    )
                }
            </Container>
            
        </>
    )
}