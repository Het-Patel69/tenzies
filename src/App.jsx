import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';
import Die from './components/Die.jsx';

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);


  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  }

  function toggleDiceHeld(key) {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === key ? { ...die, isHeld: !die.isHeld } : die;

      }));

      // let newDice = dice.map(die => {
      //   let isHeld = die.isHeld;
      //   if (die.id == key) {
      //     isHeld = !die.isHeld;
      //   }
      //   return { ...die, isHeld: isHeld };
      // });
      // console.log(newDice);
      // setDice(newDice);
    }
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    }
    else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDie();
      }));
    }
  }

  const diceElements = dice.map(diceVal => {
    return <Die key={diceVal.id} diceValue={diceVal.value} isHeld={diceVal.isHeld} toggleFunction={() => toggleDiceHeld(diceVal.id)} />;
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dices are same. Click each die to freeze it at its current value.</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Re-roll"}</button>
    </main>
  );
}

export default App;