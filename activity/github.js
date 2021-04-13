const request = require("request") ;
const cheerio = require("cheerio");
const oneTopicTopXRepositories = require("./ExtractOneTopicTopXRepositories");
let url = "https://github.com/topics";

request(url,printTheRandomTopicsAndItsTopRepositories);

function printTheRandomTopicsAndItsTopRepositories(err,res,html){
    if(err){
        console.log("Error happppppppened878");
        console.log(err);
        return;
    }

    let cheerioSelector = cheerio.load(html);

    let threeRandomTopicsElement = cheerioSelector(".col-12.col-sm-6.col-md-4.mb-4"); 

    for(let i=0;i<threeRandomTopicsElement.length;i++){
        let urlOfTopicPage = cheerioSelector( cheerioSelector(threeRandomTopicsElement[i] ).find("a") ).attr("href");
        let fulllink = "https://github.com" + urlOfTopicPage;
        console.log(fulllink);
        oneTopicTopXRepositories.fn(fulllink);
    }

    // console.log(threeRandomTopicsElement.length);
}

