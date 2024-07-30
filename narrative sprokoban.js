/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: narrative sprokoban
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const box = "b"
const goal = "g"
const exit = "e"
const wall = "w"
setLegend(
  [ player, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111100000011110
0111107777011110
0111107777011110
0111107777011110
0111107777011110
0111100000011110
0111117777111110
0111117771111110
0111111771111110
0111111711111110
0000000000000000` ],
  [ box, bitmap`
0000000000000000
0001111111111000
0000111111110000
0100011111100010
0110001111000110
0111000110001110
0111100000011110
0111110000111110
0111110000111110
0111100000011110
0111000110001110
0110001111000110
0100011111100010
0000111111110000
0001111111111000
0000000000000000`],
  [ goal, bitmap`
................
................
.....0000000....
.....0011100....
.....0101010....
.....0110110....
.....0101010....
.....0011100....
.....0000000....
........0.......
......0.0.0.....
.......000......
........0.......
................
.03333333333330.
0000000000000000`],
  [exit, bitmap`
......0000000000
......0111111110
......0111111110
......0111111110
......0111111110
......0110000110
......0110440110
......0110440110
......0110440110
......0110000110
......0111111110
......0111111110
......0111111110
......0111111110
......0111111110
......0000000000`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
)

setSolids([player, box, wall])

let level = 0
let narrLevel = 0
let nextLevel = 1
let finalLevel = 2
let win = false
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`,
  map`
..www..
..wgw..
wwwbwww
p.....e
wwwbwww
..wgw..
..www..`,
  map`
p......e`
]
checkLevel()
setMap(levels[level])

setPushables({
  [ player ]: [box]
})

onInput("w", () => {
  if (win != true){
  clearText()
  if (level == narrLevel) {
    level = nextLevel
    setMap(levels[level])
  }
  
  getFirst(player).y -= 1
  }
})
onInput("s", () => {
  if (win != true){
  clearText()
  if (level == narrLevel) {
    level = nextLevel
    setMap(levels[level])
  }
  
  getFirst(player).y += 1
  }
})
onInput("a", () => {
  if (win != true){
  clearText()
  if (level == narrLevel) {
    level = nextLevel
    setMap(levels[level])
  }
  
  getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (win != true){
  clearText()
  if (level == narrLevel) {
    level = nextLevel
    setMap(levels[level])
  }
  
  getFirst(player).x += 1
  }
})


afterInput(() => {
  const targetNumber = tilesWith(goal).length
  const exitNum = tilesWith(exit).length
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length
  const inExit=tilesWith(player,exit).length

  if (numberCovered === targetNumber) {
    // increase the current level number
    if (exitNum === inExit) {
      if(level != finalLevel){
        level += 1
        nextLevel = level
        level = narrLevel;
      }
      else{
        level += 1 
      }
      const currentLevel = levels[level]
    // make sure the level exists and if so set the map
      if (currentLevel !== undefined) {
        setMap(currentLevel)
      } else {
        setMap(levels[narrLevel])
        addText("grr. fine.\n you win.", {x: 5, y: 4, color: color`0` })
        win = true
      }
    }  
  }
})

function checkLevel(){
  if (nextLevel == 1){
    addText("Hello and\nwelcome to\nsprokoban \ntesting!\n\npress any button\nto get right to\ntesting!!", {x: 2, y: 0, color: color`0` })
  } 
}