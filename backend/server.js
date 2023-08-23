const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const port = 3000; // Choose a port number

// Use JSON middleware for parsing request bodies
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, '../')));

// Define an API endpoint for generating the profile
app.post('/generate-profile', (req, res) => {
  const formData = req.body;

  // Generate XML configuration based on formData
  const xmlContent = generateXml(formData);

  // Respond with the XML content
  res.type('application/xml');
  res.send(xmlContent);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Helper function to generate XML content
function generateXml(formData) {
  // Customize this function to generate the XML structure
  const xml = `
    <configuration>
      <configName>${formData.configName}</configName>
      <!-- Add other form fields here -->
    </configuration>
  `;
  return xml;
}