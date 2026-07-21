    // --- Interactive 3D Rubik's Cube Logic ---
    const cube = document.querySelector('.rubiks-cube');
    
    // State variables
    let isDragging = false;
    let startX, startY;
    
    // Store the current accumulated rotation
    let currentRotateX = -20; // Matches the initial CSS
    let currentRotateY = 30;  // Matches the initial CSS
    
    // Store the rotation applied during the active drag
    let dragRotateX = 0;
    let dragRotateY = 0;

    const sensitivity = 0.5; // Adjust this to make it spin faster/slower

    // 1. Start dragging
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.style.transition = 'none'; // Remove transition so it tracks perfectly with the mouse
    });

    // 2. Dragging the mouse
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // Calculate how far the mouse has moved
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // X movement rotates Y axis. Y movement rotates X axis.
        // We subtract deltaY so dragging down rotates the top face forward.
        dragRotateY = deltaX * sensitivity;
        dragRotateX = -deltaY * sensitivity;

        // Apply combined rotation
        const newRotateX = currentRotateX + dragRotateX;
        const newRotateY = currentRotateY + dragRotateY;

        cube.style.transform = `rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`;
    });

    // 3. Stop dragging
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;

        // Commit the drag rotation to the current total
        currentRotateX += dragRotateX;
        currentRotateY += dragRotateY;

        // Reset drag variables
        dragRotateX = 0;
        dragRotateY = 0;

        // Add a smooth easing effect when they let go
        cube.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
