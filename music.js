/* ============================================================
   THEME SONG (Spotify player)
   Uses the link from config.js. Browsers only let music start
   after a click, which is why the site has a "click to enter" screen.
   ============================================================ */

let spotifyPlayer = null;
let playWhenReady = false;

function getSpotifyUri(link) {
  const match = (link || "").match(/track[/:]([A-Za-z0-9]+)/);
  return match ? "spotify:track:" + match[1] : null;
}

function setUpThemeSong() {
  const box = document.getElementById("spotifyPlayer");
  if (!box) return;

  const uri = getSpotifyUri(SITE.spotifySongLink);
  if (!uri) {
    box.innerHTML = "<p class='center'>🎵 Theme song coming soon!<br><small>(Paste the Spotify link into config.js)</small></p>";
    return;
  }

  // Spotify calls this function once its player code has loaded
  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    IFrameAPI.createController(box, { uri: uri, width: "100%", height: 152 }, function (controller) {
      spotifyPlayer = controller;
      if (playWhenReady) controller.play();
    });
  };
  const script = document.createElement("script");
  script.src = "https://open.spotify.com/embed/iframe-api/v1";
  document.body.appendChild(script);
}

function playThemeSong() {
  if (spotifyPlayer) spotifyPlayer.play();
  else playWhenReady = true;
}

setUpThemeSong();
