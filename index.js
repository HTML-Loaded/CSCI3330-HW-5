import chalk from 'chalk';
import prompts from 'prompts';
import {randomInt} from 'node:crypto';

const log = console.log;
var randomNumber = randomInt(1, 10);
const attempts = 1;

async function ask() {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: `attempt ${attempts}/3: Enter a guess`,
    validate: value => value == randomNumber ? `correct` : `wrong`
  });
}

log(chalk.red('Guessing Game!'));
log(chalk.green('Guess a number between 1 and 20'));
log(chalk.blue('You have 3 attempts'));
log(chalk.red(`${randomNumber}`));

ask();