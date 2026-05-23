let cropper = null;
let currentImage = null;

const uploadInput = document.getElementById('upload');
const imageElement = document.getElementById('image');
const croppedResultImg = document.getElementById('croppedResult');
const downloadBtn = document.getElementById('downloadBtn');
const originalTitle = document.getElementById('originalTitle');
const croppedTitle = document.getElementById('croppedTitle');

uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
        alert('Размер файла превышает 300 КБ. Пожалуйста, выберите изображение меньшего размера.');
        uploadInput.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imgUrl = e.target.result;
        imageElement.src = imgUrl;
        
        originalTitle.classList.remove('title-hidden');
        originalTitle.classList.add('title-visible');
        croppedTitle.classList.remove('title-hidden');
        croppedTitle.classList.add('title-visible');

        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(imageElement, {
            aspectRatio: NaN,
            viewMode: 1,
            autoCropArea: 0.8,
            crop() {
                updateCroppedPreview();
            }
        });

        currentImage = imgUrl;
        downloadBtn.disabled = false;
    };
    reader.readAsDataURL(file);
});

function updateCroppedPreview() {
    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas();
    if (canvas) {
        croppedResultImg.src = canvas.toDataURL('image/png');
    }
}

downloadBtn.addEventListener('click', () => {
    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas();
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'cropped_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } else {
        alert('Не удалось создать обрезанное изображение.');
    }
});