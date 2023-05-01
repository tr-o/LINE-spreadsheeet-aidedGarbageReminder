# LINE-spreadsheeet-aidedGarbageReminder

This Google Apps Script sends notifications via LINE Notify when there is a scheduled garbage collection day for a specific garbage type. The garbage collection schedule is stored in a Google Spreadsheet.
### Japaneseversion
![image](https://user-images.githubusercontent.com/98264095/235391988-27cfc5cb-b24d-467a-a920-45298f82a923.png)
### English version
![image](https://user-images.githubusercontent.com/98264095/235404740-bbc0eb70-3da2-493a-bdef-f658cbe048de.png)

## Features

- Reads garbage calendar data from a Google Spreadsheet
- Sends notifications via LINE Notify
- Determines the garbage type scheduled for collection on the following day
- Supports various garbage types and collection schedules

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
