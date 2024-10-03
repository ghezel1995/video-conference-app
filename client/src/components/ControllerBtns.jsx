import { useContext } from 'react';
import { SocketContext } from '../SocketContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ControllerBtns = () => {
    const { toggleVideo, toggleAudio, isVideoEnabled, isAudioEnabled } =
      useContext(SocketContext);
  return (
    <div className='border d-flex justify-content-evenly'>
      {/* Video Toggle */}
      <div className='ms-2' onClick={toggleVideo}>
        {isVideoEnabled ? (
          <i
            className='bi bi-camera-video-fill'
          ></i>
        ) : (
          <i
            className='bi bi-camera-video-off-fill'
            style={{ fontSize: '2rem' }}
          ></i>
        )}
      </div>
      {/* Audio Toggle */}
      <div className='audio-toggle' onClick={toggleAudio}>
        {isAudioEnabled ? (
          <i className='bi bi-mic-fill' style={{ fontSize: '2rem' }}></i>
        ) : (
          <i className='bi bi-mic-mute-fill' style={{ fontSize: '2rem' }}></i>
        )}
      </div>
    </div>
  );
};
