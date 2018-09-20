import React from 'react';

export const HeroPic = ({ src, name }) => (
  <img
    src={src}
    alt={name}
    ref={img => (this.img = img)}
    onError={() => (this.img.src = 'https://via.placeholder.com/480x640')}
  />
);
