$(function(){
    $(".time-count").countdown({
       template:"<span>%d<br>天</span>" +
       "<span>%h<br>时</span>" +
       "<span>%i<br>分</span>" +
       "<span>%s<br>秒</span>",
        date:"2016-12-24 9:00"
    });
    var select="<option>0</option>" +
        "<option>1</option>"+
        "<option>2</option>"+
        "<option>3</option>"+
        "<option>4</option>"+
        "<option>5</option>";
    $(".student-num").append(select);

    $(".go-to-step2").click(function(){
        $('#my-tab li:eq(1) a').tab('show');
    });
    $(".go-to-step1").click(function(){
        $('#my-tab li:eq(0) a').tab('show');
    });
    $(".go-to-step3").click(function(){
        $('#my-tab li:eq(2) a').tab('show');
    });

    $(".student-num").change(getSelect);
});
window.onload=function(){
    var style="<style></style>";
    // $("iframe").contents().find("body").append(style);
};
function getSelect(){
    var price=[950,1950,3000,1900,3900,4900];
    var course=[];
    var courseText=[];
    course[0]=$("#course1").val();
    course[1]=$("#course2").val();
    course[2]=$("#course3").val();
    course[3]=$("#course4").val();
    course[4]=$("#course5").val();
    course[5]=$("#course6").val();
    course=course.map(function(x){
        return parseInt(x);
    })
    var countPrice=0;
    for(var i=0;i<course.length;i++){
        countPrice+=course[i]*price[i];
    }
    $(".price").html(countPrice);
    $("#step2 tbody").html("");
    if(countPrice!==0){
        $("#step2 tfoot").hide();
        $("#step2 .course-count").show();
        for(var i=0;i<course.length;i++){
            if(course[i]!==0){
                switch (i){
                    case 0:
                        courseText[i]='<tr>'+
                            '<td >优学名额'+
                            '</td>'+
                            '<td>1.原型设计 <br>'+
                            ' 2.用户体验研究方法'+
                            '</td>'+
                            '<td class="text-center">￥950 <br>'+
                            '   （限额40人）'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                    case 1:
                        courseText[i]='<tr>'+
                            '<td >优学名额'+
                            '</td>'+
                            '<td>1.原型设计 <br>'+
                            ' 2.用户体验研究方法 <br>'+
                            '3.名企职业发展，社交鸡尾酒会'+
                            '</td>'+
                            '<td class="text-center">￥1950 <br>'+
                            '   （限额10人）'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                    case 2:
                        courseText[i]='<tr>'+
                            '<td >优学名额'+
                            '</td>'+
                            '<td>1.原型设计 <br>'+
                            ' 2.用户体验研究方法 <br>'+
                                '3.名企职业发展，社交鸡尾酒会 <br>'+
                        '4.眼动仪与用户体验，虚拟现实'+
                            '</td>'+
                            '<td class="text-center">￥3000 <br>'+
                            '   （限额5人）'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                    case 3:
                        courseText[i]='<tr>'+
                            '<td >学员'+
                            '</td>'+
                            '<td>1.原型设计 <br>'+
                            ' 2.用户体验研究方法'+
                            '</td>'+
                            '<td class="text-center">￥1900'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                    case 4:
                        courseText[i]='<tr>'+
                            '<td >学员'+
                            '</td>'+
                            '<td>1.原型设计 <br>'+
                            ' 2.用户体验研究方法 <br>'+
                            '3.名企职业发展，社交鸡尾酒会'+
                            '</td>'+
                            '<td class="text-center">￥3900 '+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                    case 5:
                        courseText[i]='<tr>'+
                            '<td >学员'+
                            '</td>'+
                            '<td>1.原型设计 <br>'+
                            ' 2.用户体验研究方法 <br>'+
                            '3.名企职业发展，社交鸡尾酒会 <br>'+
                            '4.眼动仪与用户体验，虚拟现实'+
                            '</td>'+
                            '<td class="text-center">￥4900 <br>'+
                            '   （限额15人）'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                }
                $("#step2 tbody").append(courseText[i]);
            }
        }
    }else{
        $("#step2 tfoot").show();
        $("#step2 .course-count").hide();
    }
}