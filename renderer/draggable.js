const tableContainer = document.querySelector('.table-container');

tableContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(event.clientY);
    const draggingItem = document.querySelector('.dragging');

    if (afterElement == null) {
        tableContainer.appendChild(draggingItem);
    }
    else {
        tableContainer.insertBefore(draggingItem, afterElement);
    }
});

function getDragAfterElement(cursorY) {
    const draggableElements = [...tableContainer.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = cursorY - (box.top + box.height/2);

        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child};
        }
        else {
            return closest;
        }

    }, {offset: Number.NEGATIVE_INFINITY}).element;
}