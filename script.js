const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
});

// Observe initial elements
const hiddenElements = document.querySelectorAll(".hilang");
hiddenElements.forEach((element) => observer.observe(element));

// Create a MutationObserver to watch for changes in the DOM
const mutationObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList") {
      // If new elements are added, observe them
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains("hilang")) {
          observer.observe(node);
        }
      });

      // If elements are removed, unobserve them
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains("hilang")) {
          observer.unobserve(node);
        }
      });
    }
  });
});

// Start observing the document body for changes
mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
