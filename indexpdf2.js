const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract('pdf2[2].pdf', options, (err, data) => {
    if (err) return console.log(err);
    // console.log(JSON.stringify(data));
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
        if(checkPositionXandY(325,233,singleObject)){
            finalpdfObject.shipToStreet3=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(33.208,293,singleObject)){
            finalpdfObject.projectName=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(139.486,292.5,singleObject)){
            finalpdfObject.shippingDate=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(197.55599999999998,293,singleObject)){
            finalpdfObject.shippingDateString=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(277.052,293,singleObject)){
            finalpdfObject.F_O_B_F_A_B=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(318.496,293,singleObject)){
            finalpdfObject.shipTermsCondition=getStringFromObject(singleObject);
        }

        if(checkPositionXandY(425.776,293,singleObject)){
            finalpdfObject.noInv_N_fact=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(455.112,293,singleObject)){
            finalpdfObject.B_L_Conn=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(483.332,293,singleObject)){
            finalpdfObject.Inv_Req_Code_Fact=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(150.608,686.5,singleObject)){
            finalpdfObject.Prov_Tax_Take_Prov=getStringFromObject(singleObject);
        }
        if(checkPositionXandY(566.482,676.5,singleObject)){
            finalpdfObject.total=getStringFromObject(singleObject);
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

