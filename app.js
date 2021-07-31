// Selectors
const dateInput=document.getElementById('date');
const show=document.getElementById('show');
const checkBtn=document.getElementById('check-btn');

// Event listeners
checkBtn.addEventListener("click",()=>{
    if(dateInput.value){
        show.innerHTML='<img src="del.svg" alt="">';
        setTimeout(checkPalindrome, 2000);
        
    }
    else{
        show.textContent="Please enter date";
    }
    
    
})
// Functions
function checkPalindrome(){
    let date=[];let flag='';
    // remove - from the date format
    date=dateInput.value.split("-");
    //save month, year , day into seperate variables using index
    let year=date[0];
    let month=date[1];
    let day=date[2];
    let yyyy_mm_dd=year+month+day;
    let dd_mm_yyyy=day+month+year;
    let mm_dd_yy=month+day+year.substring(2);
    let m_dd_yyyy=Number(month)+day+year;
    //console.log(yyyy_mm_dd,dd_mm_yyyy,mm_dd_yy,m_dd_yyyy);
    // Check every formats palindrome
    switch (true){
        case isPalindrome(yyyy_mm_dd):      
            flag=`${year}-${month}-${day}`;
            //console.log(flag);
            break;
        case isPalindrome(dd_mm_yyyy):
            flag=`${day}-${month}-${year}`;
            //console.log(flag);
            break;
        case isPalindrome(mm_dd_yy):
            flag=`${month}-${day}-${year}`;
            //console.log(flag);
            break;
        case isPalindrome(m_dd_yyyy):
            flag=`${Number(month)}-${day}-${year}`;
            //console.log(flag);
            break;
    }
    //console.log(flag)
    checkFlag(flag);
}
function isPalindrome(str){
    
    for(let i=0;i<Math.floor(str.length/2);i++){
        // Checks if 1-last, 2-secondlast and so on index values are equal are not.
        if(str[i]!=str[str.length-(i+1)]){
        //console.log(str[i],str[str.length-(i+1)])
            return false;
        }
        
    }
    return true;
}
// Checks if any format raised a flag
function checkFlag(flag){
    if (flag){
        show.innerText=`Yaay!!! Your birth-date in format ${flag} is a palindrome`;
    }
    else{
        show.innerText="Your birthdate is not a palindrome!";
    }

}
