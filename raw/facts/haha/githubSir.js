//This is sir's code

const request = require("request") ;
const cheerio = require("cheerio");
let url = "https://github.com/topics";

request(url,topicExtractor);

function topicExtractor(err,res,html){
    if(err){
        console.log("Error happppppppened");
        return;
    }

    let cheerioSelector = cheerio.load(html);
    let topicBox = cheerioSelector(".container-lg.p-responsive.mt-6 ul li a"); 

    for(let i=0;i<topicBox.length;i++){
        let topicName = cheerioSelector(topicBox[i]).text().trim().split("\n")[0]  ;
        let linkOfTopic = cheerioSelector(topicBox[i]).attr("href");
        let fulllinkOfTopic = "https://github.com"+linkOfTopic;
        console.log(topicName,fulllinkOfTopic);
    }
}