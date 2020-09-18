(function () {
  function displaySearchResults(results, store, searchTerm) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
        var searchedIndex = item.content.toLowerCase().indexOf(searchTerm.toLowerCase())
        if(searchedIndex > 0) {
          var outerLength = (150 - searchTerm.length) / 2
          appendString += '<p>...' +
            item.content.substring(searchedIndex - outerLength, searchedIndex) +
            '<b>' +
            item.content.substring(searchedIndex, searchedIndex + searchTerm.length) +
            '</b>' +
            item.content.substring(searchedIndex + searchTerm.length, searchedIndex + searchTerm.length + outerLength) +
            '...</p></li>';
        } else {
          appendString += '<p>' + (item.description || '').substring(0, 150) + '...</p></li>';
        }

      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', {boost: 10});
      this.field('author');
      this.field('category');
      this.field('content');
      this.field('description');
      for (var key in window.store) { // Add the data to lunr
        this.add({
          'id': key,
          'title': window.store[key].title,
          'author': window.store[key].author,
          'category': window.store[key].category,
          'description': window.store[key].description,
          'content': window.store[key].content
        });
      }
    });

      for (var key in window.store) { // Add the data to lunr
        var results = idx.search(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store, searchTerm); // We'll write this in the next section
      }
  }
})();