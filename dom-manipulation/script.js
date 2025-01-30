let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The best way to predict the future is to create it.", category: "Success" }
  ];
  
  // Function to save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Function to load quotes from localStorage
  function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
    }
  }
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
      saveQuotes(); // Save updated quotes
      populateCategories(); // Update the categories dropdown
      filterQuotes(); // Update the filtered quotes
      postQuoteToServer(newQuote); // Send the new quote to the server
    }
  }
  
  // Function to create and display the add quote form
  function createAddQuoteForm() {
    const formContainer = document.getElementById("addQuoteFormContainer");
    const formHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    `;
    formContainer.innerHTML = formHTML;
  }
  
  // Function to populate the categories dropdown
  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = ["all", ...new Set(quotes.map(quote => quote.category))];
  
    categoryFilter.innerHTML = "";
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Function to filter quotes by selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
    filteredQuotes.forEach(quote => {
      const quoteElement = document.createElement("p");
      quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
      quoteDisplay.appendChild(quoteElement);
    });
  
    localStorage.setItem("lastSelectedCategory", selectedCategory); // Save the selected category to localStorage
  }
  
  // Function to load the last selected category from localStorage
  function loadLastSelectedCategory() {
    const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
    if (lastSelectedCategory) {
      document.getElementById("categoryFilter").value = lastSelectedCategory;
      filterQuotes(); // Filter quotes based on last selected category
    }
  }
  
  // Function to fetch quotes from the server
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      data.forEach(post => {
        const quote = { text: post.title, category: post.body };
        quotes.push(quote); // Add the fetched quotes to the local array
      });
      saveQuotes(); // Save updated quotes to localStorage
      filterQuotes(); // Display the quotes based on current filter
    } catch (error) {
      console.error("Error fetching quotes from server:", error);
    }
  }
  
  // Function to post data to the mock API (simulating saving a new quote)
  async function postQuoteToServer(newQuote) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // HTTP method (POST)
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
        },
        body: JSON.stringify({
          title: newQuote.text, // Sending quote text as 'title' (mock API requirement)
          body: newQuote.category, // Using category as the 'body'
          userId: 1, // Mocking a userId (required by JSONPlaceholder)
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to post quote to the server");
      }
  
      // Simulate response from the server with the added quote
      const postedQuote = await response.json();
      console.log("Quote posted successfully:", postedQuote);
  
      // After successfully posting, you can choose to merge this data into the local quotes array
      quotes.push({
        text: postedQuote.title, // 'title' field from API response
        category: postedQuote.body, // 'body' field from API response
      });
  
      saveQuotes(); // Save the updated quotes array to localStorage
      populateCategories(); // Refresh the categories dropdown
      filterQuotes(); // Refresh the displayed quotes
    } catch (error) {
      console.error("Error posting quote to the server:", error);
    }
  }
  
  // Function to sync local quotes with the server
  async function syncQuotes() {
    try {
      // Fetch quotes from the server
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const serverQuotes = await response.json();
  
      // Compare local quotes with server quotes
      serverQuotes.forEach(serverQuote => {
        const existingQuote = quotes.find(quote => quote.text === serverQuote.title);
        if (!existingQuote) {
          // Add new quotes from the server that are not in the local array
          quotes.push({ text: serverQuote.title, category: serverQuote.body });
        }
      });
  
      // Save the updated quotes array to localStorage
      saveQuotes();
      filterQuotes(); // Update the displayed quotes
  
      // Notify the user that quotes have been synced with the server
      alert("Quotes synced with server!"); // This is the UI element for data updates
  
    } catch (error) {
      console.error("Error syncing quotes with the server:", error);
    }
  }
  
  // Event listener to initialize the app and load the quotes
  document.addEventListener("DOMContentLoaded", function() {
    loadQuotes();
    populateCategories();
    loadLastSelectedCategory();
    showRandomQuote();
    fetchQuotesFromServer();
  
    // Sync quotes with the server every 10 minutes
    setInterval(syncQuotes, 600000); // Every 10 minutes
  });
  
  
  