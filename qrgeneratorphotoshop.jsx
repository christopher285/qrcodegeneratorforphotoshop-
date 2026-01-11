#target photoshop

if (app.documents.length === 0) {
    alert("Please open a document first.");
    exit();
}

var targetDoc = app.activeDocument;

// Ask user
var qrText = prompt("Enter text or URL for the QR code:", "https://example.com");
if (!qrText) exit();

// QR settings
var size = 600;
var encodedText = encodeURIComponent(qrText);
var qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=" + size + "x" + size + "&data=" + encodedText;

// Temp file
var tempFile = new File(Folder.temp + "\\qr_code.png");
if (tempFile.exists) tempFile.remove();

// PowerShell download
var psCommand =
    'powershell -NoProfile -ExecutionPolicy Bypass -Command "' +
    'Invoke-WebRequest -Uri \'' + qrURL + '\' -OutFile \'' + tempFile.fsName + '\'' +
    '"';

app.system(psCommand);

if (!tempFile.exists) {
    alert("QR download failed.");
    exit();
}

// Open QR image
var qrDoc = app.open(tempFile);



// Activate target doc
app.activeDocument = targetDoc;

alert("QR code added successfully!");
