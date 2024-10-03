import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className='container'>
      {leaveCall && (
        <form
          onSubmit={handleClick}
          noValidate
          autoComplete='off'
          className='d-flex justify-content-evenly align-items-center m-1 p-3'
        >
          <section className='d-flex flex-column w-25'>
            <h3>Account Info</h3>
            <label>Name</label>
            <input
              type='text'
              value={name}
              className='mt-2 mb-2 p-2 rounded w-100 bg-black'
              onChange={(e) => setName(e.target.value)}
            />
            <CopyToClipboard text={me}>
              <button className='bg-primary rounded p-2'>Copy your ID</button>
            </CopyToClipboard>
          </section>

          <section className='d-flex flex-column w-25'>
            <h3>Make a Call</h3>
            <label>ID to Call</label>
            <input
              type='text'
              value={idToCall}
              className='mt-2 mb-2 p-2 rounded bg-black w-100'
              onChange={(e) => setIdToCall(e.target.value)}
            />

            {callAccepted && !callEnded ? (
              <button className='bg-danger p-3 rounded' onClick={leaveCall}>
                <i className='bi bi-telephone-minus-fill'> Hang up</i>
              </button>
            ) : (
              <button
                className='bg-success rounded p-1'
                onClick={() => callUser(idToCall)}
              >
                <i className='bi bi-telephone-fill'> Call</i>
              </button>
            )}
          </section>
        </form>
      )}
      {children}
    </div>
  );
};
