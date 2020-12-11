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

