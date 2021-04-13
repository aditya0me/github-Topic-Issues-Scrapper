const request = require("request") ;
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

console.log("hiiiiiiiiiiiiii");
let givenUrl = "https://github.com/Swordfish90/cool-retro-term/issues" ;
extractAllIssuesFromTheUrl(givenUrl);


function extractAllIssuesFromTheUrl(url){
    request(url,extractIssuesNameAndLink);
}

function extractIssuesNameAndLink(err,res,html){
    // console.log("inside fun");
    if(err){
        console.log("error happened in the file" , path.basename(__filename) );
        return;
    }
    // console.log("crossed if");
    let cheerioSelector = cheerio.load(html);

    let issuesElements = cheerioSelector(".js-navigation-container.js-active-navigation-container a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    console.log(issuesElements.length);
    let tableOfInfo = [];
    for(let i=0;i<issuesElements.length;i++){

        let issueName = cheerioSelector(issuesElements[i]).text()  ;
        let issueLink = cheerioSelector(issuesElements[i]).attr("href") ;
        tableOfInfo.push({
            Name: issueName,
            Link:issueLink
        });
    }

    console.table(tableOfInfo);
}   
