import { useContext } from 'react';
import { SocketContext } from '../SocketContext';

export const CallControllers = () => {
  const { toggleVideo, toggleAudio, isVideoEnabled, isAudioEnabled } =
    useContext(SocketContext);
  return (
    <div className='call-controllers d-flex justify-content-center'>
      {/* Video Toggle */}
      <div className='video-toggle' onClick={toggleVideo}>
        {isVideoEnabled ? (
          <i
            className='bi bi-camera-video-fill'
            style={{ fontSize: '2rem' }}
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
