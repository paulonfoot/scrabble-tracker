if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered"))
    .catch((error) => console.log("Error registering Service Worker: ", error));
}    

console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("num-players")) {
        setupIndexPage();
    } else if (document.getElementById("game-container")) {
        setupGamePage();
    }
});

function setupIndexPage() {
    document.getElementById("num-players").addEventListener("change", function() {
        const numPlayers = parseInt(this.value);
        const playerInputsDiv = document.getElementById("player-inputs");
        const startButton = document.getElementById("start-game");
        playerInputsDiv.innerHTML = '';
        startButton.disabled = !(numPlayers >= 1 && numPlayers <= 6);
        
        for (let i = 0; i < numPlayers; i++) {
            let inputField = document.createElement("input");
            inputField.type = "text";
            inputField.id = `player-name-${i}`;
            inputField.placeholder = `Enter name for Player ${i + 1}`;
            playerInputsDiv.appendChild(inputField);
            playerInputsDiv.appendChild(document.createElement("br"));
        }
    });

    document.getElementById("start-game").addEventListener("click", function() {
        let numPlayers = parseInt(document.getElementById("num-players").value);
        let playerInputs = document.querySelectorAll("#player-inputs input");
        let players = [];
        
        playerInputs.forEach(input => {
            let playerName = input.value.trim();
            if (playerName !== "") {
                players.push({ name: playerName, scores: [] });
            }
        });

        if (players.length !== numPlayers) {
            alert("Please enter names for all players");
            return;
        }

        localStorage.setItem("players", JSON.stringify(players));
        localStorage.setItem("showScores", document.getElementById("show-scores").checked);
        window.location.href = "game.html";
    });
}

function setupGamePage() {
    let storedPlayers = localStorage.getItem("players");
    if (!storedPlayers) {
        alert("Error: No players found. Please start a new game.");
        return;
    }
    
    let players = JSON.parse(storedPlayers);
    let showScores = localStorage.getItem("showScores") === "true";
    let gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";
    
    players.forEach((player, index) => {
        let playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.innerHTML = `<span>${player.name}</span>
            <input type="number" class="score-input" data-index="${index}" placeholder="Enter score">
            <span class="total-score" data-index="${index}">${showScores ? 'Score: 0' : ''}</span>`;
        gameContainer.appendChild(playerDiv);
    });
    
    document.getElementById("submit-scores").addEventListener("click", function() {
        document.querySelectorAll(".score-input").forEach(input => {
            let index = input.dataset.index;
            let score = parseInt(input.value) || 0;
            players[index].scores.push(score);
            if (showScores) {
                let total = players[index].scores.reduce((sum, val) => sum + val, 0);
                document.querySelector(`.total-score[data-index='${index}']`).textContent = `Score: ${total}`;
            }
            input.value = "";
        });
        localStorage.setItem("players", JSON.stringify(players));
    });
    
    document.getElementById("end-game").addEventListener("click", function() {
        window.location.href = "stats.html";
    });
}


