package com.example.dynamicschooltimetable;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentActivity;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.os.Handler;
import android.view.View;
import android.widget.AbsoluteLayout;
import android.widget.Button;

import java.io.File;
import java.util.ArrayList;

public class Dialogs{
    protected static boolean isRecreationCompleted=false;
    private static Handler handler = new Handler();
    //如果数据库表为空，调用这个方法
    protected void onDBEmptyDialog(Context c){
        AlertDialog dialog;
        AlertDialog.Builder builder = new AlertDialog.Builder(c)
        .setTitle("你还未导入课表！可以从本地导入，或定位到教务系统自动抓取")
        .setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {}
        });
        dialog = builder.create();
        dialog.show();
    }
    //一个组件注册方法，设置在页面上的按钮，拖动条等组件的监听器，包括有删除数据库监听器等
    public void registerAllComponents(ArrayList<View> list,ExplicitPage page) {
        Button button = page.findViewById(R.id.del);
        button.setOnClickListener(l->{
            Intent intent = new Intent(page, Transition.class);
            page.startActivity(intent);
            isRecreationCompleted = true;
            SQLiteDatabase database = page.openOrCreateDatabase("myDB", Context.MODE_PRIVATE, null);
            database.execSQL("delete from daily");
            database.execSQL("delete from classInfo");
            handler.postDelayed(()->{
                    for(int i=0;i<=20;i++){
                        AbsoluteLayout layout = list.get(i).findViewById(R.id.insert);
                        layout.removeView(page.findViewById(R.id.dynamicTextView));
                    }
                    page.recreate();
            },1000);
        });
    }
    //在删除或导入操作时，界面会出现卡顿，影响体验效果，这个类调用了一个handler延迟方法，在过渡页面需要关闭时关闭
    public static void finishTransition(){
        handler.post(()->{
            if(isRecreationCompleted) {
                Transition.transition.finish();
                isRecreationCompleted = false;
            }
        });
    }
}
