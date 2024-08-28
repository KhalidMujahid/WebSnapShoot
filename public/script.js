// public/script.js
const videoElement = document.querySelector('video');
const text = document.querySelector('#count'); 
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d'); 

let mediaStream;
let count = 0; 

async function capturePhoto() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = mediaStream;
    videoElement.play();

    videoElement.addEventListener('loadedmetadata', () => {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
    });

    setInterval(async () => {
      context.drawImage(videoElement, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');

      const compressedImage = await compressImage(dataURL, 800, 800, 0.7);

      try {
        const response = await fetch('/endpoints', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: compressedImage }),
        });

        if (response.ok) {
          count++; 
          text.innerHTML = count; 
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error("Error sending image: ", error);
      }
    }, 5000);
  } catch (error) {
    console.error("Error accessing webcam: ", error);
  }
}

async function compressImage(dataURL, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataURL;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataURL = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
}

capturePhoto();