import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Audio = ({ audioUrl, title }) => {
  const waveformRef = useRef();
  const wavesurferRef = useRef();

 
  useEffect(() => {
    if (!waveformRef.current) return;

    // Destroy previous instance if it exists
    if (wavesurferRef.current) {
      try {
        wavesurferRef.current.destroy();
      } catch (err) {
        console.warn('WaveSurfer destroy error:', err);
      }
    }

    // Create a new instance
    const ws = WaveSurfer.create({
  container: waveformRef.current,
      waveColor: '#999',
      progressColor: '#f9c851',
      height: 40,
      responsive: true,
      barGap: 3,
        cursorWidth: 0,
      barWidth: 3,
      barRadius: 3,
    });

    wavesurferRef.current = ws;

    // Safe load: catch aborts
    ws.load(audioUrl).catch((err) => {
      if (err.name === 'AbortError') {
        console.warn('WaveSurfer load was aborted');
      } else {
        console.error('WaveSurfer load error:', err);
      }
    });

    return () => {
      if (ws && ws.destroy) {
        try {
          ws.destroy();
        } catch (err) {
          console.warn('WaveSurfer destroy error on cleanup:', err);
        }
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    wavesurferRef.current && wavesurferRef.current.playPause();
  };

  return (
    <div >
      <div className="waveform-container" ref={waveformRef} />
        <h5 className='track'>{title}</h5>
              <div className="vote">
                <button className="play-btn" onClick={togglePlay}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"></path></svg>
                </button>
                <span>100k Vote</span>
              </div>
      
    </div>
  );
};

export default Audio;
