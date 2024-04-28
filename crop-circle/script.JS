const imageInput = document.getElementById('image-input');
const originalImage = document.getElementById('original-image');
const circleCanvas = document.getElementById('circle-canvas');
const cropButton = document.getElementById('crop-button');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    originalImage.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

cropButton.addEventListener('click', () => {
  const canvasContext = circleCanvas.getContext('2d');
  const width = circleCanvas.width = originalImage.width;
  const height = circleCanvas.height = originalImage.height;
  const radius = width / 2;

  // Draw a circle path
  canvasContext.beginPath();
  canvasContext.arc(radius, radius, radius, 0, 2 * Math.PI);
  canvasContext.clip(); // Clip content inside the circle path

  // Draw the original image onto the canvas
  canvasContext.drawImage(originalImage, 0, 0);

  // Get cropped image data URL
  const dataURL = circleCanvas.toDataURL();

  // Simulate a click to download the cropped image
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'cropped-image.png';
  link.click();
});
