<p align="center">
  <img src="./site/assets/snake.svg" />
</p>

<h2 align="center" style="margin: 0">Snake</h2>
<h5 align="center"  style="margin: 0"><a href="https://snake.hogg.io">https://snake.hogg.io</a></h5>

Snake Heuristics is a game for developers to code the behaviour of the snake in the classic point finding game.

The goal is to write a heuristic function that returns a single number. The function is run on every cell on the board (but only the cells around the head of the snake are important). The snake will move to the cell with the lowest number, and will continue to do this while collecting points, until it either crashes or there are no cell left to move to.

The solution is scored in 3 areas: accuracy, speed and efficiency. Basically, the fewer moves the snake takes to reach the point the better. The score grows exponentially with the more points collected and the efficiency has a greater weight at the beginning of the game.

### Technology

- [Typescript](https://www.typescriptlang.org/)
- [Parcel](https://parceljs.org/) (bundler and dev servers)
- [React](https://reactjs.org/)
- [PostCSS](https://postcss.org/) (with postcss-preset-env for a little power)
- [Firebase](https://firebase.google.com/) (hosting)

### Setup

##### Prerequisites

• [Node](https://nodejs.org/en/) - Either use [nvm use](https://github.com/nvm-sh/nvm) or checkout the tested version inside the [.nvmrc](./nmvrc) file.

##### Setup

Clone the repository

```
git clone git@github.com:HHogg/circles.git
```

Install the dependencies with your favourite package manager

```
yarn install
```

##### Running

Spin up the Parcel development server

```
yarn start
```

##### Building

Build the static files using Parcel

```
yarn build
```

##### Deploying

Deploy to Firebase hosting (... after authenticating)

```
yarn deploy
```
