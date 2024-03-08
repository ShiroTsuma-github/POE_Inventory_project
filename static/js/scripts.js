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
  const inputElement = document.querySelector("#item-input");
  const input_container = document.querySelector("#search-container");

  // Get the element with class "multiselect__content-wrapper"
  const name_search_element = document.querySelector("#item-list");

  const selectedOption = document.querySelector('#league-container');
  const dropdownContent = document.querySelector('#league-options');

  const elementsList = document.querySelector(".multiselect__content");

  const currency_container = document.querySelector('#currency-container');
  const currency_options = document.querySelector('#currency-options');
  // Get the "No elements found" message element
  const notFoundMessage = document.getElementById("item-not-found");

  const clearButton = document.querySelector(".clear-btn");


  // Check if the input element and the content element are found
  if (inputElement && name_search_element && elementsList && notFoundMessage && clearButton && selectedOption && dropdownContent) {
    // Add input event listener to the input element
    inputElement.addEventListener("input", function() {
        // Get the search query from the input field
        const searchQuery = inputElement.value.trim().toLowerCase();
        // Flag to track if any matching elements are found
        let matchFound = false;

        input_container.classList.add('multiselect--active');

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
            name_search_element.style.display = "none";
            input_container.classList.remove('multiselect--active');
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
            name_search_element.style.display = "block"; // or "inline", "flex", etc. depending on your layout needs
        } else {
            // Set the display property to hide it
            name_search_element.style.display = "none";
            input_container.classList.remove('multiselect--active');
        }

    });
    // Add event listener to the selected option
    selectedOption.addEventListener('click', function() {
      // Toggle the visibility of the dropdown content
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
      if (dropdownContent.style.display === "block") {
        selectedOption.classList.add('multiselect--active');
      }
      else {
        selectedOption.classList.remove('multiselect--active');
      }

    });
    let options = dropdownContent.querySelectorAll('.multiselect__element');

    options.forEach(function(option) {
        option.addEventListener('click', function() {
            options.forEach(function(opt) {
              opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
          });
          option.querySelector('.multiselect__option').classList.add('multiselect__option--selected');
            // Replace the text of the selected option
            let temp = document.querySelector('#leagueText');
            temp.textContent = option.textContent;
        
            
            // Hide the dropdown content
            dropdownContent.classList.remove('show');
        });
    });
    currency_container.addEventListener('click', function() {
      // Toggle the visibility of the dropdown content
      currency_options.style.display = currency_options.style.display === "block" ? "none" : "block";
      if (currency_options.style.display === "block") {
        currency_container.classList.add('multiselect--active');
      }
      else {
        currency_container.classList.remove('multiselect--active');
      }

    });
    let curr_options = currency_options.querySelectorAll('.multiselect__element');

    curr_options.forEach(function(option) {
        option.addEventListener('click', function() {
            curr_options.forEach(function(opt) {
              opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
          });
          option.querySelector('.multiselect__option').classList.add('multiselect__option--selected');
            // Replace the text of the selected option
            let temp = document.querySelector('#select-currency');
            temp.innerHTML = option.children[0].innerHTML;
        
            
            // Hide the dropdown content
            dropdownContent.classList.remove('show');
        });
    });
    clearButton.addEventListener("click", function() {
      // Clear the input field
      inputElement.value = "";
      let options = dropdownContent.querySelectorAll('.multiselect__option');
      options.forEach(function(opt) {
        opt.classList.remove('multiselect__option--selected');
      });
      let temp = document.querySelector('.search-right .multiselect.status-select .multiselect__single');
            temp.textContent = options[0].textContent;
            options[0].classList.add('multiselect__option--selected');

      let minInput = document.querySelector('.search-right .filter input[placeholder="min price"]');
      let maxInput = document.querySelector('.search-right .filter input[placeholder="max price"]');
      minInput.value = "";
      maxInput.value = "";
      
      // Trigger input event to update the search results
      inputElement.dispatchEvent(new Event("input"));
      input_container.classList.remove('multiselect--active');

      let curr_options = currency_options.querySelectorAll('.multiselect__element');
      curr_options.forEach(function(opt) {
        opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
      });
      curr_options[0].querySelector('.multiselect__option').classList.add('multiselect__option--selected');
      document.querySelector('#select-currency').innerHTML = curr_options[0].children[0].innerHTML;
  });
} else {
    console.log("Input element, content wrapper element, elements list, or not found message not found.");
}
});