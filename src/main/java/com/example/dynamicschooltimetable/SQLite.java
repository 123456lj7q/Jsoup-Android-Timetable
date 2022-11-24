package com.example.dynamicschooltimetable;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import androidx.annotation.Nullable;
//数据库专用类，与mysql的语法相似，利用sql语句创建一个数据库，其中有两张表，一张记录要填入接口的参数，另一张记录每一个星期(page)有多少门课程
public class SQLite extends SQLiteOpenHelper {
    private Context context;
    private static final String createLayoutDB = "create table classInfo("+
            "id integer primary key autoincrement,"+
            "weekday integer,"+
            "startNo integer,"+
            "endNo integer,"+
            "name text,"+
            "classroom text,"+
            "teacher text)";
    private static final String dailyCurriculums = "create table daily("+"date integer)";
    public SQLite(Context context) {
        super(context,"myDB",null,1);
        this.context = context;
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL(dailyCurriculums);
        sqLiteDatabase.execSQL(createLayoutDB);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}
