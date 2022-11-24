package com.example.dynamicschooltimetable;

import androidx.viewpager.widget.PagerAdapter;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;

import java.util.List;
//一个用来初始化翻页效果的工具类，入参一个ArrayList，自动注册页面的adapter
public class Adapter extends PagerAdapter {
    private List<View> viewList ;

    public Adapter(List<View> viewList) {
        this.viewList = viewList;
    }
    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        container.addView(viewList.get(position));
        return viewList.get(position);
    }
    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView(viewList.get(position));
    }
    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }
    @Override
    public int getCount() {
        return viewList.size();
    }
}