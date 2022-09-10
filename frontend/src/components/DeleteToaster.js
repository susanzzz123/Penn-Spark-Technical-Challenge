import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { IoNotificationsSharp } from "react-icons/io5"

export const DeleteToaster = ({ setDeleteNotif, deleteNotif }) => {

  return (
    <>
        <style>{`
            .toast-icon {
                color: #CD5C5C;
                font-size: 1.25rem;
            }
            .toast {
                width: fit-content;
            }
        `}</style>
        <ToastContainer>
            <Toast className='toast' onClose={() => setDeleteNotif(false)} show={deleteNotif} delay={5000} autohide>
                <Toast.Header>
                    <IoNotificationsSharp className='toast-icon'></IoNotificationsSharp>&nbsp;
                    Post Deletion&nbsp; &nbsp;
                </Toast.Header>
                <Toast.Body>Post deleted successfully!</Toast.Body>
            </Toast>
        </ToastContainer>
    </>
  );
}
