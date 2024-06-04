Cell phone API (pseudo frontend). Link to cell phone system: https://github.com/mykytamykhailenko/cell-phone-company

mvn package

java -jar <path_to_project>\target\cell-phone-0.0.1-SNAPSHOT.jar cells.CellPhoneApplication

To bypass CORS policy (Chrome's default installation location on Windows):<br> 
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
