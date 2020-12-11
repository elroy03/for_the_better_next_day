var CHECK; // 회원 확인 번호

/* 회원가입 동작 */
function Signup(){
    var id = document.getElementById("input_id").value;
    var pwd = document.getElementById("input_pwd").value;
    var pwdchk = document.getElementById("input_pwd_chk").value;
    var SCid = document.getElementById("input_scam_id").value;
    var SCpwd = document.getElementById("input_scam_pwd").value;
    var email = document.getElementById("input_email").value;

    if(id == ""){
        alert("아이디를 입력해주세요.");
    }
    else if(pwd == "" || pwdchk == ""){
        alert("비밀번호를 입력해주세요.");
    }
    else if(SCid == ""){
        alert("스마트 캠퍼스 아이디를 입력해주세요.");
    }
    else if(SCpwd == ""){
        alert("스마트 캠퍼스 비밀번호를 입력해주세요.");
    }
    else if(email == ""){
        alert("이메일을 입력해주세요.");
    }
    else if(pwd != pwdchk){
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요!");
    }
    else{
        checkAlreadyUser(id, SCid)
        if(CHECK==0){
            /* 회원 등록 */
            var userplus = new Object();
            userplus = {ID :id, Password:pwd, SmartCampusID:SCid, SmartCampuspwd:SCpwd, Email:email};
            alert("{\nID: " + id+ "\nPassword : "+ pwd+"\nSmartCampusIS : " +SCid+"\nSmartCampuspwd : "+SCpwd +"\nEmail : "+email+"\n}");
            alert("회원가입에 성공하셨습니다. 로그인해주세요!");
        }
        else if(CHECK==1){
            alert("이미 존재하는 ID입니다. 다른 ID를 사용해주세요.");
        }
        else{
            alert("이미 동일한 SmartCampus ID로 회원가입하셨습니다.");
        }
    }
}

/* 이미 가입된 회원인지 확인(0: 존재X, 1: ID같음, 2: SMART CAMPUS ID 같음) */
function checkAlreadyUser(id, SCid){
    for(i=0; i<Data.user.length; i++){
        if(Data.user[i].ID == id){
            CHECK=1;
            break;
        }
        else if(Data.user[i].SmartCampusID == SCid){
            CHECK=2;
            break;
        }
        else if(i == Data.user.length -1){
            CHECK= 0;
            break;
        }
    }
}

/* 로그인 창으로 이동 */
function goToLoginp(){
    location.href="/IceFox/LogIn/Login.html";
}