import React, { useRef, useLayoutEffect } from 'react';
import './App.css';
import bush from './images/bush.png';
import palm2 from './images/palm2.png';
import palm3 from './images/palm3.png';
import plant from './images/plant.png';
import plant2 from './images/plant2.png';
import plant3 from './images/plant3.png';

function App() {
  const background1 = useRef(null);
  const background2 = useRef(null);
  const foreground1 = useRef(null);
  const foreground2 = useRef(null);
  const redQueen_alice_sprite = useRef(null);
  useLayoutEffect(() => {
    /* Background animations */
    let sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' },
    ];

    let sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    };

    let sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity,
    };

    let background1Movement = background1.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );
    background1Movement.currentTime = background1Movement.playbackRate / 2;

    let background2Movement = background2.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );

    let foreground1Movement = foreground1.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );
    foreground1Movement.currentTime = foreground1Movement.playbackRate / 2;

    let foreground2Movement = foreground2.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );

    let spriteFrames = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' },
    ];

    let redQueen_alice = redQueen_alice_sprite.current.animate(spriteFrames, {
      easing: 'steps(7, end)',
      direction: 'reverse',
      duration: 600,
      playbackRate: 1,
      iterations: Infinity,
    });

    /* Alice tires so easily! 
      Every so many seconds, reduce their playback rate so they slow a little. 
    */
    let sceneries = [
      foreground1Movement,
      foreground2Movement,
      background1Movement,
      background2Movement,
    ];

    let adjustBackgroundPlayback = function () {
      if (redQueen_alice.playbackRate < 0.8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = (redQueen_alice.playbackRate / 2) * -1;
        });
      } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    };
    adjustBackgroundPlayback();

    /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */
    setInterval(function () {
      /* Set decay */
      if (redQueen_alice.playbackRate > 0.4) {
        redQueen_alice.playbackRate *= 0.9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    let goFaster = function () {
      /* But you can speed them up by giving the screen a click or a tap. */
      redQueen_alice.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    };

    document.addEventListener('click', goFaster);
    document.addEventListener('touchstart', goFaster);
  });

  return (
    <div className="" style={{ overflow: 'hidden' }}>
      <div className="sky">
        <div id="sun">
          <iframe
            src="https://giphy.com/embed/L08sJsg6tEUyb1E0VW"
            width="10%"
            height="100%"
            frameBorder="0"
            className="giphy-embed-sun"
            allowFullScreen
            title="sun"
          ></iframe>
        </div>
      </div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img
            id="red-queen_and_alice_sprite"
            ref={redQueen_alice_sprite}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            alt="Alice and the Red Queen running to stay in place."
          />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={foreground1}>
        <img id="palm3" src={palm3} alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2}>
        <img id="bush" src={bush} alt=" " />
        <img id="w_rook_upright" src={plant} alt=" " />
      </div>
      <div className="scenery" id="background1" ref={background1}>
        <img id="r_pawn_upright" src={bush} alt=" " />
        <img id="w_rook" src={plant2} alt=" " />
        <img id="palm1" src={palm2} alt=" " />
      </div>
      <div className="scenery" id="background2" ref={background2}>
        <img id="r_pawn" src={palm2} alt=" " />
        <img id="r_knight" src={plant3} alt=" " />
        <img id="palm2" src={palm2} alt=" " />
      </div>
    </div>
  );
}

export default App;
