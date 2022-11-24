package com.example.dynamicschooltimetable;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.AbsoluteLayout;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TableRow;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
//一个显示具体课程表的类
public class ExplicitPage extends AppCompatActivity{
    private Adapter adapter;
    private SetSemesterDates setDates = new SetSemesterDates();
    private ResolveAndDrawImportedTable resolve = new ResolveAndDrawImportedTable();
    private ArrayList<View> list = new ArrayList<>();
    private Integer initWeek;
    private char weekday;
    private static ArrayList<eachDay> day;
    private Dialogs dialogs = new Dialogs();
    private InputStream inStream;
    private static Handler handler = new Handler();
    @SuppressLint("Range")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.transparent);
        Dialogs.finishTransition();
        SQLite sqLite = new SQLite(this);
        Cursor c = sqLite.getReadableDatabase().rawQuery("select* from classInfo",null);
        ViewPager pager = findViewById(R.id.vp);
        try {
            initWeek = setDates.getInitialWeek();
            weekday = setDates.getWeekday();
        }catch (Exception e){e.printStackTrace();}
        for (int i = 0; i <= 20; i++) {
            View v = LayoutInflater.from(this).inflate(R.layout.activity_explicit, null);
            resolve.addTableStroke(v,this);
            setDates.setEachDate(v, this, i);
            list.add(v);
        }
        adapter = new Adapter(list);
        pager.setAdapter(adapter);
        if(c.getCount()==0) {
            dialogs.onDBEmptyDialog(this);
        }
        else{
            initWithDB(sqLite,c);
        }
        //动态显示当前viewpager的周数，其为监听器
        pager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {}
            @Override
            public void onPageSelected(int position) {}
            @Override
            public void onPageScrollStateChanged(int state) {
                if (state == 2) {
                    Integer week = pager.getCurrentItem();
                    TextView textView = findViewById(R.id.currentWeek);
                    if (week == initWeek) textView.setText("第" + week + "周 星期" + weekday);
                    else textView.setText("第" + week + "周 非本周");
                }
            }
        });
        try {
            pager.setCurrentItem(initWeek);
            TextView textView = findViewById(R.id.currentWeek);
            textView.setText("第" + initWeek + "周 星期" + weekday);
            TextView textView1 = findViewById(R.id.currentDate);
            textView1.setText(setDates.getToday());
            dialogs.registerAllComponents(list,this);
            getLocalHtml();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //在数据库为空的时候，打开手机自带的文件管理器，选择html文件，转换成inputSteam,StringBuffer,toString
    protected void getLocalHtml(){
        Button button1 = findViewById(R.id.select);
        button1.setOnClickListener(l->{
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            intent.setType("*/*");
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            startActivityForResult(intent,1);
        });
    }
    //选择文件完成时的回调函数，如果未选择，则返回上个页面
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(data==null) return;
        Intent intent = new Intent(this, Transition.class);
        this.startActivity(intent);
        super.onActivityResult(requestCode, resultCode, data);
        handler.postDelayed(()->{
            Uri uri;
            if(data!=null) {
                uri = data.getData();
                try {
                    inStream = getContentResolver().openInputStream(uri);
                    initWithoutDB(list);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        },1000);
    }
    //回调函数执行时，调用准备好的inputStream传入ParseHtml类，得到一周七天的数组day,里面有课程名称，上课教室，老师姓名，以及一个二维数组用来存储星期几和周数
    protected void initWithoutDB(List<View> list) {
        try {
            day = ParseHtml.getParsedList(inStream);
            resolve.distinctDuplicatedCurriculums(day);
        } catch (Exception e) {
            e.printStackTrace();
        }
        for (int i = 0; i <= 20; i++) {
            resolve.addImportedCurriculums(i, this, list.get(i), day);
        }
        this.recreate();
        handler.post(()->{Transition.transition.finish();});
    }
    //读取数据库的信息，并传入重写方法中，直接绘制卡片，注意这是在数据库表非空的前提下实现的
    @SuppressLint("Range")
    protected void initWithDB(SQLite sqLite, Cursor c){
        Cursor c1 = sqLite.getReadableDatabase().rawQuery("select* from daily",null);
        c1.moveToFirst();
        c.moveToFirst();
        for(int i=0;i<=20;i++) {
            for(int j=0;j<(c1.getInt(c1.getColumnIndex("date")));j++){
                resolve.inCardParams(c.getInt(c.getColumnIndex("weekday")),
                        c.getInt(c.getColumnIndex("startNo")),
                        c.getInt(c.getColumnIndex("endNo")), list.get(i), this,
                        c.getString(c.getColumnIndex("name")),
                        c.getString(c.getColumnIndex("classroom")),
                        c.getString(c.getColumnIndex("teacher")));
                c.moveToNext();
            }
            c1.moveToNext();
        }
    }
}
