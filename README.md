# 维格小程序 - 维格表编辑器

为了让你更容易理解小程序的 SDK 能力，我们提供了一个维格表编辑器小程序用于测试

## 功能说明

**修改字段属性**

修改字段的属性配置，不同类型的字段有不同的属性配置。 比如我们可以修改「文本」字段的默认值（ defaultValue ）

返回 `null` 则代表这个字段没有属性配置。 具体可参阅 [FieldType](https://vika.cn/developers/widget/api-reference/enums/interface_field_types.FieldType/)

![edit-field-property](/static/img/edit-field-property.png)

**修改字段描述**

通过 `description` 比如修改首列描述为「描述详情！」

![edit-description](/static/img/edit-description.png)

**新增字段**

此方式可以根据预先编辑好的字段配置生成新的字段

比如配置以下参数，可以生成一列保留 3 位小数的「数字」列

![add-field](/static/img/add-field.gif)

有关新增字段属性值写入格式，请参阅 [FieldType](https://vika.cn/developers/widget/api-reference/enums/interface_field_types.FieldType)

**删除字段**

此方式可以用于删除除首列外的维格列

在下拉列表中选择对应列，勾选「直接删除/保留关联表的对应字段」即可

![delete-field](/static/img/delete-field.gif)

**Field 一键操作**

此方式可以按需批量新增/删除列

- 如果你选择「一键新增字段」，编辑器内容将初始化为维格表除「神奇关联」「神奇引用」外的所有字段类型（21 种）
- 如果你选择「一键删除字段」，编辑器内容将初始化为当前视图下所有字段

![add-or-delete-all](/static/img/add-or-delete-all.gif)

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
