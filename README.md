# CellPhoneSys

## Description
Simple pseudo frontend for cell phone API. 
Link to cell phone company (system, backend): https://github.com/mykytamykhailenko/cell-phone-company
### Notes for run backend
docker run -p 9042:9042 --network host --name cassandra -v "[path to cell-phone-company project]\conf\cell-phone-company.cql:/home/' cassandra

## How run
1) mvn package
2) java -jar <path_to_project>\target\cell-phone-0.0.1-SNAPSHOT.jar cells.CellPhoneApplication
3) To bypass CORS policy (Chrome's default installation location on Windows):<br> 
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp

## Demo
Video on YouTube: [here](https://youtu.be/v3Mpv1pgglw)
