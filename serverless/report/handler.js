'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    try {
        let todayDate = new Date();
        let todayYear = todayDate.getFullYear();
        let todayMonth = ("0" + (todayDate.getMonth() + 1)).slice(-2);
        let todayDay = ("0" + todayDate.getDate()).slice(-2);
        // need to consider when scan is performed for the previous day if date alignment is critical
        let dateSubmitted = `${todayMonth}/${todayDay}/${todayYear}`;
        //performing scan
        let params = {
            TableName: 'expunge-survey-results',
            Limit: 1000
        };
        let result = await docClient.scan(params).promise();
        console.log('Query Success');
        let reportCsv = `Date Submitted,Did your arrest or charge take place in Colorado?,Were you over 18 at the time of the arrest or charge?,Was your case a federal case?,"Were you arrested, but not charged & seeking to seal arrest record only?",Were all charges in your case dismissed or were you acquitted?,What conviction are you looking to seal?,Have you completed all sentencing? ,What is the month & year you completed your sentencing/supervision?,"Have you paid all restitution, fines, court costs, late fees or other fees?",Have you attempted to seal your record for this conviction within the past 12 months?,Have you been convicted of or charged with another offense after the conviction you are trying to seal?,"Outcome (eligible, ineligible, needInfo) ",Reason for expungement? ,Race/ethnic background: Asian,Race/ethnic background: Black/African American ,Race/ethnic background: Hispanic/Latinx,Race/ethnic background: Middle Eastern or North Africa,Race/ethnic background: Native American or Alaska Native,Race/ethnic background: Native Hawaiian or Other Pacific Islander,Race/ethnic background: White,Race/ethnic background: Prefer not to answer,What is your age range?,What county in Colorado did your case take place in?,Emailing list\n`;
        result.Items.forEach(({coloradoArrest, over18, federalCase, sealingArrestRecordOnly, chargeDismissedOrAcquitted, chargeToSeal, completedSentencing, enoughTimePassed, paidRestitutionAndFees, attemptedToSeal, anyNewOffense, outcome, expungementReason, raceEthnicity, ageRange, countyInColorado, email, uuid}) => {
            reportCsv += dateSubmitted + ",";
            let raceEthnicityVal;
            switch (raceEthnicity) {
                case "Asian":
                    raceEthnicityVal = "Asian,,,,,,,,";
                    break;
                case "Black/African American":
                    raceEthnicityVal = ",Black/African American,,,,,,,";
                    break;
                case "Hispanic/Latinx":
                    raceEthnicityVal = ",,Hispanic/Latinx";
                    break;
                case "Middle Eastern or North Africa":
                    raceEthnicityVal = ",,,Middle Eastern or North Africa,,,,,";
                    break;
                case "Native American or Alaska Native":
                    raceEthnicityVal = ",,,,Native American or Alaska Native,,,,";
                    break;
                case "Native Hawaiian or Other Pacific Islander":
                    raceEthnicityVal = ",,,,,Native Hawaiian or Other Pacific Islander,,,";
                    break;
                case "White":
                    raceEthnicityVal = ",,,,,,White,,";
                    break;
                case "Prefer not to answer":
                    raceEthnicityVal = ",,,,,,,Prefer not to answer,";
                    break;
                default:
                    raceEthnicityVal = ",,,,,,,Prefer not to answer,";
            }
            let reportColVals = [coloradoArrest, over18, federalCase, sealingArrestRecordOnly, chargeDismissedOrAcquitted, chargeToSeal, completedSentencing, enoughTimePassed, paidRestitutionAndFees, attemptedToSeal, anyNewOffense, outcome, expungementReason, raceEthnicityVal, ageRange, countyInColorado, email, uuid];
            // NEED TO CONFIRM HOW TO HANDLE CHECKBOX RESPONSES (ex. expungementReason)
            // enoughTimePassed is also outputting dates instead of date results
            reportColVals.forEach((reportColVal)=>{
                reportCsv += (reportColVal ? reportColVal : "") + ",";
            })
            // for each field, append content + ','
            reportCsv += "\n";
        });
        console.log("this is the csv before write");
        console.log(reportCsv);
        let bucket = "cfdreportbucket";
        let timestamp = todayYear + todayMonth + todayDay + ("0" + todayDate.getHours() + 1 ).slice(-2) + ("0" + todayDate.getMinutes()).slice(-2) + ("0" + todayDate.getSeconds()).slice(-2);
        let key = `report${timestamp}.csv`;
        let s3Params = {
            Bucket : bucket,
            Key : key,
            Body : reportCsv,
            ContentType: 'text/csv'
        }
        try {
            let s3Response = await s3.upload(s3Params).promise();
            console.log('put success', s3Response.Location);
            // after we successfully write to s3, we want to clear out dynamodb
        } catch (e){
            console.error('s3 put failure. Error', e);
        }
        return {
            // headers,
            // statusCode: 200,
            // body: JSON.stringify({
            //     items: result.Items,
            //     lastItem: result.LastEvaluatedKey,
            // }),
        };
    } catch (ex) {
        console.error('Scan failure. Error:', ex);
        return {
            // headers,
            // statusCode: 500,
            // body: ex.message,
        };
    }
};