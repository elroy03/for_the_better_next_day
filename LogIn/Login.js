var CHECK; // 회원 확인 번호

/* 로그인 동작 */
function Login(){
    var form =document.logform;
    var id = document.getElementById("input_id").value;
    var pwd = document.getElementById("input_pwd").value;
    if(id ==""){
        alert("아이디를 입력하세요");
    }
    else if(pwd == ""){
        alert("비밀번호를 입력하세요");
    }
    else{
        checkUser(id,pwd);
        if(CHECK==0){
            alert("가입한 회원이 아닙니다.");
        }
        else if(CHECK==1){
            alert("비밀번호가 맞지 않습니다.");
        }
        else if(CHECK==2){
            /* 메인 화면으로 이동 */
            alert("login user data-> id : "+ id +" password : "+ pwd);
            goToMain();
        }
    }
}

/* 회원인지 확인(0: 존재X, 1: 비밀번호 다름, 2: 존재O) */
function checkUser(id, pwd){
    for(i=0; i<Data.user.length; i++){
        if(Data.user[i].ID == id){
            if(Data.user[i].Password == pwd){
                CHECK=2;
                break;
            }
            else{
                CHECK= 1;
                break;
            }
        }
        else if(i == Data.user.length -1){
            CHECK= 0;
            break;
        }
    }
}

/* 회원가입 창으로 이동 */
function goToSignup(){
    location.href="/IceFox/SignUp/Signup.html";
}

function goToMain(){
    location.href="/IceFox/GroupNoticeBoard/GroupNoticeBoard.html";
}