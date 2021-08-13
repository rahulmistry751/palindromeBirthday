// Selectors
const dateInput=document.getElementById('date');
const show=document.getElementById('show');
const checkBtn=document.getElementById('check-btn');

// Event listeners
checkBtn.addEventListener("click",()=>{
    if(dateInput.value){
        show.innerHTML='<img src="del.svg" alt="">';
        // callBack will trigger after 2sec
        setTimeout(checkPalindrome, 2000);
        
    }
    else{
        //If input value is empty
        show.textContent="Please enter date";
    }
    
    
})
// Functions
function checkPalindrome(){
    // Split the input year-month-day into array
    let date=dateInput.value.split("-");
    // Save date in object
    let dateObj={
        "year":date[0],
        "month":date[1],
        "day":date[2],
    };
    let result=createDateFormats(dateObj);
    if(result[1]){      // Checks if birthday is palindrome or not
        show.textContent=`Yay! Your Birthday is a Palindrome in ${result[1]} format.`
    }
    else{
        checkNextPalindrome(result[0]);  // Looks for next palindrome birthdate
    }

}

function createDateFormats(date){
        // Creating different date formats
        //dd-mm-yyyy, mm-dd-yyyy, dd-mm-yy, mm-dd-yy
        let flag='';
        let year=date.year;
        let month=date.month;
        let day=date.day;
        let dd_mm_yyyy=day+month+year;
        let mm_dd_yyyy=month+day+year;
        let dd_mm_yy=day+month+(year.substring(2));
        let mm_dd_yy=month+day+year.substring(2);

        switch (true){
            case isPalindrome(dd_mm_yyyy):      
                flag=`${day}-${month}-${year}`;
                
                break;
            case isPalindrome(mm_dd_yyyy):
                flag=`${month}-${day}-${year}`;
                
                break;
            case isPalindrome(mm_dd_yy):
                flag=`${month}-${day}-${year.substring(2)}`;
                
                break;
            case isPalindrome(dd_mm_yy):
                flag=`${day}-${month}-${year.substring(2)}`;
                
                break;
        }
        return ([date,flag]);
    }

function isPalindrome(date){
    for(let i=0;i<Math.floor(date.length/2);i++){
        // Checks if 1-last, 2-secondlast and so on, index values are equal are not.
        if(date[i]!=date[date.length-(i+1)]){
            return false;
        }
            
    }
    return true;
}


function nextDate(date){
    let year=date.year;
    let month=date.month;
    let day=date.day;
    let newDay=Number(day)+1;
    let newMonth=Number(month);
    let newYear=Number(year);
    let monthDays=[30,28,31,30,31,30,31,31,30,31,30,31]; // Days in each month

    if(newMonth==2){    //Checks for leap year
        if(checkLeapYear(newYear)){
            if(newDay>29){
                newDay=1;
                newMonth++;
            }
            
        }
        else if(newDay>28){
            newDay=1;
            newMonth++;
        }
    }
    else{  
        //Checks if incremented day is greater than month's total days
        if(newDay>monthDays[newMonth-1]){   
            newDay=1;
            newMonth++;

        }

        else if(newMonth>12){
            newMonth=1;
            newDay=1;
            newYear++;

        }
    }

    if(newMonth<10){ 
        newMonth="0"+newMonth.toString();
    }
    if(newDay<10){
        newDay="0"+newDay.toString();
    }

    return{
        "year":newYear.toString(),
        "month":newMonth.toString(),
        "day":newDay.toString(),
    };
}
function checkLeapYear(year){
    if(year%400==0 && year%100!=0 || year%4==0){
        return true;
    }
    else{
        return false;
    }
}
function checkNextPalindrome(date){
    let result;let counter=1;
    let newDate=nextDate(date);
    while(true){
        
        result= createDateFormats(newDate);
        if(!result[1]){
            newDate=nextDate(result[0]);
            counter++;
        }
        else{
            show.textContent=`The next palindrome date is on ${result[1]}, you missed it by ${counter} days! 😔`
            break;
        }

    }
    
}