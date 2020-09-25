const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract('pdf2.pdf', options, (err, data) => {
    if (err) return console.log(err);
    // console.log(JSON.stringify(data));
    parseData(data);
});

function parseData(pdfContent) {
    let pageContent = pdfContent.pages[0].content;
    let finalArray = [];
    finalArray.push(soldToField(pageContent)); //0index
    finalArray.push(shipToField(pageContent)); //0index
    finalArray.push(accountNO(pageContent[11])); //11index
    finalArray.push(shippingMethod(pageContent[12]));//12
    finalArray.push(salesRep(pageContent[13]));//13
    finalArray.push(jobName(pageContent[15]));//15
    finalArray.push(customerOrderNumber(pageContent[18]));//15
    finalArray.push(shipDate(pageContent[23]));//15
    finalArray.push(merchandise(pageContent[54]));
    finalArray.push(G_S_T_H_S_T(pageContent[55]));
    finalArray.push(transport(pageContent[56]));

    finalArray.push(Q_S_T_P_S_T(pageContent[57]));
    finalArray.push(totalDue(pageContent[53]));
    finalArray.push(serviceCharges(pageContent[66]));

    console.log("data: " + JSON.stringify({ finalArray }));
}

function soldToField(pageContent) {
    return {
        soldTo: getStringFromObject(pageContent[0]),
        street1: getStringFromObject(pageContent[4]),
        street2: getStringFromObject(pageContent[5]),
        street3: getStringFromObject(pageContent[6]),
    }
}

function shipToField(pageContent) {
    return {
        shipTo: getStringFromObject(pageContent[2]),
        street1: getStringFromObject(pageContent[7]),
        street2: getStringFromObject(pageContent[8]),
        street3: getStringFromObject(pageContent[9]),
    }
}
function accountNO(accountNumber) {
    return { accountNo: getStringFromObject(accountNumber) }
}
function shippingMethod(shippingMethod) {
    return { shippingMethod: getStringFromObject(shippingMethod) }
}
function salesRep(salesRep) {
    return { salesRep: getStringFromObject(salesRep) }
}
function jobName(jobName) {
    return { jobName: getStringFromObject(jobName) }
}
function customerOrderNumber(customerOrderNumber) {
    return { customerOrderNumber: getStringFromObject(customerOrderNumber) }
}
function shipDate(shipDate) {
    return { shipDate: getStringFromObject(shipDate) }
}

function merchandise(merchandise) {
    return { merchandise: getStringFromObject(merchandise) }
}
function G_S_T_H_S_T(G_S_T_H_S_T) {
    return { G_S_T_H_S_T: getStringFromObject(G_S_T_H_S_T) }
}

function transport(transport) {
    return { transport: getStringFromObject(transport) }
}
function Q_S_T_P_S_T(Q_S_T_P_S_T) {
    return { Q_S_T_P_S_T: getStringFromObject(Q_S_T_P_S_T) }
}

function totalDue(totalDue) {
    return { totalDue: getStringFromObject(totalDue) }
}
function serviceCharges(serviceCharges) {
    return { serviceCharges: getStringFromObject(serviceCharges) }
}

function getStringFromObject(pdfContentObject) {
    return pdfContentObject.str;
}




// const fs = require('fs');
// const pdf = require('pdf-parse');

// let dataBuffer = fs.readFileSync('pdf2.pdf');


// pdf(dataBuffer).then(function(data) {

//     // // number of pages
//     // console.log(data.numpages);
//     // // number of rendered pages
//     // console.log(data.numrender);
//     // // PDF info
//     // console.log(data.info);
//     // // PDF metadata
//     // console.log(data.metadata); 
//     // // PDF.js version
//     // // check https://mozilla.github.io/pdf.js/getting_started/
//     // console.log(data.version);
//     // PDF text
//     console.log(data.text); 

// });