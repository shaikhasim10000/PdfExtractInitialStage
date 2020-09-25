const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract('pdf2[3].pdf', options, (err, data) => {
    if (err) return console.log(err);
    //console.log(JSON.stringify(data));
    parsePdfData(data);
});

function parsePdfData(pdfContent) {
    let pageContent = pdfContent.pages[0].content;
    let finalpdfObject={};
    pageContent.forEach(singleObject => {
        if(checkPositionXandY(67.5,202.5,singleObject)){
            finalpdfObject.soldTo=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(67.5,211.5,singleObject)){
            finalpdfObject.soldToStreet1=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(67.5,220.5,singleObject)){
            finalpdfObject.soldToStreet2=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(325,203,singleObject)){
            finalpdfObject.shipTo=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(325,213,singleObject)){
            finalpdfObject.shipToStreet1=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(325,223,singleObject)){
            finalpdfObject.shipToStreet2=getStringFromObject(singleObject);
        }

    });

    console.log(JSON.stringify(finalpdfObject));
}

function getStringFromObject(pdfContentObject) {
    return pdfContentObject.str;
}

function getXAxisFromObject(pdfContentObject) {
    return pdfContentObject.x;
}
function getYAxisFromObject(pdfContentObject) {
    return pdfContentObject.y;
}

function checkPositionXandY(x,y,pdfContentObject){
    if((getXAxisFromObject(pdfContentObject)==x) && (getYAxisFromObject(pdfContentObject)==y)){
        return true;
    }
    else{
        return false
    }

}

