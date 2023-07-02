import React from 'react';
import './Die.css';

export default function Die(props) {
  const dice_classes = `die ${props.isHeld && "held"}`;

  return (
    <div className={dice_classes} onClick={props.toggleFunction}>
      <img src={`./src/img/dice-six-faces- (${props.diceValue}).svg`} alt="" />
    </div>
  );
}