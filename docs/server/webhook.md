# Webhook 通知

CatchAdmin 内置了几个常用平台的 Webhook 通知机器人，方便后台监听反馈系统指标，目前支持的平台有

- 飞书
- 钉钉
- 企微
  ![CatchAdmin webhook 通知 Laravel Admin](https://image.catchadmin.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240515163331.png)

目前内置一个异常通知事件，只需要填入对应平台的 `webhook` 地址即可

## 扩展

就以`飞书通知为例`, 每个 webhook 平台需要实现两个方法

```php

namespace Modules\System\Support\Webhook;

use Catch\Exceptions\FailedException;
use Illuminate\Support\Facades\Http;

// 继承平台类
class Feishu extends Platform
{
    // 必须实现的方法
    public function sign(): string
    {
        return base64_encode(hash_hmac(
            'sha256',
            '',
            $this->timestamp."\n".$this->secret,
            true
        ));
    }

    // 必须实现发送方法
    public function send(string $msgType, string $content): bool
    {
        $this->timestamp = time();

        $postData = [
            'timestamp' => $this->timestamp,
            'msg_type' => $msgType,
            'content' => [
                $msgType => $content,
            ],
        ];

        // 签名校验
        if ($this->secret) {
            $postData['sign'] = $this->sign();
        }

        $response = Http::asJson()->post($this->webhook, $postData);

        if (! $response->ok()) {
            throw new FailedException('飞书 Webhook 推送失败');
        }

        if (! $response['code']) {
            return true;
        }

        throw new FailedException('飞书 Webhook 错误: '.$response['msg']);
    }
}

```

实现对应平台之后，需要将对应的实现加入到 `webhook` 通知中，目前项目使用的硬编码方法
找到 `modules/System/Support/Webhook.php` 文件，将对应平台添加进去

```php

protected function getWebhookPlatform(): WebhookInterface
{
    $platform = [
        Webhooks::FEISHU => Feishu::class, // 飞书
    ][$this->webhook->platform] ?? null;

    if (! $platform) {
        throw new FailedException('The platform dont support now.');
    }

    return app($platform)->config($this->webhook->webhook, $this->webhook->secret);
}
```

## 使用

实现之后，如何使用系统呢？首先来看看目前内置的`异常`通知，找到 `modules/System/Models/Webhooks.php`模型文件，然后添加类型

```php
class Webhooks extends Model
{
    // 推送事件
    public const EXCEPTION_EVENT = 'exception';

    // 添加另外的事件
    public const OTHER_EVENT = 'other_event';

    /**
     * 异常事件
     *
     * @return Collection
     */
    public static function exceptions(): Collection
    {
        return self::where('event', self::EXCEPTION_EVENT)->get();
    }

    /**
     * 添加一个 other event
     *
     * @return Collection
     */
    public static function otherEvents(): Collection
    {
        return self::where('event', self::OTHER_EVENT)->get();
    }
}
```

前端还要添加一个事件选项，找到 `modules/Common/Repository/Options/WebhookEvents.php` 文件，添加下面的数组

```php
class WebhookEvents implements OptionInterface
{
    public function get(): array
    {
        return [
            [
                'label' => '异常事件',
                'value' => 'exception',
            ],
            [
                'label' => '其他事件',
                'value' => 'other_event',
            ]
        ];
    }
}
```

## 触发事件

在事件触发的地方安排 `webhook` 通知，代码如下

```php
  //
$webhook = new Webhook(Webhooks::otherEvents());

$webhook->setValues(['other events'])->send();
```
