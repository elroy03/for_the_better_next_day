document.addEventListener("DOMContentLoaded", function() {
    buildCalendar();
});

var today = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
var date = new Date();  // @param 전역 변수, today의 Date를 세어주는 역할

/**
 * @brief   이전달 버튼 클릭
 */
function prevCalendar() {
    this.today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar();    // @param 전월 캘린더 출력 요청
}

/**
 * @brief   다음달 버튼 클릭
 */
function nextCalendar() {
    this.today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();    // @param 명월 캘린더 출력 요청
}

//체크
var LEC = 0;
var TASK = 0;

/**
 * @brief   캘린더 오픈
 * @details 날짜 값을 받아 캘린더 폼을 생성하고, 날짜값을 채워넣는다.
 */
function buildCalendar() {

    let doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let tbCalendar = document.querySelector(".scriptCalendar > tbody");


    document.getElementById("calYear").innerText = today.getFullYear();                                  // @param YYYY월
    document.getElementById("calMonth").innerText = autoLeftPad((today.getMonth() + 1), 2);   // @param MM월


    // @details 이전 캘린더의 출력결과가 남아있다면, 이전 캘린더를 삭제한다.
    while(tbCalendar.rows.length > 0) {
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    // @param 첫번째 개행
    let row = tbCalendar.insertRow();
    // @param 날짜가 표기될 열의 증가값
    let dom = 1;

    // @details 시작일의 요일값( doMonth.getDay() ) + 해당월의 전체일( lastDate.getDate())을  더해준 값에서
    //               7로 나눈값을 올림( Math.ceil() )하고 다시 시작일의 요일값( doMonth.getDay() )을 빼준다.
    let daysLength = (Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7) - doMonth.getDay();

    // @param 달력 출력
    // @details 시작값은 1일을 직접 지정하고 요일값( doMonth.getDay() )를 빼서 마이너스( - )로 for문을 시작한다.
    for(let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
        let column = row.insertCell();

        // @param 평일( 전월일과 익월일의 데이터 제외 )
        if(Math.sign(day) == 1 && lastDate.getDate() >= day) {

            // @param 평일 날짜 데이터 삽입
            column.innerText = autoLeftPad(day, 2);

            //강의 혹은 과제 데이터 삽입
            if(LEC == 1) {
                addLecture(doMonth, day, column);
            }
            if(TASK == 1) {
                addTask(doMonth, day, column);
            }
            //document.getElementsByClassName("ONLECTURE")[0].addEventListener("click", addLecture(doMonth, day, column));
            //document.getElementsByClassName("ONTASK")[0].addEventListener("click", addTask(doMonth, day, column));
            //addLecture(doMonth, day, column);
            //addTask(doMonth, day, column);

            // @param 일요일인 경우
            if(dom % 7 == 1) {
                column.style.color = "#FF4D4D";
            }

            // @param 토요일인 경우
            if(dom % 7 == 0) {
                column.style.color = "#4D4DFF";
                row = tbCalendar.insertRow();   // @param 토요일이 지나면 다시 가로 행을 한줄 추가한다.
            }

        }

        // @param 평일 전월일과 익월일의 데이터 날짜변경
        else {
            let exceptDay = new Date(doMonth.getFullYear(), doMonth.getMonth(), day);
            column.innerText = autoLeftPad(exceptDay.getDate(), 2);
            column.style.color = "#A9A9A9";
        }

        // @brief   전월, 명월 음영처리
        // @details 현재년과 선택 년도가 같은경우
        if(today.getFullYear() == date.getFullYear()) {

            // @details 현재월과 선택월이 같은경우
            if(today.getMonth() == date.getMonth()) {

                // @details 현재일보다 이전인 경우이면서 현재월에 포함되는 일인경우
                if(date.getDate() > day && Math.sign(day) == 1) {
                    column.style.backgroundColor = "#E5E5E5";
                }

                // @details 현재일보다 이후이면서 현재월에 포함되는 일인경우
                else if(date.getDate() < day && lastDate.getDate() >= day) {
                    column.style.backgroundColor = "#FFFFFF";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ calendarChoiceDay(this); }
                }

                // @details 현재일인 경우
                else if(date.getDate() == day) {
                    column.style.backgroundColor = "#FFFFE6";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ calendarChoiceDay(this); }
                }

            // @details 현재월보다 이전인경우
            } else if(today.getMonth() < date.getMonth()) {
                if(Math.sign(day) == 1 && day <= lastDate.getDate()) {
                    column.style.backgroundColor = "#E5E5E5";
                }
            }

            // @details 현재월보다 이후인경우
            else {
                if(Math.sign(day) == 1 && day <= lastDate.getDate()) {
                    column.style.backgroundColor = "#FFFFFF";
                    column.style.cursor = "pointer";
                    column.onclick = function(){ calendarChoiceDay(this); }
                }
            }
        }

        // @details 선택한년도가 현재년도보다 작은경우
        else if(today.getFullYear() < date.getFullYear()) {
            if(Math.sign(day) == 1 && day <= lastDate.getDate()) {
                column.style.backgroundColor = "#E5E5E5";
            }
        }

        // @details 선택한년도가 현재년도보다 큰경우
        else {
            if(Math.sign(day) == 1 && day <= lastDate.getDate()) {
                column.style.backgroundColor = "#FFFFFF";
                column.style.cursor = "pointer";
                column.onclick = function(){ calendarChoiceDay(this); }
            }
        }
        dom++;
    }
    
}
function ONLEC() {
    LEC = 1;
    TASK = 0;
    buildCalendar();
}
function ONTASK() {
    LEC = 0;
    TASK = 1;
    buildCalendar();
}
function TOGGLE() {
    LEC = 1;
    TASK = 1;
    buildCalendar();
}

