const log = [];
let alphabeticalSortOrder = 1;
let priceSortOrder = 1;
let dateSortOrder = 1;
let count = 0;
let menuExpanded = false; 
let valueSelected = false;

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

    const inputElement2 = document.querySelector("#item-input2");
    const input_container2 = document.querySelector("#search-container2");
    const name_search_element2 = document.querySelector("#item-list2");

    // Get the element with class "multiselect__content-wrapper"
    const name_search_element = document.querySelector("#item-list");

    const toggleBtn = document.querySelector('.toggle-search-btn');
    const searchDiv = document.querySelector('#addMenu');

    const selectedOption = document.querySelector('#league-container');
    const dropdownContent = document.querySelector('#league-options');

    const selectedOption2 = document.querySelector('#league-container2');
    const dropdownContent2 = document.querySelector('#league-options2');

    const elementsList = document.querySelector("#search-item-id");
    const elementsList2 = document.querySelector("#add-item-id");

    const currency_container = document.querySelector('#currency-container');
    const currency_options = document.querySelector('#currency-options');

    const currency_container2 = document.querySelector('#currency-container2');
    const currency_options2 = document.querySelector('#currency-options2');

    // Get the "No elements found" message element
    const notFoundMessage = document.getElementById("item-not-found");
    const notFoundMessage2 = document.getElementById("item-not-found2");

    const clearButton = document.querySelector(".clear-btn");


    const additemText = document.querySelector("#additemtext");
    const clearText = document.querySelector("#clearText");
    const searchText = document.querySelector("#searchText");

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
    const currency2 = document.querySelector('#select-currency2');
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

        inputElement2.addEventListener("input", function () {
            // Get the search query from the input field
            const searchQuery = inputElement2.value.trim().toLowerCase();
            valueSelected = false;

            // Flag to track if any matching elements are found
            let matchFound = false;

            input_container2.classList.add('multiselect--active');

            // Iterate over each element in the list
            elementsList2.querySelectorAll(".multiselect__element").forEach(function (li) {
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
                    inputElement2.value = text;
                    valueSelected = true;
                    // Trigger input event to update the search results
                    // inputElement.dispatchEvent(new Event("input"));
                    name_search_element2.style.display = "none";
                    input_container2.classList.remove('multiselect--active');
                });
            });

            // Show or hide the "No elements found" message based on the matchFound flag
            if (matchFound) {
                notFoundMessage2.style.display = "none";
            } else {
                notFoundMessage2.style.display = "block";
            }

            // Set the display property of the content wrapper based on search query
            if (searchQuery !== "") {
                // Set the display property to make it visible
                name_search_element2.style.display = "block"; // or "inline", "flex", etc. depending on your layout needs
            } else {
                // Set the display property to hide it
                name_search_element2.style.display = "none";
                valueSelected = false;
                input_container2.classList.remove('multiselect--active');
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

        selectedOption2.addEventListener('click', function () {
            // Toggle the visibility of the dropdown content
            dropdownContent2.style.display = dropdownContent2.style.display === "block" ? "none" : "block";
            if (dropdownContent2.style.display === "block") {
                selectedOption2.classList.add('multiselect--active');
            }
            else {
                selectedOption2.classList.remove('multiselect--active');
            }

        });

        let options2 = dropdownContent2.querySelectorAll('.multiselect__element');

        options2.forEach(function (option) {
            option.addEventListener('click', function () {
                options2.forEach(function (opt) {
                    opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
                });
                option.querySelector('.multiselect__option').classList.add('multiselect__option--selected');
                // Replace the text of the selected option
                let temp = document.querySelector('#leagueText2');
                temp.textContent = option.textContent;


                // Hide the dropdown content
                dropdownContent2.classList.remove('show');
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
                // dropdownContent.classList.remove('show');
            });
        });

        currency_container2.addEventListener('click', function () {
            console.log('clicked');
            // Toggle the visibility of the dropdown content
            currency_options2.style.display = currency_options2.style.display === "block" ? "none" : "block";
            if (currency_options2.style.display === "block") {
                currency_container2.classList.add('multiselect--active');
            }
            else {
                currency_container2.classList.remove('multiselect--active');
            }

        });
        let curr_options2 = currency_options2.querySelectorAll('.multiselect__element');

        curr_options2.forEach(function (option) {
            option.addEventListener('click', function () {
                curr_options2.forEach(function (opt) {
                    opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
                });
                option.querySelector('.multiselect__option').classList.add('multiselect__option--selected');
                // Replace the text of the selected option
                let temp = document.querySelector('#select-currency2');
                temp.innerHTML = option.children[0].innerHTML;


                // Hide the dropdown content
                // dropdownContent.classList.remove('show');
            });
        });


        search.addEventListener('click', function () {
            if (!menuExpanded) {
                console.log('menu not expanded');
                const desiredUsername = username.innerText // Assuming username is the element containing the desired username
                const desiredItem = item_text.value;
                const queryResults = document.querySelectorAll('.resultset .row');
                count = 0;
                let tesdf = document.querySelector('#select-currency').innerText.trim();
                queryResults.forEach(function (result) {
                    const resultUsername = result.getAttribute('result-user')
                    if (
                        (resultUsername === desiredUsername) &&
                        ((result.getAttribute('result-name').toLowerCase() === desiredItem.toLowerCase()) || (desiredItem === "")) &&
                        (((parseInt(result.getAttribute('result-chaos_price')) / price_conversion[tesdf]) >= parseInt(price_min.value)) || (price_min.value === "")) &&
                        (((parseInt(result.getAttribute('result-chaos_price')) / price_conversion[tesdf]) <= parseInt(price_max.value)) || (price_max.value === "")) &&
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
            }
            else {
                console.log('menu expanded');
                
                if (!valueSelected) {
                    alert("Please select an item from the list.");
                    return; // Exit function if item name is not found in the list of options
                }
                // Check if all fields are filled
                if (itemName === "") {
                    alert("Please select an item.");
                    return; // Exit function if item name is empty
                }
                if (inputElement2.value === "") {
                    alert("Please fill in the item name.");
                    return; // Exit function if item name is empty
                }
                if (document.querySelector('#additemnumer').value === "") {
                    alert("Please fill in the price.");
                    return; // Exit function if price is empty
                }
                if (document.getElementById('fileInput1').files.length === 0) {
                    alert("Please select an item image.");
                    return; // Exit function if item image is not selected
                }
                if (document.getElementById('fileInput2').files.length === 0) {
                    alert("Please select a description image.");
                    return; // Exit function if description image is not selected
                }
                else {

                    var itemName = document.querySelector('#item-input2').value;
                    var league = document.querySelector('#leagueText2').innerText;
                    var price = document.querySelector('#additemnumer').value;
                    var currency = document.querySelector('#select-currency2').innerText;
                    var itemImage = document.getElementById('fileInput1').files[0];
                    var descriptionImage = document.getElementById('fileInput2').files[0];

                    // Create form data
                    var formData = new FormData();
                    formData.append('item_name', itemName);
                    formData.append('league', league);
                    formData.append('price', price);
                    formData.append('currency', currency);
                    formData.append('item_image', itemImage);
                    formData.append('item_description', descriptionImage);
                    console.log([...formData.entries()])

                    // Send Fetch API POST request
                    fetch('http://localhost:5000/add', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.success) {
                                // Add the new item to the page
                                addItemToPage(data.data);
                                clearButton.dispatchEvent(new Event("click"));
                                // Optionally, you can also update the result count display here
                            } else {
                                // Handle error response if needed
                                console.error('Error adding item:', data.error);
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        });
                }
            }
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
            menuExpanded = !menuExpanded;
            if (menuExpanded) {
                additemText.textContent = "Hide Menu";
                clearText.textContent = "Clear Form";
                searchText.textContent = "Add Item";
                searchDiv.classList.remove('search-advanced-hidden');
            }
            else {
                additemText.textContent = "Add Item";
                clearText.textContent = "Clear";
                searchText.textContent = "Search";
                searchDiv.classList.add('search-advanced-hidden');
            }
        });

        clearButton.addEventListener("click", function () {
            if (!menuExpanded) {
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

                // searchDiv.classList.add('search-advanced-hidden');
                // Trigger input event to update the search results
                inputElement.dispatchEvent(new Event("input"));
                input_container.classList.remove('multiselect--active');

                let curr_options = currency_options.querySelectorAll('.multiselect__element');
                curr_options.forEach(function (opt) {
                    opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
                });
                curr_options[0].querySelector('.multiselect__option').classList.add('multiselect__option--selected');
                document.querySelector('#select-currency').innerHTML = curr_options[0].children[0].innerHTML;
            }
            else {
                let options2 = document.getElementById('addformleague').querySelectorAll('.multiselect__option');
                options2.forEach(function (opt) {
                    opt.classList.remove('multiselect__option--selected');
                });
                let temp = document.querySelector('#leagueText2');
                temp.textContent = options2[0].textContent;
                options2[0].classList.add('multiselect__option--selected');

                let curr_options2 = currency_options2.querySelectorAll('.multiselect__element');
                curr_options2.forEach(function (opt) {
                    opt.querySelector('.multiselect__option').classList.remove('multiselect__option--selected');
                });
                curr_options2[0].querySelector('.multiselect__option').classList.add('multiselect__option--selected');
                document.querySelector('#select-currency2').innerHTML = curr_options2[0].children[0].innerHTML;


                document.getElementById('item-input2').value = '';
                inputElement2.dispatchEvent(new Event("input"));
                input_container2.classList.remove('multiselect--active');
                document.getElementById('additemnumer').value = '';
                document.getElementById('fileInput1').value = '';
                document.getElementById('fileInput2').value = '';
                document.getElementById('container1').innerHTML = '<input type="file" class="file-input" id="fileInput1" accept="image/*" onchange="displayImage(this, 0)"><span class="pick-img-text">Item image</span>';
                document.getElementById('container2').innerHTML = '<input type="file" class="file-input" id="fileInput2" accept="image/*" onchange="displayImage(this, 1)"><span class="pick-img-text">Description image</span>';
            }
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
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
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
                    imgElement.addEventListener('click', function () {
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

function addItemToPage(item) {
    // Construct HTML for the new item
    var newItemHtml = `
        <div class="row" result-user="${item.user}" result-timestamp="${item.timestamp}" result-id="${item.id}" result-name="${item.item_name}" result-league="${item.league}" result-chaos_price="${prices[item.currency] * item.price}">
            <div class="left">
                <div class="newItemContainer itemRendered iW1 iH1">
                    <div class="iconContainer">
                        <div class="icon"><img src="${'static/' + item.item_image}" style="max-width: 200px;" alt="">
                            <div class="sockets numSockets0"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="middle" style="object-fit: contain;">
                <div class="itemPopupContainer newItemPopup gemPopup">
                    <img style="max-width: 750px;" src="${'static/' + item.item_description}">
                </div>
            </div>
            <div class="right">
                <div class="details">
                    <div class="price">
                        <span data-field="price" class="s sorted sorted-asc">
                            <span class="price-label fixed-price">Exact Price:</span><br>
                            <span>${item.price}</span><span>×</span>
                            <span class="currency-text currency-image"><img src="static/images/orbs/orb_chaos.png" width="25px">
                                <span>${item.currency}</span>
                            </span>
                        </span>
                        ${item.currency !== 'Chaos Orb' ? `
                            <span data-field="price" class="s sorted sorted-asc">
                                <span class="price-label fixed-price">↓</span><br>
                                <span>${prices[item.currency] * item.price}</span><span>×</span>
                                <span class="currency-text currency-image"><img src="static/images/orbs/orb_chaos.png" width="25px">
                                    <span>Chaos Orb</span>
                                </span>
                            </span>
                        ` : ''}
                    </div>
                    <div data-field="indexed" class="info">
                        <center><small>added ${item.timestamp}</small></center>
                        <span><button class="btn btn-default btn_remove_by_id" result-id="${item.id}" style="width: 100%;color:rgb(226,226,226); border:1px solid rgb(138,86,9); background-color: rgb(90,56,6);">Remove Item</button></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append the new item HTML to the query_results element
    $("#query_results").append(newItemHtml);
    const queryResults = document.querySelectorAll('.resultset .row');
    const sortedResults = Array.from(queryResults).sort((a, b) => {
        const aPrice = parseInt(a.getAttribute('result-chaos_price'));
        const bPrice = parseInt(b.getAttribute('result-chaos_price'));
        return priceSortOrder * (aPrice - bPrice);
    });
    const resultset = document.querySelector('.resultset');
    sortedResults.forEach(result => resultset.appendChild(result));
}