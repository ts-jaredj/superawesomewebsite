const images = [
    { element: document.getElementById('image1'), velocityX: 0, velocityY: 0, posX: 0, posY: 0 },
    { element: document.getElementById('image2'), velocityX: 0, velocityY: 0, posX: 0, posY: 0 },
    { element: document.getElementById('image3'), velocityX: 0, velocityY: 0, posX: 0, posY: 0 },
    { element: document.getElementById('image4'), velocityX: 0, velocityY: 0, posX: 0, posY: 0 },
];
images.forEach(image => {
    image.posX = Math.random() * (window.innerWidth - 100);  // Ensure they don't start offscreen
    image.posY = Math.random() * (window.innerHeight - 100);
    image.velocityX = (Math.random() - 0.5) * 5;
    image.velocityY = (Math.random() - 0.5) * 5;
});
let mouseX = 0;
let mouseY = 0;
const safeDistance = 150;  
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});
function getRandomVelocity() {
    return (Math.random() - 0.5) * 10;
}
function isColliding(image1, image2) {
    const rect1 = image1.element.getBoundingClientRect();
    const rect2 = image2.element.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
}
function handleCollision(image1, image2) {
    const tempVx = image1.velocityX;
    const tempVy = image1.velocityY;
    image1.velocityX = image2.velocityX;
    image1.velocityY = image2.velocityY;
    image2.velocityX = tempVx;
    image2.velocityY = tempVy;
}
function moveImages() {
    images.forEach((image, index) => {
        image.posX += image.velocityX;
        image.posY += image.velocityY;
        const distX = mouseX - (image.posX + image.element.offsetWidth / 2);
        const distY = mouseY - (image.posY + image.element.offsetHeight / 2);
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < safeDistance) {
            image.velocityX = getRandomVelocity();
            image.velocityY = getRandomVelocity();
        }
        if (image.posX + image.element.offsetWidth > window.innerWidth || image.posX < 0) {
            image.velocityX = getRandomVelocity();
        }
        if (image.posY + image.element.offsetHeight > window.innerHeight || image.posY < 0) {
            image.velocityY = getRandomVelocity();
        }
        for (let i = index + 1; i < images.length; i++) {
            if (isColliding(image, images[i])) {
                handleCollision(image, images[i]);
            }
        }
        image.element.style.left = `${image.posX}px`;
        image.element.style.top = `${image.posY}px`;
    });
    requestAnimationFrame(moveImages);
}
moveImages();
