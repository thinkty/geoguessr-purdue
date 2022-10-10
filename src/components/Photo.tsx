import React from 'react';

export const Photo = ({
  pic,
} : {
  pic : string,
}) => {
  return (
    <div className='photo-container'>
      <img src={pic} />
    </div>
  )
}
