const log = [];
let alphabeticalSortOrder = 1;
let priceSortOrder = 1;
let dateSortOrder = 1;
let count = 0;

window.addEventListener("keypress", function (e) {
    log.push(e.code);
    if (log.length >= 4 &&
        log[log.length - 4] === "Space" &&
        log[log.length - 3] === "Space" &&
        log[log.length - 2] === "KeyD" &&
        log[log.length - 1] === "KeyA") {
        window.location.replace("https://www.pathofexile.com/login");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Get the input element with class "multiselect__input"
    const inputElement = document.querySelector("#item-input");
    const input_container = document.querySelector("#search-container");

    // Get the element with class "multiselect__content-wrapper"
    const name_search_element = document.querySelector("#item-list");

    const toggleBtn = document.querySelector('.toggle-search-btn');
    const searchDiv = document.querySelector('#addMenu');

    const selectedOption = document.querySelector('#league-container');
    const dropdownContent = document.querySelector('#league-options');

    const elementsList = document.querySelector(".multiselect__content");

    const currency_container = document.querySelector('#currency-container');
    const currency_options = document.querySelector('#currency-options');
    // Get the "No elements found" message element
    const notFoundMessage = document.getElementById("item-not-found");

    const clearButton = document.querySelector(".clear-btn");

    const username = document.querySelector('#username');
    const item_text = document.querySelector('#item-input');
    const league_text = document.querySelector('#leagueText')
    const price_min = document.querySelector('#min-price');
    const price_max = document.querySelector('#max-price');
    const price_conversion = prices = {
        'Chaos Orb': 1,
        'Ancient Orb': 5,
        'Orb of Annulment': 15,
        'Orb of Binding': 20,
        'Divine Orb': 150,
        'Awakened Sextant': 2,
        'Elevated Sextant': 200
    }
    const currency = document.querySelector('#select-currency');
    const search = document.querySelector('#search');
    const query = { "username": username.innerText, "item": item_text.value, "league": league_text.innerText, "price_min": price_min.value, "price_max": price_max.value, "currency": currency.innerText.trim() };
    const results_container = document.querySelector('#query_results');


    const btn_alphabetical = document.querySelector('#btn_sort_alpha');
    const btn_price = document.querySelector('#btn_sort_price');
    const btn_date = document.querySelector('#btn_sort_date');

    // Check if the input element and the content element are found
    if (inputElement && name_search_element && elementsList && notFoundMessage && clearButton && selectedOption && dropdownContent && results_container) {
        // Add input event listener to the input element
        inputElement.addEventListener("input", function () {
            // Get the search query from the input field
            const searchQuery = inputElement.value.trim().toLowerCase();
            // Flag to track if any matching elements are found
            let matchFound = false;

            input_container.classList.add('multiselect--active');

            // Iterate over each element in the list
            elementsList.querySelectorAll(".multiselect__element").forEach(function (li) {
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
                li.addEventListener("click", function () {
                    inputElement.value = text;
                    // Trigger input event to update the search results
                    // inputElement.dispatchEvent(new Event("input"));
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
        selectedOption.addEventListener('click', function () {
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

        options.forEach(function (option) {
            option.addEventListener('click', function () {
                options.forEach(function (opt) {
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
        currency_container.addEventListener('click', function () {
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

        curr_options.forEach(function (option) {
            option.addEventListener('click', function () {
                curr_options.forEach(function (opt) {
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
        search.addEventListener('click', function () {
            const desiredUsername = username.innerText // Assuming username is the element containing the desired username
            const desiredItem = item_text.value;
            const queryResults = document.querySelectorAll('.resultset .row');
            count = 0;
            queryResults.forEach(function (result) {
                const resultUsername = result.getAttribute('result-user')
                if (
                    (resultUsername === desiredUsername) &&
                    ((result.getAttribute('result-name').toLowerCase() === desiredItem.toLowerCase()) || (desiredItem === "")) &&
                    (((parseInt(result.getAttribute('result-chaos_price')) / price_conversion[currency.innerText.trim()]) >= parseInt(price_min.value)) || (price_min.value === "")) &&
                    (((parseInt(result.getAttribute('result-chaos_price')) / price_conversion[currency.innerText.trim()]) <= parseInt(price_max.value)) || (price_max.value === "")) &&
                    ((result.getAttribute('result-league') === league_text.innerText) || (league_text.innerText === "Affliction"))) {
                    // Display the item
                    result.style.display = 'flex';
                    count += 1;
                } else {
                    // Don't display the item
                    result.style.display = 'none';
                }
                document.querySelector('#result-amount').innerText = "Showing " + count + " results"
            });
        });
        btn_alphabetical.addEventListener('click', function () {
            sortAlphabetically();
            updateResultAmountText("alphabetically", alphabeticalSortOrder);
            alphabeticalSortOrder *= -1;
        });
        btn_price.addEventListener('click', function () {
            sortPrice();
            updateResultAmountText("price", priceSortOrder);
            priceSortOrder *= -1;
        });
        btn_date.addEventListener('click', function () {
            sortDate();
            updateResultAmountText("date", dateSortOrder);
            dateSortOrder *= -1;
        });
        window.addEventListener('load', function () {
            filterItemsByUsername();
            sortAlphabetically();
        });
        window.addEventListener('load', function () {
            filterItemsByUsername();
            sortPrice();
        });
        toggleBtn.addEventListener('click', function () {
            console.log('clicked');
            searchDiv.classList.remove('search-advanced-hidden');
        });

        clearButton.addEventListener("click", function () {
            // Clear the input field
            inputElement.value = "";
            let options = dropdownContent.querySelectorAll('.multiselect__option');
            options.forEach(function (opt) {
                opt.classList.remove('multiselect__option--selected');
            });
            let temp = document.querySelector('.search-right .multiselect.status-select .multiselect__single');
            temp.textContent = options[0].textContent;
            options[0].classList.add('multiselect__option--selected');

            let minInput = document.querySelector('.search-right .filter input[placeholder="min price"]');
            let maxInput = document.querySelector('.search-right .filter input[placeholder="max price"]');
            minInput.value = "";
            maxInput.value = "";

            searchDiv.classList.add('search-advanced-hidden');
            // Trigger input event to update the search results
            inputElement.dispatchEvent(new Event("input"));
            input_container.classList.remove('multiselect--active');

            let curr_options = currency_options.querySelectorAll('.multiselect__element');
            curr_options.forEach(function (opt) {
                opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
            });
            curr_options[0].querySelector('.multiselect__option').classList.add('multiselect__option--selected');
            document.querySelector('#select-currency').innerHTML = curr_options[0].children[0].innerHTML;
        });
    } else {
        console.log("Input element, content wrapper element, elements list, or not found message not found.");
    }
});

function filterItemsByUsername() {
    const desiredUsername = username.innerText // Assuming username is the element containing the desired username
    const queryResults = document.querySelectorAll('.resultset .row');
    count = 0;
    queryResults.forEach(function (result) {
        const resultUsername = result.getAttribute('result-user')
        if (resultUsername === desiredUsername) {
            // Display the item
            result.style.display = 'flex';
            count += 1;
        } else {
            // Don't display the item
            result.style.display = 'none';
        }
        document.querySelector('#result-amount').innerText = "Showing " + count + " results"
    });
}
function sortAlphabetically() {
    const queryResults = document.querySelectorAll('.resultset .row');
    const sortedResults = Array.from(queryResults).sort((a, b) => {
        const aName = a.getAttribute('result-name');
        const bName = b.getAttribute('result-name');
        return alphabeticalSortOrder * aName.localeCompare(bName);
    });
    const resultset = document.querySelector('.resultset');
    sortedResults.forEach(result => resultset.appendChild(result));
}

function sortPrice() {
    const queryResults = document.querySelectorAll('.resultset .row');
    const sortedResults = Array.from(queryResults).sort((a, b) => {
        const aPrice = parseInt(a.getAttribute('result-chaos_price'));
        const bPrice = parseInt(b.getAttribute('result-chaos_price'));
        return priceSortOrder * (aPrice - bPrice);
    });
    const resultset = document.querySelector('.resultset');
    sortedResults.forEach(result => resultset.appendChild(result));
}

function sortDate() {
    const queryResults = document.querySelectorAll('.resultset .row');
    const sortedResults = Array.from(queryResults).sort((a, b) => {
        const aDate = parseCustomDate(a.getAttribute('result-timestamp'));
        const bDate = parseCustomDate(b.getAttribute('result-timestamp'));
        return dateSortOrder * (bDate - aDate);
    });
    const resultset = document.querySelector('.resultset');
    sortedResults.forEach(result => resultset.appendChild(result));
}

function parseCustomDate(dateString) {
    // Split the dateString into its components
    const [year, month, day, hour, minute, second] = dateString.split(/[ .:]+/);
    const time = `${hour}:${minute}:${second}`;
    // Construct a Date object
    const yearDigits = year.length === 2 ? `20${year}` : year; // Assuming 20th century
    const formattedDateString = `${yearDigits}-${month}-${day}T${time}`;
    return new Date(formattedDateString);
}
function updateResultAmountText(sortType, sortOrder) {
    const sortOrderText = sortOrder === 1 ? "(ascending)" : "(descending)";
    document.querySelector('#result-amount').innerText = "Showing " + count + " results";
    document.getElementById('result-amount').textContent += ` | ${sortType} ${sortOrderText}`;
}
function displayImage(input, index) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const containerId = 'container' + (index + 1); // Generating container ID dynamically
                const container = document.getElementById(containerId);
                if (container) {
                    // Check if image already exists, if not, create a new one
                    let imgElement = container.querySelector('img');
                    if (!imgElement) {
                        imgElement = new Image();
                        container.appendChild(imgElement);
                    }
                    const pickImgText = container.querySelector('.pick-img-text');
                    if (pickImgText) {
                        pickImgText.style.display = 'none';
                    }

                    // Set image source
                    imgElement.src = img.src;

                    // Show file input
                    input.style.display = 'block';

                    // Add event listener to image
                    imgElement.addEventListener('click', function() {
                        // Reopen file input
                        input.value = null;
                        input.style.display = 'block'; // Show file input
                    });
                } else {
                    console.error("Container not found.");
                }
            };
        };
        reader.readAsDataURL(file);
    }
}