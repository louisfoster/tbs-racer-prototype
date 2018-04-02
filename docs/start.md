### Simple data to view

To begin, this project isn't using anything special at the server side, so we can simply use a public dir and with a live server extension from whatever modern IDE you use, just deliver the `index.html` file. I did most of this while listening to Tchaikovski and Rachmaninov, so I think it's a litter calmer than my other code, but also I have bronchitis so it might be due to my general slowness today.

### Grid system

A simple grid system is like so:
- Width of grid (referred to as x axis for cartesian, or columns for matrix)
- Height of grid (referred to as y axis for cartesian, or rows for matrix)

That's it. Because we can iterate through both of these variables, we can set in each iteration a variable for whatever purpose. In this case, I want to display a character for the road or "trafficable" area and one for boundaries or "non-trafficable" area. I also want to create a way to reference the data bound to these points, so if we have a boundary I push a 1 into an array, and if we have a piece of road I push a 0 into the array.

I don't want to bother with trying to create some special custom grid, so what I will do instead is create a circular race track. This is pretty simple, just check to see if a point exists in a less than or equal to distance to the center of the circle, squared, when compared to the radius, squared. The outer boundary is just the outer perimeter of the grid itself.

To display the grid, I make the font size quite small and add the appropriate characters to a container, breaking the line at each new row (increment of the y axis). The thing to keep in mind, with the way this will be displayed is that the positive x axis runs from left to right and the positive y axis runs from top to bottom, making the origin (0, 0) point at the top left corner. We could manage this differently to reflect a conventional system where the origin is at the bottom left corner, but that would be overkill for this example.

One thing I noticed was that for some reason I chose to use the common mathematical symbol for "power" (`^`) when squaring the values for the distance function. However, this is actually the [bitwise operator for XOR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators), which is exactly what I don't want. I could use `Math.pow` but writing a simple `function square(x) { return x * x }` is easier.


### Player

The player is marked by a point, and its encompassing size is 2 points positively along the x and y axis, and its associated diagonal to form a square. The player square is marked on the map by a character different to the road and boundaries. I originally broke out of the loop when I encountered the player's position markers but I realised I wasn't adding the boundary and road data to the data array, which is necessary for testing if there is a collision.

There are two points for the player, one is on the road and one is colliding with the boundary. The only interaction at this stage is toggling between two iterations of the player position, by clicking on the page.


### Collision detection

This was another area I messed up a little bit. I actually had to do some changes during this documentation commit due to noticing a bug in my code. 

The collision works by taking the position and size of the player so that it can check every point of data "underneath" it. We also provide the map data and the dimensions of the map, as the data is a 1 dimenional array so we need to know how to move through the array in comparison to the coordinates for the player, really at this stage we only use the "columns" though.

So for each point under the player, that is for the two points on each row it covers, we find the data. This is alright for just 4 points but in future we might want a better method. To skip to where the row the player is on, we take the number of columns in the map and multiply that by: the object's y position plus the iteration of the size of the object.

To get the column, we take this row value and add the object (player) x position + the iteration of the size of the object. If this index in the array returns a value of 1 (boundary) there is a collision. With this data we can set a different color for the player characters in the map so we can visually see a collision or not.


#### Output

##### No Collision

![no-collision0]({{ "./assets/no-collision0.png" | absolute_url }})

##### Collision

![collision0]({{ "./assets/collision0.png" | absolute_url }})


### Next...

The next step is to manage the movements of the player according to the rules of the game.


[Home](./)