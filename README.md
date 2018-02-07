# LDSmart-2.0

> A Vue.js project

## 项目的目录说明：
common:时空分析5个主题 公用的 组件 及js库(自定义的方式)
data:各个场景的数据配置文件
dist:wepback编译后的输出文件
imgs:场景共用的 图片资源
css:scss文件的输出目录
lib:全局共用的第三方js库（手工下载copy到该目录）
node_modules:npm管理的第三方
scene-index:场景 私有的 组件
index.html:时空分析入口首页
webpack.config.js:webpack的配置文件(详情请阅读webpack的使用文档)

## sass目录文件说明：
scss目录： 样式目录，编译后的文件输出到css文件中
_normalize.scss：页面标签样式重置scss文件
_base.scss: 页面间共享的常用样式，比如公用函数，公用变量以及清除浮动等
scene-index.scss：只在scene-index页面中使用的scss，其他页面同理（其他页面的scss需自己根据主题新建）。
### scss的编译
 >参考文章：http://www.imooc.com/article/19624

### css命名规则
采用OOCSS+BEM命名方式
OOCSS的使用参考（可解决组件库样式复用的问题）：https://www.w3cplus.com/css/oocss-concept
>BEM命名规则：http://getbem.com/naming/ 
>了解BEM:https://www.w3cplus.com/css/bem-definitions.html
>BEM常见疑问解答：https://www.w3cplus.com/css/battling-bem-extended-edition-common-problems-and-how-to-avoid-them.html


## 使用步骤：
1.安装node6.0 及以上版本(node配套了npm工具)
2.设置npm工具(本地安装与全局安装的区别,nodejs的安装的根目录 新建node_cache和node_global两个目录)
https://www.cnblogs.com/fisheleven/p/6775380.html?utm_source=itdadao&utm_medium=referral 对这个两个目录的说明
3.安装Python2.7 并设置环境变量Path.(项目中的node-sass 需要使用Python2.7去编译)
### 设置 npm install  局部的安装的路径
> npm config set cache "E:\Program Files\nodejs\node_cache"  
### 设置 npm install -g 全局模块的路径（可以在命令行中使用）
> npm config set prefix "E:\Program Files\nodejs\node_global"
### 设置环境变量
> NODE_PATH = XXX\Node\nodejs
> PATH = %NODE_PATH%\;%NODE_PATH%\node_modules;%NODE_PATH%\node_global;
### 设置npm的包的镜像地址(注意配置电脑显示隐藏的文件)
编辑.npmrc 加入下面内容 在 C:\Users\Administrator目录下
> registry = https://registry.npm.taobao.org

## 构建及运行步骤

``` bash
# 安装项目依赖的第三方库会产生 node_modules目录，把该目录不要添加到SVN的追踪
npm install

# 编译并启动项目
npm run dev

#打包项目
npm run build

```

## 开发过程常用命令

``` bash
# 安装项目 需要的第三方库
npm install jQuery --save

#安装开发 需要的依赖工具
npm install webpack-dev-server -D

```




