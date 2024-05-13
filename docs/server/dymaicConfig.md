# 动态配置

动态配置是框架自带配置一个扩展。动态配置主要为了满足一些修改配置比较频繁，解决一些动态变化的配置可以及时在业务中反映的问题。
在看过一些系统实现之后，发现他们有一个问题，就是无法将动态配置很好嵌入到系统中
:::tip
无法使用系统自带的 `config` 函数获取动态配置
:::
而是用类似 `Config::class` 类似的配置类获取，个人认为这增加了系统的复杂性。

在了解动态配置之前，先来看下框架自带配置是如何工作的。框架的配置文件一般都是放在根目录的 `config` 文件夹。例如 `database.php` 文件
要获取 `database.php` 的配置内容，需要这么使用

```php
config('database.xxxx')
```

看的出来，主要用 `.` 这个链接符深层次访问配置，为了不破坏这样的格式，动态配置的设计需要融入它

## 数据结构

```php
Schema::create('config', function (Blueprint $table) {
    $table->id();
    $table->string('key')->comment('配置的key');
    $table->string('value', 1000)->comment('配置的value');
});
```

## 示例

用一个七牛云参数配置为例， 例如前端的表单参数格式如下
:::tip
前端传递的参数没有做统一设计，因为变化实在太多，所以入库格式需要自己实现
:::

```javascript
{
  "driver": "qiniu",
  "access_key": "123",
  "secret_key": "123",
  "bucket": "123",
  "domain": "123123123"
}
```

### 后端实现

:::tip
注意不要照抄，实现过程各不相同，但最终的入库格式要保持一致，动态配置才可工作
:::

```php
public function store(Request $request)
{
    $driver = $request->get('driver');
    if (! $driver) {
        throw new FailedException('请先选择上传驱动');
    }

    $config['upload.driver'] = $driver;

    return $this->model->storeBy($config);
}

```

最终入库的形式将会是这样的
![CatchAdmin  动态配置 - Laravel Admin](/docs/assets/images/dymaicConfig.png)

### 动态加载

在数据正确入库之后，还要在框架启动的时候自动加载。专业版中，是在系统模块的服务提供者中实现的。为了提高框架的整体性能，这部分配置使用了缓存

```php
class SystemServiceProvider extends CatchModuleServiceProvider
{
    public function boot(): void
    {
        ## 从缓存中获取
        $systemConfig = Cache::get('system_config', []);

        ## 动态写入到框架的 config 配置中
        if ($systemConfig && is_array($systemConfig)) {
            foreach ($systemConfig as $k => $value) {
                app('config')->set($k, $value);
            }
        }
    }
}
```
