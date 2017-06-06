# bilibili-Visualization
bilibili视频可视化工具

## How to use


[bookmarklet](https://h12345jack.github.io/bilibili-Visualization/)

! currently it works well in chrome 56, other browers are not tested. 

## Introduction

![](http://ww1.sinaimg.cn/mw690/006C73MUly1fd1sake0twj30zc0ox10k)

需要从以上红色3个位置读取数据，请保证其加载完成，另外由于xpath稍有不同，因此请保证为HTML5播放器

点击书签一次后，10s内完成可视化的图表，主要包括2个时间相关的图表，一些定类变量和数据详表。

![](http://ww1.sinaimg.cn/mw690/006C73MUly1fd1s72wh7qj310a0omjwg)

![](http://ww1.sinaimg.cn/mw690/006C73MUly1fd1s72opxrj30nf0k2mzp)

![](http://ww1.sinaimg.cn/mw690/006C73MUly1fd1s72rfqwj30xg0najwe)


## Todolist
- [x] 解决框无法使用的问题=>去掉JQuery,直接用B站的 => 使用antd + webpack
- [x] 避免出现多个vis按钮 => done
- [x] 避免多次点击无效的情况 => done
- [x] 出现错误时button不显示，将错误打印到控制态 => 出错refresh
- [x] 更友好的使用说明 => maybe more friendly
- [ ] 更多的视频相关元数据信息 => doing
- [ ] 双击跳转到指定视频页面位置 => doing
- [ ] 反向获取弹幕者id,及个人空间URL => doing

if you like it, star will help a lot.
