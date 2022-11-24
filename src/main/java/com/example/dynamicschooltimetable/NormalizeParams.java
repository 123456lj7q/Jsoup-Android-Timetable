package com.example.dynamicschooltimetable;

import android.content.Context;
import android.view.View;
import android.widget.TextView;

import java.util.List;

public interface NormalizeParams {
    void inCardParams(int weekDay,int startNo, int endNo,View v,Context c,String content,String classroom,String teacher);
}
