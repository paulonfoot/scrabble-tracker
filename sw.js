const CACHE_NAME = "scrabble-score-tracker-v1";
const urlsToCache = [
    "index.html",
    "game.html",
    "stats.html",
    "script.js",
    "manifest.json",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return response || fetch(event.request);
        })
    );
});
