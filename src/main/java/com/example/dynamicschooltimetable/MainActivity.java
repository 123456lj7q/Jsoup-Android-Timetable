package com.example.dynamicschooltimetable;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
//启动界面，自动跳转主界面
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Handler handler = new Handler();
        handler.post(()->{
            Intent intent = new Intent(this, ExplicitPage.class);
            startActivity(intent);
            finish();
        });
    }
}