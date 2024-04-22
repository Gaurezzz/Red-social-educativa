function toggleDropdown(event) {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');

    // Evitar propagación para evitar el cierre inmediato
    event.stopPropagation();
}

function triggerFileUpload(event) {
    const profileImageUpload = document.getElementById('profile-image-upload');
    profileImageUpload.click();

    hideDropdown(); // Ocultar el menú después de activar la carga
}

function triggerFileUploadForDocs(event) {
    const docUpload = document.getElementById('doc-upload');
    docUpload.click();

    hideDropdown(); // Ocultar el menú después de activar la carga
}

function uploadProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const profileImage = document.getElementById('profile-image');
        profileImage.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }

    hideDropdown(); // Ocultar el menú después de subir la imagen
}

function deleteProfileImage() {
    const profileImage = document.getElementById('profile-image');
    profileImage.src = "https://via.placeholder.com/100"; // Volver al placeholder

    hideDropdown(); // Ocultar el menú después de eliminar la imagen
}

function hideDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.remove('show');
}

// Cerrar el menú cuando se hace clic fuera de él
document.body.addEventListener('click', function () {
    hideDropdown();
});

// Evitar que el menú se cierre al hacer clic en la imagen
document.getElementById('profile-image').addEventListener('click', function (event) {
    event.stopPropagation();
});

function fileUploaded() {
    console.log("Archivo subido.");
}