# Jsoup-Android-Timetable
这是一个兼容正方教务系统的网页解析器，用于开发安卓移动端的高校课程表，并用以实现类似超级课程表的效果
# Utils&Tools
Jsoup1.5.3,Android Studio 2020,htmlunit2.76.0,xml-apis1.4.0
# 开发要点
开发思路：该网页爬虫使用了jsoup中的一些API，形如javascript中的querySelector，对本地或者webview中的  
页面元素进行爬取，并编写形如ParseHtml的字符串工具类，将形如：   
<u class="title showJxbtkjl"data-jxb_id="xxx"...><font color="blue">高等数学<u  
    
这样的网页标签中的内容打包成数组，去重，规范化后，定义接口：NormalizeParams，在重写方法中定义有：  
                                                                           
void inCardParams(int weekDay,int startNo, int endNo,View v,Context c,String content,String classroom,String teacher);
                                                                           
在重写方法中，添加TextViews绘制卡片式课程表，并添加到ViewPager中。当然，这只是一个抽象思路，对于  
处理字符串的操作，我并没有使用高效的算法来增加效率，所以如果用的是老机型，我不能保证老机型的打开速度。  
并且，真正的实现代码远比这个复杂，现在的版本是v1.0的初代版本，实现了sqlite存储本地html的功能，目前  
webview抓取仍在开发中，在repository中，我会提供详细的实现代码。这是一个免费的开源项目，禁止用于盈利。   
                                                                           
# 项目中类目录如下(v1.0)
Adapter.java//用于适配手机翻页功能  
Dialogs.java//用于调出对话框以及UI交互  
ExplicitPage.java//用于配置显示课程表的主界面  
MainActivity.java//加载动画界面，也可以初始化数据  
NormalizeParams.java//接口类，重写绘制卡片  
ParseHtml.java,eachDay.java//字符串工具类，解析网页以及生成对象  
ResolveAndDrawImportedTable.java//定义卡片样式，重写接口并绘制课表  
SetSemeseterDates.java//计算当前日期，初始化ViewPager的日历  
SQLite.java//存储在本地的数据库类，非空时直接绘制卡片  
Transition.java//加载动画类，提供过渡动画   

# 2.0版本更新目录(v2.0)
准备了编译好的apk文件，可以直接安装执行
