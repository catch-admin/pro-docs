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

```vue
<Import :action="/user/import" />
```
