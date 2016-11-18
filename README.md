# ASI Snake

This started one evening with me thinking "I should really branch out from web development... AI and Autonomous Vehicles looks like a good direction.".

Somewhere down the line that evening, I decided to build a snake game with the hope of a basic AI that could collect every point until the board was full.

It turns out, it's pretty hard. 

I also got fed up of switch back and forth from my editor and the browser, so I stuck and editor in the browser. 

... then a scoring system, and turned it into a game. 

![](./screenshot.png)

### Notes about the game
* The code is fun in a sandbox worker... I haven't tested how secure this is. You might be able to cheat ¯\_(ツ)_/¯
* The code is store in locale storage, so don't worry if you refresh. 
* The scoring system is rudimentary to say the least, don't take it too seriously. 

### My current attempt 

My current attempt is in [attempt.js](./attempt.js), it uses the A* search algorithm with a Manhattan Heuristic function ([Stanford Theory](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html)). 

**However this only works up until it's retrieved that current point, it doesn't account for the environment after the point.** When I visit this next I'll look at putting this together with a strategic technique of leaving gaps.

Feel free to load it in and improve it, send PRs. 

### Try it out locally
```
git clone git@github.com:HHogg/asi-snake.git
cd asi-snake
yarn install
yarn start
```
