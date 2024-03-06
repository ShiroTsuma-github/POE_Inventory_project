const log = [];

window.addEventListener("keypress", function(e){
  log.push(e.code);
  if (log.length >= 4 &&
    log[log.length - 4] === "Space" &&
    log[log.length - 3] === "Space" &&
    log[log.length - 2] === "KeyD" &&
    log[log.length - 1] === "KeyA") {
  window.location.replace("https://www.pathofexile.com/login");
}
});  
document.addEventListener("DOMContentLoaded", function() {
  // Get the input element with class "multiselect__input"
  const inputElement = document.querySelector(".multiselect__input");

  // Get the element with class "multiselect__content-wrapper"
  const element = document.querySelector(".multiselect__content-wrapper");

  const elementsList = document.querySelector(".multiselect__content");

  // Get the "No elements found" message element
  const notFoundMessage = document.getElementById("item-not-found");

  const clearButton = document.querySelector(".clear-btn");


  // Check if the input element and the content element are found
  if (inputElement && element && elementsList && notFoundMessage && clearButton) {
    // Add input event listener to the input element
    inputElement.addEventListener("input", function() {
        // Get the search query from the input field
        const searchQuery = inputElement.value.trim().toLowerCase();

        // Flag to track if any matching elements are found
        let matchFound = false;

        // Iterate over each element in the list
        elementsList.querySelectorAll(".multiselect__element").forEach(function(li) {
          // Get the text content of the element
          const text = li.textContent.trim();

          // Check if the text contains the search query
          const index = text.toLowerCase().indexOf(searchQuery);
          if (index !== -1) {
              // Wrap the matching part of the text in a <span> element with a specific class for highlighting
              const highlightedText = text.substring(0, index) +
                  "<strong>" + text.substring(index, index + searchQuery.length) + "</strong>" +
                  text.substring(index + searchQuery.length);
              // Update the content of the element with the highlighted text
              li.innerHTML = highlightedText;
              
              // Show the element
              li.style.display = "block";
              matchFound = true;
          } else {
              // Hide the element
              li.style.display = "none";
          }
          li.addEventListener("click", function() {
            inputElement.value = text;
            // Trigger input event to update the search results
            inputElement.dispatchEvent(new Event("input"));
            element.style.display = "none";
        });
      });

        // Show or hide the "No elements found" message based on the matchFound flag
        if (matchFound) {
            notFoundMessage.style.display = "none";
        } else {
            notFoundMessage.style.display = "block";
        }

        // Set the display property of the content wrapper based on search query
        if (searchQuery !== "") {
            // Set the display property to make it visible
            element.style.display = "block"; // or "inline", "flex", etc. depending on your layout needs
        } else {
            // Set the display property to hide it
            element.style.display = "none";
        }

    
    });
    clearButton.addEventListener("click", function() {
      // Clear the input field
      inputElement.value = "";

      // Trigger input event to update the search results
      inputElement.dispatchEvent(new Event("input"));
  });
} else {
    console.log("Input element, content wrapper element, elements list, or not found message not found.");
}
});