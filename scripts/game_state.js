
export class GameState{
  constructor(level, points, gameplay_time_interval, game_difficulty, player, world, enemies) {
    this._level = level;
    this._world = world;
    this._player = player;
    this._enemies = enemies;
    this._points = points;
    this._interval = gameplay_time_interval;
    this._game_difficulty = game_difficulty;
    this._map_keys_pressed = new Map();
    this._map_of_events = new Map();
    this._map_of_events.set("move",false);
    this.interval_function = setInterval(this.check_state.bind(this), this._interval, player);
    ////console.log(player);
  }
  get level(){
    return this._level;
  }
  get points(){
    return this._points;
  }
  get interval(){
    return this._interval;
  }
  get game_difficulty(){
    return this._game_difficulty;
  }
  keys_pressed(event){
    this._map_keys_pressed.set(event.keyCode, true);
    ////console.log("keyCode",event.keyCode);
  }
  keys_unpressed(event){
     this._map_keys_pressed.delete(event.keyCode);
     ////console.log("keyCode",event.keyCode);
  }
  check_state(player){
    let map_keys_pressed = this._map_keys_pressed;
    if(map_keys_pressed.has(38) && !map_keys_pressed.has(37) && !map_keys_pressed.has(39) && !player.movement && player.checkCollision().down > 0){
       player.jump();
       ////console.log(player);
    }
    if(map_keys_pressed.has(37) && !map_keys_pressed.has(38) && !map_keys_pressed.has(39) && !player.movement && player.checkCollision().down > 0){
        player.move_left();
    }
    if(map_keys_pressed.has(39) && !map_keys_pressed.has(38) && !map_keys_pressed.has(37)  && !player.movement && player.checkCollision().down > 0){
        player.move_right();
    }
    if(map_keys_pressed.has(39) && map_keys_pressed.has(38)  && !player.movement && player.checkCollision().down > 0){
      player.jump_right();
    }
    if(map_keys_pressed.has(37) && map_keys_pressed.has(38)  && !player.movement && player.checkCollision().down > 0){
       player.jump_left();
    }
    if(!player.movement && player.checkCollision().down === 0){
       //console.log("blblblb");
       player.fall();
    }
    if(!player.movement && (player.checkCollision().dragon === 1 || player.checkCollision().goblin === 1)){
       //console.log("blblblb");
       player._player_dead = true;
    }
    if(player._player_dead === true){
      player._player_dead = false;
      player.animate_death();
      clearInterval(this.interval_function);
      setTimeout(this.restart_game.bind(this),300);

    }
    if(player._player_win){
       player._player_win = false;
       clearInterval(this.interval_function);
       setTimeout(this.next_level.bind(this),300);
       //player.player_win = false;
       //player.player.style.left = `20px`;
       //player._player_dead = false;
       //player._y_position = 50;
    }
    if(player._coin_detected){
       player._coin_detected = false;
       //clearInterval(this.interval_function);
       this.remove_coin(player._x_position, player._y_position);
       //player.player_win = false;
       //player.player.style.left = `20px`;
       //player._player_dead = false;
       //player._y_position = 50;
    }
  }
  next_level(){
    this.delete_enemies();
    this._world.removeWorld();
    this._level++;
    this._world.createWorld(this._world._levels[this._level - 1]); //od nule krecu leveli
    this._player.restart_position();
    this._player._coins = this._player._level_coins;
    this.interval_function = setInterval(this.check_state.bind(this), this._interval, this._player);
  }
  restart_game(){
    this.delete_enemies();
    this._world.removeWorld();
    this._world.createWorld(this._world._levels[this._level - 1]); //od nule krecu leveli
    this._player.restart_position();
    this._world._score.innerHTML = this._player._coins;
    this._player._level_coins = 0;
    this.interval_function = setInterval(this.check_state.bind(this), this._interval, this._player);
  }
  delete_enemies(){
    let number_of_enemies = this._world._enemies.length;
    //console.log(number_of_enemies);
    //console.log(this._world._enemies);
    for(let i = 0; i < number_of_enemies; i++){
      //console.log("juhuhu");
      this._world._enemies[i].delete_from_memory();
    }
    for(let i = 0; i < number_of_enemies; i++){
      this._world._enemies.pop();
    }
    //console.log(this._world._enemies);
  }
  remove_coin(x,y){
    for(let i = 0; i < this._world._coins.length; i++){
      let enemy_x = this._world._coins[i]._x_position;
      let enemy_y = this._world._coins[i]._y_position;
      let width = this._world._coins[i]._width;
      let height = this._world._coins[i]._height;
      if(Math.abs(enemy_x - x) <= 2 * width && Math.abs(enemy_y - y) <= height * 2){
        //console.log("coin removed");
        this._world._coins[i].delete_from_memory();
      }

      //this.interval_function = setInterval(this.check_state.bind(this), this._interval, this._player);
    }
    this._player._level_coins++;
    this._world._score.innerHTML = this._player._coins + this._player._level_coins;
  }
}
