//game constants 20x20
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const PLATFORM_DIMENSION = 20; //square
const PLATFORM_ID = 1;
const PIKE_DIMENSION = 20; //square
const PIKE_ID = 2;
const JUMPER_DIMENSION = 20;
const JUMPER_ID = 3;
const MESH_DIMENSION = parseInt(PLAYER_WIDTH / 10);//square mesh
const G_FORCE = 10;

const PLAYER_JUMP_FORCE = 20; //must be bigger than G_FORCE
const PLAYER_IMG_LEFT = "./img/charachters/player/PNG/player_left.png";
const PLAYER_IMG_RIGHT = "./img/charachters/player/PNG/player_right.png";
const PLAYER_IMG_MOVE_RIGHT1 = "./img/charachters/player/PNG/player_right_move1.png";
const PLAYER_IMG_MOVE_LEFT1 = "./img/charachters/player/PNG/player_left_move1.png";

const DRAGON_WIDTH = 60;
const DRAGON_HEIGHT = 30;
const DRAGON_CODE_COLLISION = 5;
const DRAGON_IMG_RIGHT = "./img/charachters/player/PNG/dragon_right.png";
const DRAGON_IMG_LEFT = "./img/charachters/player/PNG/dragon_left.png";
const DRAGON_IMG_RIGHT_MOVE = "./img/charachters/player/PNG/dragon_right_move.png";
const DRAGON_IMG_LEFT_MOVE ="./img/charachters/player/PNG/dragon_left_move.png";
const DRAGON_SPEED = 10;

const GOBLIN_WIDTH = 20;
const GOBLIN_HEIGHT = 30;
const GOBLIN_CODE_COLLISION = 6;
const GOBLIN_IMG_RIGHT = "./img/charachters/player/PNG/goblin_right.png";
const GOBLIN_IMG_LEFT = "./img/charachters/player/PNG/goblin_left.png";
const GOBLIN_IMG_RIGHT_MOVE = "./img/charachters/player/PNG/goblin_right_move.png";
const GOBLIN_IMG_LEFT_MOVE ="./img/charachters/player/PNG/goblin_left_move.png";
const GOBLIN_SPEED = 5;

const COIN_WIDTH = 16;
const COIN_HEIGHT = 16;
const COIN_CODE_COLLISION = 7;
const COIN_PICS = [
  "./img/charachters/player/PNG/coin0.png",
  "./img/charachters/player/PNG/coin1.png",
  "./img/charachters/player/PNG/coin2.png",
  "./img/charachters/player/PNG/coin3.png"
];

const PLAYER_DEATH = [
  "./img/charachters/player/PNG/player_die1.png",
  "./img/charachters/player/PNG/player_die2.png",
  "./img/charachters/player/PNG/player_die3.png",
  "./img/charachters/player/PNG/player_die4.png",
  "./img/charachters/player/PNG/player_die5.png",
  "./img/charachters/player/PNG/player_die6.png",
  "./img/charachters/player/PNG/player_die7.png"
];

export {PLAYER_DEATH, PLAYER_WIDTH, PLAYER_HEIGHT, PLATFORM_DIMENSION, PLATFORM_ID,
				PIKE_DIMENSION, PIKE_ID, JUMPER_DIMENSION, JUMPER_ID, MESH_DIMENSION,
				G_FORCE, PLAYER_JUMP_FORCE, PLAYER_IMG_LEFT,PLAYER_IMG_MOVE_LEFT1, PLAYER_IMG_MOVE_RIGHT1,
        PLAYER_IMG_RIGHT,
			  DRAGON_IMG_LEFT, DRAGON_IMG_RIGHT, DRAGON_IMG_RIGHT_MOVE, DRAGON_IMG_LEFT_MOVE,
				DRAGON_SPEED,DRAGON_HEIGHT, DRAGON_WIDTH, DRAGON_CODE_COLLISION, GOBLIN_IMG_LEFT,
				GOBLIN_IMG_RIGHT, GOBLIN_IMG_RIGHT_MOVE, GOBLIN_IMG_LEFT_MOVE, GOBLIN_SPEED,
				GOBLIN_WIDTH, GOBLIN_HEIGHT, GOBLIN_CODE_COLLISION, COIN_WIDTH, COIN_HEIGHT,
        COIN_CODE_COLLISION, COIN_PICS};
