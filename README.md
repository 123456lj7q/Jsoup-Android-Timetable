# Jsoup-Android-Timetable
这是一个兼容正方教务系统的网页解析器，用于开发安卓移动端的高校课程表，并用以实现类似超级课程表的效果
# 开发要点
开发思路：该网页爬虫使用了jsoup中的一些API，形如javascript中的querySelector，对本地或者webview中的
页面元素进行爬取，并编写形如ParseHtml的字符串工具类，将形如
"<p><u class=”title showJxbtkjl” data-jxb_id=”xxx”...><font color=”blue”>高等数学</font></u></p>"
的网页标签中的内容打包成数组，去重，规范化最后定义NormalizeParams
