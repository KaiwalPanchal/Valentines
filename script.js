document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('stack');
    const docs = Array.from(document.querySelectorAll('.paper-doc'));
    const nextBtn = document.getElementById('next-btn');

    // We want the docs array to match the visual stack order (Top -> Bottom)
    // In HTML, we defined them Bottom -> Top for easier indexing? 
    // Actually, in CSS absolute positioning, the last element in DOM is on TOP.
    // So doc-1 (Cover) should be LAST in the DOM to be on top? 
    // Wait, my HTML has doc-1 as the LAST child? Let's check.
    
    // HTML structure:
    // doc-6 (Final)
    // doc-5 (Plea)
    // ...
    // doc-1 (Cover) -> Last child, so visually on top by default. Correct.

    // So the "current" card is the last one in the DOM.
    
    // Let's create a list of indices representing the stack
    // We will pop from the end (Top) and move it away.
    
    let currentIndex = docs.length - 1; // Start at the last element (Top)

    function updateZIndices() {
        // Assign z-indexes just to be safe, though DOM order handles it
        docs.forEach((doc, index) => {
            doc.style.zIndex = index + 1;
        });
    }

    updateZIndices();

    function showNextCard() {
        if (currentIndex < 0) {
            // Stack is empty (or we want to reset?)
            // For now, let's just alert or do nothing, or reset
             alert("Investigation complete! Happy Valentine's Day! ❤️");
             return;
        }

        const currentDoc = docs[currentIndex];
        
        // Add class to animate it away
        currentDoc.classList.add('tossed');

        // Move the index pointer down
        currentIndex--;

        // Optional: Change button text on last card
        if (currentIndex < 0) {
            nextBtn.textContent = "Finish Investigation";
        }
    }

    nextBtn.addEventListener('click', showNextCard);

    // Also allow clicking the top card to dismiss it
    docs.forEach(doc => {
        doc.addEventListener('click', (e) => {
            // Only allow clicking the actual top card
            const topDoc = docs[currentIndex];
            if (e.currentTarget === topDoc) {
                showNextCard();
            }
        });
    });

});
