const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const selectBtn = document.getElementById('selectBtn');
const uploadForm = document.getElementById('uploadForm');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeBtn = document.getElementById('removeBtn');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const result = document.getElementById('result');
const shareLink = document.getElementById('shareLink');
const copyBtn = document.getElementById('copyBtn');
const emailSection = document.getElementById('emailSection');
const emailFrom = document.getElementById('emailFrom');
const emailTo = document.getElementById('emailTo');
const sendBtn = document.getElementById('sendBtn');
const emailStatus = document.getElementById('emailStatus');
const errorMessage = document.getElementById('errorMessage');

let selectedFile = null;
let shareLinkValue = '';

// Click to select file
selectBtn.addEventListener('click', () => fileInput.click());

// File input change
fileInput.addEventListener('change', (e) => {
    handleFileSelect(e.target.files[0]);
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

function handleFileSelect(file) {
    if (!file) return;

    // Check file size (100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
        showError('File size exceeds 100MB limit');
        return;
    }

    selectedFile = file;
    fileInput.files = new DataTransfer().files; // Clear previous
    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;

    // Show file info
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.style.display = 'flex';
    uploadArea.style.display = 'none';

    // Auto upload
    uploadFile();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function uploadFile() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('myfile', selectedFile);

    // Show progress
    uploadProgress.style.display = 'block';
    fileInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    result.style.display = 'none';

    const xhr = new XMLHttpRequest();

    // Upload progress
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            progressFill.style.width = percentComplete + '%';
            progressText.textContent = `Uploading... ${Math.round(percentComplete)}%`;
        }
    });

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            shareLinkValue = response.file;
            shareLink.value = shareLinkValue;
            uploadProgress.style.display = 'none';
            result.style.display = 'block';
        } else {
            const error = JSON.parse(xhr.responseText);
            showError(error.error || 'Upload failed');
            resetUpload();
        }
    });

    xhr.addEventListener('error', () => {
        showError('Network error. Please try again.');
        resetUpload();
    });

    xhr.open('POST', '/api/files');
    xhr.send(formData);
}

function resetUpload() {
    selectedFile = null;
    fileInput.value = '';
    uploadProgress.style.display = 'none';
    fileInfo.style.display = 'none';
    uploadArea.style.display = 'block';
    result.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Remove file
removeBtn.addEventListener('click', () => {
    resetUpload();
});

// Copy link
copyBtn.addEventListener('click', () => {
    shareLink.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
});

// Send email
sendBtn.addEventListener('click', async () => {
    if (!emailFrom.value || !emailTo.value) {
        emailStatus.textContent = 'Please fill in both email fields';
        emailStatus.style.color = '#e74c3c';
        return;
    }

    // Extract UUID from share link
    const uuid = shareLinkValue.split('/').pop();

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    emailStatus.textContent = '';
    emailStatus.style.color = '';

    try {
        const response = await fetch('/api/files/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: uuid,
                emailTo: emailTo.value,
                emailFrom: emailFrom.value
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            emailStatus.textContent = '✓ Email sent successfully!';
            emailStatus.style.color = '#27ae60';
            emailFrom.value = '';
            emailTo.value = '';
        } else {
            emailStatus.textContent = data.error || 'Failed to send email';
            emailStatus.style.color = '#e74c3c';
        }
    } catch (error) {
        emailStatus.textContent = 'Error sending email. Please try again.';
        emailStatus.style.color = '#e74c3c';
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
    }
});
