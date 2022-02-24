import React from 'react';
import {useLocation} from "react-router-dom"
import "../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';

function MediaComponent(props) {
  const state = useLocation()
  console.log(state)
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src={state.state.src}
    />
  )
}

export default MediaComponent