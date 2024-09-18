# Jee Mains Marks Calculator (2024)
![tutorial gif](https://github.com/timepassuser/Jee-Mains-Marks-Calculator/blob/main/tutorial.gif)

## Usage
You can calculate your marks from your response sheet url. OR, by saving a copy of your responses as an html file, and uploading the file in the calculator.

## How it works
Upon clicking the "Get response sheet html and calculate score" button, a request is sent to a cors proxy to fetch the response sheet. The fetched content is then parsed to generate the result. The images links are inserted into the analysis tables for easy cross checking.

## Answerkeys
The answerkeys.js file contains answer keys as js objects

### Generating new answerkeys
To generate new answerkeys, use the parseAnswerKey function present in main.js. Run it when on the answer key page provided by NTA. It will provide you with a js object representing the answerkey. Place this object in answerkeys.js and update the getAnsKey function in main.js

## Proxies
proxies.js contains a proxy variable, you can change it however you will also need to modify fetchResponseSheet in main.js accordingly  
The currently in use proxy is https://github.com/timepassuser/corsproxy-worker, a cloudflare worker.

##### Hosted on https://timepassuser.github.io/Jee-Mains-Marks-Calculator/
