/* ============================================================
   BROCCOLI PHOTO BOOTH
   Everything happens inside the visitor's own browser.
   Nothing is uploaded or saved anywhere.
   ============================================================ */

// The background picture
const BACKGROUND_IMAGE = "images/broccoli-hottub.jpg";

// Where the face hole goes on the picture (in pixels on the 1280 x 720 image)
//   x, y   = center of the oval
//   rx, ry = how wide and how tall the oval is (from the center)
// If you change the picture, change these numbers too!
const FACE = { x: 808, y: 325, rx: 78, ry: 100 };

const canvas = document.getElementById("boothCanvas");
const ctx = canvas.getContext("2d");
const video = document.createElement("video");
video.playsInline = true;
video.muted = true;

const background = new Image();
background.src = BACKGROUND_IMAGE;

let stream = null;
let photoUrl = null;
let photoFile = null;
let drawing = false;

/* ----- Draw the scene: background + your face in the oval ----- */
function drawScene() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  if (stream && video.readyState >= 2) {
    drawFace();
  } else {
    // No camera yet: draw a white "your face HERE!" oval
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(FACE.x, FACE.y, FACE.rx, FACE.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ff3eb5";
    ctx.stroke();
    ctx.fillStyle = "#1d3b10";
    ctx.font = "bold 30px Chewy, 'Comic Sans MS', cursive";
    ctx.textAlign = "center";
    ctx.fillText("your", FACE.x, FACE.y - 28);
    ctx.fillText("face", FACE.x, FACE.y + 6);
    ctx.fillText("HERE!", FACE.x, FACE.y + 40);
    ctx.restore();
  }
}

/* ----- Put the camera picture inside the oval, with soft edges ----- */
function drawFace() {
  const w = FACE.rx * 2;
  const h = FACE.ry * 2;
  const zoom = parseFloat(document.getElementById("zoom").value);

  // Cut a piece out of the middle of the camera picture
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  let cropH = vh / zoom;
  let cropW = cropH * (w / h);
  if (cropW > vw) { cropW = vw; cropH = cropW * (h / w); }
  const cropX = (vw - cropW) / 2;
  const cropY = (vh - cropH) / 2;

  // Draw it on a small separate canvas, flipped like a mirror
  const face = document.createElement("canvas");
  face.width = w;
  face.height = h;
  const fctx = face.getContext("2d");
  fctx.translate(w, 0);
  fctx.scale(-1, 1);
  fctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, w, h);

  // Fade the edges so it blends into the broccoli
  fctx.setTransform(1, 0, 0, h / w, 0, 0);
  const fade = fctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  fade.addColorStop(0.75, "rgba(0,0,0,1)");
  fade.addColorStop(1, "rgba(0,0,0,0)");
  fctx.globalCompositeOperation = "destination-in";
  fctx.fillStyle = fade;
  fctx.fillRect(0, 0, w, w);

  // Light green tint so the face matches the broccoli
  fctx.setTransform(1, 0, 0, 1, 0, 0);
  fctx.globalCompositeOperation = "source-atop";
  fctx.fillStyle = "rgba(140, 200, 40, 0.18)";
  fctx.fillRect(0, 0, w, h);

  ctx.drawImage(face, FACE.x - FACE.rx, FACE.y - FACE.ry);
}

function animate() {
  if (!drawing) return;
  drawScene();
  requestAnimationFrame(animate);
}

/* ----- Turn on the camera (the browser asks permission first) ----- */
async function turnOnCamera() {
  const message = document.getElementById("boothMessage");
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
    document.getElementById("cameraBtn").classList.add("hidden");
    document.getElementById("snapBtn").classList.remove("hidden");
    document.getElementById("zoomLabel").classList.remove("hidden");
    drawing = true;
    animate();
  } catch (err) {
    message.innerHTML = "😢 We couldn't turn on your camera. Make sure you clicked <b>Allow</b>, " +
      "or try a different device. (School computers sometimes block cameras.)";
  }
}

function turnOffCamera() {
  drawing = false;
  if (stream) stream.getTracks().forEach((track) => track.stop());
  stream = null;
}

/* ----- 3, 2, 1... SNAP! ----- */
async function takePicture() {
  const countdown = document.getElementById("countdown");
  document.getElementById("snapBtn").disabled = true;
  countdown.classList.add("show");
  for (const n of ["3", "2", "1"]) {
    countdown.textContent = n;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  countdown.classList.remove("show");
  canvas.classList.add("flash");

  drawScene();      // freeze the final frame
  turnOffCamera();  // camera light goes off right away
  addBanner();

  canvas.toBlob((blob) => {
    photoFile = new File([blob], "ilovebroccoli.jpg", { type: "image/jpeg" });
    photoUrl = URL.createObjectURL(blob);
    document.getElementById("resultImg").src = photoUrl;
    document.getElementById("saveBtn").href = photoUrl;

    // Only show "Share" if this device can share pictures
    const canShare = navigator.canShare && navigator.canShare({ files: [photoFile] });
    document.getElementById("shareBtn").classList.toggle("hidden", !canShare);
    if (!canShare) {
      document.getElementById("shareTip").innerHTML = "Tap <b>Save picture</b> to download it, then send it to your friends!";
    }

    document.getElementById("liveView").classList.add("hidden");
    document.getElementById("resultView").classList.remove("hidden");
    document.getElementById("snapBtn").disabled = false;
    canvas.classList.remove("flash");
  }, "image/jpeg", 0.92);
}

/* ----- The pink banner at the bottom of every photo ----- */
function addBanner() {
  const barHeight = 70;
  ctx.fillStyle = "#ff3eb5";
  ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
  ctx.fillStyle = "#7ee000";
  ctx.fillRect(0, canvas.height - barHeight, canvas.width, 6);
  ctx.fillStyle = "white";
  ctx.font = "bold 38px Chewy, 'Comic Sans MS', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🥦 go to " + SITE.url + " to get your own! 🥦", canvas.width / 2, canvas.height - barHeight / 2 + 3);
}

/* ----- Share (opens the phone's share menu) ----- */
async function sharePicture() {
  try {
    await navigator.share({
      files: [photoFile],
      title: "I love broccoli!",
      text: "Go to " + SITE.url + " to get your own! 🥦",
    });
  } catch (err) {
    // they closed the share menu — that's fine
  }
}

/* ----- Retake: throw away the photo and start again ----- */
function retake() {
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = null;
  photoFile = null;
  document.getElementById("resultView").classList.add("hidden");
  document.getElementById("liveView").classList.remove("hidden");
  turnOnCamera();
}

document.getElementById("cameraBtn").onclick = turnOnCamera;
document.getElementById("snapBtn").onclick = takePicture;
document.getElementById("shareBtn").onclick = sharePicture;
document.getElementById("retakeBtn").onclick = retake;
background.onload = drawScene;
if (document.fonts) document.fonts.ready.then(drawScene);
