const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const outputText = document.getElementById('outputText');
const context = canvas.getContext('2d');

// Yêu cầu truy cập camera sau
navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: { exact: "environment" } // Sử dụng camera sau
    }
})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing the camera: ', err);
        outputText.textContent = "Camera access denied or not available.";
    });

// Bắt sự kiện khi nhấn nút chụp ảnh
captureButton.addEventListener('click', () => {
    // Vẽ khung hình từ video lên canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Chuyển đổi hình ảnh từ canvas sang dữ liệu hình ảnh
    const image = canvas.toDataURL('image/png');

    // Sử dụng Tesseract.js để xử lý OCR
    Tesseract.recognize(
        image,
        'eng',
        {
            logger: m => console.log(m) // Tùy chọn để xem tiến trình
        }
    ).then(({ data: { text } }) => {
        outputText.textContent = text;
    }).catch(err => {
        console.error('Error recognizing text: ', err);
        outputText.textContent = "Error processing the image.";
    });
});
