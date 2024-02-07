// This function is to be used in an answer key console to generate answers object from it
function parseAnswerKey() {
    anskey = {}
    rows = document.getElementsByClassName("form-options-item");
    for (let i = 0; i < rows.length; i++) {
        questionId = rows[i].children[1].innerText;
        correctOption = parseInt(rows[i].children[2].innerText);
        anskey[questionId] = correctOption
    }
    return anskey
}

function marksCalculator(responses, anskey) {
    correctIncorrect = {
        "MAc": 0,
        "MBc": 0,
        "PAc": 0,
        "PBc": 0,
        "CAc": 0,
        "CBc": 0,
        "MAi": 0,
        "MBi": 0,
        "PAi": 0,
        "PBi": 0,
        "CAi": 0,
        "CBi": 0
    }

    mathTable = document.getElementById("maths")
    phyTable = document.getElementById("physics")
    chemTable = document.getElementById("chem")
    subjectTables = {
        "MA": mathTable,
        "MB": mathTable,
        "PA": phyTable,
        "PB": phyTable,
        "CA": chemTable,
        "CB": chemTable
    }

    for (let questionId of Object.keys(anskey).sort()) {
        option = anskey[questionId]
        subjectTable = subjectTables[responses[questionId][1]]
        row = subjectTable.insertRow()
        row.insertCell().innerText = questionId
        // console.log(responses[questionId])
        if (responses[questionId]) {
            // console.log(responses[questionId])
            if (responses[questionId][0] === "NA") {
                console.log("Not attempted", responses[questionId])
                row.insertCell().innerText = responses[questionId][2] // type of question
                row.insertCell().innerText = "Not Attempted"
                row.insertCell().innerText = "NA"
            } else if (responses[questionId][0] === "MCQ") {
                // console.log(responses[questionId][2], responses[questionId][3], option)
                if (responses[questionId][2] === responses[questionId][3][option - 1]) { //correct
                    // console.log("CORRECT MCQ")
                    correctIncorrect[responses[questionId][1] + 'c'] += 1
                    row.insertCell().innerText = "MCQ"
                    row.insertCell().innerText = "Correct ✅"
                } else {
                    // console.log("incorrect mcq ", responses[questionId])
                    correctIncorrect[responses[questionId][1] + 'i'] += 1
                    row.insertCell().innerText = "MCQ"
                    row.insertCell().innerText = "Wrong ❌"
                }
                row.insertCell().innerText = responses[questionId][3][option - 1]

            } else if (responses[questionId][0] === "SA") {
                if (parseInt(responses[questionId][2]) === option) { //correct
                    correctIncorrect[responses[questionId][1] + 'c'] += 1
                    row.insertCell().innerText = "SA"
                    row.insertCell().innerText = "Correct ✅"
                } else {
                    // console.log(typeof(responses[questionId][2]), typeof(option))
                    correctIncorrect[responses[questionId][1] + 'i'] += 1
                    row.insertCell().innerText = "SA"
                    row.insertCell().innerText = "Wrong ❌"
                }
                row.insertCell().innerText = option
            }
        } else {
            console.log("WTF")
        }
    }
    console.log(correctIncorrect)
    mathAscore = correctIncorrect["MAc"] * 4 - correctIncorrect["MAi"]
    mathBscore = correctIncorrect["MBc"] * 4 - correctIncorrect["MBi"]
    phyAscore = correctIncorrect["PAc"] * 4 - correctIncorrect["PAi"]
    phyBscore = correctIncorrect["PBc"] * 4 - correctIncorrect["PBi"]
    chemAscore = correctIncorrect["CAc"] * 4 - correctIncorrect["CAi"]
    chemBscore = correctIncorrect["CBc"] * 4 - correctIncorrect["CBi"]
    totalScore = mathAscore + mathBscore + phyAscore + phyBscore + chemAscore + chemBscore
    console.log(mathAscore, mathBscore, phyAscore, phyBscore, chemAscore, chemBscore, totalScore)
    marksElement = document.getElementById("marks")
    marksElement.innerText = `Your total score is ${totalScore}\nMath section A score is ${mathAscore}\nMath section B score is ${mathBscore}\nPhysics section A score is ${phyAscore}\nPhysics section B score is ${phyBscore}\nChem section A score is ${chemAscore}\nChem section B score is ${chemBscore}`

    resultString = `\n
Maths section A no. of correct is ${correctIncorrect["MAc"]}
Maths section A no. of incorrect is ${correctIncorrect["MAi"]}
Maths section B no. of correct is ${correctIncorrect["MBc"]}
Maths section B no. of incorrect is ${correctIncorrect["MBi"]}
Physics section A no. of correct is ${correctIncorrect["PAc"]}
Physics section A no. of incorrect is ${correctIncorrect["PAi"]}
Physics section B no. of correct is ${correctIncorrect["PBc"]}
Physics section B no. of incorrect is ${correctIncorrect["PBi"]}
Chemistry section A no. of correct is ${correctIncorrect["CAc"]}
Chemistry section A no. of incorrect is ${correctIncorrect["CAi"]}
Chemistry section B no. of correct is ${correctIncorrect["CBc"]}
Chemistry section B no. of incorrect is ${correctIncorrect["CBi"]}
`;
    marksElement.innerText += resultString;
}


