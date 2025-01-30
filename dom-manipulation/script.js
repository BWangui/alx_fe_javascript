 // Array to hold quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "The best way to predict the future is to create it.", category: "Productivity" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p><strong>${quote.category}:</strong> "${quote.text}"</p>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
  
    // Ensure both fields are filled
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  HTML remains the same:
  
  html
  Copy code
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Quote Generator</title>
  </head>
  <body>
    <h1>Dynamic Quote Generator</h1>
    
    <!-- Section to display the quote -->
    <div id="quoteDisplay"></div>
  
    <!-- Button to trigger showing a new random quote -->
    <button id="newQuote">Show New Quote</button>
  
    <!-- Section to add new quote -->
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    </div>
  
    <!-- Link to the JavaScript file -->
    <script src="script.js"></script>
  </body>
  </html>
  Solution 2: Dynamically Create the Add Quote Form with createAddQuoteForm
  If you want to dynamically create the form using JavaScript (with the createAddQuoteForm function), you would do it like this:
  
  Here’s the full corrected script.js with the createAddQuoteForm included:
  
  javascript
  Copy code
  // Array to hold quote objects
  let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "The best way to predict the future is to create it.", category: "Productivity" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p><strong>${quote.category}:</strong> "${quote.text}"</p>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
  
    // Ensure both fields are filled
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
  // Function to dynamically create the "Add Quote" form
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
  
    // Create text input for new quote
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
    formContainer.appendChild(quoteInput);
  
    // Create input for quote category
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
    formContainer.appendChild(categoryInput);
  
    // Create button to add the quote
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;
    formContainer.appendChild(addButton);
  
    // Append the form to the body
    document.body.appendChild(formContainer);
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Dynamically create the "Add Quote" form when the page loads
  createAddQuoteForm();
