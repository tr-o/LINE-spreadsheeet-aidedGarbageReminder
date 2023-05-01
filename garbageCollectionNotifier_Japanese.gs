// Read the garbage calendar data from the spreadsheet and return it as a dictionary
function readGarbageCalendar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('garbageCalender_Japanese');
  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7); // Change 6 to 7
  const data = dataRange.getValues();
  const garbageCalendar = {};

  data.forEach(row => {
    const [garbageType, dayOfWeek, ...weekNumbers] = row;

    if (!garbageCalendar.hasOwnProperty(garbageType)) {
      garbageCalendar[garbageType] = {};
    }

    garbageCalendar[garbageType][dayOfWeek] = weekNumbers.map((isScheduled, index) => index + 1).filter((_, index) => weekNumbers[index]);
  });

  return garbageCalendar;
}


// Dictionary for days of the week in Japanese
const DoWDict = {"月": 1, "火": 2, "水": 3, "木": 4, "金": 5, "土": 6, "日": 0};

// Get a list of garbage types
function getGarbageList(garbageCalendar) {
  return Object.keys(garbageCalendar);
}

// Get the garbage type scheduled for tomorrow
function getTomorrowGarbage(garbageCalendar, nth, DoW) {
  const DoWText = Object.keys(DoWDict).find(key => DoWDict[key] === DoW) + "曜";
  const garbageList = getGarbageList(garbageCalendar);
  
  for (const garbageType of garbageList) {
    const garbageSchedule = garbageCalendar[garbageType];
    
    if (DoWText in garbageSchedule) {
      if (garbageSchedule[DoWText].includes(nth)) {
        return garbageType;
      }
    }
  }
  
  return false;
}

// Send a notification via LINE Notify
function sendLineNotification(text) {
  const url = "https://notify-api.line.me/api/notify";
  const token = "";//"YOUR_LINE_NOTIFY_API_TOKEN";
  
  const headers = {"Authorization": "Bearer " + token};
  const payload = {"message": text};
  const options = {
    method: "post",
    headers: headers,
    payload: payload
  };
  const response = UrlFetchApp.fetch(url, options);
  console.log(response);
}

// Get the nth occurrence of a day of the week and the day of the week itself for a given date
function getNthDow(year, month, day) {
  const nthWeek = Math.floor((day - 1) / 7) + 1;
  const nthDoW = new Date(year, month - 1, day).getDay();
  return {"第何": nthWeek, "曜日": nthDoW};
}

// Main function to send a notification if tomorrow is a garbage collection day
function garbageCollectionNotifier() {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const tomNthDow = getNthDow(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate());
  const garbageCalendar = readGarbageCalendar();

  const tomGarbageType = getTomorrowGarbage(garbageCalendar, tomNthDow["第何"], tomNthDow["曜日"]);

  if (tomGarbageType) {
    const dateText = `${tomorrow.getMonth() + 1}月${tomorrow.getDate()}日`;
    const dayText = `第${tomNthDow['第何']}${Object.keys(DoWDict).find(key => DoWDict[key] === tomNthDow['曜日'])}曜日`;
    const garbageText = `${tomGarbageType}ゴミの日です。`;
    const notificationText = `\n${dateText}\n${dayText}\n${garbageText}`;
    console.log(notificationText);
    sendLineNotification(notificationText);
  }
}