function getAnskey(responsecontent) {
    var e = document.createElement("html");
    e.innerHTML = responsecontent;
    table = e.getElementsByClassName("main-info-pnl")[0].children[2].children[0]
    date = table.children[3].children[1].innerText
    time = table.children[4].children[1].innerText

    if (time === "3:00 PM - 6:00 PM") {
        return {
            "27/01/2024": mains27janshift2anskey,
            "29/01/2024": mains29janshift2anskey,
            "30/01/2024": mains30janshift2anskey,
            "31/01/2024": mains31janshift2anskey,
            "01/02/2024": mains1febshift2anskey
        } [date]
    } else {
        return {
            "27/01/2024": mains27janshift1anskey,
            "29/01/2024": mains29janshift1anskey,
            "30/01/2024": mains30janshift1anskey,
            "31/01/2024": mains31janshift1anskey,
            "01/02/2024": mains1febshift1anskey
        } [date]
    }
}

function getResponses(responsecontent) {
    var e = document.createElement("html");
    e.innerHTML = responsecontent;
    menutbls = e.getElementsByClassName("menu-tbl");
    responses = {};
    for (let i = 0; i < menutbls.length; i++) {
        sectionText = menutbls[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].textContent

        section = null
        if (sectionText.includes("Mathematics Section A")) section = "MA";
        if (sectionText.includes("Mathematics Section B")) section = "MB";
        if (sectionText.includes("Physics Section A")) section = "PA";
        if (sectionText.includes("Physics Section B")) section = "PB";
        if (sectionText.includes("Chemistry Section A")) section = "CA";
        if (sectionText.includes("Chemistry Section B")) section = "CB";

        elementText = menutbls[i].children[0].textContent;
        var questionIdRegex = /Question\s*ID\s*:\s*(\d+)/;
        var questionIdMatch = elementText.match(questionIdRegex);
        questionId = questionIdMatch[1];

        // console.log(elementText)
        if (elementText.includes("Not Answered") || elementText.includes("Not Attempted")) {
            if (elementText.includes("MCQ")) {
                responses[questionId] = ["NA", section, "MCQ"]
            } else {
                responses[questionId] = ["NA", section, "SA"]
            }
        } else {
            if (elementText.includes("MCQ")) {
                var option1IdRegex = /Option\s*1\s*ID\s*:\s*(\d+)/;
                var option2IdRegex = /Option\s*2\s*ID\s*:\s*(\d+)/;
                var option3IdRegex = /Option\s*3\s*ID\s*:\s*(\d+)/;
                var option4IdRegex = /Option\s*4\s*ID\s*:\s*(\d+)/;
                var chosenOptionRegex = /Chosen\s*Option\s*:\s*(\d+)/;

                // var questionIdRegex = /Question\s*ID\s*:\s*(\d+)/;
                // var option1IdRegex = /Option\s*1\s*ID\s*:\s*(\d+)/;
                // var option2IdRegex = /Option\s*2\s*ID\s*:\s*(\d+)/;
                // var option3IdRegex = /Option\s*3\s*ID\s*:\s*(\d+)/;
                // var option4IdRegex = /Option\s*4\s*ID\s*:\s*(\d+)/;
                // var chosenOptionRegex = /Chosen\s*Option\s*:\s*(\d+)/;


                var option1IdMatch = elementText.match(option1IdRegex);
                var option2IdMatch = elementText.match(option2IdRegex);
                var option3IdMatch = elementText.match(option3IdRegex);
                var option4IdMatch = elementText.match(option4IdRegex);
                var chosenOptionMatch = elementText.match(chosenOptionRegex);
                optionIds = [option1IdMatch[1], option2IdMatch[1], option3IdMatch[1], option4IdMatch[1]]
                chosenOptionId = optionIds[parseInt(chosenOptionMatch[1]) - 1]
                responses[questionId] = ["MCQ", section, chosenOptionId, optionIds.sort()]

            } else {
                questiontbl = menutbls[i].parentElement.children[0]
                ansText = questiontbl.innerText;
                var ansRegex = /Given Answer\s*:\s*(\d+)/;
                var ansMatch = ansText.match(ansRegex);
                // console.log(ansText)
                ans = ansMatch[1];
                console.log("ans is ", ans)
                responses[questionId] = ["SA", section, ans];

            }
        }


        // responses[questionId] = [optionIdValue, optionIds]
        // console.log("hi", responses)
    }
    return responses
}


fileElement = document.getElementById("responsesheet")
fileElement.onchange = () => {
    responsesheet = responsesheet.files[0];
    if (responsesheet) {
        // console.log(responsesheet)
        var reader = new FileReader();
        reader.readAsText(responsesheet, "UTF-8");
        reader.onload = function(evt) {
            // console.log(evt.target.result);
            responsecontent = evt.target.result;
            responses = getResponses(responsecontent)
            console.log(responses)
            anskey = getAnskey(responsecontent)
            // console.log(anskey)
            marksCalculator(responses, anskey)
        }
        reader.onerror = function(evt) {
            console.log("error reading file");
        }
    } else {
        console.log("wtf")
    }
}