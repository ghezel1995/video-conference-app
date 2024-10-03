import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:8000');

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    //Getting permission for video and audio from user
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
    return () => {
      socket.off('me');
      socket.off('calluser');
    };
  }, []);

  // Toggle video stream on/off
  const toggleVideo = () => {
    setIsVideoEnabled((prev) => !prev);
    if (stream) {
      stream.getVideoTracks()[0].enabled = !isVideoEnabled;
    }
  };

  // Toggle audio stream on/off
  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
    if (stream) {
      stream.getAudioTracks()[0].enabled = !isAudioEnabled;
    }
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    //this means that our current connection is equal to current peer
    connectionRef.current = peer;

    peer.on('error', (err) => {
      console.error('Peer error:', err);
      leaveCall();
    });
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('calluser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on('callaccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });
    peer.on('error', (err) => {
      console.error('Peer error:', err);
      leaveCall();
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        answerCall,
        leaveCall,
        toggleVideo,
        toggleAudio,
        isVideoEnabled,
        isAudioEnabled,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
