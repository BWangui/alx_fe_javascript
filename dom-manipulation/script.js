 // Initialize quotes array, try loading from local storage
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to populate categories in the filter dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories

  // Populate the dropdown with categories
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);
  
  displayQuotes(filteredQuotes); // Update displayed quotes
}

// Function to display quotes
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear current quotes

  filteredQuotes.forEach((quote) => {
    quoteDisplay.innerHTML += `<p><strong>${quote.category}:</strong> "${quote.text}"</p>`;
  });
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length); // Random index using Math.random
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `<p><strong>${randomQuote.category}:</strong> "${randomQuote.text}"</p>`;
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    saveQuotes(); // Save to localStorage
    populateCategories(); // Update categories in dropdown
    filterQuotes(); // Refresh quotes displayed
  }

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to export quotes to a JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Save to localStorage
    populateCategories(); // Update categories in dropdown
    filterQuotes(); // Refresh quotes displayed
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Simulate fetching quotes from a server
function fetchQuotesFromServer() {
  // Simulating a server response with a delay (e.g., using a timeout)
  setTimeout(() => {
    // Sample mock data that would come from a server
    const serverQuotes = [
      { text: "Server quote 1", category: "Inspiration" },
      { text: "Server quote 2", category: "Motivation" },
    ];

    // Simulate merging server quotes with local quotes
    const updatedQuotes = [...serverQuotes, ...quotes];
    quotes = updatedQuotes;

    // Save to localStorage
    saveQuotes();

    // Refresh categories and quotes displayed
    populateCategories();
    filterQuotes();

    console.log("Server quotes fetched and merged.");
  }, 2000); // Simulating a 2-second delay
}

// Simulate periodic fetching of new data from the server
function syncWithServer() {
  fetchQuotesFromServer(); // Fetch data from the "server"
  setTimeout(syncWithServer, 5000); // Repeat every 5 seconds
}

// Start syncing with the server on page load
syncWithServer();

// Initialize on page load
populateCategories();
filterQuotes();
  
  
  