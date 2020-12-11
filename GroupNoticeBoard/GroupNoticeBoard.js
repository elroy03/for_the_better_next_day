var User = "elroy";

/* 초기 그룹 화면 구성 */
window.onload = function(){
    var Group_name = "ForCS3";  
    var group_num=0; // 현 그룹의 번호(Data의 users에서)
    var user_num =0; // 현 유저의 번호
    var number=0;
    var num=0; // 현 그룹의 번호(Data의 groups에서)
    var n=0; // 현 그룹의 번호(Groups의 groups에서)
    

    /* 유저의 위치 찾기 */
    for(i=0; i<Data.user.length; i++){
        if(Data.user[i].ID ==User){
            user_num=i;
            break;
        }
    }

    /* 유저가 가입한 그룹 찾기 */
    group_num=Data.user[user_num].Groups.length;
    var user_group = new Array();
    for(i=0; i<group_num; i++){
        user_group.push(Data.user[user_num].Groups[i]);
        if(Data.user[user_num].Groups[i] == Group_name){
            number = i;
        }
    }
    
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
        lis.addEventListener('click',function(){
            Group_name = user_group[i];
        });
        if(user_group[i] == Group_name){
            lis.style.color="black";
        }
        groupList.appendChild(lis);
    }

    /* 그룹 이미지 설정 */
    var group_img_src;
    for(i =0; i<Data.groups.length; i++){
        if(Data.groups[i].GroupName==Group_name){
            group_img_src=Data.groups[i].Image;
            num =i;
        }
    }
    document.getElementById("group_img").src=group_img_src;

    /* 그룹 이름 변경 */
    var parent = document.getElementById("group_name");
    var groupNa = document.createElement("h2");
    groupNa.innerHTML = Data.groups[num].GroupName;
    parent.appendChild(groupNa);
    parent.appendChild(document.createElement("hr"));

    /* 그룹 설명 변경 */
    var parent = document.getElementById("group_sum");
    var groupEx = document.createElement("p");
    groupEx.innerHTML = Data.groups[num].Explanation;
    parent.appendChild(groupEx);

    /* 그룹 게시물 불러오기 */
    for(i=0; i<Groups.groups.length;){
        if(Groups.groups[i].GroupName==Group_name){
            n=i;
            break;
        }
    }
    var parent = document.getElementById("list");
    for(i=0; i<Groups.groups[n].Notices.length; i++){
        /* 줄 추가 */
        var tr = document.createElement("tr");
        /* 번호 */
        var th_n = document.createElement("th");
        tr.appendChild(th_n);
        th_n.innerHTML=Groups.groups[n].Notices[i].Number;
        /* 제목 */
        var th_t = document.createElement("th");
        tr.appendChild(th_t);
        th_t.innerHTML=Groups.groups[n].Notices[i].Title;
        /* 작성자 */
        var th_w = document.createElement("th");
        tr.appendChild(th_w);
        th_w.innerHTML=Groups.groups[n].Notices[i].Writer;
        /* 시간 */
        var th_d = document.createElement("th");
        tr.appendChild(th_d);
        th_d.innerHTML=Groups.groups[n].Notices[i].Date;
        /* 최종 추가 */
        parent.appendChild(tr);
        tr.id=i;
    }
    var eventTarget = document.getElementsByTagName("tr");
    for(var i=1; i<eventTarget.length; i++){
        console.log(i);
        eventTarget[i].addEventListener("click",function(){
            var ns=this.id;
            lookNotice(Groups.groups[n].Notices[ns].Title,Groups.groups[n].Notices[ns].Writer,
                Groups.groups[n].Notices[ns].Date, Groups.groups[n].Notices[ns].Content);
            
        });
    }
}



/* 게시물 띄우기 */
function lookNotice(title,writer,date,content){
    var bg = document.getElementById("modal_content");
    var popup = document.getElementById("modal_wrapper");

    bg.style.filter="alpha(Opacity=50)";
    bg.style.display="";
    popup.style.display="";

     /* 제목 */
    var parent =document.getElementById("Notice_title")
    var not_t = document.createElement("h2");
    not_t.innerHTML=title;
    parent.appendChild(not_t);
    
    /* 작성자 */
    var parent =document.getElementById("Notice_writer");
    var not_w = document.createElement("span")
    not_w.innerHTML="작성자: "+writer;
    not_w.style.marginLeft="70%";
    parent.appendChild(not_w);

    /* 시간 */
    var parent =document.getElementById("Notice_date");
    var not_d = document.createElement("span")
    not_d.innerHTML="작성 날짜: "+date;
    not_d.style.marginLeft="70%";
    parent.appendChild(not_d);

    /* 내용 */
    var parent =document.getElementById("contents");
    var not_c = document.createElement("p")
    not_c.innerHTML=content;
    parent.appendChild(not_c);
}

function modalclose(){
    document.getElementById("modal_content").style.display = "none";
    document.getElementById("modal_wrapper").style.display="none";
    document.getElementById("Notice_writer").innerHTML=null;
    document.getElementById("Notice_date").innerHTML=null;
    document.getElementById("Notice_title").innerHTML=null;
    document.getElementById("contents").innerHTML=null;
}

function Write(){
    location.href="/IceFox/WriteNotice/WriteNotice.html";
}