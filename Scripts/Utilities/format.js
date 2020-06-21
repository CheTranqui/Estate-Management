function getDate(date){
    if (date == undefined){
        return date;
    }
    else{
        let myMonthText = "";
        let myYear = date.substring(0,4);
        let myMonth = parseInt(date.substring(5,7));
        switch(myMonth){
            case 1:
                myMonthText = "January";
                break;
            case 2:
                myMonthText = "February";
                break;
            case 3:
                myMonthText = "March";
                break;
            case 4:
                myMonthText = "April";
                break;
            case 5:
                myMonthText = "May";
                break;
            case 6:
                myMonthText = "June";
                break;
            case 7:
                myMonthText = "July";
                break;
            case 8:
                myMonthText = "August";
                break;
            case 9:
                myMonthText = "September";
                break;
            case 10:
                myMonthText = "October";
                break;
            case 11:
                myMonthText = "November";
                break;
            case 12:
                myMonthText = "December";
        }
        let myDay = date.substring(8,10);
        let myFormattedDate = myMonthText + " " + myDay + ", " + myYear;
        return myFormattedDate;
    }   
}

function formatCurrency(number){
    let myCurrency = Math.round(number).toString();
    let myShrinkingCurrency = myCurrency;
    let myFormattedCurrency = "";
    let myCounter = 0;
    for (let i = 0; i < myCurrency.length; i++){
        myNewCurrency = myShrinkingCurrency.substring(myShrinkingCurrency.length-1);
        myFormattedCurrency = myNewCurrency + myFormattedCurrency
        myShrinkingCurrency = myShrinkingCurrency.substring(-myShrinkingCurrency.length, myShrinkingCurrency.length-1)
        myCounter ++;

        if (myCounter > 0 && myCounter % 3 == 0){
            if (myShrinkingCurrency.length > 0){
                myFormattedCurrency = "," + myFormattedCurrency;
           }
        }
    }
    return "$"+myFormattedCurrency;
}

function countArrayLength(array, element){
    document.getElementById(element).innerHTML = "Total: " + array.length;
}

function getPropertyValue(){
    let myTotal = 0;
    for (let i = 0; i < myProperties.length; i++){
        if (myProperties[i].status == "Sold" && myProperties[i].offer != ""){
        myTotal += parseInt(myProperties[i].offer);
            }
        }
    return myTotal;
}

function getGoodsValue(){
    let myTotal = 0;
    for (let i = 0; i < myGoods.length; i++){
        if (myGoods[i].sold == true && myGoods[i].offer > 0){
        myTotal += parseInt(myGoods[i].offer);
        }
    }
    return myTotal;
}

function getTotalExpenses(){
    let myTotal = 0;
    for (i = 0; i < myExpenses.length; i++){
        myTotal += parseInt(myExpenses[i].amount);
    }
    return myTotal;
}