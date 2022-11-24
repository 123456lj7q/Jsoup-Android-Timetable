package com.example.dynamicschooltimetable;

import android.content.Context;
import android.content.res.Resources;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.TextUtils;
import android.view.View;
import android.widget.AbsoluteLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Random;

public class ResolveAndDrawImportedTable implements NormalizeParams {
    int[][] arr = ParseHtml.getDays();
    private static String[] distinctCurriculums;
    private static String[] distinctClassrooms;
    private static String[] distinctTea;
    private boolean isDBEmpty=false;
    static int a=0;
    static int b=0;
    //在TableRow中加入网格线
    protected void addTableStroke(View v,Context c){
        for(int i=1;i<=13;i++){
                TableRow tableRow = v.findViewById(c.getResources()
                        .getIdentifier("class_" + i,"id",c.getPackageName()));
            for(Integer j=1;j<=7;j++){
                TextView textView = new TextView(c);
                textView.setWidth(dp2px(45));
                textView.setHeight(dp2px(60));
                textView.setBackgroundResource(R.drawable.stroke);
                tableRow.addView(textView);
            }
        }
    }
    //从数据库中读取相关信息，包括课程名称等
    protected void addImportedCurriculums(int week,Context c,View v,ArrayList<eachDay> day){
        SQLite sqLite = new SQLite(c);
        Cursor cursor = sqLite.getReadableDatabase().rawQuery("select* from classInfo",null);
        if(cursor.getCount()==0) isDBEmpty=true;
        for (int weekday = 1; weekday <= 7; weekday++) {
            verifyNumbers(week,weekday,c,v,day);
        }
        if(isDBEmpty) {
            String writeSQL = "insert into daily(date) values('" + (a - b) + "')";
            SQLiteDatabase database = c.openOrCreateDatabase("myDB", Context.MODE_PRIVATE, null);
            database.execSQL(writeSQL);
            b = a;
        }

    }
    //在没有数据库表的时候绘制卡片
    protected void verifyNumbers(int week,int weekday,Context c,View v,ArrayList<eachDay> day){
        eachDay eachDay = day.get(weekday-1);
        for(int i=0;i<arr[weekday-1][0];i++){
            for(int j=1;j<=13;j++){
                if(j==eachDay.week[i][20]){
                    for(int k=0;eachDay.week[i][k]!=0&&k<=19;k++){
                        if(week==eachDay.week[i][k]){
                            a++;
                            inCardParams(weekday,eachDay.week[i][20],eachDay.week[i][21],v,c,eachDay.curriculums[i],eachDay.classroom[i],eachDay.teacher[i]);
                        }
                    }
                }
            }
        }
    }
    //去重课程名称，注意，【调】代表调课，属于两个不同的课程名称
    protected void distinctDuplicatedCurriculums(ArrayList<eachDay> list){
        String[] distinct = new String[100];
        String[] distinct1 = new String[100];
        String[] distinct2 = new String[100];
        String compare;
        String compareClassroom;
        String compareTeacher;
        eachDay eachDay;
        int cnt=0,cntRoom=0,cntTea=0;
        for(int i=0;i<list.size();i++){
            eachDay = list.get(i);
            for(int j=0;eachDay.curriculums[j]!=null;j++){
                compare = eachDay.curriculums[j];
                compareClassroom = eachDay.classroom[j];
                compareTeacher = eachDay.teacher[j];
                for(int k=0;k<100;k++){
                    if(!compare.equals(distinct[k])&&k==99){
                        if(compare.charAt(0)!='【') {
                            distinct[cnt] = compare.substring(0,compare.length()-1);
                            cnt++;
                        }else if(compare.charAt(0)=='【'){
                            distinct[cnt] = compare.substring(3,compare.length()-1);
                            cnt++;
                        }
                    }
                    if(!compareClassroom.equals(distinct1[k])&&k==99){
                        distinct1[cntRoom] = compareClassroom;
                        cntRoom++;
                    }
                    if(!compareTeacher.equals(distinct2[k])&&k==99){
                        distinct2[cntTea] = compareTeacher;
                        cntTea++;
                    }
                }
            }
        }
        distinctTea = distinct2;
        distinctClassrooms = distinct1;
        distinctCurriculums = distinct;
    }
    //这是一个核心方法，所有的课程卡片都依赖它完成绘制。入参主要有：星期几，决定了卡片的x轴坐标，比如星期一就是x*1
    //星期二就是x*2，以此类推。上课节数，为字符串"(1-2)节"类似的字样提取而来。下课节数，同上课节数。View视图参数,
    //提供20个星期中的一个星期的page,Context为每一个java文件的上下文内存地址，剩下三个字符串分别为：课程名称，
    //教室地址，教师姓名。需要注意的是，为了适应不同机型的分辨率，在进行布局和坐标设置以及尺寸设置时都需要采用
    //dp作为单位，而不是px，下方提供了dp到px的转换方法dp2px.
    @Override
    public void inCardParams(int weekDay,int startNo,int endNo,View v,Context c,String content,String classroom,String teacher) {
        if(isDBEmpty){
            String writeSQL = "insert into classInfo(weekday,startNo,endNo,name,classroom,teacher) values('"
                    +weekDay+"','"+startNo+"','"+endNo+"','"+content+"','"+classroom+"','"+teacher+"')";
            SQLiteDatabase database = c.openOrCreateDatabase("myDB",Context.MODE_PRIVATE,null);
            database.execSQL(writeSQL);
        }
        AbsoluteLayout layout =v.findViewById(R.id.insert);
        String s = content;
        float y;
        if(s.charAt(0)=='【') {
            s = s.substring(3,s.length()-1);
        }
        else {
            s = s.substring(0,s.length()-1);
        }
        TextView textView0 = new TextView(c);
        TextView view = new TextView(c);
        textView0.setX(dp2px(45.26f*weekDay+3f));
        view.setX(dp2px(45.26f*weekDay));
        if(startNo>5&&startNo<=9) {
            y = 106.5f+(startNo-1)*60+20;
            textView0.setY(dp2px(y+1));
            view.setY(dp2px(y));
        }
        else if(startNo>9){
            y = 106.5f+(startNo-1)*60+40;
            textView0.setY(dp2px(y+1));
            view.setY(dp2px(y));
        }
        else {
            y = 106.5f+(startNo-1)*60;
            textView0.setY(dp2px(y+1));
            view.setY(dp2px(y));
        }
        textView0.setWidth(dp2px(38));
        textView0.setHeight(dp2px(59*(endNo-startNo+1)-17));
        view.setWidth(dp2px(43));
        view.setHeight(dp2px(59*(endNo-startNo+1)));
        textView0.setText(new StringBuilder()
                .append(content).append("\n@")
                .append(classroom.substring(3)).toString());
        textView0.setTextSize(12);
        textView0.setTextColor(Color.WHITE);
        view.setBackgroundResource(R.drawable.grid_tint_color2);
        textView0.setTypeface(Typeface.defaultFromStyle(Typeface.BOLD));
        textView0.setLineSpacing(1,0.85f);
        textView0.post(()-> {
            float viewY;
            TextView tea = new TextView(c);
            tea.setX(textView0.getX()-dp2px(1.25f));
            tea.setWidth(dp2px(40));
            tea.setHeight(dp2px(14));
            viewY = textView0.getY()+textView0.getHeight();
            tea.setY(viewY);
            tea.setText(teacher);
            tea.setTextSize(10);
            tea.setTypeface(Typeface.defaultFromStyle(Typeface.BOLD));
            tea.setTextColor(Color.GRAY);
            tea.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
            tea.setBackgroundResource(R.drawable.grid_tint_color3);
            if(viewY<=view.getY()+view.getHeight()) layout.addView(tea);
        });
        view.setId(R.id.dynamicTextView);
        textView0.setId(R.id.dynamicTextView);
        layout.addView(view);
        layout.addView(textView0);
    }
    //从dp转换到px的方法
    protected static int dp2px(float dpValue) {
        float scale = Resources.getSystem().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    protected int px2dip(float pxValue) {
        float scale = Resources.getSystem().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }
}
