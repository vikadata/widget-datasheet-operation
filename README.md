# 维格小程序 - 维格表编辑器

为了让你更容易理解小程序的 SDK 能力，我们提供了一个维格表编辑器小程序用于测试

## 快速开始

### 克隆工程到本地

```shell
git clone git@github.com:vikadata/widget-datasheet-operation.git
```

### 创建自建小程序

进去空间站，切换到「空间站自建」窗口，创建一个自建小程序

![空间站自建](/static/img/custom-widget.png)

![初始化小程序](/static/img/create-widget.png )

注意：如果是第一次开发，需要先执行以下命令：

```shell
npm install -g @vikadata/widget-cli
```

### 修改项目配置文件

1. 在「初始化」界面的命令中获取小程序唯一 ID（wpk开头） 和空间站 ID（spc开头）

![获取空间站id](/static/img/get-space-id.png)

![获取小程序id](/static/img/get-widget-id.png)

打开项目工程中的 `widget.config.json` 文件，将 packageId 和 spaceId 分别改为自己的小程序 ID 和空间站 ID

![widget-config](/static/img/widget-config.png)

2. 在根目录中创建 `.vika.yml` 文件，添加 API Token 和 host

![set-vika-yml](/static/img/set-vika-yml.png)

### 安装依赖库 

```shell
cd widget-datasheet-operation
npm install
```

### 进入开发模式

```shell
widget-cli start
```

## 示例结果

你可以在右侧的小程序面板上预览这个小程序，目前提供了 5 种编辑方式。你可以通过这几种编辑方式的代码调试熟悉维格表小程序的 SDK 能力

如果你在使用过程中有更好的想法或者建议，欢迎给项目仓库提交 PR，共同开发完善该小程序

![datasheet-operation](/static/img/datasheet-operation.png)

## 特性

### 已经实现的功能特性

- [x] 修改所选字段的属性配置
- [x] 修改所选字段的描述
- [x] 新增单个字段
- [x] 删除单个字段
- [x] 一键「新增/删除」多个字段

## 相关项目

- [awesome-vikadata](https://github.com/vikadata/awesome-vikadata)
