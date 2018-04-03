### Rules stage 1

The primary component of the game is the movement system. Your "racer" has a starting point and moves according to "vectors". The first vectors being (1, 0), (1, 1) and (1, -1) as well as a "non-move" of (0, 0). After this, you are given a principle vector of whatever your previous vector was, and then surrounding 8 vectors of that point to represent accelleration, decelleration, turning, and turning with accel and decel. The end result is a fairly close approximation of some of the very basic physics behind a car's movement.

I have still left the data and interaction quite closely coupled, in order to get this part of the project completed. However, there where a few elements of refactoring and repeition that occurred as a result, so I plan to put these into separate buckets later.


#### JS is weird

I was originally fetching IDs from the ID of the buttons in order to know what input to send to my movement function. I found that if I passed the 0th buttons index `0` to the conditional which then calls this function, it was failing. This is because 0 in a conditional is falsey. There are also a few strange notions when it comes to using the term `this` and both of these led me to rethinking how to structure the input, probably for the best.


#### Not as smart as I think I am

After finishing the implementation of the engine, and things appeared (in code) to be where they needed to be (I kept breaking the array structure in the `movementPositions()` function leading to strange results) I gave the game a test. For some reasons where I kept figuring the vectors to lead the racer weren't making sense. I kept trying to debug what the issue was, refactoring more code to pinpoint the issue. After some more user testing I realised that it wasn't the code but the user, who obviously was pretty bad at playing the game 🤪 so with some more practice I was able to... make it work.


### Next - Decoupling

I think it is important in this game to be able to have a history of moves (both positions and vectors) such as for graphically displaying the path over the course of the race. I also want to add the ability for other players to managed, and both of these things will likely require me to decouple the data, interface and graphics. This will also help when taking this code design to another platform or replacing the graphics with something utilising the GPU. It would also be nice to visually display the moves, again something that will benefit from decoupling. I think this is when the ECS structure comes into play.


[Home](./)