// redirect.js
window.onload = async function () {
  console.log('Start redirect script');
  const SHEET_ID = '1dWUL3W7p5Wff_cvXQwd-hD3-kP4A2Y4glcK72XoIkfo'; // Google Sheet ID
  const API_KEY = 'AIzaSyCXmMCqNqYHkE7ttfsktdAUdKAgWnNVo6E'; // Google Sheets API key

  // Extract the short code from the URL
  const hashShortCode = window.location.hash.substring(1);
  const urlParams = new URLSearchParams(window.location.search);
  const queryShortCode = urlParams.get('go');

  // Use the first available short code
  const shortCode = hashShortCode || queryShortCode;

  if (shortCode) {
      // Fetch the data from Google Sheets
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/url!A:B?key=${API_KEY}`;
      console.log('Fetching data from:', url);
      try {
          const response = await fetch(url);
          const data = await response.json();

          // Loop through the sheet data to find a matching short code
          let found = false;
          data.values.forEach(row => {
              if (row[0] === shortCode) {
                  window.location.href = row[1]; // Redirect to the original URL
                  found = true;
              }
          });

          if (!found) {
              document.body.innerHTML = "<p>Shortened link not found.</p>";
              document.body.style.display = 'block'; // Show body content if not found
          }
      } catch (error) {
          console.error("Error fetching link: ", error);
          document.body.innerHTML = "<p>Error occurred while fetching the link.</p>";
          document.body.style.display = 'block'; // Show body content on error
      }
  } else {
      document.body.innerHTML = "<p>No short code provided in the URL.</p>";
      document.body.style.display = 'block'; // Show body content if no short code
  }
};
