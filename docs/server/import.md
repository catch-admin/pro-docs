# 导入

导入在后台管理中也算是比较常见的功能。`CatchAdmin` 也自带导入的功能，基于 `Laravel-Excel` 封装了一个非常好用的导入器。只需要几行代码就可以完成导入的功能。下面基于导入用户来说明。

:::tip
本案例代码都写在了用户模块的 UserController 中
:::

## 用户导入器

首先我们要先实现一个导入器，非常简单

```php
// excel 格式如下
id 昵称 邮箱 密码
1 test tests@admin.com 123456
2 tests test@admin.com 123456
```

```php
namespace Modules\User\Import;

use Catch\Support\Excel\Import;
use Illuminate\Support\Collection;
use Modules\User\Models\User as UserModel;

class User extends Import
{

    public function collection(Collection $users)
    {
        // excel 的内容已经在底层变成了 Collection
        // 你只需要在这里是页面逻辑就可以了
        // 循环处理数据即可
        $users->each(function ($user) {
            sleep(3);
            $userModel = new UserModel();
            $userModel->username = $user[1];
            $userModel->email = $user[2];
            $userModel->password = $user[3];
            $userModel->save();
        });
    }
}
```

然后在控制器中创建对应的导入方法即可, 到 `UserController` 中设置如下代码

```php
public function import(Request $request, \Modules\User\Import\User $import)
{
    // $request->file('file') 获取导入的 excel 文件
    // 一行代码即可实现导入
    return $import->import($request->file('file'));
}
```

再来设置导入路由

```php
Route::post('user/import', [UserController::class, 'import']);
```

这样后端就完成了，再来看看前端，如果你是使用的 `CatchTable` 的话，那么只需要设置对应的导入路由即可

```vue
// 设置 importUrl 即可
<catch-table importUrl="/user/import" />
```

这样就完成了导入功能，是不是很简单呢？

如果你不是使用 `catchtable` 的话，也可以自行调用 `import` 组件

```jsx
<Import :action="/user/import" />
```

## 异步

同样的，导入也支持异步导入，只需要稍微改造一下，首先到 `UserImport` 文件

```php
namespace Modules\User\Import;

use Catch\Contracts\AsyncTaskInterface;
use Catch\Support\Excel\Import;
use Illuminate\Support\Collection;
use Modules\System\Support\Traits\AsyncTaskDispatch;
use Modules\User\Models\User as UserModel;

// 还需要继承 AsyncTaskInterface
class User extends Import implements AsyncTaskInterface
{
    // 添加 trait
    use AsyncTaskDispatch;

    public function collection(Collection $users)
    {
        // TODO: Implement collection() method.
        $users->each(function ($user) {
            $userModel = new UserModel();
            $userModel->username = $user[1];
            $userModel->email = $user[2];
            $userModel->password = $user[3];
            $userModel->save();
        });
    }
}
```

来到控制器 `import` 方法

```php
public function import(Request $request, \Modules\User\Import\User $import)
{
    // 添加 async 异步方法即可
    return $import->async()->import($request->file('file'));
}
```

这样任务就变成了异步任务。既然是异步任务，那么肯定需要执行。找到 `app/Console/Kernel.php`, 添加下面的任务即可
:::tip
这里和导出异步任务一样
:::

```php
protected function schedule(Schedule $schedule): void
{
    $schedule->command('async:task')->everyMinute();
}
```

任务的情况和具体信息，都可以在后台管理中的`系统管理/异步任务`列表中进行查看
