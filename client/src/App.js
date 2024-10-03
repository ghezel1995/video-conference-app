import React from 'react';
import { Video } from './components/Video';
import { Notifications } from './components/Notifications';
import { Options } from './components/Options';
import { CallControllers } from './components/CallControllers';

export const App = () => {
  return (
    <div className='app container row justify-content-md-center rounded pt-3'>
      <Video />
      <CallControllers />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};
