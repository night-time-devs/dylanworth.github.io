document.addEventListener('DOMContentLoaded', () => {
  const albums = [

  
    {
      name: 'Easter Weekend',
      photos: [
        'images/photos/easter-weekend.jpg',
        'images/photos/easter-weekend1.jpg',
        'images/photos/easter-weekend2.jpg',
        'images/photos/easter-weekend3.jpg',
        'images/photos/easter-weekend4.jpg',
        'images/photos/easter-weekend5.jpg',
      ],
    },
    {
      name: 'Marriage and Honeymoon',
      photos: [
        'images/photos/wedding-honeymoon/myfamily.jpg',
        'images/photos/wedding-honeymoon/wedding0.jpg',
        'images/photos/wedding-honeymoon/wedding2.jpg',
        'images/photos/wedding-honeymoon/wedding3.jpg',
        'images/photos/wedding-honeymoon/wedding4.jpg',
        'images/photos/wedding-honeymoon/honeymoon1.jpg',
        'images/photos/wedding-honeymoon/honeymoon2.jpg',
        'images/photos/wedding-honeymoon/honeymoon3.jpg',
        'images/photos/wedding-honeymoon/honeymoon4.jpg',
        'images/photos/wedding-honeymoon/honeymoon5.jpg',
        'images/photos/wedding-honeymoon/honeymoon6.jpg',
        'images/photos/wedding-honeymoon/honeymoon7.jpg',
        'images/photos/wedding-honeymoon/honeymoon8.jpg',
        'images/photos/wedding-honeymoon/honeymoon9.jpg',
        'images/photos/wedding-honeymoon/honeymoon10.jpg',
        'images/photos/wedding-honeymoon/honeymoon11.jpg',
        'images/photos/wedding-honeymoon/honeymoon12.jpg',
        'images/photos/wedding-honeymoon/honeymoon13.jpg',
        'images/photos/wedding-honeymoon/honeymoon14.jpg',
        'images/photos/wedding-honeymoon/honeymoon15.jpg',
        'images/photos/wedding-honeymoon/honeymoon16.jpg',
        'images/photos/wedding-honeymoon/honeymoon17.jpg',
      ],
      
    },
    {
      name: 'graduation',
      photos: [
        'images/albums/graduation/PXL_20240531_223524369.MP.jpg',
        'images/albums/graduation/PXL_20240531_230336626.jpg',
        'images/albums/graduation/PXL_20240531_230917930.MP.jpg',
        'images/albums/graduation/PXL_20240531_230443230.MP.jpg',
        'images/albums/graduation/PXL_20240531_232352593.MP.jpg',
      ],
    },
    {
      name: 'wife2024bday',
      photos: [
        'images/albums/bday/PXL_20240601_171559628.MP.jpg',
        'images/albums/bday/PXL_20240602_153450756.MP.jpg',
        'images/albums/bday/PXL_20240601_134951260.MP.jpg',
        'images/albums/bday/PXL_20240601_164244162.MP.jpg',
        'images/albums/bday/PXL_20240601_150313004.MP.jpg',
        'images/albums/bday/PXL_20240601_171557638.MP.jpg',
        'images/albums/bday/PXL_20240601_165847040.MP.jpg',
        'images/albums/bday/PXL_20240601_150157793.MP.jpg',
        'images/albums/bday/PXL_20240601_221129327.MP.jpg',
        'images/albums/bday/PXL_20240602_153458013.MP.jpg',
        'images/albums/bday/PXL_20240602_160703133.MP.jpg',
        'images/albums/bday/PXL_20240602_155441787.MP.jpg',
        'images/albums/bday/PXL_20240602_184232104.MP.jpg',
      ],
    },
    {
      name: 'mold-remediation1',
      photos: [
        'images/mold/mold1.jpg',
        'images/mold/mold2.jpg',
        'images/mold/mold3.jpg',
        'images/mold/mold4.jpg',
        'images/mold/mold5.jpg',
        'images/mold/mold6.jpg',
        'images/mold/mold7.jpg',
        'images/mold/mold8.jpg',
        'images/mold/mold9.jpg',
        'images/mold/mold10.jpg',
      ],
    },
   
    
    // Add more albums as needed...
  ];

  let currentAlbumIndex = 0;
  let currentPhotoIndex = 0;

  function displayAlbum(albumIndex) {
    const selectedAlbum = albums[albumIndex];
    const albumContainer = document.getElementById(`album-container-${albumIndex + 1}`);
    albumContainer.innerHTML = ''; // Clear existing thumbnails if any

    // Limit displaying up to the first 5 thumbnails
    const displayLimit = Math.min(5, selectedAlbum.photos.length);
    for (let index = 0; index < displayLimit; index++) {
      const photoUrl = selectedAlbum.photos[index];
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'thumbnail';
      thumbDiv.innerHTML = `<img src="${photoUrl}" alt="Photo ${index + 1}">`;
      thumbDiv.onclick = () => {
        currentAlbumIndex = albumIndex; // Update global album index
        showFullPhoto(albumIndex, index);
      };
      albumContainer.appendChild(thumbDiv);
    }

    // If there are more than 5 photos, add a "View More" option
    if (selectedAlbum.photos.length > 5) {
      const viewMoreDiv = document.createElement('div');
      viewMoreDiv.className = 'view-more';
      viewMoreDiv.innerText = 'View More...';
      viewMoreDiv.onclick = () => {
        currentAlbumIndex = albumIndex; // Update global album index
        showFullPhoto(albumIndex, 0); // Open the modal starting with the first photo
      };
      albumContainer.appendChild(viewMoreDiv);
    }
  }

  function showFullPhoto(albumIndex, photoIndex) {
    const modal = document.getElementById('photoModal');
    const fullPhoto = document.getElementById('fullPhoto');
    const selectedAlbum = albums[albumIndex];
    fullPhoto.src = selectedAlbum.photos[photoIndex];

    currentAlbumIndex = albumIndex;
    currentPhotoIndex = photoIndex;

    modal.classList.add('active');
  }

  // Function to show the next photo
  function showNextPhoto() {
    const selectedAlbum = albums[currentAlbumIndex];
    currentPhotoIndex = (currentPhotoIndex + 1) % selectedAlbum.photos.length;
    showFullPhoto(currentAlbumIndex, currentPhotoIndex);
  }

  // Function to show the previous photo
  function showPreviousPhoto() {
    const selectedAlbum = albums[currentAlbumIndex];
    currentPhotoIndex = (currentPhotoIndex - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length;
    showFullPhoto(currentAlbumIndex, currentPhotoIndex);
  }

  // Close modal when the close button is clicked
  document.getElementById('closeModal').onclick = () => {
    document.getElementById('photoModal').classList.remove('active');
  };

  // Close modal when clicking outside of the modal content
  document.getElementById('photoModal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      event.currentTarget.classList.remove('active');
    }
  });

  // Close modal when pressing the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      const modal = document.getElementById('photoModal');
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    }
  });

  // Navigate photos with left and right arrow keys
  document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft") {
      showPreviousPhoto();
    } else if (event.key === "ArrowRight") {
      showNextPhoto();
    }
  });

  // Zoom controls
  document.getElementById('zoomIn').onclick = () => {
    document.getElementById('fullPhoto').classList.add('zoomed-in');
  };

  document.getElementById('zoomOut').onclick = () => {
    document.getElementById('fullPhoto').classList.remove('zoomed-in');
  };

  // Display all albums
  albums.forEach((_, index) => {
    displayAlbum(index);
  });
});
