package com.example.dynamicschooltimetable;
//一个动画过度类，用来遮挡在业务执行过程中可能存在的卡顿现象，以提供给用户更好的视觉效果
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LinearInterpolator;

import androidx.appcompat.app.AppCompatActivity;

public class Transition extends AppCompatActivity {
    protected static Transition transition = null;
    protected static Handler handler = new Handler();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.animation_loading_dialog);
        Animation animation = AnimationUtils.loadAnimation(this,R.anim.loading);
        animation.setInterpolator(new LinearInterpolator());
            findViewById(R.id.spin).startAnimation(animation);
        transition = this;
    }
}
