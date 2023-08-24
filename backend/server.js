const express = require('express');
const path = require('path');  // Import the 'path' module for path manipulations
const app = express();
const { v4: uuidv4 } = require('uuid');  // Import the uuid library here
// ... other imports and initializations ...

// Middleware to serve static files
// Use path.join to ensure the correct path to the parent directory of 'backend'
app.use(express.static(path.join(__dirname, '../')));

// Middleware to parse JSON requests
app.use(express.json());

// Define the root route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));  // Adjust the path to index.html
});

// Define a route for generating the APN configuration profile
app.post('/generate-profile', (req, res) => {

    // Capture values from the incoming POST request
    const {
        configName,
        apn,
        authType,
        apnUsername,
        apnPassword,
        proxyServer,
        port,
        serverAddress,
        protocol,
        mcc,
        mnc,
        accessPointType,
        mmsServer,
        mmsProxy,
        mmsPort,
        roamingProtocol,
        roamingAlwaysOn,
        useAsDefault,
        mvno
    } = req.body;

    const xmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>PayloadContent</key>
        <array>
            <dict>
                <key>configName</key>
                <string>${configName}</string>
                <key>apn</key>
                <string>${apn}</string>
                <key>authType</key>
                <string>${authType}</string>
                <key>apnUsername</key>
                <string>${apnUsername}</string>
                <key>apnPassword</key>
                <string>${apnPassword}</string>
                <key>proxyServer</key>
                <string>${proxyServer}</string>
                <key>port</key>
                <integer>${port}</integer>
                <key>serverAddress</key>
                <string>${serverAddress}</string>
                <key>protocol</key>
                <string>${protocol}</string>
                <key>mcc</key>
                <string>${mcc}</string>
                <key>mnc</key>
                <string>${mnc}</string>
                <key>accessPointType</key>
                <string>${accessPointType}</string>
                <key>mmsServer</key>
                <string>${mmsServer}</string>
                <key>mmsProxy</key>
                <string>${mmsProxy}</string>
                <key>mmsPort</key>
                <integer>${mmsPort}</integer>
                <key>roamingProtocol</key>
                <string>${roamingProtocol}</string>
                <key>roamingAlwaysOn</key>
                ${roamingAlwaysOn ? '<true/>' : '<false/>'}
                <key>useAsDefault</key>
                ${useAsDefault ? '<true/>' : '<false/>'}
                <key>mvno</key>
                <string>${mvno}</string>
            </dict>
        </array>
        <key>PayloadDescription</key>
        <string>Configures APN settings.</string>
        <key>PayloadDisplayName</key>
        <string>APN Configuration</string>
        <key>PayloadIdentifier</key>
        <string>com.pugs.apnconfig</string>
        <key>PayloadOrganization</key>
	      <string>Mixtacy</string>
        <key>PayloadRemovalDisallowed</key>
	      <false/>
        <key>PayloadType</key>
        <string>Configuration</string>
        <key>PayloadUUID</key>
        <string>${uuidv4()}</string>
        <key>PayloadVersion</key>
        <integer>1</integer>
    </dict>
    </plist>
    `;

    // Set response headers to indicate XML content
    res.header('Content-Type', 'application/xml');

    // Send the generated XML content as the response
    res.send(xmlContent);
    console.log("Generated UUID:", uuidv4());
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