/**
 * @brief   날짜 선택
 * @details 사용자가 선택한 날짜에 체크표시를 남긴다.
 */
function calendarChoiceDay(column) {

    // @param 기존 선택일이 존재하는 경우 기존 선택일의 표시형식을 초기화 한다.
    if(document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].style.backgroundColor = "#FFFFFF";
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }

    // @param 선택일 체크 표시
    column.style.backgroundColor = "#FF9999";
    // @param 선택일 클래스명 변경
    column.classList.add("choiceDay");
}

function addLecture(doMonth, day, column) { //강의들 추가
    var stringArr;
    var booleanCheck;
    for(i=0;i<lecString.length; i++) { //강의 이름들 모두 체크
        booleanCheck = false; //새롭게 p태그를 추가하는가?
        for(j=0;j<SC_lec[lecString[i]][0]["deadline"].length; j++){
            stringArr = SC_lec[lecString[i]][0]["deadline"][j].split('-'); //stringArr에는 년-월-일로 나뉘어 있으니 이를 잘라서 분석
            if(stringArr[1] == doMonth.getMonth()+1 && stringArr[2] == day) {
                if(booleanCheck === false) { //매 강의마다 1번만 추가하기 위해
                    var newP = document.createElement("p");
                    newP.id = 'LectureID';
                    newP.innerHTML = lecString[i] + ' ';
                    column.appendChild(newP);   
                    booleanCheck = true;
                }
                //circle 추가해 수강 여부 판단
                var circle = document.createElement("span");
                circle.id = 'LectureCircle';
                if(SC_lec[lecString[i]][0]["progress"][j] === "100%") { //강의 100% 수강 함
                    circle.style.backgroundColor = 'blue';
                }
                else if(SC_lec[lecString[i]][0]["progress"][j] === "0%") { //결석
                    circle.style.backgroundColor = 'red';
                }
                else {
                    circle.style.backgroundColor = 'gray';
                }
                newP.appendChild(circle);
            }
        }
    }
}

function addTask (doMonth, day, column) {
    var stringArr;
    for(i=0;i<lecString.length; i++) { //강의 이름들 모두 체크
        booleanCheck = false; //새롭게 p태그를 추가하는가?
        for(j=0;j<SC_task[lecString[i]][0]["deadline"].length; j++){
            stringArr = SC_task[lecString[i]][0]["deadline"][j].split('-'); //stringArr에는 년-월-일로 나뉘어 있으니 이를 잘라서 분석
            if(stringArr[1] == doMonth.getMonth()+1 && stringArr[2] == day) {
                var newDiv = document.createElement("div");
                newDiv.id = 'LectureID';
                newDiv.innerHTML = lecString[i] + ' ';
                column.appendChild(newDiv);   
                if(SC_task[lecString[i]][0]["submission"][j] === "제출 완료") { //과제 제출 O
                    newDiv.style.backgroundColor = '#AFC4E7';
                }
                else if(SC_task[lecString[i]][0]["submission"][j] === "미제출") { //제출X
                    newDiv.style.backgroundColor = '#FF7F7F';
                }
            }
        }
    }
}


/**
 * @brief   숫자 두자릿수( 00   ) 변경
 * @details 자릿수가 한지라인 ( 1, 2, 3등 )의 값을 10, 11, 12등과 같은 두자리수 형식으로 맞추기위해 0을 붙인다.
 * @param   num     앞에 0을 붙일 숫자 값
 * @param   digit   글자의 자릿수를 지정 ( 2자릿수인 경우 00, 3자릿수인 경우 000 … )
 */
function autoLeftPad(num, digit) {
    if(String(num).length < digit) {
        num = new Array(digit - String(num).length + 1).join("0") + num;
    }
    return num;
}

var lecString = ["웹프로그래밍기초및실습(대면+학습동영상)","컴퓨터구조(다)(학습동영상)","알고리즘(다)(학습동영상)","형식언어및오토마타(학습동영상)","컴퓨터네트워크(화상강의)","공공가치와리더십(학습동영상)","채플"];