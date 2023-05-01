# LINE-スプレッドシート利用ゴミ収集リマインダー
このGoogle Apps Scriptは、特定のゴミの種類に対してスケジュールされたゴミ収集日がある場合、LINE Notifyを介して通知を送信します。ゴミ収集スケジュールはGoogleスプレッドシートに保存されています。
![image](https://user-images.githubusercontent.com/98264095/235404740-bbc0eb70-3da2-493a-bdef-f658cbe048de.png)

##Table of content
- [特徴](#特徴)
- [Googleサービスに依存する利点](#Googleサービスに依存する利点)
- [セットアップ](#セットアップ)
- [関数](#関数)
- [自動化](#自動化)
- [GPT-4によるコード評価](#gpt-4によるコード評価)
- [English version:LINE-spreadsheet-aidedGarbageReminder](#line-spreadsheet-aidedgarbagereminder)

## 特徴

- Googleスプレッドシートからゴミ収集カレンダーデータを読み込む
- LINE Notifyを使って通知を送信する
- 翌日のゴミ収集予定のゴミの種類を判断する
- 様々なゴミの種類と収集スケジュールに対応

## Googleサービスに依存する利点

このスクリプトは、Googleサービスに依存しているため、いくつかの利点があります:

1. **使いやすさ:** Google Apps Scriptは、Google spreadsheetなどのGoogle Workspace製品に慣れている人にとって、設定や使用が簡単です。

2. **サーバー設定不要:** Google Apps Scriptを使用することで、別途サーバーを設定、維持、または支払う必要がありません。これにより、スクリプトの実行の複雑さとコストが削減されます。

3. **Google Workspaceとの統合:** このコードはGoogleシートとGoogle Apps Scriptで動作するように設計されているため、Google Workspaceアプリケーションとのシームレスな統合が可能です。

4. **スケーラビリティ:** Googleサービスは、多数のリクエストを処理し、それに応じてスケーリングするように設計されています。これにより、スクリプトは追加の設定なしで、より多くのユーザーや高負荷に対応できます。

5. **セキュリティ:** Googleサービスはセキュリティを念頭に置いて構築されており、それらを使用することで、Googleのセキュリティインフラストラクチャを活用できます。


## セットアップ

1. 新しいGoogleスプレッドシートを作成し、シート名を「GarbageCalendar」にします。`samplesheet_for_garbageCollectionNotifier_v1.xlsx`を使うことで素早く始められます。
2. ゴミ収集カレンダーデータを以下の形式で入力します：

```
| ゴミの種類 | 曜日 | 第1週 | 第2週 | 第3週 | 第4週 | 第5週 |
|------------|------|-------|-------|-------|-------|-------|
| 金属       | 金曜  | TRUE  | FALSE | TRUE  | FALSE | FALSE |
| プラスチック | 火曜  | TRUE  | TRUE  | TRUE  | TRUE  | TRUE  |
| PETボトル  | 水曜  | FALSE | TRUE  | FALSE | TRUE  | FALSE |
| 紙         | 水曜  | TRUE  | FALSE | TRUE  | FALSE | FALSE |
| 缶 & ボトル | 金曜  | TRUE  | FALSE | TRUE  | FALSE | FALSE |
```

3. スクリプトコードをGoogleスプレッドシートにリンクされた新しいGoogle Apps Scriptプロジェクトに貼り付けます。
4. `sendLineNotification`関数内のLINE Notify APIトークンを自分のトークンに置き換えます。
5. `garbageCollectionNotifier`関数を実行して、明日がゴミ収集日の場合に通知を送信します。


## 自動化
garbageCollectionNotifier関数を自動的に実行するには、時間駆動型トリガーを設定する必要があります。以下の手順に従ってください。

1. Google Apps Scriptプロジェクトを開きます。
2. 左サイドバーの時計アイコン（トリガー）をクリックします。
3. 右下隅の「トリガーを追加」ボタンをクリックします。
4. 「実行する関数を選択」のドロップダウンから、garbageCollectionNotifier関数を選択します。
5. 「イベントソースを選択」のドロップダウンを「時間駆動型」に設定します。
6. 時間と頻度を必要に応じて設定します（例えば、「日時タイマー」を選択し、毎日特定の時間に実行するように設定できます）。
7. 「保存」をクリックしてトリガーを作成します。

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


# LINE-spreadsheeet-aidedGarbageReminder

This Google Apps Script sends notifications via LINE Notify when there is a scheduled garbage collection day for a specific garbage type. The garbage collection schedule is stored in a Google Spreadsheet.
![image](https://user-images.githubusercontent.com/98264095/235404740-bbc0eb70-3da2-493a-bdef-f658cbe048de.png)

## Features

- Reads garbage calendar data from a Google Spreadsheet
- Sends notifications via LINE Notify
- Determines the garbage type scheduled for collection on the following day
- Supports various garbage types and collection schedules

## Advantages of Relying on Google Services

This script relies on Google services, which offers several advantages:

1. **Ease of use:** Google Apps Script is easy to set up and use, especially for those who are already familiar with Google Workspace products like Google Sheets.

2. **No server setup required:** By using Google Apps Script, you don't need to set up, maintain, or pay for a separate server. This reduces the complexity and cost of running the script.

3. **Integration with Google Workspace:** Since this code is designed to work with Google Sheets and Google Apps Script, it benefits from seamless integration with other Google Workspace applications.

4. **Scalability:** Google services are designed to handle a large number of requests and scale accordingly. This means that your script can handle more users and higher loads without any additional setup.

5. **Security:** Google services are built with security in mind, and using them means benefiting from Google's security infrastructure.

However, there are some potential downsides to relying solely on Google services:

1. **Dependency on Google:** If there is a service outage or Google decides to discontinue a service, your script may stop working.

2. **Limited customization:** Google Apps Script may not provide all the features or customization options that a custom server setup would offer.

## Setup

1. Create a new Google Spreadsheet and name a sheet "GarbageCalendar". You can use `samplesheet_for_garbageCollectionNotifier_v1.xlsx` for quick-start.
2. Enter the garbage calendar data in the following format:

```
| Garbage Type | Day of Week | 1st Week | 2nd Week | 3rd Week | 4th Week | 5th Week |
|--------------|-------------|----------|----------|----------|----------|----------|
| Metal        | Friday      | TRUE     | FALSE    | TRUE     | FALSE    | FALSE    |
| Plastic      | Tuesday     | TRUE     | TRUE     | TRUE     | TRUE     | TRUE     |
| PET bottles  | Wednesday   | FALSE    | TRUE     | FALSE    | TRUE     | FALSE    |
| Paper        | Wednesday   | TRUE     | FALSE    | TRUE     | FALSE    | FALSE    |
| Cans & Bottles | Friday    | TRUE     | FALSE    | TRUE     | FALSE    | FALSE    |
```

3. Paste the script code into a new Google Apps Script project linked to the Google Spreadsheet.
4. Replace the LINE Notify API token in the `sendLineNotification` function with your own token.
5. Run the `garbageCollectionNotifier` function to send a notification if there is a scheduled garbage collection day for tomorrow.

## Automation
To automatically run the `garbageCollectionNotifier` function, you need to set up a time-driven trigger. Follow these instructions:

1. Open your Google Apps Script project.
2. Click on the clock icon (Triggers) on the left sidebar.
3. Click the "Add Trigger" button at the bottom right corner.
4. Choose the garbageCollectionNotifier function from the "Choose which function to run" dropdown.
5. Set the "Select event source" dropdown to "Time-driven".
6. Configure the time and frequency as desired (for example, you can choose "Day timer" and set it to run at a specific time every day).
7. Click "Save" to create the trigger.

## Functions

- `readGarbageCalendar()`: Reads the garbage calendar data from the spreadsheet and returns it as a dictionary.
- `getGarbageList(garbageCalendar)`: Returns a list of garbage types.
- `getTomorrowGarbage(garbageCalendar, nth, DoW)`: Returns the garbage type scheduled for tomorrow.
- `sendLineNotification(text)`: Sends a notification via LINE Notify.
- `getNthDow(year, month, day)`: Returns the nth occurrence of a day of the week and the day of the week itself for a given date.
- `garbageCollectionNotifier()`: Main function that sends a notification if tomorrow is a garbage collection day.

## Code Evaluation by GPT-4

The code is well-structured and easy to understand. It is organized into separate functions, each handling a specific task. Here are some evaluations from various perspectives:

1. **Functionality:** The code fulfills its purpose of notifying users about scheduled garbage collection days. It reads data from a Google Spreadsheet and sends notifications using LINE Notify.

2. **Modularity:** The code is modular and functions are well-defined, making it easy to modify, maintain, and extend the code in the future.

3. **Scalability:** The code can handle various garbage types and collection schedules, making it suitable for different use cases.

4. **Readability:** The code is written in a clear and concise manner, making it easy for others to read and understand.

5. **Error Handling:** The code does not have explicit error handling, but it gracefully handles cases where there are no scheduled garbage collections by returning false in the `getTomorrowGarbage()` function. Adding more robust error handling could further improve the code.

Overall, the code is well-written and serves its intended purpose effectively.
