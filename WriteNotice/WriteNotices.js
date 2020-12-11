var User="elroy";

/* 초기 그룹 화면 구성 */
window.onload = function(){
    var name;
    console.log("find first group");
    for(var i=0; i<Data.user.length; i++){
        if(Data.user[i].Groups[0] !=null){
            name= Data.user[i].Groups[0];
            break;
        }
    }
    console.log("find it!");
    setting(name);
}

function setting(groupname){
    var Group_name = "ForCS3";  
    var group_num=0; // 현 그룹의 번호(Data의 users에서)
    var user_num =0; // 현 유저의 번호
    var number=0;    
    var num=0; // 현 그룹의 번호(Data의 groups에서)
    var n=0; // 현 그룹의 번호(Groups의 groups에서)

    if(groupname!=null){
        Group_name=groupname;
    }

    /* 기존 정보 없애기 */
    document.getElementById("groups").innerHTML=null;
    document.getElementById("groups").innerHTML="그룹";


    /* 유저가 가입한 그룹 찾기 */
    group_num=Data.user[user_num].Groups.length;
    var user_group = new Array();
    for(i=0; i<group_num; i++){
        user_group.push(Data.user[user_num].Groups[i]);
        if(Data.user[user_num].Groups[i] == Group_name){
            number = i;
        }
    }
    console.log("find Group");

    /* 유저가 가입한 그룹 표시(사이드바) */
    var groupList = document.createElement("ul");
    var parent=document.getElementById("groups");
    parent.appendChild(groupList);
    for(i=0;i<group_num;i++){
        var lis = document.createElement("a");
        lis.innerHTML = user_group[i];
        lis.style.margin="0px";
        lis.style.padding="5px 3px"
        lis.style.textAlign="center";
        if(user_group[i] == Group_name){
            lis.style.color="black";
        }
        lis.id = i;
        groupList.appendChild(lis);
    }
    console.log("side bar");

    var eventTarget = document.getElementsByTagName("a");
    for(var i=0; i<eventTarget.length;  i++){
        eventTarget[i].addEventListener("click",function(){
            var ns = this.id;
            Group_name=user_group[ns];
            if(Group_name!=null){
                console.log(Group_name+"clickeds");
                location.href="/IceFox/GroupNoticeBoard/GroupNoticeBoard.html";
            }
        });
    }
    console.log("side bar function");
}

/* 게시물 게시 동작 */
function PostIt(){
    var title = document.getElementById("input_title").value;
    var content = document.getElementById("input_content").value;
    var date = new Date();
    var id = "elroy";
    var TodayDate = date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate();
    if(title == ""){
        alert("제목을 입력해주세요.");
    }
    else if(content == ""){
        alert("내용을 입력해주세요.");
    }
    else{
        /* 게시물 등록 */
        var noticeplus = new Object();
        var num = Groups.groups[1].Notices.length;
        noticeplus = {Number: num, Title: title, Writer: id, Date: TodayDate,Content:content};
        alert("제목: " + title+ "\n내용 : "+ content);
        alert("새로운 게시물이 등록되었습니다!");
        location.href="/IceFox/GroupNoticeBoard/GroupNoticeBoard.html";
    }
}

