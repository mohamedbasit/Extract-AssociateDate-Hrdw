export class Employee {
    constructor(csvRow) {
        //this.id = csvRow["ID"]; No need
        this.win = csvRow["WIN"];
        this.lastName = csvRow["LAST_NAME"];
        this.firstName = csvRow["FIRST_NAME"];
        this.employeeCode = csvRow["EMPLOYEE_CODE"];
        this.employStatusCode = csvRow["EMPLOY_STATUS_CODE"];
        this.startDate = csvRow["START_DATE"];
        this.countryCode = csvRow["COUNTRY_CODE"];
        this.email = csvRow["EMAIL"];
        this.userName = csvRow["USER_NAME"];
        this.bannerText = csvRow["BANNER_TEXT"];
        this.payTypeCode = csvRow["PAY_TYPE_CODE"];
        this.payPlan = csvRow["PAY_PLAN"];
        this.payBandNbr = csvRow["PAY_BAND_NBR"];
        this.storeNbr = csvRow["STORE_NBR"];
        this.baseDivNbr = csvRow["BASE_DIV_NBR"];
        this.languageCode = csvRow["LANGUAGE_CODE"];
        this.prefFirstName = csvRow["PREF_FIRST_NAME"];
        this.prefLastName = csvRow["PREF_LAST_NAME"];
        this.ascUserId = csvRow["ASC_USERID"];
        this.shiftCode = csvRow["SHIFT_CODE"];
        this.terminationDate = csvRow["TERMINATION_DATE"];
        this.jobCode = csvRow["JOB_CODE"];
        this.deptNbr = csvRow["DEPT_NBR"];
        this.divNbr = csvRow["DIV_NBR"];
        this.jobTitle = csvRow["JOBTITLE"];
        this.jobDomain = csvRow["JOB_DOMAIN"];
        this.prmyInd = csvRow["PRMY_IND"];
        this.indicator = csvRow["INDICATOR"]; 
        /* 
        "I" - insert
        "U" - update
        "D" - delete
        "P" - processed
        */
    }
}