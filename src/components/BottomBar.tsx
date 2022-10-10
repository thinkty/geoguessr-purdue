import { Coordinate } from 'ol/coordinate';
import React, { useState } from 'react';

export const BottomBar = ({
  marker,
  location,
  next,
} : {
  marker: Coordinate | null,
  location: Coordinate,
  next: VoidFunction,
}) => {

  const [status, setStatus] = useState<'submit'|'next'>('submit');

  return (
    <div className='bar-bottom'>
      <div
        className='submit-button'
        onClick={() => {
          if (marker == null) {
            alert('You gotta guess first dude');
            return;
          }
          if (status === 'submit') {
            // Dispatch check event on click
            dispatchEvent(new CustomEvent('check', { detail: { loc: location } }));
            setStatus('next');
          }
          if (status === 'next') {
            // Reset markers on the map
            dispatchEvent(new CustomEvent('resetmap'));

            // Get next question
            next();

            // Update status
            setStatus('submit');
          }
        }}
      >
        {
          status === 'submit' ? 'CHECK' : 'NEXT'
        }
      </div>
    </div>
  );
}
