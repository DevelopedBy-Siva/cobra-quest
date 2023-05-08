import Configs from "../configs/Configs.js";

const SCORE_INCREMENT = Configs.SCORE_INCREMENT;
class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.active = false;
  }

  getInfo() {
    return {
      name: this.name,
      score: this.score,
    };
  }

  setScore(score) {
    this.score = score;
  }
}

class AllPlayers {
  players = [];
  storageKey = "snake.game.palyers";

  addPlayer(player) {
    if (this.checkForDuplicates(player)) {
      this.players.push(player);
      return true;
    } else return false;
  }

  checkForDuplicates(player) {
    for (let val of this.players) {
      if (val.name === player.name) return false;
    }
    return true;
  }

  getAllPlayers() {
    const players = this.players.sort((first, second) => {
      return second - first;
    });
    return players;
  }

  removePlayer(name) {
    const newPlayers = this.players.filter((val) => val.name !== name);
    this.players = [...newPlayers];
  }

  setAsActivePlayer(name) {
    this.players.forEach((i) => {
      if (i.name === name) i.active = !i.active;
      else i.active = false;
    });
    this.savePlayersToLocalStorage();
  }

  getActivePlayer() {
    const player = this.players.filter((i) => i.active);
    return player[0];
  }

  setPlayerScore(score) {
    const player = this.getActivePlayer();
    let updated = false;
    this.players.forEach((i) => {
      if (i.name === player.name) {
        if (i.score < score) {
          i.score = score;
          updated = true;
        }
      }
    });
    if (updated) this.savePlayersToLocalStorage();
  }

  getHighScore() {
    let score = 0;
    this.players.forEach((i) => {
      if (i.score > score) {
        score = i.score;
      }
    });
    return score;
  }

  loadPlayersFromStorage() {
    try {
      const item = localStorage.getItem(this.storageKey);
      const parsed = JSON.parse(item);
      if (parsed) {
        this.players = JSON.parse(item);
        return;
      }
    } catch (ex) {}

    this.players = [];
  }

  savePlayersToLocalStorage() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (ex) {}

    localStorage.setItem(this.storageKey, JSON.stringify(this.players));
  }
}

class PlayerScore {
  constructor(score = 0) {
    this.score = score;
  }

  setPlayerScore() {
    this.score += SCORE_INCREMENT;
  }

  getPlayerScore() {
    return this.score;
  }
}

export { Player, AllPlayers, PlayerScore };
