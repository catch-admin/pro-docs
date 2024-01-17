## 导入导出

导出导入功能在后台管理中是非常常见的，所以在 v0.0.2 版本开始，专业版本支持后台导入导出的功能。Excel 是基于 [Laravel Excel](https://docs.laravel-excel.com/3.1/getting-started/) 进行封装，便于用户使用，只需要几行代码便可以实现导入和导出。 首先我们先来看看导出。

## 导出

`CatchAdmin` 核心提供了一个抽象基础类，通过基础它，可以快捷实现导出，下面是一个用户导出的案例

```php
namespace Modules\User\Export;

// 该类就是基础核心类，通过集成它可以快速实现导出
use Catch\Support\Excel\Export;

class User extends Export
{
    // 这里需要设置导出的头信息
    protected array $header = [
        'id', '昵称', '邮箱', '创建时间'
    ];

    // 实现 array 方法，返回导出的数据
    public function array(): array
    {
        // TODO: Implement array() method.
        return \Modules\User\Models\User::query()
            ->select('id', 'username', 'email', 'created_at')
            ->without('roles')
            ->get([
                'id', 'username', 'email', 'created_at'
            ])->toArray();
    }
}
```

只需要轻松的几行代码，便可实现导出 Excel。这只是实现了导出类，那么如何使用呢? 也很简单，例如在 `UserController` 添加 export 方法，注入导出类

```php
public function export(\Modules\User\Export\User $export)
{
    return $export->download();
}
```

直接通过 `download` 方法实现 `excel` 的下载。这个看起来似乎还比较繁琐，每次都要写一个导出类。一般平时导出的需求没有这么复杂，那么有没有更加简便的方法?答案是有的。看下面的例子

```php
public function export()
{
    return User::query()
        ->select('id', 'username', 'email', 'created_at')
        ->without('roles')
        ->get()
        ->download(['id', '昵称', '邮箱', '创建时间']);
}
```

`CatchAdmin` 通过扩展 Collection 添加了 `download` 方法，这样就可以轻松实现无需编写导出类而实现导出 excel 的功能。

这个看起来似乎非常的不错，但是还不够好。如果你遇到非常耗时的任务该怎么办？你的 excel 导出几万条数据，并且里面有大量的计算查询，该怎么办呢？有人说，可以用 Laravel 的 queue 啊？但是你可以观察到
任务的耗时吗？状态呢？也没法集中管理。所以，在 `CatchAdmin` 中增加异步任务管理，还是上面的例子，将它变为异步任务

```php
<?php
namespace Modules\User\Export;

// 首先这里需要继承 AsyncTaskInterface 接口
use Catch\Contracts\AsyncTaskInterface;
use Catch\Support\Excel\Export;

// 然后引入 AsyncTaskInterface
use Modules\System\Support\Traits\AsyncTaskDispatch;

class User extends Export implements AsyncTaskInterface
{
    // 这里 use 它，这样任务就可以变成异步的了
    use AsyncTaskDispatch;

    protected array $header = [
        'id', '昵称', '邮箱', '创建时间'
    ];

    public function array(): array
    {
        // TODO: Implement array() method.
        return \Modules\User\Models\User::query()
            ->select('id', 'username', 'email', 'created_at')
            ->without('roles')
            ->get([
                'id', 'username', 'email', 'created_at'
            ])->toArray();
    }
}
```

好了，任务搞好了，再来看看控制器如何写

```php
/**
 * @return void
 */
public function export(\Modules\User\Export\User $export)
{
    // 控制器就更加简单了，直接 push 推送即可
    return $export->push();
}
```

这样任务就变成了异步任务。既然是异步任务，那么肯定需要执行。找到 `app/Console/Kernel.php`, 添加下面的任务即可

```php
protected function schedule(Schedule $schedule): void
{
    $schedule->command('async:task')->everyMinute();
}
```

任务的情况和具体信息，都可以在后台管理中的`系统管理/异步任务`列表中进行查看

## 导入

待补充
