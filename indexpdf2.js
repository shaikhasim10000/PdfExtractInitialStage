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
    let finalpdfObject = {};
    getItems(pageContent);
    pageContent.forEach(singleObject => {
        if (checkPositionXandY(67.5, 202.5, singleObject)) {
            finalpdfObject.soldTo = getStringFromObject(singleObject);
        }
        if (checkPositionXandY(67.5, 211.5, singleObject)) {
            finalpdfObject.soldToStreet1 = getStringFromObject(singleObject);
        }
        if (checkPositionXandY(67.5, 220.5, singleObject)) {
            finalpdfObject.soldToStreet2 = getStringFromObject(singleObject);
        }
        if (checkPositionXandY(325, 203, singleObject)) {
            finalpdfObject.shipTo = getStringFromObject(singleObject);
        }
        if (checkPositionXandY(325, 213, singleObject)) {
            finalpdfObject.shipToStreet1 = getStringFromObject(singleObject);
        }
        if (checkPositionXandY(325, 223, singleObject)) {
            finalpdfObject.shipToStreet2 = getStringFromObject(singleObject);
        }

    });

    //console.log(JSON.stringify(finalpdfObject));
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

function checkPositionXandY(x, y, pdfContentObject) {
    if ((getXAxisFromObject(pdfContentObject) == x) && (getYAxisFromObject(pdfContentObject) == y)) {
        return true;
    }
    else {
        return false
    }

}

function getItems(pageContent) {
    let items = [];
    // console.log(pageContent);

    //getitems
    for (let i = 0; i < pageContent.length; i++) {
        //console.log(pageContent[i]);
        let singleObject = pageContent[i];
        if (checkPositionXandY(44.000000000000014, 345, singleObject)) {
            console.log('ppos find')
            items.push({ name: getStringFromObject(singleObject) })
            let index2 = i + 1;
            for (let j = index2; j < pageContent.length; j++) {
                let singleObject2 = pageContent[j];
                if ((getStringFromObject(singleObject2) == "TRACKING #") || (getStringFromObject(singleObject2) == "SUB TOTAL")) {
                    break;
                }
                items.push({ name: getStringFromObject(singleObject2) })
            }
        }

    }
    //getItem Article
    for (let i = 0; i < pageContent.length; i++) {

        if (((getStringFromObject(pageContent[i])) == "ITEM") && ((getStringFromObject(pageContent[i + 1])) == "ARTICLE")) {
            let index2 = i + 2;
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                // ((getStringFromObject(pageContent[i]))=="ITEM")
                let articleItem = getStringFromObject(pageContent[index2])
                if (typeof (parseInt(articleItem)) == "number") {
                    let currentItem = items[itemIndex];
                    currentItem.articleNumber = getStringFromObject(pageContent[index2]);
                }
                index2++;
            }
        }
    }


    //get  SHIPPED EXPÉDIÉ
    for (let i = 0; i < pageContent.length; i++) {
        if (((getStringFromObject(pageContent[i])) == "SHIPPED") && ((getStringFromObject(pageContent[i + 1])) == "EXPÉDIÉ")) {
            let index2 = i + 2;
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                // ((getStringFromObject(pageContent[i]))=="ITEM")
                let articleItem = getStringFromObject(pageContent[index2])
                if (typeof (parseInt(articleItem)) == "number") {
                    let currentItem = items[itemIndex];
                    currentItem.shippedExpedie = getStringFromObject(pageContent[index2]);
                }
                index2++;
            }
        }
    }


    //get  PRICE PRIX
    for (let i = 0; i < pageContent.length; i++) {
        if (((getStringFromObject(pageContent[i])) == "PRICE") && ((getStringFromObject(pageContent[i + 1])) == "PRIX")) {
            let index2 = i + 2;
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                let articleItem = getStringFromObject(pageContent[index2])
                if (typeof (parseFloat(articleItem)) == "number") {
                    let currentItem = items[itemIndex];
                    currentItem.PricePrix = getStringFromObject(pageContent[index2]);
                }
                index2++;
            }
        }
    }


    //get  AMOUNT MONTANT
    for (let i = 0; i < pageContent.length; i++) {
        if (((getStringFromObject(pageContent[i])) == "AMOUNT") && ((getStringFromObject(pageContent[i + 1])) == "MONTANT")) {
            let index2 = i + 2;
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                let articleItem = getStringFromObject(pageContent[index2])
                if (typeof (parseFloat(articleItem)) == "number") {
                    let currentItem = items[itemIndex];
                    currentItem.amountMontant = getStringFromObject(pageContent[index2]);
                }
                index2++;
            }
        }
    }

    //get  AMOUNT MONTANT
    for (let i = 0; i < pageContent.length; i++) {
        if (((getStringFromObject(pageContent[i])) == "AMOUNT") && ((getStringFromObject(pageContent[i + 1])) == "MONTANT")) {
            let index2 = i + 2;
            for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                let articleItem = getStringFromObject(pageContent[index2])
                if (typeof (parseFloat(articleItem)) == "number") {
                    let currentItem = items[itemIndex];
                    currentItem.amountMontant = getStringFromObject(pageContent[index2]);
                }
                index2++;
            }
        }
    }

    console.log(items);

}

