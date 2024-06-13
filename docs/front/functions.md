# 常用函数集合

前端项目提供了非常多的常用函数，在文件 `src/support/helper.ts` 中

## 获取环境变量

```javascript
env(key: string)
```

## 获取当前的登录 token

```javascript
getAuthToken()
```

## 判断是否是 Undefined

```javascript
isUndefined(value: any)
```

## 判断是否是方法

```javascript
isFunction(value: any)
```

## 获取项目的 base url

```javascript
getBaseUrl()
```

## 是否是 boolean

```javascript
isBoolean(value: any)
```

## 判断是否是数字

```javascript
isNumber(value: any)
```

## 首字母大写

```javascript
ucfirst(str: string)
```

## 首字母小写

```javascript
lcfirst(str: string)
```

## 随机字符串

```javascript
randomString(number)
```

## 生成文件名

```javascript
generateFilename(filename: string)
```

## 数组去重

```javascript
unique(arr: Array<any>)
```

## 是否是生产环境

```javascript
isProd()
```

## 获取文件扩展

```javascript
getFileExt(file: string)
```

## 获取文件名

```javascript
getFilename(file: string)
```

## 日期格式化函数

将时间戳转化成日期函数

```javascript
date(fommat: string, timestamp: number)
```
