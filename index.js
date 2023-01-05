// Your code here
const { interfaces } = require("mocha")

// Your code here
function createEmployeeRecord (arr) {
    const employeeRecord
     ={
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []

    }
    return employeeRecord
}

//get date

function createEmployeeRecords (arr){
    const newArr= []

    arr.forEach(ele => newArr.push(createEmployeeRecord(ele)))
    return newArr
}

function createTimeInEvent(employeeRecord,date){

    //console.log("this is the date argument", date)
    const dateSplit = date.split(' ');
    //console.log("this is the date",dateSplit[1])

    const timeInEventsObj= {
    type: "TimeIn",
    hour: parseInt(dateSplit[1]),
    date: dateSplit[0]
   }

   //console.log("this is the timeInEventsObj",timeInEventsObj)
    employeeRecord.timeInEvents.push(timeInEventsObj)
   
   return employeeRecord

}

function createTimeOutEvent(employeeRecord
    , date){
    //console.log("this is the date argument", date)
    const dateSplit = date.split(' ');
    //console.log("this is the date",dateSplit[1])

    const timeOutEventsObj= {
    type: "TimeOut",
    hour: parseInt(dateSplit[1]),
    date: dateSplit[0]
   }

   employeeRecord
   .timeOutEvents.push(timeOutEventsObj)
   
   return employeeRecord

}

function hoursWorkedOnDate(employeeRecordObj, date) {
    
    let hoursWroked = 0;

    const timeInArr = employeeRecordObj.timeInEvents;
    const timeOutArr = employeeRecordObj.timeOutEvents;
    //console.log("timeInArr",timeInArr)
    let hourIndex =0;
    for(let i=0; i<timeInArr.length; i++){
        if(timeInArr[i].date ===date){
            hourIndex = i;
        }

    }
 
    const timeInHr = timeInArr[hourIndex].hour
    //console.log("timeinHr",timeInHr)
    const timeOutHr = timeOutArr[hourIndex].hour
    //console.log("timeoutHr",timeOutHr)

    hoursWroked = (timeOutHr - timeInHr)/100

   
    return hoursWroked

}

function wagesEarnedOnDate(employeeRecordObj, date) {
   
    let payOwned;

    const payRate = employeeRecordObj.payPerHour

    payOwned = hoursWorkedOnDate(employeeRecordObj,date)*payRate
    
    return payOwned
}

function allWagesFor(employeeRecordObj) {
    //console.log("inside allWagesFor")
    //console.log("employeeRecordObj",employeeRecordObj)
    const timeInEventsArr = employeeRecordObj.timeInEvents;
    //console.log("timeInEventsArr",timeInEventsArr)


    let getDatesArr = timeInEventsArr.map(function(ele){
        return ele.date;
    })
    //console.log("getDatesArr", getDatesArr)
    
    let dateWages = getDatesArr.map(function(ele){
        return wagesEarnedOnDate(employeeRecordObj,ele)
    })
    //console.log("dateWages", dateWages)


    let payOwnedForAllDates = dateWages.reduce((x,y)=> x+y)
    //console.log("payOwnedForAllDates", payOwnedForAllDates)
   

    return payOwnedForAllDates
}

function  calculatePayroll(arrOfEmployeeRecords) {
    
    //console.log("inside calculatepPayroll")
    //console.log("arrOfEmployeeRecords",arrOfEmployeeRecords)
    
    const pay = arrOfEmployeeRecords.map(function(element){
        return allWagesFor(element);
    })

    const payroll =pay.reduce((x,y)=> x+y)
    
    return payroll;

}

