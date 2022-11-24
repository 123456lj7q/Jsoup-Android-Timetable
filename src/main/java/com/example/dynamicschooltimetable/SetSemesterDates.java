package com.example.dynamicschooltimetable;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
//这是一个工具类,用于初始化viewPager的页面日期布局.
public class SetSemesterDates extends AppCompatActivity {
    private TextView textView;
    private char[] weekdays={'一','二','三','四','五','六','日'};
    private int[] dateInEachWeek = new int[8];
    private static Calendar calendar=Calendar.getInstance();
    private static Integer date = calendar.get(Calendar.YEAR);
    private static String currentDate = date + "-08-22";
    private static boolean isMonday = false;
    private static int todayOfWeek;
    private static String today;
    //用于初始化构造器传入的校历信息
    protected void initVariables() {
        try {
            calendar.setTime(new SimpleDateFormat("yyyy-MM-dd")
                    .parse(currentDate));
        }catch(Exception e){
            e.printStackTrace();
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        today = sdf.format(new Date());
        Calendar todayCalendar = Calendar.getInstance();
        todayCalendar.add(Calendar.DATE,-2);
        todayOfWeek = todayCalendar.get(Calendar.DAY_OF_WEEK);
        if(todayOfWeek==7) todayOfWeek=0;
    }
    //空构造器接口保留
    public SetSemesterDates(){
        initVariables();
    }
    //提供自定校历开始日期传参接口
    public SetSemesterDates(String firstSemesterDate){
        currentDate = firstSemesterDate;
        initVariables();
    }

    //传入非本类的context,由于viewPager不是contentView的子类,所以必须通过getIdentifier方法通过
    //ID获取subview,通过一个subview的ID对应一个星期填入的信息,包括dateInEachWeek数组的[0]为月份
    //[1]-[7]为计算出来的对应日期.计算的规则是:以九月份的第一个星期一开始,以静态变量设置接下来每一天的
    //日期,通过calendar类的方法计算出以如上为日期的每一天,按照ExplicitPage类中的for循环依次填入
    //subview的每一个日期,此注释用于维护setEachDate和calculateTitleDate方法.
    protected void setEachDate(View view,Context context,Integer week) {
        dateInEachWeek = calculateTitleDates();
        for (Integer i = 0; i <= 7; i++) {
            if (i == 0) {
                Integer month = dateInEachWeek[0];
                textView = view.findViewById(context.getResources()
                        .getIdentifier("month","id", context.getPackageName()));
                textView.setText(month.toString()+"\n月");
            } else {
                textView = view.findViewById(context.getResources()
                        .getIdentifier("day" + i.toString(), "id", context.getPackageName()));
            textView.setText(dateInEachWeek[i] + "\n" + weekdays[i - 1]);
            Integer month = dateInEachWeek[0];
            Integer day = dateInEachWeek[i];
            String s = ((Integer)calendar.get(Calendar.YEAR)).toString() + "-" + month;
            if(day>9)s+= "-" + day;
            else s+= "-0" + day;
            if(s.equals(today)) {
                textView.setBackgroundResource(R.color.grid_color2);
                textView.setTextColor(Color.rgb(255,255,255));
            }
        }
    }
    }
    protected int[] calculateTitleDates(){
        Calendar current = calendar,findMonday = calendar;
        for(int i=findMonday.get(Calendar.DATE);i<=findMonday.get(Calendar.DATE)+7;i++) {
            findMonday.set(Calendar.DAY_OF_MONTH, i);
            if (findMonday.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY) {
                dateInEachWeek[0] = calendar.get(Calendar.MONTH) + 1;
                isMonday = true;
                break;
            }
        }
        if (isMonday) {
            for (int j = 1; j <= 7; j++) {
                dateInEachWeek[j] = current.get(Calendar.DATE);
                current.add(Calendar.DATE, 1);
            }
        }
        calendar.add(Calendar.DATE,0);
        return dateInEachWeek;
    }
    //初始化今日与校历首日的周数差,并返回int型的周数用来定位viewPager的页数.
    //此注释用于维护getInitialWeek方法
    protected int getInitialWeek() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String s = sdf.format(new Date());
        Date dateStart = sdf.parse(currentDate);
        Date dateEnd = sdf.parse(s);
        long a = (dateEnd.getTime() - dateStart.getTime())/86400000/7;
        return (int)a;
    }
    //返回星期几的字符
    //此注释用于维护getWeekday方法
    protected char getWeekday(){
        return weekdays[todayOfWeek];
    }
    protected String getToday(){return today;}
}