# 异步任务

很多时候，需要长时间后台任务。例如前面提到的导入导出，其中任务还需要一些可视化的数据，例如执行时长，记录任务出错，还有重试机制。CatchAdmin 后台提供了一个可视化界面，并且易于接入自己后台任务的功能，如下所示
![catchadmin 后台异步任务 Laravel Admin](https://image.catchadmin.com/20240516084032.png)
目前后台导入导出都可实现异步任务，那么该如何自己定义呢？

## 定义

需要实现自定义的后台异步任务，需要实现一个异步任务接口

```php
namespace Catch\Contracts;

interface AsyncTaskInterface
{
    /**
     * push task
     */
    public function push(): mixed;

    /**
     * run task
     */
    public function run(array $params): mixed;
}
```

## 表结构

```php
 Schema::create('async_task', function (Blueprint $table) {
    $table->id();
    $table->string('task')->comment('task任务对应的 class 名称');
    $table->string('params')->default('')->comment('任务所需参数');
    $table->integer('start_at')->default(0)->comment('开始时间');
    $table->tinyInteger('status')->default(1)->comment('状态:un_start=1,running=2,finished=3,error=4');
    $table->integer('time_taken')->default(0)->comment('运行耗时');
    $table->string('error')->default('')->comment('执行结果错误');
    $table->string('result')->default('')->comment('执行结果');
    $table->string('retry')->default(0)->comment('重试次数');
    $table->createdAt();
    $table->updatedAt();
    $table->deletedAt();
});
```

## 实现

```php
use Modules\System\Models\AsyncTask;

class AsyncTask implements AsyncTaskInterface
{
    public function push(): mixed
    {
        return app(AsyncTask::class)
            ->storeBy([
                'task' => get_called_class(),
                'params' => '', // 参数需要自定义实现
            ]);
    }



    public function run(array $params): mixed
    {
        // params 就是 push 进去的 params 参数

        // 自定义实现任务
    }
}
```

## 使用

在需要使用 `AsyncTask` 的地方，将任务推送到任务列表中

```php
$async = new AsyncTask()

$async->push()
```

## 执行

在 Laravel 中需要添加一个 `Schedule`，用来执行后台任务

```php
protected function schedule(Schedule $schedule): void
{
    $schedule->command('async:task')->everyMinute();
}
```
