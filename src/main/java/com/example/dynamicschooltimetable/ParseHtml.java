package com.example.dynamicschooltimetable;
import android.content.Context;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
public class ParseHtml {
    private static int[][] getDays = new int[7][1];
    public static int[][] getDays(){
        return getDays;
    }
    //字符串工具类，通过html标签来获取课表文件中的字符串
    //并将其打包成一个ArrayList,并传入绘制类中重写NormalizeParams方法
    //getDays是一个二维数组，遍历每一门课程的周数与星期数
        public static ArrayList<eachDay> getParsedList (InputStream stream) throws Exception {
            InputStream inputStream = stream;
            InputStreamReader reader = new InputStreamReader(inputStream);
            BufferedReader bufferedReader = new BufferedReader(reader);
            StringBuffer buffer = new StringBuffer("");
            String line;
            while((line=bufferedReader.readLine())!=null){
                buffer.append(line);
                buffer.append("\n");
            }
            line = buffer.toString();
            Document doc = Jsoup.parse(line);
            Element element = doc.select("#table1").select("tbody").first();
            Element ergodicElem;
            String name = "";
            String week = "";
            String number = "";
            String classroom="";
            String teacher="";
            ArrayList<eachDay> curriculumList = new ArrayList<>();
            for (Integer k = 1; k <= 7; k++) {
                int days = 0;
                eachDay day = new eachDay();
                for (Integer i = 1; i <= 13; i++) {
                    ergodicElem = element.select("#" + k + "-" + i).first();
                    if (ergodicElem == null) continue;
                    for (int p = 0; p < ergodicElem.childrenSize(); p++) {
                        name = ergodicElem.child(p).select(".title").text();
                        week = ergodicElem.child(p).select("p").first().text();
                        number = ergodicElem.child(p).select("p").first().text();
                        classroom = ergodicElem.child(p).select("p").next().first().text();
                        teacher = ergodicElem.child(p).select("p").next().next().first().text();
                        day.curriculums[days] = name;
                        day.classroom[days] = classroom;
                        day.teacher[days] = teacher;
                        formatWeek(week, day, days);
                        formatNumber(number, day, days);
                        days++;
                    }
                }
                curriculumList.add(day);
                getDays[k-1][0] = days;
            }
            return curriculumList;
        }
        //格式化上课的节数，比如1-3节,5-7节，其中20，21号下表用来存储这两个数，其余下标存储周数
        public static void formatNumber(String in,eachDay day, int p){
            StringBuffer cnt=new StringBuffer();
            int[] pair = new int[2];
            for(int i=0;in.charAt(i)!=')';i++){
                if(in.charAt(i)>='0'&&in.charAt(i)<='9'){
                    cnt.append(in.charAt(i));
                }else if(in.charAt(i)=='-'){
                    pair[0] = Integer.parseInt(cnt.toString());
                    cnt.setLength(0);
                }
            }
            pair[1] = Integer.parseInt(cnt.toString());
            day.week[p][20] = pair[0];
            day.week[p][21] = pair[1];
            System.gc();
        }
        //写入周数，比如1-5,7-10周有课，就将1,2,3,4,5,7,8,9,10这几个数传入数组
        public static void formatWeek(String in,eachDay day,int p) {
            int[] pair = new int[2];
            int cnt=0;
            StringBuffer s=new StringBuffer();
            StringBuffer pretreatment=new StringBuffer();
            in = in.substring(6);
            for (int i = 0; i < in.length(); i++){
                if((in.charAt(i)>='0'&&in.charAt(i)<='9')||in.charAt(i)=='-'||in.charAt(i)==','){
                    pretreatment.append(in.charAt(i));
                }
                if(i==in.length()-1) pretreatment.append(",");
            }
            in = pretreatment.toString();
            for (int i = 0; i < in.length(); i++) {
                if (in.charAt(i) >= '0' && in.charAt(i) <= '9') {
                    s.append(in.charAt(i));
                } else {
                    if (in.charAt(i) == '-') {
                        pair[0] = Integer.parseInt(s.toString());

                    } else if (in.charAt(i) == ',') {
                        pair[1] = Integer.parseInt(s.toString());
                        if(pair[0]!=0)for(int a=pair[0];a<=pair[1];a++) {
                            day.week[p][cnt] = a;
                            cnt++;
                        }
                        else {
                            day.week[p][cnt] = pair[1];
                            cnt++;
                        }
                    }
                    s.setLength(0);
                }
            }
            System.gc();
        }
    }
    //一个日期类，定义了课程名，教室地点，教室姓名，周数的信息
    class eachDay {
        String[] curriculums = new String[100];
        String[] classroom = new String[100];
        String[] teacher = new String[100];
        int[][] week = new int[100][22];
    }
