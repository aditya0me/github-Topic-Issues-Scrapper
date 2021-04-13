const request = require("request") ;
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function printTheTopicNameFollwingWhichTopEightRepoLink(urlOfTopic){
    request(urlOfTopic, cbForPrintingTopicNameWithRepositories);
}


function createDirectory(pathOfDir){
    if(fs.existsSync(pathOfDir) == false ){
        fs.mkdirSync(pathOfDir);
    }
}

function createFile(pathOfFile){
    if(fs.existsSync()==false){
        fs.openSync(pathOfFile,"w"); //The w flag is given in the second argument is to open the file in write mode , and what it helps is if the file dont exist it creates a file
    }
}


function cbForPrintingTopicNameWithRepositories(err,res,html){
    if(err){
        console.log("Error happppppppened in oneTopicTopRepositories.js file");
        return;
    }

    let cheerioSelector = cheerio.load(html);

    let topicName = cheerioSelector(".h1-mktg").text().trim(); 
    console.log(topicName);

    //sir current directory re hin topic 3 taa ra folder baneidauchanti. But mu ethi kn karichi ki jau topic ra 3 ta folder baniba seta current directory re gote "Organized" folder baniba, taa bhitare 3 ta topic ra folder baniba so bhalase tike organize haba, taa age se organized folder taa ku banei baku padiba. taa pare jai taa bhitare topic ra folder bani pariba 
    if(!fs.existsSync("./Organized")){
        fs.mkdirSync("./Organized");
    }
    
    let organizedDirectoryPath =  path.join(__dirname, "Organized");
    createDirectory(organizedDirectoryPath);

    let directoryPathToBeCreatedForTopic =  path.join( organizedDirectoryPath ,topicName ) ;
    createDirectory(directoryPathToBeCreatedForTopic);


    let topRepositoriesElement = cheerioSelector(".col-md-8.col-lg-9 a.text-bold");
    for(let i=0;i<3;i++){
        
        let linkOfTheRepositoryInTheWebPage = cheerioSelector(topRepositoriesElement[i]).attr("href");
        let nameOfTheRepository = linkOfTheRepositoryInTheWebPage.trim().split("/").pop();
        console.log(nameOfTheRepository
            
            
            );
        let pathForTheRepositoryFile = path.join( directoryPathToBeCreatedForTopic,nameOfTheRepository+".json") ;
        
        createFile(pathForTheRepositoryFile);
        
        let fulllinkOfTheRepositoryInTheWebPage = "https://github.com"+linkOfTheRepositoryInTheWebPage; //whcih will be appended with "/issues" to get the issue page of the repositoty
        
        let issuePageLinkForCurrentRepo = fulllinkOfTheRepositoryInTheWebPage + "/issues"; // A demo value for the variable will be like "https://github.com/Swordfish90/cool-retro-term/issues"
    
        getIssueData(issuePageLinkForCurrentRepo,pathForTheRepositoryFile);
    }

    console.log("``````````````````````````````````");
}


function getIssueData(linkOfIssuePage,pathForTheRepositoryFile){
    request(linkOfIssuePage,cbForIssuePage);

    function cbForIssuePage(err,res,html){
        if(err){
            console.log(err);
        }
        else{
            extractIssue(html);
        }
    }

    function extractIssue(htmlInStringForm){
        let cheerioSelector = cheerio.load(htmlInStringForm);

        let storeForTheIssueNameAndLink = [];
        let issueElementArr = cheerioSelector("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        for(let i=0;i<issueElementArr.length;i++){
            let Ilink = cheerioSelector(issueElementArr[i]).attr("href");
            let IName= cheerioSelector(issueElementArr[i]).text();
            let fullIlink = "https://github.com"+Ilink;
            let tempIssueObject = {
                Name: IName,
                Link: fullIlink
            };
            storeForTheIssueNameAndLink.push(tempIssueObject);
        }

        //console.table(storeForTheIssueNameAndLink);
        fs.writeFileSync(pathForTheRepositoryFile,JSON.stringify(storeForTheIssueNameAndLink));
    }
}

module.exports={
    fn:printTheTopicNameFollwingWhichTopEightRepoLink
};