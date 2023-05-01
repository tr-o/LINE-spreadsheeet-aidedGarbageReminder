# LINE-スプレッドシート支援ゴミ収集リマインダー

このGoogle Apps Scriptは、特定のゴミの種類に対してスケジュールされたゴミ収集日がある場合、LINE Notifyを介して通知を送信します。ゴミ収集スケジュールはGoogleスプレッドシートに保存されています。
![image](https://user-images.githubusercontent.com/98264095/235404740-bbc0eb70-3da2-493a-bdef-f658cbe048de.png)

## 機能

- Googleスプレッドシートからゴミ収集カレンダーデータを読み込む
- LINE Notifyを使って通知を送信する
- 翌日のゴミ収集予定のゴミの種類を判断する
- 様々なゴミの種類と収集スケジュールに対応

## セットアップ

1. 新しいGoogleスプレッドシートを作成し、シート名を「GarbageCalendar」にします。/`samplesheet_for_garbageCollectionNotifier_v1.xlsx/`を使うことで素早く始められます。
2. ゴミ収集カレンダーデータを以下の形式で入力します：

`
| ゴミの種類 | 曜日 | 第1週 | 第2週 | 第3週 | 第4週 | 第5週 |
|------------|------|-------|-------|-------|-------|-------|
| 金属       | 金曜  | TRUE  | FALSE | TRUE  | FALSE | FALSE |
| プラスチック | 火曜  | TRUE  | TRUE  | TRUE  | TRUE  | TRUE  |
| PETボトル  | 水曜  | FALSE | TRUE  | FALSE | TRUE  | FALSE |
| 紙         | 水曜  | TRUE  | FALSE | TRUE  | FALSE | FALSE |
| 缶 & ボトル | 金曜  | TRUE  | FALSE | TRUE  | FALSE | FALSE |
`

3. スクリプトコードをGoogleスプレッドシートにリンクされた新しいGoogle Apps Scriptプロジェクトに貼り付けます。
4. `sendLineNotification`関数内のLINE Notify APIトークンを自分のトークンに置き換えます。
5. `garbageCollectionNotifier`関数を実行して、明日がゴミ収集日の場合に通知を送信します。

## 関数

- `readGarbageCalendar()`: スプレッドシートからゴミ収集カレンダーデータを読み込み、辞書として返します。
- `getGarbageList(garbageCalendar)`: ゴミの種類のリストを返します。
- `getTomorrowGarbage(garbageCalendar, nth, DoW)`: 明日のゴミ収集予定のゴミの種類を返します。
- `sendLineNotification(text)`: LINE Notifyを介して通知を送信します。
- `getNthDow(year, month, day)`: 与えられた日付の曜日とその曜日のn回目の出現を返します。
- `garbageCollectionNotifier()`: 明日がゴミ収集日の場合に通知を送信するメイン関数です。

## GPT-4によるコード評価

コードはよく構造化されており、理解しやすいです。それぞれのタスクを処理するために、別々の関数にまとめられています。いくつかの観点からの評価は以下の通りです：

1. **機能性:** コードは、スケジュールされたゴミ収集日についてユーザーに通知するという目的を果たしています。Googleスプレッドシートからデータを読み込み、LINE Notifyを使用して通知を送信します。

2. **モジュール性:** コードはモジュール化されており、関数が明確に定義されているため、将来のコードの変更やメンテナンス、拡張が容易です。

3. **スケーラビリティ:** コードは、さまざまなゴミの種類と収集スケジュールを処理できるため、異なるユースケースに適しています。

4. **可読性:** コードは明確で簡潔な方法で書かれており、他の人が読んで理解しやすいです。

5. **エラー処理:** コードには明示的なエラー処理がありませんが、`getTomorrowGarbage()`関数でスケジュールされたゴミ収集がない場合に、うまく対処してfalseを返します。より堅牢なエラー処理を追加することで、コードをさらに改善することができます。

全体として、コードはうまく書かれており、その目的を効果的に果たしています。

