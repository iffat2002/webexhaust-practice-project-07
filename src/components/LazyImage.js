// components/LazyImage.js
import React, { useState } from 'react';

const LazyImage = ({ src, alt, className, width, height, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div 
          className={`image-placeholder ${className}`}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      <img
        {...props}
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'loaded' : 'loading'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        width={width}
        height={height}
      />
    </>
  );
};

export default LazyImage;