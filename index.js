import chalk from 'chalk';
import prompts from 'prompts';
import {randomInt} from 'node:crypto';
import fs from 'node:fs';

const log = console.log;
var randomNumber = randomInt(1, 10);
var attempts = 1;

function gameLog(message) {
  log(message);
  fs.appendFileSync('game.txt', String(message).replace(/\u001b\[[0-9;]*m/g, '') + '\n');
}

async function ask() {
  let message = `attempt ${attempts}/3: Enter your guess`;
  gameLog(message);

  const response = await prompts({
    type: 'number',
    name: 'value',
    message: message,
    validate: value => {
      try {
        if (String(value).trim() === '') {
          throw new Error('Input cannot be emptry');
        }

        if(!Number.isInteger(Number(value))) {
          throw new Error('Input cannot be a decimal');
        }

        if(Number(value) <= 0) {
          throw new Error('Input must be positive')
        }

        if(Number(value) > 10) {
          throw new Error('Input cannot be greater than 10')
        }

        return true;
      }
      catch(error) {
        gameLog(chalk.red(error.message));
        return chalk.red(error.message);
      }
    }
  });

  gameLog(response.value);
  return Number(response.value);

}

async function Game() {

  fs.writeFileSync('game.txt', '');

  gameLog(chalk.magenta('Guessing Game!'));
  gameLog(chalk.white('Guess a number between 1 and 10'));
  gameLog(chalk.yellow('You have 3 attempts'));

  while (attempts <=3){
    const guess = await ask();
    attempts++;
    if(guess == randomNumber) {
      gameLog(chalk.green('Correct'));
      return;
    }
    else if(guess > randomNumber){
      gameLog(chalk.red('Too high!'));
    }
    else {
      gameLog(chalk.red('Too low!'));
    }
  }

  gameLog(chalk.blue('Out of attempts'));
  gameLog(chalk.white(`The number was ${randomNumber}`));
}

Game();