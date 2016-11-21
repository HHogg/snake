# ASI Snake

#### Try it out here [https://hhogg.github.io/asi-snake](https://hhogg.github.io/asi-snake)

One evening, after a spiral of thoughts that I need to do something different, I decided I wanted to write an algorithm to play the perfect snake game. 

It turns out, it's pretty hard. 

I also got fed up of switching back and forth from my editor and the browser, so I stuck and editor in the browser. 

... then a scoring system, and turned it into a game. 

![](./screenshot.png)

### Notes about the game
* The code is run in a sandbox worker... I haven't tested how secure this is. You might be able to cheat ¯\_(ツ)_/¯
* The code is stored in locale storage, so don't worry if you refresh. 
* The scoring system is rudimentary to say the least, don't take it too seriously... but the less moves you take the higher your score will be.

### My current attempts
All of my current attempts can be found in [attempts](./attempts). None of them are particularly great. Feel free to load them in.

### Try it out locally
```
git clone git@github.com:HHogg/asi-snake.git
cd asi-snake
yarn install
yarn start
```
