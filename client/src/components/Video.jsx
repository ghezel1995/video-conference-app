import React, { useContext, useMemo } from 'react';
import { SocketContext } from '../SocketContext';

export const Video = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    call,
  } = useContext(SocketContext);
  
  const myVideoComponent = useMemo(
    () => (
      <div className='my-own-video col-lg-6 bg-secondary rounded-start'>
        <h3>{name || 'Me'}</h3>
        <video
          className='my-video-stream rounded'
          playsInline
          muted
          ref={myVideo}
          autoPlay
        />
      </div>
    ),
    [name, myVideo]
  );

  return (
    <div className='video-container container d-flex justify-content-center row'>
      {myVideoComponent}

      {callAccepted && !callEnded && (
        <div className='users-video col-lg-6 bg-dark rounded-end'>
          <h3>{call.name || 'user'}</h3>
          <video
            className='users-video-stream'
            playsInline
            ref={userVideo}
            autoPlay
          />
        </div>
      )}
    </div>
  );
};
