class Player {

    constructor(name, score){
        this.name = name;
        this.score = score;
    }

    getInfo() {
        return {
            name:this.name,
            score:this.score
        }
    }

    setScore(score) {
        this.score = score
    }
}

class AllPlayers {

    players = [];
    storageKey = "snake.game.palyers";

    addPlayer(player){
        this.players.push(player)
    }

    getAllPlayers(){
        const players = this.players.sort((first, second) => {
            return second - first;
        });
        return players;
    }

    removePlayer(id){
        const newPlayers = this.players.filter( val => val.id !== id );
        this.players = [...newPlayers];
    }

    loadPlayersFromStorage(){
        try{
            const item = localStorage.getItem(this.storageKey);
            this.players = JSON.parse(item);
            return;
        }catch(ex){}

        this.players = [];
    }

    savePlayersToLocalStorage() {
        try{
            localStorage.removeItem(this.storageKey);
        }catch(ex){}
        
        localStorage.setItem(this.storageKey, JSON.stringify(this.players));
    }
}

export {
    Player,
    AllPlayers
};