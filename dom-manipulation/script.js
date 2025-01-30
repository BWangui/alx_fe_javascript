 
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "The best way to predict the future is to create it.", category: "Productivity" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Happiness" },
  ];
  
  let serverQuotes = [
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Inspiration" },
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Success usually comes to those who are too busy to be looking for it.", category: "Productivity" },
    { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" },
  ];
  
  function fetchQuotesFromServer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(serverQuotes);
      }, 2000); 
    });
  }
  
  async function syncWithServer() {
    const serverData = await fetchQuotesFromServer();
  
    
    serverData.forEach(serverQuote => {
      const localQuote = quotes.find(quote => quote.text === serverQuote.text);
  
      if (!localQuote) {
        quotes.push(serverQuote);
      } else if (localQuote.text !== serverQuote.text || localQuote.category !== serverQuote.category) {
        console.log(`Conflict resolved for quote: "${serverQuote.text}" (server version applied)`);
        Object.assign(localQuote, serverQuote); 
      }
    });
  
    saveQuotes(); 
    alert("Quotes synchronized with the server.");
    displayQuotes(quotes);
  }
  
  
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  
  function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; 
    filteredQuotes.forEach((quote) => {
      quoteDisplay.innerHTML += `<p><strong>${quote.category}:</strong> "${quote.text}"</p>`;
    });
  }
  
  
  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = [...new Set(quotes.map(quote => quote.category))]; 
  
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === "all" 
      ? quotes 
      : quotes.filter(quote => quote.category === selectedCategory);
    
    displayQuotes(filteredQuotes); 
  }
  
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      saveQuotes(); 
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added successfully!");
      displayQuotes(quotes); 
      populateCategories(); 
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
  function exportToJson() {
    const json = JSON.stringify(quotes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url); 
  }
  
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
      displayQuotes(quotes); 
      populateCategories(); 
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  
  document.getElementById("exportQuotes").addEventListener("click", exportToJson);
  
  window.onload = function() {
    displayQuotes(quotes);
    populateCategories(); 
    syncWithServer();
  };
