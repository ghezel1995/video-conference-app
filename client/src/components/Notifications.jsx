import { useContext } from 'react';
import { SocketContext } from '../SocketContext';

export const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className='d-flex justify-content-center align-items-center'>
          <h1>{call.name} is calling </h1>
          <button className='bg-warning p-2 rounded' onClick={answerCall}>
            <i class='bi bi-telephone-fill'> Answer Call</i>
          </button>
        </div>
        
      )}
    </>
  );
};
