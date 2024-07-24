/* Copyright © 2003-2018 Rustici Software, LLC  All Rights Reserved. www.rusticisoftware.com */
var VERSION = "7.9.1";
var PREFERENCE_DEFAULT = 0;
var PREFERENCE_OFF = -1;
var PREFERENCE_ON = 1;
var LESSON_STATUS_PASSED = 1;
var LESSON_STATUS_COMPLETED = 2;
var LESSON_STATUS_FAILED = 3;
var LESSON_STATUS_INCOMPLETE = 4;
var LESSON_STATUS_BROWSED = 5;
var LESSON_STATUS_NOT_ATTEMPTED = 6;
var ENTRY_REVIEW = 1;
var ENTRY_FIRST_TIME = 2;
var ENTRY_RESUME = 3;
var MODE_NORMAL = 1;
var MODE_BROWSE = 2;
var MODE_REVIEW = 3;
var MAX_CMI_TIME = 36002439990;
var NO_ERROR = 0;
var ERROR_LMS = 1;
var ERROR_INVALID_PREFERENCE = 2;
var ERROR_INVALID_NUMBER = 3;
var ERROR_INVALID_ID = 4;
var ERROR_INVALID_STATUS = 5;
var ERROR_INVALID_RESPONSE = 6;
var ERROR_NOT_LOADED = 7;
var ERROR_INVALID_INTERACTION_RESPONSE = 8;
var EXIT_TYPE_SUSPEND = "SUSPEND";
var EXIT_TYPE_FINISH = "FINISH";
var EXIT_TYPE_TIMEOUT = "TIMEOUT";
var EXIT_TYPE_UNLOAD = "UNLOAD";
var INTERACTION_RESULT_CORRECT = "CORRECT";
var INTERACTION_RESULT_WRONG = "WRONG";
var INTERACTION_RESULT_UNANTICIPATED = "UNANTICIPATED";
var INTERACTION_RESULT_NEUTRAL = "NEUTRAL";
var INTERACTION_TYPE_TRUE_FALSE = "true-false";
var INTERACTION_TYPE_CHOICE = "choice";
var INTERACTION_TYPE_FILL_IN = "fill-in";
var INTERACTION_TYPE_LONG_FILL_IN = "long-fill-in";
var INTERACTION_TYPE_MATCHING = "matching";
var INTERACTION_TYPE_PERFORMANCE = "performance";
var INTERACTION_TYPE_SEQUENCING = "sequencing";
var INTERACTION_TYPE_LIKERT = "likert";
var INTERACTION_TYPE_NUMERIC = "numeric";
var DATA_CHUNK_PAIR_SEPARATOR = "###";
var DATA_CHUNK_VALUE_SEPARATOR = "$$";
var APPID = "__APPID__";
var CLOUDURL = "__CLOUDURL__";
var blnDebug = true;
var strLMSStandard = "AUTO";
var DEFAULT_EXIT_TYPE = EXIT_TYPE_SUSPEND;
var AICC_LESSON_ID = "1";
var EXIT_BEHAVIOR = "SCORM_RECOMMENDED";
var EXIT_TARGET = "goodbye.html";
var AICC_COMM_DISABLE_XMLHTTP = false;
var AICC_COMM_DISABLE_IFRAME = false;
var AICC_COMM_PREPEND_HTTP_IF_MISSING = true;
var AICC_REPORT_MIN_MAX_SCORE = true;
var SHOW_DEBUG_ON_LAUNCH = false;
var DO_NOT_REPORT_INTERACTIONS = false;
var SCORE_CAN_ONLY_IMPROVE = false;
var REVIEW_MODE_IS_READ_ONLY = true;
var TCAPI_DONT_USE_BROKEN_URN_IDS = true;
var AICC_RE_CHECK_LOADED_INTERVAL = 250;
var AICC_RE_CHECK_ATTEMPTS_BEFORE_TIMEOUT = 240;
var USE_AICC_KILL_TIME = true;
var AICC_ENTRY_FLAG_DEFAULT = ENTRY_REVIEW;
var AICC_USE_CUSTOM_COMMS = false;
var FORCED_COMMIT_TIME = "0";
var ALLOW_NONE_STANDARD = true;
var USE_2004_SUSPENDALL_NAVREQ = false;
var USE_STRICT_SUSPEND_DATA_LIMITS = true;
var EXIT_SUSPEND_IF_COMPLETED = false;
var EXIT_NORMAL_IF_PASSED = false;
var AICC_ENCODE_PARAMETER_VALUES = true;
var PASS_FAIL_SETS_COMPLETION_FOR_2004 = true;
var ALLOW_INTERACTION_NULL_LEARNER_RESPONSE = false;
var PREVENT_STATUS_CHANGE_DURING_INIT = false;
var USE_LEGACY_IDENTIFIERS_FOR_2004 = false;
var URI_IDENTIFIER_PREFIX = "urn:scormdriver:";
function GetQueryStringValue(strElement, strQueryString) {
  var aryPairs;
  var foundValue;
  strQueryString = strQueryString.substring(1);
  aryPairs = strQueryString.split("&");
  foundValue = SearchQueryStringPairs(aryPairs, strElement);
  if (foundValue === null) {
    aryPairs = strQueryString.split(/[\?\&]/);
    foundValue = SearchQueryStringPairs(aryPairs, strElement);
  }
  if (foundValue === null) {
    WriteToDebug(
      "GetQueryStringValue Element '" +
        strElement +
        "' Not Found, Returning: empty string"
    );
    return "";
  } else {
    WriteToDebug(
      "GetQueryStringValue for '" + strElement + "' Returning: " + foundValue
    );
    return foundValue;
  }
}
function SearchQueryStringPairs(aryPairs, strElement) {
  var i;
  var intEqualPos;
  var strArg = "";
  var strValue = "";
  strElement = strElement.toLowerCase();
  for (i = 0; i < aryPairs.length; i++) {
    intEqualPos = aryPairs[i].indexOf("=");
    if (intEqualPos != -1) {
      strArg = aryPairs[i].substring(0, intEqualPos);
      if (EqualsIgnoreCase(strArg, strElement)) {
        strValue = aryPairs[i].substring(intEqualPos + 1);
        strValue = new String(strValue);
        strValue = strValue.replace(/\+/g, "%20");
        strValue = unescape(strValue);
        return new String(strValue);
      }
    }
  }
  return null;
}
function ConvertStringToBoolean(str) {
  var intTemp;
  if (
    EqualsIgnoreCase(str, "true") ||
    EqualsIgnoreCase(str, "t") ||
    str.toLowerCase().indexOf("t") == 0
  ) {
    return true;
  } else {
    intTemp = parseInt(str, 10);
    if (intTemp == 1 || intTemp == -1) {
      return true;
    } else {
      return false;
    }
  }
}
function EqualsIgnoreCase(str1, str2) {
  var blnReturn;
  str1 = new String(str1);
  str2 = new String(str2);
  blnReturn = str1.toLowerCase() == str2.toLowerCase();
  return blnReturn;
}
function ValidInteger(intNum) {
  WriteToDebug("In ValidInteger intNum=" + intNum);
  var str = new String(intNum);
  if (str.indexOf("-", 0) == 0) {
    str = str.substring(1, str.length - 1);
  }
  var regValidChars = new RegExp("[^0-9]");
  if (str.search(regValidChars) == -1) {
    WriteToDebug("Returning true");
    return true;
  }
  WriteToDebug("Returning false");
  return false;
}
function ConvertDateToIso8601TimeStamp(dtm) {
  var strTimeStamp;
  dtm = new Date(dtm);
  var Year = dtm.getFullYear();
  var Month = dtm.getMonth() + 1;
  var Day = dtm.getDate();
  var Hour = dtm.getHours();
  var Minute = dtm.getMinutes();
  var Second = dtm.getSeconds();
  Month = ZeroPad(Month, 2);
  Day = ZeroPad(Day, 2);
  Hour = ZeroPad(Hour, 2);
  Minute = ZeroPad(Minute, 2);
  Second = ZeroPad(Second, 2);
  strTimeStamp =
    Year + "-" + Month + "-" + Day + "T" + Hour + ":" + Minute + ":" + Second;
  var tzoffset = -(dtm.getTimezoneOffset() / 60);
  if (tzoffset != 0) {
    strTimeStamp += ".0";
    if (tzoffset > 0) {
      if (("" + tzoffset).indexOf(".") != -1) {
        var fraction =
          "0" +
          ("" + tzoffset).substr(
            ("" + tzoffset).indexOf("."),
            ("" + tzoffset).length
          );
        var base = ("" + tzoffset).substr(0, ("" + tzoffset).indexOf("."));
        fraction = fraction * 60;
        strTimeStamp += "+" + ZeroPad(base + "." + fraction, 2);
      } else {
        strTimeStamp += "+" + ZeroPad(tzoffset, 2);
      }
    } else {
      strTimeStamp += ZeroPad(tzoffset, 2);
    }
  }
  return strTimeStamp;
}
function ConvertIso8601TimeStampToDate(strTimeStamp) {
  strTimeStamp = new String(strTimeStamp);
  var ary = new Array();
  ary = strTimeStamp.split(/[\:T+-]/);
  var Year = ary[0];
  var Month = ary[1] - 1;
  var Day = ary[2];
  var Hour = ary[3];
  var Minute = ary[4];
  var Second = ary[5];
  return new Date(Year, Month, Day, Hour, Minute, Second, 0);
}
function ConvertDateToCMIDate(dtmDate) {
  WriteToDebug("In ConvertDateToCMIDate");
  var strYear;
  var strMonth;
  var strDay;
  var strReturn;
  dtmDate = new Date(dtmDate);
  strYear = dtmDate.getFullYear();
  strMonth = dtmDate.getMonth() + 1;
  strDay = dtmDate.getDate();
  strReturn =
    ZeroPad(strYear, 4) + "/" + ZeroPad(strMonth, 2) + "/" + ZeroPad(strDay, 2);
  return strReturn;
}
function ConvertDateToCMITime(dtmDate) {
  var strHours;
  var strMinutes;
  var strSeconds;
  var strReturn;
  dtmDate = new Date(dtmDate);
  strHours = dtmDate.getHours();
  strMinutes = dtmDate.getMinutes();
  strSeconds = dtmDate.getSeconds();
  strReturn =
    ZeroPad(strHours, 2) +
    ":" +
    ZeroPad(strMinutes, 2) +
    ":" +
    ZeroPad(strSeconds, 2);
  return strReturn;
}
function ConvertCMITimeSpanToMS(strTime) {
  WriteToDebug("In ConvertCMITimeSpanToMS, strTime=" + strTime);
  var aryParts;
  var intHours;
  var intMinutes;
  var intSeconds;
  var intTotalMilliSeconds;
  aryParts = strTime.split(":");
  if (!IsValidCMITimeSpan(strTime)) {
    WriteToDebug("ERROR - Invalid TimeSpan");
    SetErrorInfo(
      SCORM_ERROR_GENERAL,
      "LMS ERROR - Invalid time span passed to ConvertCMITimeSpanToMS, please contact technical support"
    );
    return 0;
  }
  intHours = aryParts[0];
  intMinutes = aryParts[1];
  intSeconds = aryParts[2];
  WriteToDebug(
    "intHours=" +
      intHours +
      " intMinutes=" +
      intMinutes +
      " intSeconds=" +
      intSeconds
  );
  intTotalMilliSeconds =
    intHours * 3600000 + intMinutes * 60000 + intSeconds * 1000;
  intTotalMilliSeconds = Math.round(intTotalMilliSeconds);
  WriteToDebug("Returning " + intTotalMilliSeconds);
  return intTotalMilliSeconds;
}
function ConvertScorm2004TimeToMS(strIso8601Time) {
  WriteToDebug("In ConvertScorm2004TimeToMS, strIso8601Time=" + strIso8601Time);
  var intTotalMs = 0;
  var strNumberBuilder;
  var strCurrentCharacter;
  var blnInTimeSection;
  var Seconds = 0;
  var Minutes = 0;
  var Hours = 0;
  var Days = 0;
  var Months = 0;
  var Years = 0;
  var MILLISECONDS_PER_SECOND = 1000;
  var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * 60;
  var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
  var MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;
  var MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DAY * ((365 * 4 + 1) / 48);
  var MILLISECONDS_PER_YEAR = MILLISECONDS_PER_MONTH * 12;
  strIso8601Time = new String(strIso8601Time);
  strNumberBuilder = "";
  strCurrentCharacter = "";
  blnInTimeSection = false;
  for (var i = 1; i < strIso8601Time.length; i++) {
    strCurrentCharacter = strIso8601Time.charAt(i);
    if (IsIso8601SectionDelimiter(strCurrentCharacter)) {
      switch (strCurrentCharacter.toUpperCase()) {
        case "Y":
          Years = parseInt(strNumberBuilder, 10);
          break;
        case "M":
          if (blnInTimeSection) {
            Minutes = parseInt(strNumberBuilder, 10);
          } else {
            Months = parseInt(strNumberBuilder, 10);
          }
          break;
        case "D":
          Days = parseInt(strNumberBuilder, 10);
          break;
        case "H":
          Hours = parseInt(strNumberBuilder, 10);
          break;
        case "S":
          Seconds = parseFloat(strNumberBuilder);
          break;
        case "T":
          blnInTimeSection = true;
          break;
      }
      strNumberBuilder = "";
    } else {
      strNumberBuilder += "" + strCurrentCharacter;
    }
  }
  WriteToDebug(
    "Years=" +
      Years +
      "\n" +
      "Months=" +
      Months +
      "\n" +
      "Days=" +
      Days +
      "\n" +
      "Hours=" +
      Hours +
      "\n" +
      "Minutes=" +
      Minutes +
      "\n" +
      "Seconds=" +
      Seconds +
      "\n"
  );
  intTotalMs =
    Years * MILLISECONDS_PER_YEAR +
    Months * MILLISECONDS_PER_MONTH +
    Days * MILLISECONDS_PER_DAY +
    Hours * MILLISECONDS_PER_HOUR +
    Minutes * MILLISECONDS_PER_MINUTE +
    Seconds * MILLISECONDS_PER_SECOND;
  intTotalMs = Math.round(intTotalMs);
  WriteToDebug("returning-" + intTotalMs);
  return intTotalMs;
}
function IsIso8601SectionDelimiter(str) {
  if (str.search(/[PYMDTHS]/) >= 0) {
    return true;
  } else {
    return false;
  }
}
function IsValidCMITimeSpan(strValue) {
  WriteToDebug("In IsValidCMITimeSpan strValue=" + strValue);
  var regValid = /^\d?\d?\d?\d:\d?\d:\d?\d(.\d\d?)?$/;
  if (strValue.search(regValid) > -1) {
    WriteToDebug("Returning True");
    return true;
  } else {
    WriteToDebug("Returning False");
    return false;
  }
}
function IsValidIso8601TimeSpan(strValue) {
  WriteToDebug("In IsValidIso8601TimeSpan strValue=" + strValue);
  var regValid = /^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(.\d\d?)?S)?)?$/;
  if (strValue.search(regValid) > -1) {
    WriteToDebug("Returning True");
    return true;
  } else {
    WriteToDebug("Returning False");
    return false;
  }
}
function ConvertMilliSecondsToTCAPITime(
  intTotalMilliseconds,
  blnIncludeFraction
) {
  var intHours;
  var intMinutes;
  var intSeconds;
  var intMilliseconds;
  var intHundredths;
  var strCMITimeSpan;
  WriteToDebug(
    "In ConvertMilliSecondsToTCAPITime, intTotalMilliseconds = " +
      intTotalMilliseconds +
      ", blnIncludeFraction = " +
      blnIncludeFraction
  );
  if (blnIncludeFraction == null || blnIncludeFraction == undefined) {
    blnIncludeFraction = true;
  }
  intMilliseconds = intTotalMilliseconds % 1000;
  intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;
  intMinutes =
    ((intTotalMilliseconds - intMilliseconds - intSeconds * 1000) / 60000) % 60;
  intHours =
    (intTotalMilliseconds -
      intMilliseconds -
      intSeconds * 1000 -
      intMinutes * 60000) /
    3600000;
  WriteToDebug(
    "Separated Parts, intHours=" +
      intHours +
      ", intMinutes=" +
      intMinutes +
      ", intSeconds=" +
      intSeconds +
      ", intMilliseconds=" +
      intMilliseconds
  );
  if (intHours == 10000) {
    WriteToDebug("Max intHours detected");
    intHours = 9999;
    intMinutes = (intTotalMilliseconds - intHours * 3600000) / 60000;
    if (intMinutes == 100) {
      intMinutes = 99;
    }
    intMinutes = Math.floor(intMinutes);
    intSeconds =
      (intTotalMilliseconds - intHours * 3600000 - intMinutes * 60000) / 1000;
    if (intSeconds == 100) {
      intSeconds = 99;
    }
    intSeconds = Math.floor(intSeconds);
    intMilliseconds =
      intTotalMilliseconds -
      intHours * 3600000 -
      intMinutes * 60000 -
      intSeconds * 1000;
    WriteToDebug(
      "Separated Parts, intHours=" +
        intHours +
        ", intMinutes=" +
        intMinutes +
        ", intSeconds=" +
        intSeconds +
        ", intMilliseconds=" +
        intMilliseconds
    );
  }
  intHundredths = Math.floor(intMilliseconds / 10);
  strCMITimeSpan =
    ZeroPad(intHours, 4) +
    ":" +
    ZeroPad(intMinutes, 2) +
    ":" +
    ZeroPad(intSeconds, 2);
  if (blnIncludeFraction) {
    strCMITimeSpan += "." + intHundredths;
  }
  WriteToDebug("strCMITimeSpan=" + strCMITimeSpan);
  if (intHours > 9999) {
    strCMITimeSpan = "9999:99:99";
    if (blnIncludeFraction) {
      strCMITimeSpan += ".99";
    }
  }
  WriteToDebug("returning " + strCMITimeSpan);
  return strCMITimeSpan;
}
function ConvertMilliSecondsToSCORMTime(
  intTotalMilliseconds,
  blnIncludeFraction
) {
  var intHours;
  var intMinutes;
  var intSeconds;
  var intMilliseconds;
  var intHundredths;
  var strCMITimeSpan;
  WriteToDebug(
    "In ConvertMilliSecondsToSCORMTime, intTotalMilliseconds = " +
      intTotalMilliseconds +
      ", blnIncludeFraction = " +
      blnIncludeFraction
  );
  if (blnIncludeFraction == null || blnIncludeFraction == undefined) {
    blnIncludeFraction = true;
  }
  intMilliseconds = intTotalMilliseconds % 1000;
  intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;
  intMinutes =
    ((intTotalMilliseconds - intMilliseconds - intSeconds * 1000) / 60000) % 60;
  intHours =
    (intTotalMilliseconds -
      intMilliseconds -
      intSeconds * 1000 -
      intMinutes * 60000) /
    3600000;
  WriteToDebug(
    "Separated Parts, intHours=" +
      intHours +
      ", intMinutes=" +
      intMinutes +
      ", intSeconds=" +
      intSeconds +
      ", intMilliseconds=" +
      intMilliseconds
  );
  if (intHours == 10000) {
    WriteToDebug("Max intHours detected");
    intHours = 9999;
    intMinutes = (intTotalMilliseconds - intHours * 3600000) / 60000;
    if (intMinutes == 100) {
      intMinutes = 99;
    }
    intMinutes = Math.floor(intMinutes);
    intSeconds =
      (intTotalMilliseconds - intHours * 3600000 - intMinutes * 60000) / 1000;
    if (intSeconds == 100) {
      intSeconds = 99;
    }
    intSeconds = Math.floor(intSeconds);
    intMilliseconds =
      intTotalMilliseconds -
      intHours * 3600000 -
      intMinutes * 60000 -
      intSeconds * 1000;
    WriteToDebug(
      "Separated Parts, intHours=" +
        intHours +
        ", intMinutes=" +
        intMinutes +
        ", intSeconds=" +
        intSeconds +
        ", intMilliseconds=" +
        intMilliseconds
    );
  }
  intHundredths = Math.floor(intMilliseconds / 10);
  strCMITimeSpan =
    ZeroPad(intHours, 4) +
    ":" +
    ZeroPad(intMinutes, 2) +
    ":" +
    ZeroPad(intSeconds, 2);
  if (blnIncludeFraction) {
    strCMITimeSpan += "." + intHundredths;
  }
  WriteToDebug("strCMITimeSpan=" + strCMITimeSpan);
  if (intHours > 9999) {
    strCMITimeSpan = "9999:99:99";
    if (blnIncludeFraction) {
      strCMITimeSpan += ".99";
    }
  }
  WriteToDebug("returning " + strCMITimeSpan);
  return strCMITimeSpan;
}
function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds) {
  WriteToDebug(
    "In ConvertMilliSecondsIntoSCORM2004Time intTotalMilliseconds=" +
      intTotalMilliseconds
  );
  var ScormTime = "";
  var HundredthsOfASecond;
  var Seconds;
  var Minutes;
  var Hours;
  var Days;
  var Months;
  var Years;
  var HUNDREDTHS_PER_SECOND = 100;
  var HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60;
  var HUNDREDTHS_PER_HOUR = HUNDREDTHS_PER_MINUTE * 60;
  var HUNDREDTHS_PER_DAY = HUNDREDTHS_PER_HOUR * 24;
  var HUNDREDTHS_PER_MONTH = HUNDREDTHS_PER_DAY * ((365 * 4 + 1) / 48);
  var HUNDREDTHS_PER_YEAR = HUNDREDTHS_PER_MONTH * 12;
  HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10);
  Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR);
  HundredthsOfASecond -= Years * HUNDREDTHS_PER_YEAR;
  Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH);
  HundredthsOfASecond -= Months * HUNDREDTHS_PER_MONTH;
  Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY);
  HundredthsOfASecond -= Days * HUNDREDTHS_PER_DAY;
  Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR);
  HundredthsOfASecond -= Hours * HUNDREDTHS_PER_HOUR;
  Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE);
  HundredthsOfASecond -= Minutes * HUNDREDTHS_PER_MINUTE;
  Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND);
  HundredthsOfASecond -= Seconds * HUNDREDTHS_PER_SECOND;
  if (Years > 0) {
    ScormTime += Years + "Y";
  }
  if (Months > 0) {
    ScormTime += Months + "M";
  }
  if (Days > 0) {
    ScormTime += Days + "D";
  }
  if (HundredthsOfASecond + Seconds + Minutes + Hours > 0) {
    ScormTime += "T";
    if (Hours > 0) {
      ScormTime += Hours + "H";
    }
    if (Minutes > 0) {
      ScormTime += Minutes + "M";
    }
    if (HundredthsOfASecond + Seconds > 0) {
      ScormTime += Seconds;
      if (HundredthsOfASecond > 0) {
        ScormTime += "." + HundredthsOfASecond;
      }
      ScormTime += "S";
    }
  }
  if (ScormTime == "") {
    ScormTime = "T0S";
  }
  ScormTime = "P" + ScormTime;
  WriteToDebug("Returning-" + ScormTime);
  return ScormTime;
}
function ZeroPad(intNum, intNumDigits) {
  WriteToDebug("In ZeroPad intNum=" + intNum + " intNumDigits=" + intNumDigits);
  var strTemp;
  var intLen;
  var decimalToPad;
  var i;
  var isNeg = false;
  strTemp = new String(intNum);
  if (strTemp.indexOf("-") != -1) {
    isNeg = true;
    strTemp = strTemp.substr(1, strTemp.length);
  }
  if (strTemp.indexOf(".") != -1) {
    strTemp.replace(".", "");
    decimalToPad = strTemp.substr(strTemp.indexOf(".") + 1, strTemp.length);
    strTemp = strTemp.substr(0, strTemp.indexOf("."));
  }
  intLen = strTemp.length;
  if (intLen > intNumDigits) {
    WriteToDebug(
      "Length of string is greater than num digits, trimming string"
    );
    strTemp = strTemp.substr(0, intNumDigits);
  } else {
    for (i = intLen; i < intNumDigits; i++) {
      strTemp = "0" + strTemp;
    }
  }
  if (isNeg == true) {
    strTemp = "-" + strTemp;
  }
  if (decimalToPad != null && decimalToPad != "") {
    if (decimalToPad.length == 1) {
      strTemp += ":" + decimalToPad + "0";
    } else {
      strTemp += ":" + decimalToPad;
    }
  }
  WriteToDebug("Returning - " + strTemp);
  return strTemp;
}
function IsValidDecimalRange(strValue) {
  WriteToDebug("In IsDecimalRange, strValue=" + strValue);
  var REG_EX_REAL_DELIMITER = "[:]",
    aryNumericRangeSplit,
    strMin,
    strMax;
  strValue = new String(strValue);
  aryNumericRangeSplit = strValue.split(REG_EX_REAL_DELIMITER);
  if (aryNumericRangeSplit.length === 2) {
    strMin = Trim(aryNumericRangeSplit[0]);
    strMax = Trim(aryNumericRangeSplit[1]);
    if (strMin.length > 0 && !IsValidDecimal(strMin)) {
      WriteToDebug(
        "Returning False - min value supplied range is not a valid decimal, min=" +
          strMin
      );
      return false;
    }
    if (strMax.length > 0 && !IsValidDecimal(strMax)) {
      WriteToDebug(
        "Returning False - max value supplied for range is not a valid decimal, max=" +
          strMax
      );
      return false;
    }
    if (
      strMin.length > 0 &&
      strMax.length > 0 &&
      parseFloat(strMin) > parseFloat(strMax)
    ) {
      WriteToDebug(
        "Returning False - min value supplied for range is greater than the max, min=" +
          strMin +
          ", max=" +
          strMax
      );
      return false;
    }
    return true;
  }
  WriteToDebug(
    "Returning false - string supplied for range has incorrect number of parts, parts=" +
      aryNumericRangeSplit.length +
      ", strValue=" +
      strValue
  );
  return false;
}
function ConvertDecimalRangeToDecimalBasedOnLearnerResponse(
  strValue,
  strLearnerResponse,
  blnCorrect
) {
  WriteToDebug(
    "In ConvertDecimalRangeToDecimalBasedOnLearnerResponse strValue=" +
      strValue +
      ",strLearnerResponse=" +
      strLearnerResponse +
      ",blnCorrect=" +
      blnCorrect
  );
  var REG_EX_REAL_DELIMITER = "[:]",
    aryNumericRangeSplit,
    strMin,
    strMax;
  if (blnCorrect) {
    WriteToDebug("Returning strLearnerResponse");
    return strLearnerResponse;
  }
  strValue = new String(strValue);
  aryNumericRangeSplit = strValue.split(REG_EX_REAL_DELIMITER);
  if (aryNumericRangeSplit.length === 2) {
    strMin = Trim(aryNumericRangeSplit[0]);
    strMax = Trim(aryNumericRangeSplit[1]);
    if (strMin.length > 0) {
      WriteToDebug("Returning strMin");
      return strMin;
    } else if (strMax.length > 0) {
      WriteToDebug("Returning strMax");
      return strMax;
    }
  }
  WriteToDebug("Returning null");
  return null;
}
function IsValidDecimal(strValue) {
  WriteToDebug("In IsValidDecimal, strValue=" + strValue);
  strValue = new String(strValue);
  if (strValue.search(/[^.\d-]/) > -1) {
    WriteToDebug(
      "Returning False - character other than a digit, dash or period found"
    );
    return false;
  }
  if (strValue.search("-") > -1) {
    if (strValue.indexOf("-", 1) > -1) {
      WriteToDebug("Returning False - dash found in the middle of the string");
      return false;
    }
  }
  if (strValue.indexOf(".") != strValue.lastIndexOf(".")) {
    WriteToDebug("Returning False - more than one decimal point found");
    return false;
  }
  if (strValue.search(/\d/) < 0) {
    WriteToDebug("Returning False - no digits found");
    return false;
  }
  WriteToDebug("Returning True");
  return true;
}
function IsAlphaNumeric(strValue) {
  WriteToDebug("In IsAlphaNumeric");
  if (strValue.search(/\w/) < 0) {
    WriteToDebug("Returning false");
    return false;
  } else {
    WriteToDebug("Returning true");
    return true;
  }
}
function ReverseNameSequence(strName) {
  var strFirstName;
  var strLastName;
  var intCommaLoc;
  if (strName == "") strName = "Not Found, Learner Name";
  intCommaLoc = strName.indexOf(",");
  strFirstName = strName.slice(intCommaLoc + 1);
  strLastName = strName.slice(0, intCommaLoc);
  strFirstName = Trim(strFirstName);
  strLastName = Trim(strLastName);
  return strFirstName + " " + strLastName;
}
function LTrim(str) {
  str = new String(str);
  return str.replace(/^\s+/, "");
}
function RTrim(str) {
  str = new String(str);
  return str.replace(/\s+$/, "");
}
function Trim(strToTrim) {
  var str = LTrim(RTrim(strToTrim));
  return str.replace(/\s{2,}/g, " ");
}
function GetValueFromDataChunk(strID) {
  var strChunk = new String(GetDataChunk());
  var aryPairs = new Array();
  var aryValues = new Array();
  var i;
  aryPairs = strChunk.split(parent.DATA_CHUNK_PAIR_SEPARATOR);
  for (i = 0; i < aryPairs.length; i++) {
    aryValues = aryPairs[i].split(parent.DATA_CHUNK_VALUE_SEPARATOR);
    if (aryValues[0] == strID) return aryValues[1];
  }
  return "";
}
function SetDataChunkValue(strID, strValue) {
  var strChunk = new String(GetDataChunk());
  var aryPairs = new Array();
  var aryValues = new Array();
  var i;
  var blnFound = new Boolean(false);
  aryPairs = strChunk.split(parent.DATA_CHUNK_PAIR_SEPARATOR);
  for (i = 0; i < aryPairs.length; i++) {
    aryValues = aryPairs[i].split(parent.DATA_CHUNK_VALUE_SEPARATOR);
    if (aryValues[0] == strID) {
      aryValues[1] = strValue;
      blnFound = true;
      aryPairs[i] =
        aryValues[0] + parent.DATA_CHUNK_VALUE_SEPARATOR + aryValues[1];
    }
  }
  if (blnFound == true) {
    strChunk = aryPairs.join(parent.DATA_CHUNK_PAIR_SEPARATOR);
  } else {
    if (strChunk == "") {
      strChunk = strID + parent.DATA_CHUNK_VALUE_SEPARATOR + strValue;
    } else {
      strChunk +=
        parent.DATA_CHUNK_PAIR_SEPARATOR +
        strID +
        parent.DATA_CHUNK_VALUE_SEPARATOR +
        strValue;
    }
  }
  SetDataChunk(strChunk);
  return true;
}
function GetLastDirAndPageName(str) {
  var page = new String(str);
  var LastSlashLocation = page.lastIndexOf("/");
  var SecondLastSlashLocation = page.lastIndexOf("/", LastSlashLocation - 1);
  return page.substr(SecondLastSlashLocation + 1);
}
function RoundToPrecision(number, significantDigits) {
  number = parseFloat(number);
  return (
    Math.round(number * Math.pow(10, significantDigits)) /
    Math.pow(10, significantDigits)
  );
}
function IsAbsoluteUrl(urlStr) {
  return (
    urlStr != null &&
    (urlStr.indexOf("http://") == 0 || urlStr.indexOf("https://") == 0)
  );
}
function TouchCloud() {
  if (
    APPID != null &&
    APPID != "" &&
    APPID != "__APPID__" &&
    CLOUDURL !== null &&
    CLOUDURL.indexOf("http") === 0
  ) {
    var cloudForm = document.createElement("form");
    cloudForm.name = "cloudform";
    cloudForm.id = "cloudform";
    cloudForm.style = "display:none;";
    document.body.appendChild(cloudForm);
    var elAppId = document.createElement("input");
    elAppId.name = "appId";
    elAppId.value = APPID;
    elAppId.type = "hidden";
    cloudForm.appendChild(elAppId);
    var elUrl = document.createElement("input");
    elUrl.name = "servingUrl";
    elUrl.type = "hidden";
    elUrl.value = document.location.href;
    cloudForm.appendChild(elUrl);
    var elVersion = document.createElement("input");
    elVersion.name = "version";
    elVersion.type = "hidden";
    elVersion.value = VERSION;
    cloudForm.appendChild(elVersion);
    cloudForm.target = "rusticisoftware_aicc_results";
    cloudForm.action = CLOUDURL;
    document.getElementById("cloudform").submit();
    return true;
  } else {
    return false;
  }
}
function IsNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function loadScript(url, callback) {
  var head = document.getElementsByTagName("head")[0],
    script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  if (
    !script.addEventListener ||
    (document.documentMode && document.documentMode < 9)
  ) {
    script.onreadystatechange = function () {
      if (/loaded|complete/.test(script.readyState)) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.addEventListener("load", callback, false);
  }
  head.appendChild(script);
}
var STANDARD = "SCORM2004";
var SCORM2004_LOGOUT = "logout";
var SCORM2004_SUSPEND = "suspend";
var SCORM2004_NORMAL_EXIT = "normal";
var SCORM2004_TIMEOUT = "time-out";
var SCORM2004_PASSED = "passed";
var SCORM2004_FAILED = "failed";
var SCORM2004_UNKNOWN = "unknown";
var SCORM2004_COMPLETED = "completed";
var SCORM2004_INCOMPLETE = "incomplete";
var SCORM2004_NOT_ATTEMPTED = "not attempted";
var SCORM2004_CREDIT = "credit";
var SCORM2004_NO_CREDIT = "no-credit";
var SCORM2004_BROWSE = "browse";
var SCORM2004_NORMAL = "normal";
var SCORM2004_REVIEW = "review";
var SCORM2004_ENTRY_ABINITIO = "ab-initio";
var SCORM2004_ENTRY_RESUME = "resume";
var SCORM2004_ENTRY_NORMAL = "";
var SCORM2004_TLA_EXIT_MESSAGE = "exit,message";
var SCORM2004_TLA_EXIT_NO_MESSAGE = "exit,no message";
var SCORM2004_TLA_CONTINUE_MESSAGE = "continue,message";
var SCORM2004_TLA_CONTINUE_NO_MESSAGE = "continue,no message";
var SCORM2004_RESULT_CORRECT = "correct";
var SCORM2004_RESULT_WRONG = "incorrect";
var SCORM2004_RESULT_UNANTICIPATED = "unanticipated";
var SCORM2004_RESULT_NEUTRAL = "neutral";
var SCORM2004_INTERACTION_TYPE_TRUE_FALSE = "true-false";
var SCORM2004_INTERACTION_TYPE_CHOICE = "choice";
var SCORM2004_INTERACTION_TYPE_FILL_IN = "fill-in";
var SCORM2004_INTERACTION_TYPE_LONG_FILL_IN = "long-fill-in";
var SCORM2004_INTERACTION_TYPE_MATCHING = "matching";
var SCORM2004_INTERACTION_TYPE_PERFORMANCE = "performance";
var SCORM2004_INTERACTION_TYPE_SEQUENCING = "sequencing";
var SCORM2004_INTERACTION_TYPE_LIKERT = "likert";
var SCORM2004_INTERACTION_TYPE_NUMERIC = "numeric";
var SCORM2004_NO_ERROR = "0";
var SCORM2004_ERROR_INVALID_PREFERENCE = "-1";
var SCORM2004_ERROR_INVALID_STATUS = "-2";
var SCORM2004_ERROR_INVALID_SPEED = "-3";
var SCORM2004_ERROR_INVALID_TIMESPAN = "-4";
var SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION = "-5";
var SCORM2004_ERROR_INVALID_DECIMAL = "-6";
var SCORM2004_ERROR_INVALID_CREDIT = "-7";
var SCORM2004_ERROR_INVALID_LESSON_MODE = "-8";
var SCORM2004_ERROR_INVALID_ENTRY = "-9";
var SCORM2004_TRUE = "true";
var SCORM2004_FALSE = "false";
var SCORM2004_EARLIEST_DATE = new Date("1/1/1900");
var intSCORM2004Error = SCORM2004_NO_ERROR;
var strSCORM2004ErrorString = "";
var strSCORM2004ErrorDiagnostic = "";
var SCORM2004_objAPI = null;
var blnReviewModeSoReadOnly = false;
var blnSCORM2004_SSP_Is_Supported = null;
function SCORM2004_Initialize() {
  WriteToDebug("In SCORM2004_Initialize");
  var blnResult = true;
  SCORM2004_ClearErrorInfo();
  WriteToDebug("Grabbing API");
  try {
    SCORM2004_objAPI = SCORM2004_GrabAPI();
  } catch (e) {
    WriteToDebug("Error grabbing 1.2 API-" + e.name + ":" + e.message);
  }
  if (typeof SCORM2004_objAPI == "undefined" || SCORM2004_objAPI == null) {
    WriteToDebug("Unable to acquire SCORM API:");
    WriteToDebug("SCORM2004_objAPI=" + typeof SCORM2004_objAPI);
    InitializeExecuted(
      false,
      "Error - unable to acquire LMS API, content may not play properly and results may not be recorded.  Please contact technical support."
    );
    return false;
  }
  WriteToDebug("Calling LMSInit");
  blnResult = SCORM2004_CallInitialize();
  if (!blnResult) {
    WriteToDebug("ERROR Initializing LMS");
    InitializeExecuted(false, "Error initializing communications with LMS");
    return false;
  }
  if (!PREVENT_STATUS_CHANGE_DURING_INIT) {
    if (SCORM2004_GetStatus() == LESSON_STATUS_NOT_ATTEMPTED) {
      WriteToDebug("Setting Status to Incomplete");
      blnResult = SCORM2004_CallSetValue(
        "cmi.completion_status",
        SCORM2004_INCOMPLETE
      );
    }
  }
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.exit",
      SCORM2004_TranslateExitTypeToSCORM(DEFAULT_EXIT_TYPE)
    ) && blnResult;
  if (SCORM2004_GetLessonMode() == MODE_REVIEW) {
    if (
      !(typeof REVIEW_MODE_IS_READ_ONLY == "undefined") &&
      REVIEW_MODE_IS_READ_ONLY === true
    ) {
      blnReviewModeSoReadOnly = true;
    }
  }
  WriteToDebug("Calling InitializeExecuted with parameter-" + blnResult);
  InitializeExecuted(blnResult, "");
  return;
}
function SCORM2004_Finish(strExitType, blnStatusWasSet) {
  WriteToDebug(
    "In SCORM2004_Finish strExitType=" +
      strExitType +
      ", blnStatusWasSet=" +
      blnStatusWasSet
  );
  var strStatusAfterCompletion;
  var blnResult = true;
  SCORM2004_ClearErrorInfo();
  if (strExitType == EXIT_TYPE_FINISH && !blnStatusWasSet) {
    WriteToDebug("Getting completion status");
    strStatusAfterCompletion = SCORM2004_GetCompletionStatus();
    WriteToDebug("Setting completion status to " + strStatusAfterCompletion);
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.completion_status",
        strStatusAfterCompletion
      ) && blnResult;
  }
  if (strExitType == EXIT_TYPE_SUSPEND && USE_2004_SUSPENDALL_NAVREQ) {
    WriteToDebug("Setting adl.nav.request to suspendAll");
    blnResult = SCORM2004_CallSetValue("adl.nav.request", "suspendAll");
  }
  WriteToDebug("Setting Exit");
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.exit",
      SCORM2004_TranslateExitTypeToSCORM(strExitType)
    ) && blnResult;
  WriteToDebug("Calling Commit");
  blnResult = SCORM2004_CallCommit() && blnResult;
  WriteToDebug("Calling Finish");
  blnResult = SCORM2004_CallTerminate() && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_CommitData() {
  WriteToDebug("In SCORM2004_CommitData");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallCommit();
}
function SCORM2004_GetStudentID() {
  WriteToDebug("In SCORM2004_GetStudentID");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.learner_id");
}
function SCORM2004_GetStudentName() {
  WriteToDebug("In SCORM2004_GetStudentName");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.learner_name");
}
function SCORM2004_GetBookmark() {
  WriteToDebug("In SCORM2004_GetBookmark");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.location");
}
function SCORM2004_SetBookmark(strBookmark) {
  WriteToDebug("In SCORM2004_SetBookmark strBookmark=" + strBookmark);
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallSetValue("cmi.location", strBookmark);
}
function SCORM2004_GetDataChunk() {
  WriteToDebug("In SCORM2004_GetDataChunk");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.suspend_data");
}
function SCORM2004_SetDataChunk(strData) {
  WriteToDebug("In SCORM2004_SetDataChunk");
  SCORM2004_ClearErrorInfo();
  if (USE_STRICT_SUSPEND_DATA_LIMITS == true) {
    if (strData.length > 4000) {
      WriteToDebug(
        "SCORM2004_SetDataChunk - suspend_data too large for SCORM 2004 2nd ed (4000 character limit) but will try to persist anyway."
      );
      if (strData.length > 64000) {
        WriteToDebug(
          "SCORM2004_SetDataChunk - suspend_data too large for SCORM 2004 3rd & 4th ed (64000 character limit) so failing to persist."
        );
        return false;
      } else {
        return SCORM2004_CallSetValue("cmi.suspend_data", strData);
      }
    } else {
      return SCORM2004_CallSetValue("cmi.suspend_data", strData);
    }
  } else {
    return SCORM2004_CallSetValue("cmi.suspend_data", strData);
  }
}
function SCORM2004_GetLaunchData() {
  WriteToDebug("In SCORM2004_GetLaunchData");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.launch_data");
}
function SCORM2004_GetComments() {
  WriteToDebug("In SCORM2004_GetComments");
  SCORM2004_ClearErrorInfo();
  var intCommentCount;
  var strComments = "";
  intCommentCount = SCORM2004_CallGetValue("cmi.comments_from_learner._count");
  for (var i = 0; i < intCommentCount; i++) {
    if (strComments.length > 0) {
      strComments += " | ";
    }
    strComments += SCORM2004_CallGetValue(
      "cmi.comments_from_learner." + i + ".comment"
    );
  }
  return strComments;
}
function SCORM2004_WriteComment(strComment) {
  WriteToDebug("In SCORM2004_WriteComment strComment=" + strComment);
  var intCurrentIndex;
  var blnResult;
  SCORM2004_ClearErrorInfo();
  if (strComment.search(/ \| /) == 0) {
    strComment = strComment.substr(3);
  }
  strComment.replace(/\|\|/g, "|");
  intCurrentIndex = SCORM2004_CallGetValue("cmi.comments_from_learner._count");
  blnResult = SCORM2004_CallSetValue(
    "cmi.comments_from_learner." + intCurrentIndex + ".comment",
    strComment
  );
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.comments_from_learner." + intCurrentIndex + ".timestamp",
      ConvertDateToIso8601TimeStamp(new Date())
    ) && blnResult;
  return blnResult;
}
function SCORM2004_GetLMSComments() {
  WriteToDebug("In SCORM2004_GetLMSComments");
  SCORM2004_ClearErrorInfo();
  var intCommentCount;
  var strComments = "";
  intCommentCount = SCORM2004_CallGetValue("cmi.comments_from_lms._count");
  for (var i = 0; i < intCommentCount; i++) {
    if (strComments.length > 0) {
      strComments += " \r\n";
    }
    strComments += SCORM2004_CallGetValue(
      "cmi.comments_from_lms." + i + ".comment"
    );
  }
  return strComments;
}
function SCORM2004_GetAudioPlayPreference() {
  var intTempPreference;
  WriteToDebug("In SCORM2004_GetAudioPlayPreference");
  SCORM2004_ClearErrorInfo();
  intTempPreference = SCORM2004_CallGetValue(
    "cmi.learner_preference.audio_level"
  );
  if (intTempPreference == "") {
    intTempPreference = 0;
  }
  intTempPreference = parseInt(intTempPreference, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0) {
    WriteToDebug("Returning On");
    return PREFERENCE_ON;
  } else if (intTempPreference <= 0) {
    WriteToDebug("Returning Off");
    return PREFERENCE_OFF;
  } else {
    WriteToDebug("Error: Invalid preference");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_PREFERENCE,
      "Invalid audio preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
}
function SCORM2004_GetAudioVolumePreference() {
  var intTempPreference;
  WriteToDebug("In SCORM2004_GetAudioVollumePreference");
  SCORM2004_ClearErrorInfo();
  intTempPreference = SCORM2004_CallGetValue(
    "cmi.learner_preference.audio_level"
  );
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference == "") {
    intTempPreference = 100;
  }
  intTempPreference = parseInt(intTempPreference, 10);
  if (intTempPreference <= 0) {
    WriteToDebug("Setting to 100");
    intTempPreference = 100;
  }
  if (!(intTempPreference > 0 && intTempPreference <= 100)) {
    WriteToDebug("ERROR: invalid preference");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_PREFERENCE,
      "Invalid audio preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
  WriteToDebug("Returning " + intTempPreference);
  return intTempPreference;
}
function SCORM2004_SetAudioPreference(PlayPreference, intPercentOfMaxVolume) {
  WriteToDebug(
    "In SCORM2004_SetAudioPreference PlayPreference=" +
      PlayPreference +
      ", intPercentOfMaxVolume=" +
      intPercentOfMaxVolume
  );
  SCORM2004_ClearErrorInfo();
  if (PlayPreference == PREFERENCE_OFF) {
    WriteToDebug("Setting percent to 0");
    intPercentOfMaxVolume = 0;
  }
  return SCORM2004_CallSetValue(
    "cmi.learner_preference.audio_level",
    intPercentOfMaxVolume
  );
}
function SCORM2004_SetLanguagePreference(strLanguage) {
  WriteToDebug("In SCORM2004_SetLanguagePreference strLanguage=" + strLanguage);
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallSetValue("cmi.learner_preference.language", strLanguage);
}
function SCORM2004_GetLanguagePreference() {
  WriteToDebug("In SCORM2004_GetLanguagePreference");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.learner_preference.language");
}
function SCORM2004_SetSpeedPreference(intPercentOfMax) {
  WriteToDebug(
    "In SCORM2004_SetSpeedPreference intPercentOfMax=" + intPercentOfMax
  );
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallSetValue(
    "cmi.learner_preference.delivery_speed",
    intPercentOfMax
  );
}
function SCORM2004_GetSpeedPreference() {
  var intSCORMSpeed;
  var intPercentOfMax;
  WriteToDebug("In SCORM2004_GetSpeedPreference");
  SCORM2004_ClearErrorInfo();
  intSCORMSpeed = SCORM2004_CallGetValue(
    "cmi.learner_preference.delivery_speed"
  );
  WriteToDebug("intSCORMSpeed=" + intSCORMSpeed);
  if (intSCORMSpeed == "") {
    WriteToDebug("Detected empty string, defaulting to 100");
    intSCORMSpeed = 100;
  }
  intSCORMSpeed = parseInt(intSCORMSpeed, 10);
  if (intSCORMSpeed < 0) {
    WriteToDebug("ERROR - out of range");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - out of range",
      "intSCORMSpeed=" + intSCORMSpeed
    );
    return null;
  }
  WriteToDebug("intSCORMSpeed " + intSCORMSpeed);
  return intSCORMSpeed;
}
function SCORM2004_SetTextPreference(intPreference) {
  WriteToDebug("In SCORM2004_SetTextPreference intPreference=" + intPreference);
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallSetValue(
    "cmi.learner_preference.audio_captioning",
    intPreference
  );
}
function SCORM2004_GetTextPreference() {
  var intTempPreference;
  WriteToDebug("In SCORM2004_GetTextPreference");
  SCORM2004_ClearErrorInfo();
  intTempPreference = SCORM2004_CallGetValue(
    "cmi.learner_preference.audio_captioning"
  );
  intTempPreference = parseInt(intTempPreference, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0) {
    WriteToDebug("Returning On");
    return PREFERENCE_ON;
  } else if (intTempPreference == 0 || intTempPreference == "") {
    WriteToDebug("Returning Default");
    return PREFERENCE_DEFAULT;
  } else if (intTempPreference < 0) {
    WriteToDebug("Returning Off");
    return PREFERENCE_OFF;
  } else {
    WriteToDebug("Error: Invalid preference");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_PREFERENCE,
      "Invalid text preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
}
function SCORM2004_GetPreviouslyAccumulatedTime() {
  var strIso8601Time;
  var intMilliseconds;
  WriteToDebug("In SCORM2004_GetPreviouslyAccumulatedTime");
  SCORM2004_ClearErrorInfo();
  strIso8601Time = SCORM2004_CallGetValue("cmi.total_time");
  WriteToDebug("strIso8601Time=" + strIso8601Time);
  if (!IsValidIso8601TimeSpan(strIso8601Time)) {
    WriteToDebug("ERROR - Invalid Iso8601Time");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_TIMESPAN,
      "Invalid timespan received from LMS",
      "strTime=" + strIso8601Time
    );
    return null;
  }
  intMilliseconds = ConvertScorm2004TimeToMS(strIso8601Time);
  WriteToDebug("Returning " + intMilliseconds);
  return intMilliseconds;
}
function SCORM2004_SaveTime(intMilliSeconds) {
  var strISO8601Time;
  WriteToDebug("In SCORM2004_SaveTime intMilliSeconds=" + intMilliSeconds);
  SCORM2004_ClearErrorInfo();
  strISO8601Time = ConvertMilliSecondsIntoSCORM2004Time(intMilliSeconds);
  WriteToDebug("strISO8601Time=" + strISO8601Time);
  return SCORM2004_CallSetValue("cmi.session_time", strISO8601Time);
}
function SCORM2004_GetMaxTimeAllowed() {
  var strIso8601Time;
  var intMilliseconds;
  WriteToDebug("In SCORM2004_GetMaxTimeAllowed");
  SCORM2004_ClearErrorInfo();
  strIso8601Time = SCORM2004_CallGetValue("cmi.max_time_allowed");
  WriteToDebug("strIso8601Time=" + strIso8601Time);
  if (strIso8601Time == "") {
    strIso8601Time = "20Y";
  }
  if (!IsValidIso8601TimeSpan(strIso8601Time)) {
    WriteToDebug("ERROR - Invalid Iso8601Time");
    SCORM2004_SetErrorInfoManually(
      SCORM_ERROR_INVALID_TIMESPAN,
      "Invalid timespan received from LMS",
      "strIso8601Time=" + strIso8601Time
    );
    return null;
  }
  intMilliseconds = ConvertScorm2004TimeToMS(ConvertScorm2004TimeToMS);
  WriteToDebug("intMilliseconds=" + intMilliseconds);
  return intMilliseconds;
}
function SCORM2004_DisplayMessageOnTimeout() {
  var strTLA;
  WriteToDebug("In SCORM2004_DisplayMessageOnTimeout");
  SCORM2004_ClearErrorInfo();
  strTLA = SCORM2004_CallGetValue("cmi.time_limit_action");
  WriteToDebug("strTLA=" + strTLA);
  if (
    strTLA == SCORM2004_TLA_EXIT_MESSAGE ||
    strTLA == SCORM2004_TLA_CONTINUE_MESSAGE
  ) {
    WriteToDebug("returning true");
    return true;
  } else if (
    strTLA == SCORM2004_TLA_EXIT_NO_MESSAGE ||
    strTLA == SCORM2004_TLA_CONTINUE_NO_MESSAGE ||
    strTLA == ""
  ) {
    WriteToDebug("returning false");
    return false;
  } else {
    WriteToDebug("Error invalid TLA");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION,
      "Invalid time limit action received from LMS",
      "strTLA=" + strTLA
    );
    return null;
  }
}
function SCORM2004_ExitOnTimeout() {
  var strTLA;
  WriteToDebug("In SCORM2004_ExitOnTimeout");
  SCORM2004_ClearErrorInfo();
  strTLA = SCORM2004_CallGetValue("cmi.time_limit_action");
  WriteToDebug("strTLA=" + strTLA);
  if (
    strTLA == SCORM2004_TLA_EXIT_MESSAGE ||
    strTLA == SCORM2004_TLA_EXIT_NO_MESSAGE
  ) {
    WriteToDebug("returning true");
    return true;
  } else if (
    strTLA == SCORM2004_TLA_CONTINUE_MESSAGE ||
    strTLA == SCORM2004_TLA_CONTINUE_NO_MESSAGE ||
    strTLA == ""
  ) {
    WriteToDebug("returning false");
    return false;
  } else {
    WriteToDebug("ERROR invalid TLA");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_TIME_LIMIT_ACTION,
      "Invalid time limit action received from LMS",
      "strTLA=" + strTLA
    );
    return null;
  }
}
function SCORM2004_GetPassingScore() {
  var fltScore;
  WriteToDebug("In SCORM2004_GetPassingScore");
  SCORM2004_ClearErrorInfo();
  fltScore = SCORM2004_CallGetValue("cmi.scaled_passing_score");
  WriteToDebug("fltScore=" + fltScore);
  if (fltScore == "") {
    fltScore = 0;
  }
  if (!IsValidDecimal(fltScore)) {
    WriteToDebug("Error - score is not a valid decimal");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_DECIMAL,
      "Invalid mastery score received from LMS",
      "fltScore=" + fltScore
    );
    return null;
  }
  fltScore = parseFloat(fltScore);
  fltScore = fltScore * 100;
  WriteToDebug("returning fltScore-" + fltScore);
  return fltScore;
}
function SCORM2004_SetScore(intScore, intMaxScore, intMinScore) {
  var blnResult;
  var fltNormalizedScore;
  intScore = RoundToPrecision(intScore, 7);
  intMaxScore = RoundToPrecision(intMaxScore, 7);
  intMinScore = RoundToPrecision(intMinScore, 7);
  WriteToDebug(
    "In SCORM2004_SetScore intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  SCORM2004_ClearErrorInfo();
  fltNormalizedScore = RoundToPrecision(intScore / 100, 7);
  blnResult = SCORM2004_CallSetValue("cmi.score.raw", intScore);
  blnResult = SCORM2004_CallSetValue("cmi.score.max", intMaxScore) && blnResult;
  blnResult = SCORM2004_CallSetValue("cmi.score.min", intMinScore) && blnResult;
  blnResult =
    SCORM2004_CallSetValue("cmi.score.scaled", fltNormalizedScore) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_GetScore() {
  WriteToDebug("In SCORM2004_GetScore");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.score.raw");
}
function SCORM2004_GetScaledScore() {
  WriteToDebug("In SCORM2004_GetScaledScore");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("cmi.score.scaled");
}
function SCORM2004_RecordInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime,
  SCORM2004InteractionType
) {
  var blnResult;
  var intInteractionIndex;
  var strResult;
  if (!IsNumeric(blnCorrect)) {
    blnCorrect = new String(blnCorrect);
  }
  SCORM2004_ClearErrorInfo();
  intInteractionIndex = SCORM2004_CallGetValue("cmi.interactions._count");
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  if (intInteractionIndex == "") {
    WriteToDebug("Setting Interaction Index to 0");
    intInteractionIndex = 0;
  }
  if (
    blnCorrect == true ||
    blnCorrect == "true" ||
    blnCorrect == INTERACTION_RESULT_CORRECT
  ) {
    strResult = SCORM2004_RESULT_CORRECT;
  } else if (
    String(blnCorrect) == "false" ||
    blnCorrect == INTERACTION_RESULT_WRONG
  ) {
    strResult = SCORM2004_RESULT_WRONG;
  } else if (blnCorrect == INTERACTION_RESULT_UNANTICIPATED) {
    strResult = SCORM2004_RESULT_UNANTICIPATED;
  } else if (blnCorrect == INTERACTION_RESULT_NEUTRAL) {
    strResult = SCORM2004_RESULT_NEUTRAL;
  } else if (IsNumeric(blnCorrect)) {
    strResult = blnCorrect;
  } else {
    strResult = "";
  }
  WriteToDebug("strResult=" + strResult);
  strID = CreateValidIdentifier(strID);
  blnResult = SCORM2004_CallSetValue(
    "cmi.interactions." + intInteractionIndex + ".id",
    strID
  );
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.interactions." + intInteractionIndex + ".type",
      SCORM2004InteractionType
    ) && blnResult;
  if (strResponse !== null) {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." + intInteractionIndex + ".learner_response",
        strResponse
      ) && blnResult;
  }
  if (strResult != undefined && strResult != null && strResult != "") {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." + intInteractionIndex + ".result",
        strResult
      ) && blnResult;
  }
  if (
    strCorrectResponse != undefined &&
    strCorrectResponse != null &&
    strCorrectResponse != ""
  ) {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." +
          intInteractionIndex +
          ".correct_responses.0.pattern",
        strCorrectResponse
      ) && blnResult;
  }
  if (
    strDescription != undefined &&
    strDescription != null &&
    strDescription != ""
  ) {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." + intInteractionIndex + ".description",
        strDescription
      ) && blnResult;
  }
  if (intWeighting != undefined && intWeighting != null && intWeighting != "") {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." + intInteractionIndex + ".weighting",
        intWeighting
      ) && blnResult;
  }
  if (intLatency != undefined && intLatency != null && intLatency != "") {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." + intInteractionIndex + ".latency",
        ConvertMilliSecondsIntoSCORM2004Time(intLatency)
      ) && blnResult;
  }
  if (
    strLearningObjectiveID != undefined &&
    strLearningObjectiveID != null &&
    strLearningObjectiveID != ""
  ) {
    blnResult =
      SCORM2004_CallSetValue(
        "cmi.interactions." + intInteractionIndex + ".objectives.0.id",
        strLearningObjectiveID
      ) && blnResult;
  }
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.interactions." + intInteractionIndex + ".timestamp",
      ConvertDateToIso8601TimeStamp(dtmTime)
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_RecordTrueFalseInteraction(
  strID,
  blnResponse,
  blnCorrect,
  blnCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordTrueFalseInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strCorrectResponse = null;
  if (blnResponse) {
    strResponse = "true";
  } else if (blnResponse !== null) {
    strResponse = "false";
  }
  if (blnCorrectResponse == true) {
    strCorrectResponse = "true";
  } else if (blnCorrectResponse == false) {
    strCorrectResponse = "false";
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_TRUE_FALSE
  );
}
function SCORM2004_RecordMultipleChoiceInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordMultipleChoiceInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strCorrectResponse = "";
  if (aryResponse !== null) {
    strResponse = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      strResponse += aryResponse[i].Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    strCorrectResponse += aryCorrectResponse[i].Long;
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_CHOICE
  );
}
function SCORM2004_RecordFillInInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordFillInInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var interactionType;
  if (strCorrectResponse == null) {
    strCorrectResponse = "";
  }
  strCorrectResponse = new String(strCorrectResponse);
  if (strCorrectResponse.length > 250 || strResponse.length > 250) {
    interactionType = SCORM2004_INTERACTION_TYPE_LONG_FILL_IN;
  } else {
    interactionType = SCORM2004_INTERACTION_TYPE_FILL_IN;
  }
  if (strCorrectResponse.length > 4000) {
    strCorrectResponse = strCorrectResponse.substr(0, 4000);
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    interactionType
  );
}
function SCORM2004_RecordMatchingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordMatchingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strCorrectResponse = "";
  if (aryResponse !== null) {
    strResponse = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      strResponse +=
        aryResponse[i].Source.Long + "[.]" + aryResponse[i].Target.Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    strCorrectResponse +=
      aryCorrectResponse[i].Source.Long +
      "[.]" +
      aryCorrectResponse[i].Target.Long;
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_MATCHING
  );
}
function SCORM2004_RecordPerformanceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordPerformanceInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strResponse !== null) {
    strResponse = new String(strResponse);
    if (strResponse.length > 250) {
      strResponse = strResponse.substr(0, 250);
    }
    strResponse = "[.]" + strResponse;
  }
  if (strCorrectResponse == null) {
    strCorrectResponse = "";
  }
  strCorrectResponse = new String(strCorrectResponse);
  if (strCorrectResponse.length > 250) {
    strCorrectResponse = strCorrectResponse.substr(0, 250);
  }
  strCorrectResponse = "[.]" + strCorrectResponse;
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_PERFORMANCE
  );
}
function SCORM2004_RecordSequencingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordSequencingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strCorrectResponse = "";
  if (aryResponse !== null) {
    strResponse = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      strResponse += aryResponse[i].Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    strCorrectResponse += aryCorrectResponse[i].Long;
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_SEQUENCING
  );
}
function SCORM2004_RecordLikertInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In RecordLikertInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strCorrectResponse = "";
  if (response !== null) {
    strResponse = response.Long;
  }
  if (correctResponse != null) {
    strCorrectResponse = correctResponse.Long;
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_LIKERT
  );
}
function SCORM2004_RecordNumericInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM2004_RecordNumericInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strCorrectResponse != undefined && strCorrectResponse != null) {
    if (IsValidDecimal(strCorrectResponse)) {
      strCorrectResponse = strCorrectResponse + "[:]" + strCorrectResponse;
      WriteToDebug(
        "SCORM2004_RecordNumericInteraction received decimal correct response and converted to range, strCorrectResponse=" +
          strCorrectResponse
      );
    }
    if (!IsValidDecimalRange(strCorrectResponse)) {
      WriteToDebug(
        "Returning False - SCORM2004_RecordNumericInteraction received invalid correct response decimal range, strCorrectResponse=" +
          strCorrectResponse
      );
      return false;
    }
    if (
      ConvertDecimalRangeToDecimalBasedOnLearnerResponse(
        strCorrectResponse,
        strResponse,
        blnCorrect
      ) === null
    ) {
      WriteToDebug(
        "Returning False - SCORM2004_RecordNumericInteraction received invalid correct response decimal range, response and correct indicator, strCorrectResponse=" +
          strCorrectResponse +
          ", strResponse=" +
          strResponse +
          ", blnCorrect=" +
          blnCorrect
      );
      return false;
    }
  }
  return SCORM2004_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM2004_INTERACTION_TYPE_NUMERIC
  );
}
function SCORM2004_GetEntryMode() {
  var strEntry;
  WriteToDebug("In SCORM2004_GetEntryMode");
  SCORM2004_ClearErrorInfo();
  strEntry = SCORM2004_CallGetValue("cmi.entry");
  WriteToDebug("strEntry=" + strEntry);
  if (strEntry == SCORM2004_ENTRY_ABINITIO) {
    WriteToDebug("Returning first time");
    return ENTRY_FIRST_TIME;
  } else if (strEntry == SCORM2004_ENTRY_RESUME) {
    WriteToDebug("Returning resume");
    return ENTRY_RESUME;
  } else if (strEntry == SCORM2004_ENTRY_NORMAL) {
    WriteToDebug("returning normal");
    return ENTRY_REVIEW;
  } else {
    WriteToDebug("ERROR - invalid entry mode");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_ENTRY,
      "Invalid entry vocab received from LMS",
      "strEntry=" + strEntry
    );
    return null;
  }
}
function SCORM2004_GetLessonMode() {
  var strLessonMode;
  WriteToDebug("In SCORM2004_GetLessonMode");
  SCORM2004_ClearErrorInfo();
  strLessonMode = SCORM2004_CallGetValue("cmi.mode");
  WriteToDebug("strLessonMode=" + strLessonMode);
  if (strLessonMode == SCORM2004_BROWSE) {
    WriteToDebug("Returning browse");
    return MODE_BROWSE;
  } else if (strLessonMode == SCORM2004_NORMAL) {
    WriteToDebug("returning normal");
    return MODE_NORMAL;
  } else if (strLessonMode == SCORM2004_REVIEW) {
    WriteToDebug("Returning Review");
    return MODE_REVIEW;
  } else {
    WriteToDebug("ERROR - invalid lesson mode");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_LESSON_MODE,
      "Invalid lesson_mode vocab received from LMS",
      "strLessonMode=" + strLessonMode
    );
    return null;
  }
}
function SCORM2004_GetTakingForCredit() {
  var strCredit;
  WriteToDebug("In SCORM2004_GetTakingForCredit");
  SCORM2004_ClearErrorInfo();
  strCredit = SCORM2004_CallGetValue("cmi.credit");
  WriteToDebug("strCredit=" + strCredit);
  if (strCredit == "credit") {
    WriteToDebug("Returning true");
    return true;
  } else if (strCredit == "no-credit") {
    WriteToDebug("Returning false");
    return false;
  } else {
    WriteToDebug("ERROR - invalid credit");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_CREDIT,
      "Invalid credit vocab received from LMS",
      "strCredit=" + strCredit
    );
    return null;
  }
}
function SCORM2004_SetObjectiveScore(
  strObjectiveID,
  intScore,
  intMaxScore,
  intMinScore
) {
  var intObjectiveIndex;
  var blnResult;
  var fltNormalizedScore;
  intScore = RoundToPrecision(intScore, 7);
  intMaxScore = RoundToPrecision(intMaxScore, 7);
  intMinScore = RoundToPrecision(intMinScore, 7);
  WriteToDebug(
    "In SCORM2004_SetObjectiveScore, strObejctiveID=" +
      strObjectiveID +
      ", intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  fltNormalizedScore = RoundToPrecision(intScore / 100, 7);
  blnResult = SCORM2004_CallSetValue(
    "cmi.objectives." + intObjectiveIndex + ".id",
    strObjectiveID
  );
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.raw",
      intScore
    ) && blnResult;
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.max",
      intMaxScore
    ) && blnResult;
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.min",
      intMinScore
    ) && blnResult;
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.scaled",
      fltNormalizedScore
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  var intObjectiveIndex;
  var blnResult;
  var strSCORMSuccessStatus = "";
  var strSCORMCompletionStatus = "";
  WriteToDebug(
    "In SCORM2004_SetObjectiveStatus strObjectiveID=" +
      strObjectiveID +
      ", Lesson_Status=" +
      Lesson_Status
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  if (Lesson_Status == LESSON_STATUS_PASSED) {
    strSCORMSuccessStatus = SCORM2004_PASSED;
    strSCORMCompletionStatus = SCORM2004_COMPLETED;
  } else if (Lesson_Status == LESSON_STATUS_FAILED) {
    strSCORMSuccessStatus = SCORM2004_FAILED;
    strSCORMCompletionStatus = SCORM2004_COMPLETED;
  } else if (Lesson_Status == LESSON_STATUS_COMPLETED) {
    strSCORMSuccessStatus = SCORM2004_UNKNOWN;
    strSCORMCompletionStatus = SCORM2004_COMPLETED;
  } else if (Lesson_Status == LESSON_STATUS_BROWSED) {
    strSCORMSuccessStatus = SCORM2004_UNKNOWN;
    strSCORMCompletionStatus = SCORM2004_COMPLETED;
  } else if (Lesson_Status == LESSON_STATUS_INCOMPLETE) {
    strSCORMSuccessStatus = SCORM2004_UNKNOWN;
    strSCORMCompletionStatus = SCORM2004_INCOMPLETE;
  } else if (Lesson_Status == LESSON_STATUS_NOT_ATTEMPTED) {
    strSCORMSuccessStatus = SCORM2004_UNKNOWN;
    strSCORMCompletionStatus = SCORM2004_NOT_ATTEMPTED;
  }
  WriteToDebug("strSCORMSuccessStatus=" + strSCORMSuccessStatus);
  WriteToDebug("strSCORMCompletionStatus=" + strSCORMCompletionStatus);
  blnResult = SCORM2004_CallSetValue(
    "cmi.objectives." + intObjectiveIndex + ".id",
    strObjectiveID
  );
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".success_status",
      strSCORMSuccessStatus
    ) && blnResult;
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".completion_status",
      strSCORMCompletionStatus
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_SetObjectiveDescription(
  strObjectiveID,
  strObjectiveDescription
) {
  var intObjectiveIndex;
  WriteToDebug(
    "In SCORM2004_SetObjectiveDescription strObjectiveID=" +
      strObjectiveID +
      ", strObjectiveDescription=" +
      strObjectiveDescription
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  blnResult = SCORM2004_CallSetValue(
    "cmi.objectives." + intObjectiveIndex + ".id",
    strObjectiveID
  );
  blnResult =
    SCORM2004_CallSetValue(
      "cmi.objectives." + intObjectiveIndex + ".description",
      strObjectiveDescription
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_GetObjectiveScore(strObjectiveID) {
  var intObjectiveIndex;
  WriteToDebug(
    "In SCORM2004_GetObjectiveScore, strObejctiveID=" + strObjectiveID
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  return SCORM2004_CallGetValue(
    "cmi.objectives." + intObjectiveIndex + ".score.raw"
  );
}
function SCORM2004_GetObjectiveStatus(strObjectiveID) {
  var intObjectiveIndex;
  var strSuccessStatus;
  var strCompletionStatus;
  WriteToDebug(
    "In SCORM2004_GetObjectiveStatus, strObejctiveID=" + strObjectiveID
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  strSuccessStatus = SCORM2004_CallGetValue(
    "cmi.objectives." + intObjectiveIndex + ".success_status"
  );
  strCompletionStatus = SCORM2004_CallGetValue(
    "cmi.objectives." + intObjectiveIndex + ".completion_status"
  );
  if (strSuccessStatus == SCORM2004_PASSED) {
    WriteToDebug("returning Passed");
    return LESSON_STATUS_PASSED;
  } else if (strSuccessStatus == SCORM2004_FAILED) {
    WriteToDebug("Returning Failed");
    return LESSON_STATUS_FAILED;
  } else if (strCompletionStatus == SCORM2004_COMPLETED) {
    WriteToDebug("Returning Completed");
    return LESSON_STATUS_COMPLETED;
  } else if (strCompletionStatus == SCORM2004_INCOMPLETE) {
    WriteToDebug("Returning Incomplete");
    return LESSON_STATUS_INCOMPLETE;
  } else if (
    strCompletionStatus == SCORM2004_NOT_ATTEMPTED ||
    strCompletionStatus == SCORM2004_UNKNOWN ||
    strCompletionStatus == ""
  ) {
    WriteToDebug("Returning Not Attempted");
    return LESSON_STATUS_NOT_ATTEMPTED;
  } else {
    WriteToDebug("ERROR - status not found");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_STATUS,
      "Invalid objective status received from LMS or initial status not yet recorded for objective",
      "strCompletionStatus=" + strCompletionStatus
    );
    return null;
  }
}
function SCORM2004_GetObjectiveProgressMeasure(strObjectiveID) {
  var strProgressMeasure = SCORM2004_CallGetValue(
    "cmi.objectives." + strObjectiveID + ".progress_measure"
  );
  return strProgressMeasure;
}
function SCORM2004_GetObjectiveDescription(strObjectiveID) {
  var intObjectiveIndex;
  var strSuccessStatus;
  var strCompletionStatus;
  WriteToDebug(
    "In SCORM2004_GetObjectiveDescription, strObejctiveID=" + strObjectiveID
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  strDescription = SCORM2004_CallGetValue(
    "cmi.objectives." + intObjectiveIndex + ".description"
  );
  return strDescription;
}
function SCORM2004_FindObjectiveIndexFromID(strObjectiveID) {
  var intCount;
  var i;
  var strTempID;
  WriteToDebug("In SCORM2004_FindObjectiveIndexFromID");
  intCount = SCORM2004_CallGetValue("cmi.objectives._count");
  if (intCount == "") {
    WriteToDebug("Setting intCount=0");
    return 0;
  }
  intCount = parseInt(intCount, 10);
  WriteToDebug("intCount=" + intCount);
  for (i = 0; i < intCount; i++) {
    WriteToDebug("Checking index " + i);
    strTempID = SCORM2004_CallGetValue("cmi.objectives." + i + ".id");
    WriteToDebug("ID=" + strTempID);
    if (strTempID == strObjectiveID) {
      WriteToDebug("Found Matching index");
      return i;
    }
  }
  WriteToDebug("Did not find match, returning count");
  return intCount;
}
function SCORM2004_CreateValidIdentifier(str) {
  if (USE_LEGACY_IDENTIFIERS_FOR_2004) {
    return CreateValidIdentifierLegacy(str);
  }
  return CreateUriIdentifier(str);
}
function SCORM2004_SetFailed() {
  WriteToDebug("In SCORM2004_SetFailed");
  var blnResult;
  var strCompletionStatus;
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallSetValue("cmi.success_status", SCORM2004_FAILED);
  if (PASS_FAIL_SETS_COMPLETION_FOR_2004) {
    blnResult =
      SCORM2004_CallSetValue("cmi.completion_status", SCORM2004_COMPLETED) &&
      blnResult;
  } else {
    strCompletionStatus = SCORM2004_CallGetValue("cmi.completion_status");
    if (strCompletionStatus !== SCORM2004_COMPLETED) {
      WriteToDebug("Overriding blnStatusWasSet to false.");
      blnStatusWasSet = false;
    }
  }
  return blnResult;
}
function SCORM2004_SetPassed() {
  WriteToDebug("In SCORM2004_SetPassed");
  var blnResult;
  var strCompletionStatus;
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallSetValue("cmi.success_status", SCORM2004_PASSED);
  if (PASS_FAIL_SETS_COMPLETION_FOR_2004) {
    blnResult =
      SCORM2004_CallSetValue("cmi.completion_status", SCORM2004_COMPLETED) &&
      blnResult;
  } else {
    strCompletionStatus = SCORM2004_CallGetValue("cmi.completion_status");
    if (strCompletionStatus !== SCORM2004_COMPLETED) {
      WriteToDebug("Overriding blnStatusWasSet to false.");
      blnStatusWasSet = false;
    }
  }
  return blnResult;
}
function SCORM2004_SetCompleted() {
  WriteToDebug("In SCORM2004_SetCompleted");
  var blnResult;
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallSetValue(
    "cmi.completion_status",
    SCORM2004_COMPLETED
  );
  return blnResult;
}
function SCORM2004_ResetStatus() {
  WriteToDebug("In SCORM2004_ResetStatus");
  var blnResult;
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallSetValue("cmi.success_status", SCORM2004_UNKNOWN);
  blnResult =
    SCORM2004_CallSetValue("cmi.completion_status", SCORM2004_INCOMPLETE) &&
    blnResult;
  return blnResult;
}
function SCORM2004_GetStatus() {
  var strSuccessStatus;
  var strCompletionStatus;
  WriteToDebug("In SCORM2004_GetStatus");
  SCORM2004_ClearErrorInfo();
  strSuccessStatus = SCORM2004_CallGetValue("cmi.success_status");
  strCompletionStatus = SCORM2004_CallGetValue("cmi.completion_status");
  WriteToDebug("strSuccessStatus=" + strSuccessStatus);
  WriteToDebug("strCompletionStatus=" + strCompletionStatus);
  if (strSuccessStatus == SCORM2004_PASSED) {
    WriteToDebug("returning Passed");
    return LESSON_STATUS_PASSED;
  } else if (strSuccessStatus == SCORM2004_FAILED) {
    WriteToDebug("Returning Failed");
    return LESSON_STATUS_FAILED;
  } else if (strCompletionStatus == SCORM2004_COMPLETED) {
    WriteToDebug("Returning Completed");
    return LESSON_STATUS_COMPLETED;
  } else if (strCompletionStatus == SCORM2004_INCOMPLETE) {
    WriteToDebug("Returning Incomplete");
    return LESSON_STATUS_INCOMPLETE;
  } else if (
    strCompletionStatus == SCORM2004_NOT_ATTEMPTED ||
    strCompletionStatus == SCORM2004_UNKNOWN
  ) {
    WriteToDebug("Returning Not Attempted");
    return LESSON_STATUS_NOT_ATTEMPTED;
  } else {
    WriteToDebug("ERROR - status not found");
    SCORM2004_SetErrorInfoManually(
      SCORM2004_ERROR_INVALID_STATUS,
      "Invalid lesson status received from LMS",
      "strCompletionStatus=" + strCompletionStatus
    );
    return null;
  }
}
function SCORM2004_GetProgressMeasure() {
  WriteToDebug("In SCORM2004_GetProgressMeasure");
  var blnResult;
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallGetValue("cmi.progress_measure");
  return blnResult;
}
function SCORM2004_SetProgressMeasure(numMeasure) {
  WriteToDebug("In SCORM2004_SetProgressMeasure");
  var blnResult;
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallSetValue("cmi.progress_measure", numMeasure);
  return blnResult;
}
function SCORM2004_SetObjectiveProgressMeasure(strObjectiveID, numMeasure) {
  WriteToDebug("In SCORM2004_SetObjectiveProgressMeasure");
  var intObjectiveIndex;
  var blnResult;
  WriteToDebug(
    "In SCORM2004_SetObjectiveProgressMeasure, strObejctiveID=" +
      strObjectiveID +
      ", numMeasure=" +
      numMeasure
  );
  SCORM2004_ClearErrorInfo();
  intObjectiveIndex = SCORM2004_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  SCORM2004_ClearErrorInfo();
  blnResult = SCORM2004_CallSetValue(
    "cmi.objectives." + intObjectiveIndex + ".progress_measure",
    numMeasure
  );
  return blnResult;
}
function SCORM2004_IsContentInBrowseMode() {
  var strLessonMode;
  WriteToDebug("In SCORM2004_IsContentInBrowseMode");
  strLessonMode = SCORM2004_CallGetValue("cmi.mode");
  WriteToDebug(
    "SCORM2004_IsContentInBrowseMode,  strLessonMode=" + strLessonMode
  );
  if (strLessonMode == SCORM2004_BROWSE) {
    WriteToDebug("Returning true");
    return true;
  } else {
    WriteToDebug("Returning false");
    return false;
  }
}
function SCORM2004_TranslateExitTypeToSCORM(strExitType) {
  WriteToDebug(
    "In SCORM2004_TranslatgeExitTypeToSCORM strExitType-" + strExitType
  );
  if (strExitType == EXIT_TYPE_SUSPEND) {
    WriteToDebug("Returning suspend");
    return SCORM2004_SUSPEND;
  } else if (strExitType == EXIT_TYPE_UNLOAD) {
    WriteToDebug("Returning Exit");
    return SCORM2004_NORMAL_EXIT;
  } else if (strExitType == EXIT_TYPE_FINISH) {
    WriteToDebug("Returning Logout");
    return SCORM2004_NORMAL_EXIT;
  } else if (strExitType == EXIT_TYPE_TIMEOUT) {
    WriteToDebug("Returning Timout");
    return SCORM2004_TIMEOUT;
  }
}
function SCORM2004_GetCompletionStatus() {
  WriteToDebug("In SCORM2004_GetCompletionStatus");
  return SCORM2004_COMPLETED;
}
function SCORM2004_SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  var blnResult;
  var fltCalculatedScore;
  WriteToDebug(
    "In SCORM2004_SetPointBasedScore intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  SCORM2004_ClearErrorInfo();
  if (intScore >= intMinScore) {
    fltCalculatedScore = intScore / intMaxScore;
  } else {
    WriteToDebug(
      "intScore is lower than intMinScore. Overriding score with minscore for cmi.score.scaled"
    );
    fltCalculatedScore = intMinScore / intMaxScore;
  }
  fltCalculatedScore = RoundToPrecision(fltCalculatedScore, 7);
  blnResult = SCORM2004_CallSetValue("cmi.score.raw", intScore);
  blnResult = SCORM2004_CallSetValue("cmi.score.max", intMaxScore) && blnResult;
  blnResult = SCORM2004_CallSetValue("cmi.score.min", intMinScore) && blnResult;
  blnResult =
    SCORM2004_CallSetValue("cmi.score.scaled", fltCalculatedScore) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM2004_FindInteractionIndexFromID(strInteractionID) {
  var intCount;
  var i;
  var strTempID;
  var dtmTempDate = new Date();
  var index;
  var currentIndexTimestamp = new Date("1/1/1900");
  WriteToDebug("In SCORM2004_FindInteractionIndexFromID");
  intCount = SCORM2004_CallGetValue("cmi.interactions._count");
  if (intCount == "") {
    WriteToDebug("Setting intCount=0");
    return null;
  }
  intCount = parseInt(intCount, 10);
  WriteToDebug("intCount=" + intCount);
  for (i = 0; i < intCount; i++) {
    WriteToDebug("Checking index " + i);
    strTempID = SCORM2004_CallGetValue("cmi.interactions." + i + ".id");
    WriteToDebug("ID=" + strTempID);
    if (strTempID == strInteractionID) {
      WriteToDebug("Found Matching index: " + i);
      dtmTempDate = ConvertIso8601TimeStampToDate(
        SCORM2004_CallGetValue("cmi.interactions." + i + ".timestamp")
      );
      WriteToDebug("timestamp for " + i + ": " + dtmTempDate);
      if (dtmTempDate > currentIndexTimestamp) {
        index = i;
        currentIndexTimestamp = dtmTempDate;
      }
    }
  }
  if (index >= 0) return index;
  WriteToDebug("Did not find match, returning null");
  return null;
}
function SCORM2004_GetInteractionType(strInteractionID) {
  var intInteractionIndex;
  WriteToDebug(
    "In SCORM2004_GetInteractionType, strInteractionID=" + strInteractionID
  );
  SCORM2004_ClearErrorInfo();
  intInteractionIndex = SCORM2004_FindInteractionIndexFromID(strInteractionID);
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  var type = SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".type"
  );
  switch (type) {
    case SCORM2004_INTERACTION_TYPE_FILL_IN:
      return INTERACTION_TYPE_FILL_IN;
    case SCORM2004_INTERACTION_TYPE_LONG_FILL_IN:
      return INTERACTION_TYPE_LONG_FILL_IN;
    case SCORM2004_INTERACTION_TYPE_CHOICE:
      return INTERACTION_TYPE_CHOICE;
    case SCORM2004_INTERACTION_TYPE_LIKERT:
      return INTERACTION_TYPE_LIKERT;
    case SCORM2004_INTERACTION_TYPE_MATCHING:
      return INTERACTION_TYPE_MATCHING;
    case SCORM2004_INTERACTION_TYPE_NUMERIC:
      return INTERACTION_TYPE_NUMERIC;
    case SCORM2004_INTERACTION_TYPE_PERFORMANCE:
      return INTERACTION_TYPE_PERFORMANCE;
    case SCORM2004_INTERACTION_TYPE_SEQUENCING:
      return INTERACTION_TYPE_SEQUENCING;
    case SCORM2004_INTERACTION_TYPE_TRUE_FALSE:
      return INTERACTION_TYPE_TRUE_FALSE;
    default:
      return "";
  }
}
function SCORM2004_GetInteractionTimestamp(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionTimestamp, strInteractionID=" + strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  return SCORM2004_CallGetValue(
    ConvertIso8601TimeStampToDate(
      "cmi.interactions." + intInteractionIndex + ".timestamp"
    )
  );
}
function SCORM2004_GetInteractionCorrectResponses(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionCorrectResponses, strInteractionID=" +
      strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  var strType = SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".type"
  );
  var intCorrectResponseCount = SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".correct_responses._count"
  );
  if (intCorrectResponseCount == "") {
    WriteToDebug("Setting intCorrectResponseCount=0");
    return 0;
  }
  intCorrectResponseCount = parseInt(intCorrectResponseCount, 10);
  WriteToDebug("intCorrectResponseCount=" + intCorrectResponseCount);
  if (intCorrectResponseCount == 0) return new Array();
  if (intCorrectResponseCount > 1)
    WriteToDebug(
      "SCORM Driver is not currently implemented to support multiple correct response combinations and will only return the first"
    );
  var strResponse = new String(
    SCORM2004_CallGetValue(
      "cmi.interactions." + intInteractionIndex + ".correct_responses.0.pattern"
    )
  );
  var aryResponse = strResponse.split("[,]");
  WriteToDebug("aryResponse.length = " + aryResponse.length);
  aryResponse = SCORM2004_ProcessResponseArray(strType, aryResponse);
  WriteToDebug("aryResponse.length = " + aryResponse.length);
  return aryResponse;
}
function SCORM2004_GetInteractionWeighting(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionWeighting, strInteractionID=" + strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  return SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".weighting"
  );
}
function SCORM2004_GetInteractionLearnerResponses(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionLearnerResponses, strInteractionID=" +
      strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  var strType = SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".type"
  );
  var strResponse = new String(
    SCORM2004_CallGetValue(
      "cmi.interactions." + intInteractionIndex + ".learner_response"
    )
  );
  var aryResponses = strResponse.split("[,]");
  WriteToDebug("aryResponses.length = " + aryResponses.length);
  aryResponses = SCORM2004_ProcessResponseArray(strType, aryResponses);
  return aryResponses;
}
function SCORM2004_ProcessResponseArray(strInteractionType, aryResponses) {
  WriteToDebug(
    "Processing Response Array with " + aryResponses.length + " pieces"
  );
  for (var i = 0; i < aryResponses.length; i++) {
    if (strInteractionType == SCORM2004_INTERACTION_TYPE_MATCHING) {
      WriteToDebug("processing matching type, i=" + i);
      aryResponses[i] = CreateMatchingResponse(aryResponses[i]);
    }
  }
  return aryResponses;
}
function SCORM2004_GetInteractionResult(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionResult, strInteractionID=" + strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  return SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".result"
  );
}
function SCORM2004_GetInteractionLatency(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionLatency, strInteractionID=" + strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  var strLatency = SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".latency"
  );
  WriteToDebug("latency returns: " + strLatency);
  var intLatency = ConvertScorm2004TimeToMS(strLatency);
  WriteToDebug("latency in milliseconds: " + intLatency);
  return intLatency;
}
function SCORM2004_GetInteractionDescription(strInteractionID) {
  WriteToDebug(
    "In SCORM2004_GetInteractionDescription, strInteractionID=" +
      strInteractionID
  );
  var intInteractionIndex =
    SCORM2004_FindInteractionIndexFromID(strInteractionID);
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  SCORM2004_ClearErrorInfo();
  if (intInteractionIndex == undefined || intInteractionIndex == null) {
    return null;
  }
  return SCORM2004_CallGetValue(
    "cmi.interactions." + intInteractionIndex + ".description"
  );
}
function SCORM2004_CreateDataBucket(
  strBucketId,
  intMinSize,
  intMaxSize,
  strPersistenceType
) {
  WriteToDebug(
    "In SCORM2004_CreateDataBucket, strBucketId=" +
      strBucketId +
      ", intMinSize=" +
      intMinSize +
      ", intMaxSize=" +
      intMaxSize +
      ", course=" +
      strPersistenceType
  );
  if (SCORM2004_DetectSSPSupport()) {
    if (SCORM2004_DoesBucketExist(strBucketId) == true) {
      WriteToDebug("Bucket already exists and can't be re-allocated.");
      return false;
    } else {
      return SCORM2004_CallSetValue(
        "ssp.allocate",
        "{bucketID=" +
          strBucketId +
          "}{requested=" +
          intMaxSize +
          "}{minimum=" +
          intMinSize +
          "}{reducible=true}{persistence=" +
          strPersistenceType +
          "}"
      );
    }
  } else {
    WriteToDebug("SSP is not supported in this LMS, returning false.");
    return false;
  }
}
function SCORM2004_GetDataFromBucket(strBucketId) {
  WriteToDebug("In SCORM2004_GetDataFromBucket, strBucketId=" + strBucketId);
  if (SCORM2004_DetectSSPSupport()) {
    var data = SCORM2004_CallGetValue(
      "ssp.data.{bucketID=" + strBucketId + "}"
    );
    return data;
  } else {
    WriteToDebug("SSP is not supported in this LMS, returning empty string.");
    return "";
  }
}
function SCORM2004_PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug(
    "In SCORM2004_PutDataInBucket, strBucketId=" +
      strBucketId +
      ", blnAppendToEnd=" +
      blnAppendToEnd +
      ", strData=" +
      strData
  );
  if (SCORM2004_DetectSSPSupport()) {
    if (blnAppendToEnd == true) {
      return SCORM2004_CallSetValue(
        "ssp.appendData",
        "{bucketID=" + strBucketId + "}" + strData
      );
    } else {
      return SCORM2004_CallSetValue(
        "ssp.data",
        "{bucketID=" + strBucketId + "}" + strData
      );
    }
  } else {
    WriteToDebug("SSP is not supported in this LMS, returning false.");
    return false;
  }
}
function SCORM2004_DetectSSPSupport() {
  WriteToDebug("In SCORM2004_DetectSSPSupport");
  if (blnSCORM2004_SSP_Is_Supported == true) {
    WriteToDebug("Support already detected, returning true");
    return true;
  } else if (blnSCORM2004_SSP_Is_Supported == false) {
    WriteToDebug("Support already determined to me missing, returning false");
    return false;
  } else {
    var intBucketCount = SCORM2004_CallGetValue("ssp._count");
    if (SCORM2004_GetLastError() == NO_ERROR) {
      WriteToDebug("SSP data model call succeeded, SSP is supported");
      blnSCORM2004_SSP_Is_Supported = true;
      return true;
    } else {
      WriteToDebug("SSP data model call failed, SSP is NOT supported");
      blnSCORM2004_SSP_Is_Supported = false;
      return false;
    }
  }
}
function SCORM2004_GetBucketInfo(strBucketId) {
  WriteToDebug("In SCORM2004_GetBucketInfo, strBucketId=" + strBucketId);
  var intTotalSpace = 0;
  var intUsedSpace = 0;
  var strBucketState = new String(
    SCORM2004_CallGetValue("ssp.bucket_state.{bucketID=" + strBucketId + "}")
  );
  if (
    strBucketState == "" ||
    strBucketState == null ||
    strBucketState == undefined
  ) {
    WriteToDebug(
      "Could not retrieve bucket state, returning 0 total size and 0 used size"
    );
    return new SSPBucketSize(0, 0);
  }
  var sectionArray = strBucketState.split("{");
  for (var section in sectionArray) {
    section = new String(sectionArray[section]);
    section = section.replace("}", "");
    if (section.indexOf("totalSpace", 0) == 0) {
      WriteToDebug("Found total space");
      intTotalSpace = parseInt(section.substr(11), 10);
      WriteToDebug("total space=" + intTotalSpace);
    } else if (section.indexOf("used", 0) == 0) {
      WriteToDebug("Found used space");
      intUsedSpace = parseInt(section.substr(5), 10);
      WriteToDebug("used=" + intUsedSpace);
    }
  }
  var returnValue = new SSPBucketSize(intTotalSpace, intUsedSpace);
  return returnValue;
}
function SCORM2004_DoesBucketExist(strBucketId) {
  WriteToDebug("In SCORM2004_DoesBucketExist, strBucketId=" + strBucketId);
  var intBucketCount = SCORM2004_CallGetValue("ssp._count");
  intBucketCount = parseInt(intBucketCount, 10);
  for (var i = 0; i < intBucketCount; i++) {
    if (strBucketId == SCORM2004_CallGetValue("ssp." + i + ".id")) {
      WriteToDebug("Bucket '" + strBucketId + "' Exists");
      return true;
    }
  }
  WriteToDebug("Bucket '" + strBucketId + "' DOES NOT Exist");
  return false;
}
function SCORM2004_SetNavigationRequest(strNavRequest) {
  WriteToDebug(
    "In SCORM2004_SetNavigationRequest, strNavRequest=" + strNavRequest
  );
  SCORM2004_ClearErrorInfo();
  var regValidChoice = /^\{target=[.A-Za-z0-9_-]+\}choice$/;
  if (strNavRequest.match(regValidChoice)) {
    SCORM2004_CallSetValue("adl.nav.request", strNavRequest);
    return true;
  } else {
    switch (strNavRequest) {
      case "continue":
        break;
      case "previous":
        break;
      case "exit":
        break;
      case "exitAll":
        break;
      case "abandon":
        break;
      case "abandonAll":
        break;
      case "suspendAll":
        break;
      case "_none_":
        break;
      default:
        WriteToDebug(
          "In SCORM2004_SetNavigationRequest, NavRequest is not valid - strNavRequest=" +
            strNavRequest
        );
        return false;
    }
    SCORM2004_CallSetValue("adl.nav.request", strNavRequest);
    return true;
  }
}
function SCORM2004_GetNavigationRequest() {
  WriteToDebug("In SCORM2004_GetNavigationRequest");
  SCORM2004_ClearErrorInfo();
  return SCORM2004_CallGetValue("adl.nav.request");
}
function SCORM2004_CallInitialize() {
  var strResult;
  WriteToDebug("In SCORM2004_CallInitialize");
  SCORM2004_objAPI = SCORM2004_GrabAPI();
  WriteToDebug("Calling Initialize");
  strResult = SCORM2004_objAPI.Initialize("");
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM2004_FALSE) {
    WriteToDebug("Detected failed call to initialize");
    SCORM2004_SetErrorInfo();
    WriteToDebug("Error calling Initialize:");
    WriteToDebug("              Error Number=" + intSCORM2004Error);
    WriteToDebug("              Error String=" + strSCORM2004ErrorString);
    WriteToDebug("              Diagnostic=" + strSCORM2004ErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning true");
  return true;
}
function SCORM2004_CallSetValue(strElement, strValue) {
  var strResult;
  WriteToDebug(
    "SCORM2004_CallSetValue strElement=" + strElement + ", strValue=" + strValue
  );
  if (blnReviewModeSoReadOnly === true) {
    WriteToDebug(
      "Mode is Review and configuration setting dictates this should be read only so exiting."
    );
    return true;
  }
  SCORM2004_objAPI = SCORM2004_GrabAPI();
  WriteToDebug("Calling SetValue");
  strElement = strElement + "";
  strValue = strValue + "";
  strResult = SCORM2004_objAPI.SetValue(strElement, strValue);
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM2004_FALSE) {
    WriteToDebug("Detected Failed call to SetValue");
    SCORM2004_SetErrorInfo();
    WriteToDebug("Error calling SetValue:");
    WriteToDebug("              strElement=" + strElement);
    WriteToDebug("              strValue=" + strValue);
    WriteToDebug("              Error Number=" + intSCORM2004Error);
    WriteToDebug("              Error String=" + strSCORM2004ErrorString);
    WriteToDebug("              Diagnostic=" + strSCORM2004ErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning true");
  return true;
}
function SCORM2004_CallGetValue(strElement) {
  var strResult;
  WriteToDebug("In SCORM2004_CallGetValue strElement=" + strElement);
  SCORM2004_objAPI = SCORM2004_GrabAPI();
  WriteToDebug("Call GetValue");
  strElement = strElement + "";
  strResult = SCORM2004_objAPI.GetValue(strElement) + "";
  WriteToDebug("strResult=" + strResult);
  intSCORM2004Error = SCORM2004_objAPI.GetLastError();
  intSCORM2004Error = intSCORM2004Error + "";
  WriteToDebug("intSCORM2004Error=" + intSCORM2004Error);
  if (intSCORM2004Error != SCORM2004_NO_ERROR) {
    WriteToDebug("Detected failed called to GetValue");
    SCORM2004_SetErrorInfo();
    WriteToDebug("Error calling LMSGetValue:");
    WriteToDebug("              strElement=" + strElement);
    WriteToDebug("              Error Number=" + intSCORM2004Error);
    WriteToDebug("              Error String=" + strSCORM2004ErrorString);
    WriteToDebug("              Diagnostic=" + strSCORM2004ErrorDiagnostic);
  }
  WriteToDebug("Returning " + strResult);
  return strResult;
}
function SCORM2004_CallCommit() {
  var strResult;
  WriteToDebug("In SCORM2004_CallCommit");
  SCORM2004_objAPI = SCORM2004_GrabAPI();
  WriteToDebug("Calling Commit");
  strResult = SCORM2004_objAPI.Commit("");
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM2004_FALSE) {
    WriteToDebug("Detected failed call to Commit");
    SCORM2004_SetErrorInfo();
    WriteToDebug("Error calling Commit:");
    WriteToDebug("              Error Number=" + intSCORM2004Error);
    WriteToDebug("              Error String=" + strSCORM2004ErrorString);
    WriteToDebug("              Diagnostic=" + strSCORM2004ErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning true");
  return true;
}
function SCORM2004_CallTerminate() {
  var strResult;
  WriteToDebug("In SCORM2004_CallTerminate");
  SCORM2004_objAPI = SCORM2004_GrabAPI();
  WriteToDebug("Calling Terminate");
  strResult = SCORM2004_objAPI.Terminate("");
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM2004_FALSE) {
    WriteToDebug("Detected failed call to Terminate");
    SCORM2004_SetErrorInfo();
    WriteToDebug("Error calling Terminate:");
    WriteToDebug("              Error Number=" + intSCORM2004Error);
    WriteToDebug("              Error String=" + strSCORM2004ErrorString);
    WriteToDebug("              Diagnostic=" + strSCORM2004ErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning True");
  return true;
}
function SCORM2004_ClearErrorInfo() {
  WriteToDebug("In SCORM2004_ClearErrorInfo");
  intSCORM2004Error = SCORM2004_NO_ERROR;
  strSCORM2004ErrorString = "";
  strSCORM2004ErrorDiagnostic = "";
}
function SCORM2004_SetErrorInfo() {
  WriteToDebug("In SCORM2004_SetErrorInfo");
  intSCORM2004Error = SCORM2004_objAPI.GetLastError();
  strSCORM2004ErrorString = SCORM2004_objAPI.GetErrorString(intSCORM2004Error);
  strSCORM2004ErrorDiagnostic = SCORM2004_objAPI.GetDiagnostic("");
  intSCORM2004Error = intSCORM2004Error + "";
  strSCORM2004ErrorString = strSCORM2004ErrorString + "";
  strSCORM2004ErrorDiagnostic = strSCORM2004ErrorDiagnostic + "";
  WriteToDebug("intSCORM2004Error=" + intSCORM2004Error);
  WriteToDebug("strSCORM2004ErrorString=" + strSCORM2004ErrorString);
  WriteToDebug("strSCORM2004ErrorDiagnostic=" + strSCORM2004ErrorDiagnostic);
}
function SCORM2004_SetErrorInfoManually(intNum, strString, strDiagnostic) {
  WriteToDebug("In SCORM2004_SetErrorInfoManually");
  WriteToDebug("ERROR-Num=" + intNum);
  WriteToDebug("      String=" + strString);
  WriteToDebug("      Diag=" + strDiagnostic);
  intSCORM2004Error = intNum;
  strSCORM2004ErrorString = strString;
  strSCORM2004ErrorDiagnostic = strDiagnostic;
}
function SCORM2004_GetLastError() {
  WriteToDebug("In SCORM2004_GetLastError");
  if (intSCORM2004Error == SCORM2004_NO_ERROR) {
    WriteToDebug("Returning No Error");
    return NO_ERROR;
  } else {
    WriteToDebug("Returning " + intSCORMError);
    return intSCORM2004Error;
  }
}
function SCORM2004_GetLastErrorDesc() {
  WriteToDebug(
    "In SCORM2004_GetLastErrorDesc, " +
      strSCORM2004ErrorString +
      "\n" +
      strSCORM2004ErrorDiagnostic
  );
  return strSCORM2004ErrorString + "\n" + strSCORM2004ErrorDiagnostic;
}
function SCORM2004_GrabAPI() {
  WriteToDebug("In SCORM2004_GrabAPI");
  if (typeof SCORM2004_objAPI == "undefined" || SCORM2004_objAPI == null) {
    WriteToDebug("Searching with Rustici Software algorithm");
    SCORM2004_objAPI = SCORM2004_GetAPI();
  }
  if (
    typeof SCORM2004_objAPI == "undefined" ||
    SCORM2004_objAPI == null ||
    SCORM2004_objAPI == false
  ) {
    WriteToDebug("Searching with SearchForAPI");
    SCORM2004_objAPI = SCORM2004_SearchForAPI(window);
  }
  WriteToDebug(
    "Grab API, returning, found API = " + (SCORM2004_objAPI != null)
  );
  return SCORM2004_objAPI;
}
function SCORM2004_ScanParentsForApi(win) {
  var MAX_PARENTS_TO_SEARCH = 500;
  var nParentsSearched = 0;
  while (
    (win.API_1484_11 == null || win.API_1484_11 == undefined) &&
    win.parent != null &&
    win.parent != win &&
    nParentsSearched <= MAX_PARENTS_TO_SEARCH
  ) {
    nParentsSearched++;
    win = win.parent;
  }
  return win.API_1484_11;
}
function SCORM2004_GetAPI() {
  var API = null;
  if (window.parent != null && window.parent != window) {
    API = SCORM2004_ScanParentsForApi(window.parent);
  }
  if (API == null && window.top.opener != null) {
    API = SCORM2004_ScanParentsForApi(window.top.opener);
  }
  return API;
}
function SCORM2004_SearchForAPI(wndLookIn) {
  WriteToDebug("SCORM2004_SearchForAPI");
  var objAPITemp = null;
  var strDebugID = "";
  strDebugID = "Name=" + wndLookIn.name + ", href=" + wndLookIn.location.href;
  objAPITemp = wndLookIn.API_1484_11;
  if (SCORM2004_APIFound(objAPITemp)) {
    WriteToDebug("Found API in this window - " + strDebugID);
    return objAPITemp;
  }
  if (SCORM2004_WindowHasParent(wndLookIn)) {
    WriteToDebug("Searching Parent - " + strDebugID);
    objAPITemp = SCORM2004_SearchForAPI(wndLookIn.parent);
  }
  if (SCORM2004_APIFound(objAPITemp)) {
    WriteToDebug("Found API in a parent - " + strDebugID);
    return objAPITemp;
  }
  if (SCORM2004_WindowHasOpener(wndLookIn)) {
    WriteToDebug("Searching Opener - " + strDebugID);
    objAPITemp = SCORM2004_SearchForAPI(wndLookIn.opener);
  }
  if (SCORM2004_APIFound(objAPITemp)) {
    WriteToDebug("Found API in an opener - " + strDebugID);
    return objAPITemp;
  }
  WriteToDebug("Looking in children - " + strDebugID);
  objAPITemp = SCORM2004_LookInChildren(wndLookIn);
  if (SCORM2004_APIFound(objAPITemp)) {
    WriteToDebug("Found API in Children - " + strDebugID);
    return objAPITemp;
  }
  WriteToDebug("Didn't find API in this window - " + strDebugID);
  return null;
}
function SCORM2004_LookInChildren(wnd) {
  WriteToDebug("SCORM2004_LookInChildren");
  var objAPITemp = null;
  var strDebugID = "";
  strDebugID = "Name=" + wnd.name + ", href=" + wnd.location.href;
  for (var i = 0; i < wnd.frames.length; i++) {
    WriteToDebug("Looking in child frame " + i);
    objAPITemp = wnd.frames[i].API_1484_11;
    if (SCORM2004_APIFound(objAPITemp)) {
      WriteToDebug("Found API in child frame of " + strDebugID);
      return objAPITemp;
    }
    WriteToDebug("Looking in this child's children " + strDebugID);
    objAPITemp = SCORM2004_LookInChildren(wnd.frames[i]);
    if (SCORM2004_APIFound(objAPITemp)) {
      WriteToDebug("API found in this child's children " + strDebugID);
      return objAPITemp;
    }
  }
  return null;
}
function SCORM2004_WindowHasOpener(wnd) {
  WriteToDebug("In SCORM2004_WindowHasOpener");
  if (
    wnd.opener != null &&
    wnd.opener != wnd &&
    typeof wnd.opener != "undefined"
  ) {
    WriteToDebug("Window Does Have Opener");
    return true;
  } else {
    WriteToDebug("Window Does Not Have Opener");
    return false;
  }
}
function SCORM2004_WindowHasParent(wnd) {
  WriteToDebug("In SCORM2004_WindowHasParent");
  if (
    wnd.parent != null &&
    wnd.parent != wnd &&
    typeof wnd.parent != "undefined"
  ) {
    WriteToDebug("Window Does Have Parent");
    return true;
  } else {
    WriteToDebug("Window Does Not Have Parent");
    return false;
  }
}
function SCORM2004_APIFound(obj) {
  WriteToDebug("In SCORM2004_APIFound");
  if (obj == null || typeof obj == "undefined") {
    WriteToDebug("API NOT Found");
    return false;
  } else {
    WriteToDebug("API Found");
    return true;
  }
}
var STANDARD = "SCORM";
var SCORM_LOGOUT = "logout";
var SCORM_SUSPEND = "suspend";
var SCORM_NORMAL_EXIT = "";
var SCORM_TIMEOUT = "time-out";
var SCORM_PASSED = "passed";
var SCORM_FAILED = "failed";
var SCORM_COMPLETED = "completed";
var SCORM_BROWSED = "browsed";
var SCORM_INCOMPLETE = "incomplete";
var SCORM_NOT_ATTEMPTED = "not attempted";
var SCORM_CREDIT = "credit";
var SCORM_NO_CREDIT = "no-credit";
var SCORM_BROWSE = "browse";
var SCORM_NORMAL = "normal";
var SCORM_REVIEW = "review";
var SCORM_ENTRY_ABINITIO = "ab-initio";
var SCORM_ENTRY_RESUME = "resume";
var SCORM_ENTRY_NORMAL = "";
var SCORM_TLA_EXIT_MESSAGE = "exit,message";
var SCORM_TLA_EXIT_NO_MESSAGE = "exit,no message";
var SCORM_TLA_CONTINUE_MESSAGE = "continue,message";
var SCORM_TLA_CONTINUE_NO_MESSAGE = "continue,no message";
var SCORM_RESULT_CORRECT = "correct";
var SCORM_RESULT_WRONG = "wrong";
var SCORM_RESULT_UNANTICIPATED = "unanticipated";
var SCORM_RESULT_NEUTRAL = "neutral";
var SCORM_INTERACTION_TYPE_TRUE_FALSE = "true-false";
var SCORM_INTERACTION_TYPE_CHOICE = "choice";
var SCORM_INTERACTION_FILL_IN = "fill-in";
var SCORM_INTERACTION_TYPE_MATCHING = "matching";
var SCORM_INTERACTION_TYPE_PERFORMANCE = "performance";
var SCORM_INTERACTION_TYPE_SEQUENCING = "sequencing";
var SCORM_INTERACTION_TYPE_LIKERT = "likert";
var SCORM_INTERACTION_TYPE_NUMERIC = "numeric";
var SCORM_NO_ERROR = "0";
var SCORM_ERROR_INVALID_PREFERENCE = "-1";
var SCORM_ERROR_INVALID_STATUS = "-2";
var SCORM_ERROR_INVALID_SPEED = "-3";
var SCORM_ERROR_INVALID_TIMESPAN = "-4";
var SCORM_ERROR_INVALID_TIME_LIMIT_ACTION = "-5";
var SCORM_ERROR_INVALID_DECIMAL = "-6";
var SCORM_ERROR_INVALID_CREDIT = "-7";
var SCORM_ERROR_INVALID_LESSON_MODE = "-8";
var SCORM_ERROR_INVALID_ENTRY = "-9";
var SCORM_TRUE = "true";
var SCORM_FALSE = "false";
var SCORM_findAPITries = 0;
var SCORM_objAPI = null;
var intSCORMError = SCORM_NO_ERROR;
var strSCORMErrorString = "";
var strSCORMErrorDiagnostic = "";
var blnReviewModeSoReadOnly = false;
function SCORM_Initialize() {
  var blnResult = true;
  WriteToDebug("In SCORM_Initialize");
  SCORM_ClearErrorInfo();
  WriteToDebug("Grabbing API");
  try {
    SCORM_objAPI = SCORM_GrabAPI();
  } catch (e) {
    WriteToDebug("Error grabbing 1.2 API-" + e.name + ":" + e.message);
  }
  if (typeof SCORM_objAPI == "undefined" || SCORM_objAPI == null) {
    WriteToDebug("Unable to acquire SCORM API:");
    WriteToDebug("SCORM_objAPI=" + typeof SCORM_objAPI);
    InitializeExecuted(
      false,
      "Error - unable to acquire LMS API, content may not play properly and results may not be recorded.  Please contact technical support."
    );
    return false;
  }
  WriteToDebug("Calling LMSInit");
  blnResult = SCORM_CallLMSInitialize();
  if (!blnResult) {
    WriteToDebug("ERROR Initializing LMS");
    InitializeExecuted(false, "Error initializing communications with LMS");
    return false;
  }
  if (SCORM_GetLessonMode() != MODE_REVIEW) {
    if (SCORM_IsContentInBrowseMode()) {
      WriteToDebug("Setting Status to Browsed");
      blnResult = SCORM_CallLMSSetValue(
        "cmi.core.lesson_status",
        SCORM_BROWSED
      );
    } else {
      if (!PREVENT_STATUS_CHANGE_DURING_INIT) {
        if (SCORM_GetStatus() == LESSON_STATUS_NOT_ATTEMPTED) {
          WriteToDebug("Setting Status to Incomplete");
          blnResult = SCORM_CallLMSSetValue(
            "cmi.core.lesson_status",
            SCORM_INCOMPLETE
          );
        }
      }
    }
    blnResult =
      SCORM_CallLMSSetValue(
        "cmi.core.exit",
        SCORM_TranslateExitTypeToSCORM(DEFAULT_EXIT_TYPE)
      ) && blnResult;
  } else {
    if (
      !(typeof REVIEW_MODE_IS_READ_ONLY == "undefined") &&
      REVIEW_MODE_IS_READ_ONLY === true
    ) {
      blnReviewModeSoReadOnly = true;
    }
  }
  WriteToDebug("Calling InitializeExecuted with parameter-" + blnResult);
  InitializeExecuted(blnResult, "");
  return;
}
function SCORM_Finish(strExitType, blnStatusWasSet) {
  var strStatusAfterCompletion;
  var blnResult = true;
  WriteToDebug(
    "In SCORM_Finish strExitType=" +
      strExitType +
      ", blnStatusWasSet=" +
      blnStatusWasSet
  );
  SCORM_ClearErrorInfo();
  if (strExitType == EXIT_TYPE_FINISH && !blnStatusWasSet) {
    WriteToDebug("Getting completion status");
    strStatusAfterCompletion = SCORM_GetCompletionStatus();
    WriteToDebug("Setting completion status to " + strStatusAfterCompletion);
    blnResult =
      SCORM_CallLMSSetValue(
        "cmi.core.lesson_status",
        strStatusAfterCompletion
      ) && blnResult;
  }
  WriteToDebug("Setting Exit");
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.core.exit",
      SCORM_TranslateExitTypeToSCORM(strExitType)
    ) && blnResult;
  WriteToDebug("Calling Commit");
  blnResult = SCORM_CallLMSCommit() && blnResult;
  WriteToDebug("Calling Finish");
  blnResult = SCORM_CallLMSFinish() && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM_CommitData() {
  WriteToDebug("In SCORM_CommitData");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSCommit();
}
function SCORM_GetStudentID() {
  WriteToDebug("In SCORM_GetStudentID");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.core.student_id");
}
function SCORM_GetStudentName() {
  WriteToDebug("In SCORM_GetStudentName");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.core.student_name");
}
function SCORM_GetBookmark() {
  WriteToDebug("In SCORM_GetBookmark");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.core.lesson_location");
}
function SCORM_SetBookmark(strBookmark) {
  WriteToDebug("In SCORM_SetBookmark strBookmark=" + strBookmark);
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.core.lesson_location", strBookmark);
}
function SCORM_GetDataChunk() {
  WriteToDebug("In SCORM_GetDataChunk");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.suspend_data");
}
function SCORM_SetDataChunk(strData) {
  WriteToDebug("In SCORM_SetDataChunk");
  SCORM_ClearErrorInfo();
  if (USE_STRICT_SUSPEND_DATA_LIMITS == true) {
    if (strData.length > 4096) {
      WriteToDebug(
        "SCORM_SetDataChunk - suspend_data too large (4096 character limit for SCORM 1.2)"
      );
      return false;
    } else {
      return SCORM_CallLMSSetValue("cmi.suspend_data", strData);
    }
  } else {
    return SCORM_CallLMSSetValue("cmi.suspend_data", strData);
  }
}
function SCORM_GetLaunchData() {
  WriteToDebug("In SCORM_GetLaunchData");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.launch_data");
}
function SCORM_GetComments() {
  WriteToDebug("In SCORM_GetComments");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.comments");
}
function SCORM_WriteComment(strComment) {
  WriteToDebug("In SCORM_WriteComment strComment=" + strComment);
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.comments", strComment);
}
function SCORM_GetLMSComments() {
  WriteToDebug("In SCORM_GetLMSComments");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.comments_from_lms");
}
function SCORM_GetAudioPlayPreference() {
  var intTempPreference;
  WriteToDebug("In SCORM_GetAudioPlayPreference");
  SCORM_ClearErrorInfo();
  intTempPreference = SCORM_CallLMSGetValue("cmi.student_preference.audio");
  if (intTempPreference == "") {
    intTempPreference = 0;
  }
  intTempPreference = parseInt(intTempPreference, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0) {
    WriteToDebug("Returning On");
    return PREFERENCE_ON;
  } else if (intTempPreference == 0) {
    WriteToDebug("Returning Default");
    return PREFERENCE_DEFAULT;
  } else if (intTempPreference < 0) {
    WriteToDebug("returning Off");
    return PREFERENCE_OFF;
  } else {
    WriteToDebug("Error: Invalid preference");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_PREFERENCE,
      "Invalid audio preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
}
function SCORM_GetAudioVolumePreference() {
  var intTempPreference;
  WriteToDebug("In SCORM_GetAudioVollumePreference");
  SCORM_ClearErrorInfo();
  intTempPreference = SCORM_CallLMSGetValue("cmi.student_preference.audio");
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference == "") {
    intTempPreference = 100;
  }
  intTempPreference = parseInt(intTempPreference, 10);
  if (intTempPreference <= 0) {
    WriteToDebug("Setting to 100");
    intTempPreference = 100;
  }
  if (!(intTempPreference > 0 && intTempPreference <= 100)) {
    WriteToDebug("ERROR: invalid preference");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_PREFERENCE,
      "Invalid audio preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
  WriteToDebug("Returning " + intTempPreference);
  return intTempPreference;
}
function SCORM_SetAudioPreference(PlayPreference, intPercentOfMaxVolume) {
  WriteToDebug(
    "In SCORM_SetAudioPreference PlayPreference=" +
      PlayPreference +
      ", intPercentOfMaxVolume=" +
      intPercentOfMaxVolume
  );
  SCORM_ClearErrorInfo();
  if (PlayPreference == PREFERENCE_OFF) {
    WriteToDebug("Setting percent to -1 - OFF");
    intPercentOfMaxVolume = -1;
  }
  return SCORM_CallLMSSetValue(
    "cmi.student_preference.audio",
    intPercentOfMaxVolume
  );
}
function SCORM_SetLanguagePreference(strLanguage) {
  WriteToDebug("In SCORM_SetLanguagePreference strLanguage=" + strLanguage);
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.student_preference.language", strLanguage);
}
function SCORM_GetLanguagePreference() {
  WriteToDebug("In SCORM_GetLanguagePreference");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.student_preference.language");
}
function SCORM_SetSpeedPreference(intPercentOfMax) {
  var intSCORMSpeed;
  WriteToDebug(
    "In SCORM_SetSpeedPreference intPercentOfMax=" + intPercentOfMax
  );
  SCORM_ClearErrorInfo();
  intSCORMSpeed = intPercentOfMax * 2 - 100;
  WriteToDebug("intSCORMSpeed=" + intSCORMSpeed);
  return SCORM_CallLMSSetValue("cmi.student_preference.speed", intSCORMSpeed);
}
function SCORM_GetSpeedPreference() {
  var intSCORMSpeed;
  var intPercentOfMax;
  WriteToDebug("In SCORM_GetSpeedPreference");
  SCORM_ClearErrorInfo();
  intSCORMSpeed = SCORM_CallLMSGetValue("cmi.student_preference.speed");
  WriteToDebug("intSCORMSpeed=" + intSCORMSpeed);
  if (intSCORMSpeed == "") {
    WriteToDebug("Detected empty string, defaulting to 100");
    intSCORMSpeed = 100;
  }
  if (!ValidInteger(intSCORMSpeed)) {
    WriteToDebug("ERROR - invalid integer");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - not an integer",
      "intSCORMSpeed=" + intSCORMSpeed
    );
    return null;
  }
  intSCORMSpeed = parseInt(intSCORMSpeed, 10);
  if (intSCORMSpeed < -100 || intSCORMSpeed > 100) {
    WriteToDebug("ERROR - out of range");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - out of range",
      "intSCORMSpeed=" + intSCORMSpeed
    );
    return null;
  }
  intPercentOfMax = (intSCORMSpeed + 100) / 2;
  intPercentOfMax = parseInt(intPercentOfMax, 10);
  WriteToDebug("Returning " + intPercentOfMax);
  return intPercentOfMax;
}
function SCORM_SetTextPreference(intPreference) {
  WriteToDebug("In SCORM_SetTextPreference intPreference=" + intPreference);
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.student_preference.text", intPreference);
}
function SCORM_GetTextPreference() {
  var intTempPreference;
  WriteToDebug("In SCORM_GetTextPreference");
  SCORM_ClearErrorInfo();
  intTempPreference = SCORM_CallLMSGetValue("cmi.student_preference.text");
  intTempPreference = parseInt(intTempPreference, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0) {
    WriteToDebug("Returning On");
    return PREFERENCE_ON;
  } else if (intTempPreference == 0 || intTempPreference == "") {
    WriteToDebug("Returning Default");
    return PREFERENCE_DEFAULT;
  } else if (intTempPreference < 0) {
    WriteToDebug("returning Off");
    return PREFERENCE_OFF;
  } else {
    WriteToDebug("Error: Invalid preference");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_PREFERENCE,
      "Invalid text preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
}
function SCORM_GetPreviouslyAccumulatedTime() {
  var strCMITime;
  var intMilliseconds;
  WriteToDebug("In SCORM_GetPreviouslyAccumulatedTime");
  SCORM_ClearErrorInfo();
  strCMITime = SCORM_CallLMSGetValue("cmi.core.total_time");
  WriteToDebug("strCMITime=" + strCMITime);
  if (!IsValidCMITimeSpan(strCMITime)) {
    WriteToDebug("ERROR - Invalid CMITimeSpan");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_TIMESPAN,
      "Invalid timespan received from LMS",
      "strTime=" + strCMITime
    );
    return null;
  }
  intMilliseconds = ConvertCMITimeSpanToMS(strCMITime);
  WriteToDebug("Returning " + intMilliseconds);
  return intMilliseconds;
}
function SCORM_SaveTime(intMilliSeconds) {
  var strCMITime;
  WriteToDebug("In SCORM_SaveTime intMilliSeconds=" + intMilliSeconds);
  SCORM_ClearErrorInfo();
  strCMITime = ConvertMilliSecondsToSCORMTime(intMilliSeconds, true);
  WriteToDebug("strCMITime=" + strCMITime);
  return SCORM_CallLMSSetValue("cmi.core.session_time", strCMITime);
}
function SCORM_GetMaxTimeAllowed() {
  var strCMITime;
  var intMilliseconds;
  WriteToDebug("In SCORM_GetMaxTimeAllowed");
  SCORM_ClearErrorInfo();
  strCMITime = SCORM_CallLMSGetValue("cmi.student_data.max_time_allowed");
  WriteToDebug("strCMITime=" + strCMITime);
  if (strCMITime == "") {
    strCMITime = "9999:99:99.99";
  }
  if (!IsValidCMITimeSpan(strCMITime)) {
    WriteToDebug("ERROR - Invalid CMITimeSpan");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_TIMESPAN,
      "Invalid timespan received from LMS",
      "strTime=" + strCMITime
    );
    return null;
  }
  intMilliseconds = ConvertCMITimeSpanToMS(strCMITime);
  WriteToDebug("intMilliseconds=" + intMilliseconds);
  return intMilliseconds;
}
function SCORM_DisplayMessageOnTimeout() {
  var strTLA;
  SCORM_ClearErrorInfo();
  WriteToDebug("In SCORM_DisplayMessageOnTimeout");
  strTLA = SCORM_CallLMSGetValue("cmi.student_data.time_limit_action");
  WriteToDebug("strTLA=" + strTLA);
  if (
    strTLA == SCORM_TLA_EXIT_MESSAGE ||
    strTLA == SCORM_TLA_CONTINUE_MESSAGE
  ) {
    WriteToDebug("returning true");
    return true;
  } else if (
    strTLA == SCORM_TLA_EXIT_NO_MESSAGE ||
    strTLA == SCORM_TLA_CONTINUE_NO_MESSAGE ||
    strTLA == ""
  ) {
    WriteToDebug("returning false");
    return false;
  } else {
    WriteToDebug("Error invalid TLA");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_TIME_LIMIT_ACTION,
      "Invalid time limit action received from LMS",
      "strTLA=" + strTLA
    );
    return null;
  }
}
function SCORM_ExitOnTimeout() {
  var strTLA;
  WriteToDebug("In SCORM_ExitOnTimeout");
  SCORM_ClearErrorInfo();
  strTLA = SCORM_CallLMSGetValue("cmi.student_data.time_limit_action");
  WriteToDebug("strTLA=" + strTLA);
  if (strTLA == SCORM_TLA_EXIT_MESSAGE || strTLA == SCORM_TLA_EXIT_NO_MESSAGE) {
    WriteToDebug("returning true");
    return true;
  } else if (
    strTLA == SCORM_TLA_CONTINUE_MESSAGE ||
    strTLA == SCORM_TLA_CONTINUE_NO_MESSAGE ||
    strTLA == ""
  ) {
    WriteToDebug("returning false");
    return false;
  } else {
    WriteToDebug("ERROR invalid TLA");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_TIME_LIMIT_ACTION,
      "Invalid time limit action received from LMS",
      "strTLA=" + strTLA
    );
    return null;
  }
}
function SCORM_GetPassingScore() {
  var fltScore;
  WriteToDebug("In SCORM_GetPassingScore");
  SCORM_ClearErrorInfo();
  fltScore = SCORM_CallLMSGetValue("cmi.student_data.mastery_score");
  WriteToDebug("fltScore=" + fltScore);
  if (fltScore == "") {
    fltScore = 0;
  }
  if (!IsValidDecimal(fltScore)) {
    WriteToDebug("Error - score is not a valid decimal");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_DECIMAL,
      "Invalid mastery score received from LMS",
      "fltScore=" + fltScore
    );
    return null;
  }
  fltScore = parseFloat(fltScore);
  WriteToDebug("returning fltScore");
  return fltScore;
}
function SCORM_SetScore(intScore, intMaxScore, intMinScore) {
  var blnResult;
  intScore = RoundToPrecision(intScore, 7);
  intMaxScore = RoundToPrecision(intMaxScore, 7);
  intMinScore = RoundToPrecision(intMinScore, 7);
  WriteToDebug(
    "In SCORM_SetScore intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  SCORM_ClearErrorInfo();
  blnResult = SCORM_CallLMSSetValue("cmi.core.score.raw", intScore);
  blnResult =
    SCORM_CallLMSSetValue("cmi.core.score.max", intMaxScore) && blnResult;
  blnResult =
    SCORM_CallLMSSetValue("cmi.core.score.min", intMinScore) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM_GetScore() {
  WriteToDebug("In SCORM_GetScore");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSGetValue("cmi.core.score.raw");
}
function SCORM_SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "SCORM_SetPointBasedScore - SCORM 1.1 and 1.2 do not support SetPointBasedScore, falling back to SetScore"
  );
  return SCORM_SetScore(intScore, intMaxScore, intMinScore);
}
function SCORM_GetScaledScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "SCORM_GetScaledScore - SCORM 1.1 and 1.2 do not support GetScaledScore, returning false"
  );
  return false;
}
function SCORM_RecordInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime,
  scormInteractionType,
  strAlternateResponse,
  strAlternateCorrectResponse
) {
  var blnResult;
  var blnTempResult;
  var intInteractionIndex;
  var strResult;
  SCORM_ClearErrorInfo();
  intInteractionIndex = SCORM_CallLMSGetValue("cmi.interactions._count");
  WriteToDebug("intInteractionIndex=" + intInteractionIndex);
  if (intInteractionIndex == "") {
    WriteToDebug("Setting Interaction Index to 0");
    intInteractionIndex = 0;
  }
  if (IsNumeric(blnCorrect)) {
    strResult = blnCorrect;
  } else {
    if (blnCorrect == true || blnCorrect == INTERACTION_RESULT_CORRECT) {
      strResult = SCORM_RESULT_CORRECT;
    } else if (
      blnCorrect == "" ||
      blnCorrect == "false" ||
      blnCorrect == INTERACTION_RESULT_WRONG
    ) {
      strResult = SCORM_RESULT_WRONG;
    } else if (blnCorrect == INTERACTION_RESULT_UNANTICIPATED) {
      strResult = SCORM_RESULT_UNANTICIPATED;
    } else if (blnCorrect == INTERACTION_RESULT_NEUTRAL) {
      strResult = SCORM_RESULT_NEUTRAL;
    }
  }
  WriteToDebug("strResult=" + strResult);
  blnResult = SCORM_CallLMSSetValue(
    "cmi.interactions." + intInteractionIndex + ".id",
    strID
  );
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.interactions." + intInteractionIndex + ".type",
      scormInteractionType
    ) && blnResult;
  if (strResponse !== null) {
    blnTempResult = SCORM_CallLMSSetValue(
      "cmi.interactions." + intInteractionIndex + ".student_response",
      strResponse
    );
    if (blnTempResult == false && strAlternateResponse !== null) {
      blnTempResult = SCORM_CallLMSSetValue(
        "cmi.interactions." + intInteractionIndex + ".student_response",
        strAlternateResponse
      );
    }
  }
  blnResult = blnResult && blnTempResult;
  if (
    strCorrectResponse != undefined &&
    strCorrectResponse != null &&
    strCorrectResponse != ""
  ) {
    blnTempResult = SCORM_CallLMSSetValue(
      "cmi.interactions." +
        intInteractionIndex +
        ".correct_responses.0.pattern",
      strCorrectResponse
    );
    if (blnTempResult == false) {
      blnTempResult = SCORM_CallLMSSetValue(
        "cmi.interactions." +
          intInteractionIndex +
          ".correct_responses.0.pattern",
        strAlternateCorrectResponse
      );
    }
    blnResult = blnResult && blnTempResult;
  }
  if (strResult != undefined && strResult != null && strResult != "") {
    blnResult =
      SCORM_CallLMSSetValue(
        "cmi.interactions." + intInteractionIndex + ".result",
        strResult
      ) && blnResult;
  }
  if (intWeighting != undefined && intWeighting != null && intWeighting != "") {
    blnResult =
      SCORM_CallLMSSetValue(
        "cmi.interactions." + intInteractionIndex + ".weighting",
        intWeighting
      ) && blnResult;
  }
  if (intLatency != undefined && intLatency != null && intLatency != "") {
    blnResult =
      SCORM_CallLMSSetValue(
        "cmi.interactions." + intInteractionIndex + ".latency",
        ConvertMilliSecondsToSCORMTime(intLatency, true)
      ) && blnResult;
  }
  if (
    strLearningObjectiveID != undefined &&
    strLearningObjectiveID != null &&
    strLearningObjectiveID != ""
  ) {
    blnResult =
      SCORM_CallLMSSetValue(
        "cmi.interactions." + intInteractionIndex + ".objectives.0.id",
        strLearningObjectiveID
      ) && blnResult;
  }
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.interactions." + intInteractionIndex + ".time",
      ConvertDateToCMITime(dtmTime)
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM_RecordTrueFalseInteraction(
  strID,
  blnResponse,
  blnCorrect,
  blnCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordTrueFalseInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strCorrectResponse = null;
  if (blnResponse == true) {
    strResponse = "t";
  } else if (blnResponse !== null) {
    strResponse = "f";
  }
  if (blnCorrectResponse == true) {
    strCorrectResponse = "t";
  } else if (blnCorrectResponse == false) {
    strCorrectResponse = "f";
  }
  return SCORM_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_TRUE_FALSE,
    strResponse,
    strCorrectResponse
  );
}
function SCORM_RecordMultipleChoiceInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordMultipleChoiceInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strResponseLong = null;
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (aryResponse !== null) {
    strResponse = "";
    strResponseLong = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += ",";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += ",";
      }
      strResponse += aryResponse[i].Short;
      strResponseLong += aryResponse[i].Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += ",";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += ",";
    }
    strCorrectResponse += aryCorrectResponse[i].Short;
    strCorrectResponseLong += aryCorrectResponse[i].Long;
  }
  var blnSuccessfullySaved;
  blnSuccessfullySaved = SCORM_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_CHOICE,
    strResponse,
    strCorrectResponse
  );
  return blnSuccessfullySaved;
}
function SCORM_RecordFillInInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordFillInInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  strResponse = new String(strResponse);
  if (strResponse.length > 255) {
    strResponse = strResponse.substr(0, 255);
  }
  if (strCorrectResponse == null) {
    strCorrectResponse = "";
  }
  strCorrectResponse = new String(strCorrectResponse);
  if (strCorrectResponse.length > 255) {
    strCorrectResponse = strCorrectResponse.substr(0, 255);
  }
  return SCORM_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_FILL_IN,
    strResponse,
    strCorrectResponse
  );
}
function SCORM_RecordMatchingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordMatchingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strResponseLong = null;
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (aryResponse !== null) {
    strResponse = "";
    strResponseLong = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += ",";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += ",";
      }
      strResponse +=
        aryResponse[i].Source.Short + "." + aryResponse[i].Target.Short;
      strResponseLong +=
        aryResponse[i].Source.Long + "." + aryResponse[i].Target.Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += ",";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += ",";
    }
    strCorrectResponse +=
      aryCorrectResponse[i].Source.Short +
      "." +
      aryCorrectResponse[i].Target.Short;
    strCorrectResponseLong +=
      aryCorrectResponse[i].Source.Long +
      "." +
      aryCorrectResponse[i].Target.Long;
  }
  var blnSuccessfullySaved;
  blnSuccessfullySaved = SCORM_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_MATCHING,
    strResponse,
    strCorrectResponse
  );
  return blnSuccessfullySaved;
}
function SCORM_RecordPerformanceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordPerformanceInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strResponse !== null) {
    strResponse = new String(strResponse);
    if (strResponse.length > 255) {
      strResponse = strResponse.substr(0, 255);
    }
  }
  if (strCorrectResponse == null) {
    strCorrectResponse = "";
  }
  strCorrectResponse = new String(strCorrectResponse);
  if (strCorrectResponse.length > 255) {
    strCorrectResponse = strCorrectResponse.substr(0, 255);
  }
  return SCORM_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_PERFORMANCE,
    strResponse,
    strCorrectResponse
  );
}
function SCORM_RecordSequencingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordSequencingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strResponseLong = null;
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (aryResponse !== null) {
    strResponse = "";
    strResponseLong = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += ",";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += ",";
      }
      strResponse += aryResponse[i].Short;
      strResponseLong += aryResponse[i].Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += ",";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += ",";
    }
    strCorrectResponse += aryCorrectResponse[i].Short;
    strCorrectResponseLong += aryCorrectResponse[i].Long;
  }
  var blnSuccessfullySaved;
  blnSuccessfullySaved = SCORM_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_SEQUENCING,
    strResponse,
    strCorrectResponse
  );
  return blnSuccessfullySaved;
}
function SCORM_RecordLikertInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordLikertInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null;
  var strResponseLong = null;
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (response !== null) {
    strResponse = response.Short;
    strResponseLong = response.Long;
  }
  if (correctResponse != null) {
    strCorrectResponse = correctResponse.Short;
    strCorrectResponseLong = correctResponse.Long;
  }
  var blnSuccessfullySaved;
  blnSuccessfullySaved = SCORM_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_LIKERT,
    strResponse,
    strCorrectResponse
  );
  return blnSuccessfullySaved;
}
function SCORM_RecordNumericInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In SCORM_RecordNumericInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strCorrectResponse != undefined && strCorrectResponse != null) {
    if (IsValidDecimalRange(strCorrectResponse)) {
      strCorrectResponse = ConvertDecimalRangeToDecimalBasedOnLearnerResponse(
        strCorrectResponse,
        strResponse,
        blnCorrect
      );
    }
    if (!IsValidDecimal(strCorrectResponse)) {
      WriteToDebug(
        "Returning False - SCORM_RecordNumericInteraction received invalid correct response (not a decimal), strCorrectResponse=" +
          strCorrectResponse
      );
      return false;
    }
  }
  return SCORM_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    SCORM_INTERACTION_TYPE_NUMERIC,
    strResponse,
    strCorrectResponse
  );
}
function SCORM_GetEntryMode() {
  var strEntry;
  WriteToDebug("In SCORM_GetEntryMode");
  SCORM_ClearErrorInfo();
  strEntry = SCORM_CallLMSGetValue("cmi.core.entry");
  WriteToDebug("strEntry=" + strEntry);
  if (strEntry == SCORM_ENTRY_ABINITIO) {
    WriteToDebug("Returning first time");
    return ENTRY_FIRST_TIME;
  } else if (strEntry == SCORM_ENTRY_RESUME) {
    WriteToDebug("Returning resume");
    return ENTRY_RESUME;
  } else if (strEntry == SCORM_ENTRY_NORMAL) {
    WriteToDebug("returning normal");
    return ENTRY_REVIEW;
  } else {
    WriteToDebug("ERROR - invalide entry mode");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_ENTRY,
      "Invalid entry vocab received from LMS",
      "strEntry=" + strEntry
    );
    return null;
  }
}
function SCORM_GetLessonMode() {
  var strLessonMode;
  WriteToDebug("In SCORM_GetLessonMode");
  SCORM_ClearErrorInfo();
  strLessonMode = SCORM_CallLMSGetValue("cmi.core.lesson_mode");
  WriteToDebug("strLessonMode=" + strLessonMode);
  if (strLessonMode == SCORM_BROWSE) {
    WriteToDebug("Returning browse");
    return MODE_BROWSE;
  } else if (strLessonMode == SCORM_NORMAL) {
    WriteToDebug("returning normal");
    return MODE_NORMAL;
  } else if (strLessonMode == SCORM_REVIEW) {
    WriteToDebug("Returning Review");
    return MODE_REVIEW;
  } else {
    WriteToDebug("ERROR - invalid lesson mode");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_LESSON_MODE,
      "Invalid lesson_mode vocab received from LMS",
      "strLessonMode=" + strLessonMode
    );
    return null;
  }
}
function SCORM_GetTakingForCredit() {
  var strCredit;
  WriteToDebug("In SCORM_GetTakingForCredit");
  SCORM_ClearErrorInfo();
  strCredit = SCORM_CallLMSGetValue("cmi.core.credit");
  WriteToDebug("strCredit=" + strCredit);
  if (strCredit == "credit") {
    WriteToDebug("Returning true");
    return true;
  } else if (strCredit == "no-credit") {
    WriteToDebug("Returning false");
    return false;
  } else {
    WriteToDebug("ERROR - invalid credit");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_CREDIT,
      "Invalid credit vocab received from LMS",
      "strCredit=" + strCredit
    );
    return null;
  }
}
function SCORM_SetObjectiveScore(
  strObjectiveID,
  intScore,
  intMaxScore,
  intMinScore
) {
  var intObjectiveIndex;
  var blnResult;
  intScore = RoundToPrecision(intScore, 7);
  intMaxScore = RoundToPrecision(intMaxScore, 7);
  intMinScore = RoundToPrecision(intMinScore, 7);
  WriteToDebug(
    "In SCORM_SetObjectiveScore, strObejctiveID=" +
      strObjectiveID +
      ", intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  SCORM_ClearErrorInfo();
  intObjectiveIndex = SCORM_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  blnResult = SCORM_CallLMSSetValue(
    "cmi.objectives." + intObjectiveIndex + ".id",
    strObjectiveID
  );
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.raw",
      intScore
    ) && blnResult;
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.max",
      intMaxScore
    ) && blnResult;
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.objectives." + intObjectiveIndex + ".score.min",
      intMinScore
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM_SetObjectiveDescription(
  strObjectiveID,
  strObjectiveDescription
) {
  var intObjectiveIndex;
  var blnResult;
  WriteToDebug(
    "In SCORM_SetObjectiveDescription, strObjectiveDescription=" +
      strObjectiveDescription
  );
  WriteToDebug("Objective Descriptions are not supported prior to SCORM 2004");
  SCORM_ClearErrorInfo();
  blnResult = SCORM_TRUE;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM_SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  var intObjectiveIndex;
  var blnResult;
  var strSCORMStatus = "";
  WriteToDebug(
    "In SCORM_SetObjectiveStatus strObjectiveID=" +
      strObjectiveID +
      ", Lesson_Status=" +
      Lesson_Status
  );
  SCORM_ClearErrorInfo();
  intObjectiveIndex = SCORM_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  if (Lesson_Status == LESSON_STATUS_PASSED) {
    strSCORMStatus = SCORM_PASSED;
  } else if (Lesson_Status == LESSON_STATUS_FAILED) {
    strSCORMStatus = SCORM_FAILED;
  } else if (Lesson_Status == LESSON_STATUS_COMPLETED) {
    strSCORMStatus = SCORM_COMPLETED;
  } else if (Lesson_Status == LESSON_STATUS_BROWSED) {
    strSCORMStatus = SCORM_BROWSED;
  } else if (Lesson_Status == LESSON_STATUS_INCOMPLETE) {
    strSCORMStatus = SCORM_INCOMPLETE;
  } else if (Lesson_Status == LESSON_STATUS_NOT_ATTEMPTED) {
    strSCORMStatus = SCORM_NOT_ATTEMPTED;
  }
  WriteToDebug("strSCORMStatus=" + strSCORMStatus);
  blnResult = SCORM_CallLMSSetValue(
    "cmi.objectives." + intObjectiveIndex + ".id",
    strObjectiveID
  );
  blnResult =
    SCORM_CallLMSSetValue(
      "cmi.objectives." + intObjectiveIndex + ".status",
      strSCORMStatus
    ) && blnResult;
  WriteToDebug("Returning " + blnResult);
  return blnResult;
}
function SCORM_GetObjectiveScore(strObjectiveID) {
  var intObjectiveIndex;
  WriteToDebug("In SCORM_GetObjectiveScore, strObejctiveID=" + strObjectiveID);
  SCORM_ClearErrorInfo();
  intObjectiveIndex = SCORM_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  return SCORM_CallLMSGetValue(
    "cmi.objectives." + intObjectiveIndex + ".score.raw"
  );
}
function SCORM_GetObjectiveDescription(strObjectiveID) {
  WriteToDebug(
    "In SCORM_GetObjectiveDescription, strObejctiveID=" + strObjectiveID
  );
  WriteToDebug("ObjectiveDescription is not supported prior to SCORM 2004");
  return "";
}
function SCORM_GetObjectiveStatus(strObjectiveID) {
  var intObjectiveIndex;
  var strStatus;
  WriteToDebug("In SCORM_GetObjectiveStatus, strObejctiveID=" + strObjectiveID);
  SCORM_ClearErrorInfo();
  intObjectiveIndex = SCORM_FindObjectiveIndexFromID(strObjectiveID);
  WriteToDebug("intObjectiveIndex=" + intObjectiveIndex);
  strStatus = SCORM_CallLMSGetValue(
    "cmi.objectives." + intObjectiveIndex + ".status"
  );
  if (strStatus == SCORM_PASSED) {
    WriteToDebug("returning Passed");
    return LESSON_STATUS_PASSED;
  } else if (strStatus == SCORM_FAILED) {
    WriteToDebug("Returning Failed");
    return LESSON_STATUS_FAILED;
  } else if (strStatus == SCORM_COMPLETED) {
    WriteToDebug("Returning Completed");
    return LESSON_STATUS_COMPLETED;
  } else if (strStatus == SCORM_BROWSED) {
    WriteToDebug("Returning Browsed");
    return LESSON_STATUS_BROWSED;
  } else if (strStatus == SCORM_INCOMPLETE) {
    WriteToDebug("Returning Incomplete");
    return LESSON_STATUS_INCOMPLETE;
  } else if (strStatus == SCORM_NOT_ATTEMPTED || strStatus == "") {
    WriteToDebug("Returning Not Attempted");
    return LESSON_STATUS_NOT_ATTEMPTED;
  } else {
    WriteToDebug("ERROR - status not found");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_STATUS,
      "Invalid objective status received from LMS or initial status not yet recorded for objective",
      "strStatus=" + strStatus
    );
    return null;
  }
}
function SCORM_FindObjectiveIndexFromID(strObjectiveID) {
  var intCount;
  var i;
  var strTempID;
  WriteToDebug("In SCORM_FindObjectiveIndexFromID");
  intCount = SCORM_CallLMSGetValue("cmi.objectives._count");
  if (intCount == "") {
    WriteToDebug("Setting intCount=0");
    return 0;
  }
  intCount = parseInt(intCount, 10);
  WriteToDebug("intCount=" + intCount);
  for (i = 0; i < intCount; i++) {
    WriteToDebug("Checking index " + i);
    strTempID = SCORM_CallLMSGetValue("cmi.objectives." + i + ".id");
    WriteToDebug("ID=" + strTempID);
    if (strTempID == strObjectiveID) {
      WriteToDebug("Found Matching index");
      return i;
    }
  }
  WriteToDebug("Did not find match, returning count");
  return intCount;
}
function SCORM_CreateValidIdentifier(str) {
  return CreateValidIdentifierLegacy(str);
}
function SCORM_FindInteractionIndexFromID(strInteractionID) {
  WriteToDebug(
    "SCORM_FindInteractionIndexFromID - SCORM does not support interaction retrieval, returning null"
  );
  return null;
}
function SCORM_GetInteractionType(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionType - SCORM does not support interaction retrieval, returning empty string"
  );
  return "";
}
function SCORM_GetInteractionTimestamp(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionTimestamp - SCORM does not support interaction retrieval, returning empty string"
  );
  return "";
}
function SCORM_GetInteractionCorrectResponses(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionCorrectResponses - SCORM does not support interaction retrieval, returning empty array"
  );
  return new Array();
}
function SCORM_GetInteractionWeighting(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionWeighting - SCORM does not support interaction retrieval, returning empty string"
  );
  return "";
}
function SCORM_GetInteractionLearnerResponses(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionLearnerResponses - SCORM does not support interaction retrieval, returning empty array"
  );
  return new Array();
}
function SCORM_GetInteractionResult(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionResult - SCORM does not support interaction retrieval, returning empty string"
  );
  return "";
}
function SCORM_GetInteractionLatency(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionDescription - SCORM does not support interaction retrieval, returning empty string"
  );
  return "";
}
function SCORM_GetInteractionDescription(strInteractionID) {
  WriteToDebug(
    "SCORM_GetInteractionDescription - SCORM does not support interaction retrieval, returning empty string"
  );
  return "";
}
function SCORM_CreateDataBucket(strBucketId, intMinSize, intMaxSize) {
  WriteToDebug(
    "SCORM_CreateDataBucket - SCORM 1.1 and 1.2 do not support SSP, returning false"
  );
  return false;
}
function SCORM_GetDataFromBucket(strBucketId) {
  WriteToDebug(
    "SCORM_GetDataFromBucket - SCORM 1.1 and 1.2 do not support SSP, returning empty string"
  );
  return "";
}
function SCORM_PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug(
    "SCORM_PutDataInBucket - SCORM 1.1 and 1.2 do not support SSP, returning false"
  );
  return false;
}
function SCORM_DetectSSPSupport() {
  WriteToDebug(
    "SCORM_DetectSSPSupport - SCORM 1.1 and 1.2 do not support SSP, returning false"
  );
  return false;
}
function SCORM_GetBucketInfo(strBucketId) {
  WriteToDebug(
    "AICC_DetectSSPSupport - SCORM 1.1 and 1.2 do not support SSP, returning empty SSPBucketSize"
  );
  return new SSPBucketSize(0, 0);
}
function SCORM_SetFailed() {
  WriteToDebug("In SCORM_SetFailed");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.core.lesson_status", SCORM_FAILED);
}
function SCORM_SetPassed() {
  WriteToDebug("In SCORM_SetPassed");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.core.lesson_status", SCORM_PASSED);
}
function SCORM_SetCompleted() {
  WriteToDebug("In SCORM_SetCompleted");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.core.lesson_status", SCORM_COMPLETED);
}
function SCORM_ResetStatus() {
  WriteToDebug("In SCORM_ResetStatus");
  SCORM_ClearErrorInfo();
  return SCORM_CallLMSSetValue("cmi.core.lesson_status", SCORM_INCOMPLETE);
}
function SCORM_GetStatus() {
  var strStatus;
  WriteToDebug("In SCORM_GetStatus");
  SCORM_ClearErrorInfo();
  strStatus = SCORM_CallLMSGetValue("cmi.core.lesson_status");
  WriteToDebug("strStatus=" + strStatus);
  if (strStatus == SCORM_PASSED) {
    WriteToDebug("returning Passed");
    return LESSON_STATUS_PASSED;
  } else if (strStatus == SCORM_FAILED) {
    WriteToDebug("Returning Failed");
    return LESSON_STATUS_FAILED;
  } else if (strStatus == SCORM_COMPLETED) {
    WriteToDebug("Returning Completed");
    return LESSON_STATUS_COMPLETED;
  } else if (strStatus == SCORM_BROWSED) {
    WriteToDebug("Returning Browsed");
    return LESSON_STATUS_BROWSED;
  } else if (strStatus == SCORM_INCOMPLETE) {
    WriteToDebug("Returning Incomplete");
    return LESSON_STATUS_INCOMPLETE;
  } else if (strStatus == SCORM_NOT_ATTEMPTED) {
    WriteToDebug("Returning Not Attempted");
    return LESSON_STATUS_NOT_ATTEMPTED;
  } else {
    WriteToDebug("ERROR - status not found");
    SCORM_SetErrorInfoManually(
      SCORM_ERROR_INVALID_STATUS,
      "Invalid lesson status received from LMS",
      "strStatus=" + strStatus
    );
    return null;
  }
}
function SCORM_GetProgressMeasure() {
  WriteToDebug(
    "SCORM_GetProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false"
  );
  return false;
}
function SCORM_SetProgressMeasure() {
  WriteToDebug(
    "SCORM_SetProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false"
  );
  return false;
}
function SCORM_GetObjectiveProgressMeasure() {
  WriteToDebug(
    "SCORM_GetObjectiveProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false"
  );
  return false;
}
function SCORM_SetObjectiveProgressMeasure() {
  WriteToDebug(
    "SCORM_SetObjectiveProgressMeasure - SCORM 1.1 and 1.2 do not support progress_measure, returning false"
  );
  return false;
}
function SCORM_IsContentInBrowseMode() {
  var strLessonMode;
  WriteToDebug("In SCORM_IsContentInBrowseMode");
  strLessonMode = SCORM_CallLMSGetValue("cmi.core.lesson_mode");
  WriteToDebug("SCORM_IsContentInBrowseMode,  strLessonMode=" + strLessonMode);
  if (strLessonMode == SCORM_BROWSE) {
    WriteToDebug("Returning true");
    return true;
  } else {
    WriteToDebug("Returning false");
    return false;
  }
}
function SCORM_TranslateExitTypeToSCORM(strExitType) {
  WriteToDebug("In SCORM_TranslatgeExitTypeToSCORM strExitType-" + strExitType);
  if (strExitType == EXIT_TYPE_SUSPEND) {
    WriteToDebug("Returning suspend");
    return SCORM_SUSPEND;
  } else if (strExitType == EXIT_TYPE_UNLOAD) {
    WriteToDebug("Returning Exit");
    return SCORM_NORMAL_EXIT;
  } else if (strExitType == EXIT_TYPE_FINISH) {
    WriteToDebug("Returning Logout");
    return SCORM_NORMAL_EXIT;
  } else if (strExitType == EXIT_TYPE_TIMEOUT) {
    WriteToDebug("Returning Timout");
    return SCORM_TIMEOUT;
  }
}
function SCORM_GetCompletionStatus() {
  WriteToDebug("In SCORM_GetCompletionStatus");
  if (SCORM_IsContentInBrowseMode()) {
    WriteToDebug("Returning browsed");
    return SCORM_BROWSED;
  } else {
    WriteToDebug("Returning Completed");
    return SCORM_COMPLETED;
  }
}
function SCORM_SetNavigationRequest(strNavRequest) {
  WriteToDebug(
    "SCORM_GetNavigationRequest - SCORM 1.1 and 1.2 do not support navigation requests, returning false"
  );
  return false;
}
function SCORM_GetNavigationRequest() {
  WriteToDebug(
    "SCORM_GetNavigationRequest - SCORM 1.1 and 1.2 do not support navigation requests, returning false"
  );
  return false;
}
function SCORM_CallLMSInitialize() {
  var strResult;
  WriteToDebug("In SCORM_CallLMSInitialize");
  SCORM_objAPI = SCORM_GrabAPI();
  WriteToDebug("Calling LMSInitialize");
  strResult = SCORM_objAPI.LMSInitialize("");
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM_FALSE) {
    WriteToDebug("Detected failed call to initialize");
    SCORM_SetErrorInfo();
    WriteToDebug("Error calling LMSInitialize:");
    WriteToDebug("              intSCORMError=" + intSCORMError);
    WriteToDebug("              SCORMErrorString=" + strSCORMErrorString);
    WriteToDebug("              Diagnostic=" + strSCORMErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning true");
  return true;
}
function SCORM_CallLMSSetValue(strElement, strValue) {
  var strResult;
  WriteToDebug(
    "SCORM_CallLMSSetValue strElement=" + strElement + ", strValue=" + strValue
  );
  if (blnReviewModeSoReadOnly === true) {
    WriteToDebug(
      "Mode is Review and configuration setting dictates this should be read only so exiting."
    );
    return true;
  }
  SCORM_objAPI = SCORM_GrabAPI();
  WriteToDebug("Calling LMSSetValue");
  strElement = strElement + "";
  strValue = strValue + "";
  strResult = SCORM_objAPI.LMSSetValue(strElement, strValue);
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM_FALSE) {
    WriteToDebug("Detected Failed call to LMSSetvalue");
    SCORM_SetErrorInfo();
    WriteToDebug("Error calling LMSSetValue:");
    WriteToDebug("              strElement=" + strElement);
    WriteToDebug("              strValue=" + strValue);
    WriteToDebug("              intSCORMError=" + intSCORMError);
    WriteToDebug("              SCORMErrorString=" + strSCORMErrorString);
    WriteToDebug("              Diagnostic=" + strSCORMErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning true");
  return true;
}
function SCORM_CallLMSGetValue(strElement) {
  var strResult;
  WriteToDebug("In SCORM_CallLMSGetValue strElement=" + strElement);
  SCORM_objAPI = SCORM_GrabAPI();
  WriteToDebug("Call LMSGetValue");
  strElement = strElement + "";
  strResult = SCORM_objAPI.LMSGetValue(strElement) + "";
  WriteToDebug("strResult=" + strResult);
  intSCORMError = SCORM_objAPI.LMSGetLastError();
  intSCORMError = intSCORMError + "";
  WriteToDebug("intSCORMError=" + intSCORMError);
  if (intSCORMError != SCORM_NO_ERROR) {
    WriteToDebug("Detected failed called to LMSGetValue");
    SCORM_SetErrorInfo();
    WriteToDebug("Error calling LMSGetValue:");
    WriteToDebug("              strElement=" + strElement);
    WriteToDebug("              intSCORMError=" + intSCORMError);
    WriteToDebug("              SCORMErrorString=" + strSCORMErrorString);
    WriteToDebug("              Diagnostic=" + strSCORMErrorDiagnostic);
  }
  WriteToDebug("Returning " + strResult);
  return strResult;
}
function SCORM_CallLMSCommit() {
  var strResult;
  WriteToDebug("In SCORM_CallLMSCommit");
  SCORM_objAPI = SCORM_GrabAPI();
  WriteToDebug("Calling LMSCommit");
  strResult = SCORM_objAPI.LMSCommit("");
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM_FALSE) {
    WriteToDebug("Detected failed call to LMSCommit");
    SCORM_SetErrorInfo();
    WriteToDebug("Error calling LMSCommit:");
    WriteToDebug("              intSCORMError=" + intSCORMError);
    WriteToDebug("              SCORMErrorString=" + strSCORMErrorString);
    WriteToDebug("              Diagnostic=" + strSCORMErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning true");
  return true;
}
function SCORM_CallLMSFinish() {
  var strResult;
  WriteToDebug("In SCORM_CallLMSFinish");
  SCORM_objAPI = SCORM_GrabAPI();
  WriteToDebug("Calling LMS Finish");
  strResult = SCORM_objAPI.LMSFinish("");
  strResult = strResult + "";
  WriteToDebug("strResult=" + strResult);
  if (strResult == SCORM_FALSE) {
    WriteToDebug("Detected failed call to LMSFinish");
    SCORM_SetErrorInfo();
    WriteToDebug("Error calling LMSFinish:");
    WriteToDebug("              intSCORMError=" + intSCORMError);
    WriteToDebug("              SCORMErrorString=" + strSCORMErrorString);
    WriteToDebug("              Diagnostic=" + strSCORMErrorDiagnostic);
    return false;
  }
  WriteToDebug("Returning True");
  return true;
}
function SCORM_ClearErrorInfo() {
  WriteToDebug("In SCORM_ClearErrorInfo");
  intSCORMError = SCORM_NO_ERROR;
  strSCORMErrorString = "";
  strSCORMErrorDiagnostic = "";
}
function SCORM_SetErrorInfo() {
  WriteToDebug("In SCORM_SetErrorInfo");
  intSCORMError = SCORM_objAPI.LMSGetLastError();
  strSCORMErrorString = SCORM_objAPI.LMSGetErrorString(intSCORMError);
  strSCORMErrorDiagnostic = SCORM_objAPI.LMSGetDiagnostic("");
  intSCORMError = intSCORMError + "";
  strSCORMErrorString = strSCORMErrorString + "";
  strSCORMErrorDiagnostic = strSCORMErrorDiagnostic + "";
  WriteToDebug("intSCORMError=" + intSCORMError);
  WriteToDebug("strSCORMErrorString=" + strSCORMErrorString);
  WriteToDebug("strSCORMErrorDiagnostic=" + strSCORMErrorDiagnostic);
}
function SCORM_SetErrorInfoManually(intNum, strString, strDiagnostic) {
  WriteToDebug("In SCORM_SetErrorInfoManually");
  WriteToDebug("ERROR-Num=" + intNum);
  WriteToDebug("      String=" + strString);
  WriteToDebug("      Diag=" + strDiagnostic);
  intSCORMError = intNum;
  strSCORMErrorString = strString;
  strSCORMErrorDiagnostic = strDiagnostic;
}
function SCORM_GetLastError() {
  WriteToDebug("In SCORM_GetLastError");
  if (intSCORMError == SCORM_NO_ERROR) {
    WriteToDebug("Returning No Error");
    return NO_ERROR;
  } else {
    WriteToDebug("Returning " + intSCORMError);
    return intSCORMError;
  }
}
function SCORM_GetLastErrorDesc() {
  WriteToDebug(
    "In SCORM_GetLastErrorDesc, " +
      strSCORMErrorString +
      "\n" +
      strSCORMErrorDiagnostic
  );
  return strSCORMErrorString + "\n" + strSCORMErrorDiagnostic;
}
function SCORM_GrabAPI() {
  WriteToDebug("In SCORM_GrabAPI");
  if (typeof SCORM_objAPI == "undefined" || SCORM_objAPI == null) {
    WriteToDebug("Searching with improved ADL algorithm");
    SCORM_objAPI = SCORM_GetAPI();
  }
  if (typeof SCORM_objAPI == "undefined" || SCORM_objAPI == null) {
    SCORM_objAPI = SCORM_SearchForAPI(window);
  }
  WriteToDebug("SCORM_GrabAPI, returning");
  return SCORM_objAPI;
}
function SCORM_SearchForAPI(wndLookIn) {
  WriteToDebug("SCORM_SearchForAPI");
  var objAPITemp = null;
  var strDebugID = "";
  strDebugID = "Name=" + wndLookIn.name + ", href=" + wndLookIn.location.href;
  objAPITemp = wndLookIn.API;
  if (SCORM_APIFound(objAPITemp)) {
    WriteToDebug("Found API in this window - " + strDebugID);
    return objAPITemp;
  }
  if (SCORM_WindowHasParent(wndLookIn)) {
    WriteToDebug("Searching Parent - " + strDebugID);
    objAPITemp = SCORM_SearchForAPI(wndLookIn.parent);
  }
  if (SCORM_APIFound(objAPITemp)) {
    WriteToDebug("Found API in a parent - " + strDebugID);
    return objAPITemp;
  }
  if (SCORM_WindowHasOpener(wndLookIn)) {
    WriteToDebug("Searching Opener - " + strDebugID);
    objAPITemp = SCORM_SearchForAPI(wndLookIn.opener);
  }
  if (SCORM_APIFound(objAPITemp)) {
    WriteToDebug("Found API in an opener - " + strDebugID);
    return objAPITemp;
  }
  WriteToDebug("Looking in children - " + strDebugID);
  objAPITemp = SCORM_LookInChildren(wndLookIn);
  if (SCORM_APIFound(objAPITemp)) {
    WriteToDebug("Found API in Children - " + strDebugID);
    return objAPITemp;
  }
  WriteToDebug("Didn't find API in this window - " + strDebugID);
  return null;
}
function SCORM_LookInChildren(wnd) {
  WriteToDebug("SCORM_LookInChildren");
  var objAPITemp = null;
  var strDebugID = "";
  strDebugID = "Name=" + wnd.name + ", href=" + wnd.location.href;
  for (var i = 0; i < wnd.frames.length; i++) {
    WriteToDebug("Looking in child frame " + i);
    objAPITemp = wnd.frames[i].API;
    if (SCORM_APIFound(objAPITemp)) {
      WriteToDebug("Found API in child frame of " + strDebugID);
      return objAPITemp;
    }
    WriteToDebug("Looking in this child's children " + strDebugID);
    objAPITemp = SCORM_LookInChildren(wnd.frames[i]);
    if (SCORM_APIFound(objAPITemp)) {
      WriteToDebug("API found in this child's children " + strDebugID);
      return objAPITemp;
    }
  }
  return null;
}
function SCORM_WindowHasOpener(wnd) {
  WriteToDebug("In SCORM_WindowHasOpener");
  if (
    wnd.opener != null &&
    wnd.opener != wnd &&
    typeof wnd.opener != "undefined"
  ) {
    WriteToDebug("Window Does Have Opener");
    return true;
  } else {
    WriteToDebug("Window Does Not Have Opener");
    return false;
  }
}
function SCORM_WindowHasParent(wnd) {
  WriteToDebug("In SCORM_WindowHasParent");
  if (
    wnd.parent != null &&
    wnd.parent != wnd &&
    typeof wnd.parent != "undefined"
  ) {
    WriteToDebug("Window Does Have Parent");
    return true;
  } else {
    WriteToDebug("Window Does Not Have Parent");
    return false;
  }
}
function SCORM_APIFound(obj) {
  WriteToDebug("In SCORM_APIFound");
  if (obj == null || typeof obj == "undefined") {
    WriteToDebug("API NOT Found");
    return false;
  } else {
    WriteToDebug("API Found");
    return true;
  }
}
function SCORM_ScanParentsForApi(win) {
  WriteToDebug("In SCORM_ScanParentsForApi, win=" + win.location);
  var MAX_PARENTS_TO_SEARCH = 500;
  var nParentsSearched = 0;
  while (
    (win.API == null || win.API === undefined) &&
    win.parent != null &&
    win.parent != win &&
    nParentsSearched <= MAX_PARENTS_TO_SEARCH
  ) {
    nParentsSearched++;
    win = win.parent;
  }
  return win.API;
}
function SCORM_GetAPI() {
  WriteToDebug("In SCORM_GetAPI");
  var API = null;
  if (window.parent != null && window.parent != window) {
    WriteToDebug("SCORM_GetAPI, searching parent");
    API = SCORM_ScanParentsForApi(window.parent);
  }
  if (API == null && window.top.opener != null) {
    WriteToDebug("SCORM_GetAPI, searching opener");
    API = SCORM_ScanParentsForApi(window.top.opener);
  }
  return API;
}
var STANDARD = "AICC";
var blnDirtyAICCData = false;
var blnCommitSavedData = false;
var intAICCErrorNum = NO_ERROR;
var strAICCErrorDesc = "";
var aryAICCFoundItems = new Array();
var blnUseLongInteractionResultValues = true;
var blnReviewModeSoReadOnly = false;
var AICC_LMS_Version = "";
var AICC_Student_ID = "";
var AICC_Student_Name = "";
var AICC_Lesson_Location = "";
var AICC_Score = "";
var AICC_Credit = "";
var AICC_Lesson_Status = "";
var AICC_Time = "";
var AICC_Mastery_Score = "";
var AICC_Lesson_Mode = "";
var AICC_Max_Time_Allowed = "";
var AICC_Time_Limit_Action = "";
var AICC_Audio = "";
var AICC_Speed = "";
var AICC_Language = "";
var AICC_Text = "";
var AICC_Launch_Data = "";
var AICC_Data_Chunk = "";
var AICC_Comments = "";
var AICC_Objectives = null;
var AICC_CourseID = "";
var AICC_fltScoreRaw = "";
var AICC_fltScoreMax = "";
var AICC_fltScoreMin = "";
var AICC_blnCredit = true;
var AICC_strLessonMode = MODE_NORMAL;
var AICC_intPreviouslyAccumulatedMilliseconds = 0;
var AICC_intMaxTimeAllowedMilliseconds = MAX_CMI_TIME;
var AICC_blnExitOnTimeout = false;
var AICC_blnShowMessageOnTimeout = true;
var AICC_TextPreference = PREFERENCE_DEFAULT;
var AICC_Status = LESSON_STATUS_NOT_ATTEMPTED;
var AICC_Entry = AICC_ENTRY_FLAG_DEFAULT;
var AICC_AudioPlayPreference = PREFERENCE_DEFAULT;
var AICC_intAudioVolume = 100;
var AICC_intPercentOfMaxSpeed = 100;
var AICC_intSessionTimeMilliseconds = 0;
var AICC_aryObjectivesRead = new Array();
var AICC_aryObjectivesWrite = new Array();
var AICC_aryCommentsFromLearner = new Array();
var AICC_aryInteractions = new Array();
var AICC_OBJ_ARRAY_ID = 0;
var AICC_OBJ_ARRAY_SCORE = 1;
var AICC_OBJ_ARRAY_STATUS = 2;
var AICC_INTERACTIONS_ID = 0;
var AICC_INTERACTIONS_RESPONSE = 1;
var AICC_INTERACTIONS_CORRECT = 2;
var AICC_INTERACTIONS_CORRECT_RESPONSE = 3;
var AICC_INTERACTIONS_TIME_STAMP = 4;
var AICC_INTERACTIONS_TYPE = 5;
var AICC_INTERACTIONS_WEIGHTING = 6;
var AICC_INTERACTIONS_LATENCY = 7;
var AICC_INTERACTIONS_RESPONSE_LONG = 8;
var AICC_INTERACTIONS_CORRECT_RESPONSE_LONG = 9;
var AICC_INTERACTION_TYPE_TRUE_FALSE = "T";
var AICC_INTERACTION_TYPE_CHOICE = "C";
var AICC_INTERACTION_TYPE_FILL_IN = "F";
var AICC_INTERACTION_TYPE_MATCHING = "M";
var AICC_INTERACTION_TYPE_PERFORMANCE = "P";
var AICC_INTERACTION_TYPE_SEQUENCING = "S";
var AICC_INTERACTION_TYPE_LIKERT = "L";
var AICC_INTERACTION_TYPE_NUMERIC = "N";
var AICC_RESULT_CORRECT = "C";
var AICC_RESULT_WRONG = "W";
var AICC_RESULT_UNANTICIPATED = "U";
var AICC_RESULT_NEUTRAL = "N";
var AICC_NO_ERROR = "0";
var AICC_ERROR_INVALID_PREFERENCE = "-1";
var AICC_ERROR_INVALID_STATUS = "-2";
var AICC_ERROR_INVALID_SPEED = "-3";
var AICC_ERROR_INVALID_TIMESPAN = "-4";
var AICC_ERROR_INVALID_TIME_LIMIT_ACTION = "-5";
var AICC_ERROR_INVALID_DECIMAL = "-6";
var AICC_ERROR_INVALID_CREDIT = "-7";
var AICC_ERROR_INVALID_LESSON_MODE = "-8";
var AICC_ERROR_INVALID_ENTRY = "-9";
var blnReviewModeSoReadOnly = false;
function AICC_Initialize() {
  WriteToDebug("In AICC_Initialize");
  window.AICCComm.MakeGetParamRequest();
  return;
}
function AICC_InitializeExecuted() {
  WriteToDebug("In AICC_InitializeExecuted");
  if (AICC_GetLessonMode() != MODE_REVIEW) {
    if (AICC_GetStatus() == LESSON_STATUS_NOT_ATTEMPTED) {
      WriteToDebug("Setting Status to Incomplete");
      AICC_Status = LESSON_STATUS_INCOMPLETE;
    }
  } else {
    if (
      !(typeof REVIEW_MODE_IS_READ_ONLY == "undefined") &&
      REVIEW_MODE_IS_READ_ONLY === true
    ) {
      blnReviewModeSoReadOnly = true;
    }
  }
}
function AICC_Finish(strExitType, blnStatusWasSet) {
  WriteToDebug(
    "In AICC_Finish, strExitType=" +
      strExitType +
      ", blnStatusWasSet=" +
      blnStatusWasSet
  );
  if (!blnStatusWasSet) {
    if (strExitType == EXIT_TYPE_FINISH) {
      WriteToDebug("Setting status to complete");
      AICC_Status = LESSON_STATUS_COMPLETED;
    } else if (AICC_Status != LESSON_STATUS_COMPLETED) {
      WriteToDebug("Setting status to incomplete");
      AICC_Status = LESSON_STATUS_INCOMPLETE;
    }
  }
  AICC_CommitData();
  if (blnCommitSavedData == true) {
    KillTime();
  }
  window.AICCComm.MakeExitAURequest();
  return true;
}
function AICC_CommitData() {
  var strAICCData;
  WriteToDebug("In AICC_CommitData");
  if (blnReviewModeSoReadOnly === true) {
    WriteToDebug(
      "Mode is Review and configuration setting dictates this should be read only so exiting."
    );
    return true;
  }
  blnCommitSavedData = false;
  if (IsThereDirtyAICCData()) {
    blnCommitSavedData = true;
    WriteToDebug("Found Dirty Data");
    strAICCData = FormAICCPostData();
    window.AICCComm.MakePutParamRequest(strAICCData);
    if (AICC_aryInteractions.length > 0) {
      WriteToDebug("Saving Interactions");
      KillTime();
      AICC_SendInteractions();
    }
    ClearDirtyAICCData();
  }
  return true;
}
function KillTime() {
  WriteToDebug("In KillTime");
  if (USE_AICC_KILL_TIME === false) {
    WriteToDebug("Configuration disallows use of KillTime, exiting");
    return;
  }
  var start = new Date();
  if (window.AICCComm.blnCanUseXMLHTTP == false) {
    if (window.AICCComm.blnXMLHTTPIsAvailable == true) {
      var numBlankRequests = 3;
      for (var i = 0; i < numBlankRequests; i++) {
        window.AICCComm.GetBlankHtmlPage(i);
      }
    } else {
      window.NothingFrame.document.open();
      var numLoops = 1000;
      for (var i = 0; i < numLoops; i++) {
        window.NothingFrame.document.write("waiting");
      }
      window.NothingFrame.document.close();
    }
  }
  var end = new Date();
  WriteToDebug("Killed " + (end - start) + "milliseconds.");
}
function AICC_SendInteractions() {
  WriteToDebug("In AICC_SendInteractions.");
  if (blnReviewModeSoReadOnly === true) {
    WriteToDebug(
      "Mode is Review and configuration setting dictates this should be read only so exiting."
    );
    return true;
  }
  var strAICCData = FormAICCInteractionsData();
  window.AICCComm.MakePutInteractionsRequest(strAICCData);
  AICC_aryInteractions = new Array();
}
function AICC_GetStudentID() {
  WriteToDebug("In AICC_GetStudentID, Returning " + AICC_Student_ID);
  return AICC_Student_ID;
}
function AICC_GetStudentName() {
  WriteToDebug("In AICC_GetStudentName, Returning " + AICC_Student_Name);
  return AICC_Student_Name;
}
function AICC_GetBookmark() {
  WriteToDebug("In AICC_GetBookmark, Returning " + AICC_Lesson_Location);
  return AICC_Lesson_Location;
}
function AICC_SetBookmark(strBookmark) {
  WriteToDebug("In AICC_SetBookmark, strBookmark=" + strBookmark);
  SetDirtyAICCData();
  AICC_Lesson_Location = strBookmark;
  return true;
}
function AICC_GetDataChunk() {
  WriteToDebug("In AICC_GetDataChunk, Returning " + AICC_Data_Chunk);
  return AICC_Data_Chunk;
}
function AICC_SetDataChunk(strData) {
  WriteToDebug("In AICC_SetDataChunk, strData=" + strData);
  if (USE_STRICT_SUSPEND_DATA_LIMITS == true) {
    if (strData.length > 4096) {
      WriteToDebug(
        "SCORM_SetDataChunk - suspend_data too large (4096 character limit for AICC)"
      );
      return false;
    } else {
      SetDirtyAICCData();
      AICC_Data_Chunk = strData;
      return true;
    }
  } else {
    SetDirtyAICCData();
    AICC_Data_Chunk = strData;
    return true;
  }
}
function AICC_GetLaunchData() {
  WriteToDebug("In AICC_GetLaunchData, Returning " + AICC_Launch_Data);
  return AICC_Launch_Data;
}
function AICC_GetComments() {
  WriteToDebug(
    "In AICC_GetComments, Returning " + AICC_aryCommentsFromLearner.join(" | ")
  );
  return AICC_aryCommentsFromLearner.join(" | ");
}
function AICC_WriteComment(strComment) {
  WriteToDebug("In AICC_WriteComment, strComment=" + strComment);
  var intNextIndex;
  if (strComment.search(/ \| /) == 0) {
    strComment = strComment.substr(3);
  }
  strComment.replace(/\|\|/g, "|");
  intNextIndex = AICC_aryCommentsFromLearner.length;
  WriteToDebug("Adding comment to array");
  AICC_aryCommentsFromLearner[intNextIndex] = strComment;
  SetDirtyAICCData();
  return true;
}
function AICC_GetLMSComments() {
  WriteToDebug("In AICC_GetLMSComments, Returning " + AICC_Comments);
  return AICC_Comments;
}
function AICC_GetAudioPlayPreference() {
  WriteToDebug(
    "In AICC_GetAudioPlayPreference, Returning " + AICC_AudioPlayPreference
  );
  return AICC_AudioPlayPreference;
}
function AICC_GetAudioVolumePreference() {
  WriteToDebug(
    "In AICC_GetAudioVolumePreference, Returning " + AICC_intAudioVolume
  );
  return AICC_intAudioVolume;
}
function AICC_SetAudioPreference(PlayPreference, intPercentOfMaxVolume) {
  WriteToDebug("In AICC_SetAudioPreference, Returning true");
  AICC_AudioPlayPreference = PlayPreference;
  AICC_intAudioVolume = intPercentOfMaxVolume;
  SetDirtyAICCData();
  return true;
}
function AICC_SetLanguagePreference(strLanguage) {
  WriteToDebug("In AICC_SetLanguagePreference, Returning true");
  SetDirtyAICCData();
  AICC_Language = strLanguage;
  return true;
}
function AICC_GetLanguagePreference() {
  WriteToDebug("In AICC_GetLanguagePreference, Returning " + AICC_Language);
  return AICC_Language;
}
function AICC_SetSpeedPreference(intPercentOfMax) {
  WriteToDebug("In AICC_SetSpeedPreference, Returning true");
  AICC_intPercentOfMaxSpeed = intPercentOfMax;
  SetDirtyAICCData();
  return true;
}
function AICC_GetSpeedPreference() {
  WriteToDebug(
    "In AICC_GetSpeedPreference, Returning " + AICC_intPercentOfMaxSpeed
  );
  return AICC_intPercentOfMaxSpeed;
}
function AICC_SetTextPreference(intPreference) {
  WriteToDebug("In AICC_SetTextPreference, Returning true");
  AICC_TextPreference = intPreference;
  SetDirtyAICCData();
  return true;
}
function AICC_GetTextPreference() {
  WriteToDebug("In AICC_GetTextPreference, Returning " + AICC_TextPreference);
  return AICC_TextPreference;
}
function AICC_GetPreviouslyAccumulatedTime() {
  WriteToDebug(
    "In AICC_GetPreviouslyAccumulatedTime, Returning " +
      AICC_intPreviouslyAccumulatedMilliseconds
  );
  return AICC_intPreviouslyAccumulatedMilliseconds;
}
function AICC_SaveTime(intMilliSeconds) {
  WriteToDebug("In intMilliSeconds, Returning true");
  AICC_intSessionTimeMilliseconds = intMilliSeconds;
  SetDirtyAICCData();
  return true;
}
function AICC_GetMaxTimeAllowed() {
  WriteToDebug(
    "In AICC_GetMaxTimeAllowed, Returning " + AICC_intMaxTimeAllowedMilliseconds
  );
  return AICC_intMaxTimeAllowedMilliseconds;
}
function AICC_DisplayMessageOnTimeout() {
  WriteToDebug(
    "In AICC_DisplayMessageOnTimeout, Returning " + AICC_blnShowMessageOnTimeout
  );
  return AICC_blnShowMessageOnTimeout;
}
function AICC_ExitOnTimeout() {
  WriteToDebug("In AICC_ExitOnTimeout, Returning " + AICC_blnExitOnTimeout);
  return AICC_blnExitOnTimeout;
}
function AICC_GetPassingScore() {
  WriteToDebug("In AICC_GetPassingScore, Returning " + AICC_Mastery_Score);
  return AICC_Mastery_Score;
}
function AICC_GetScore() {
  WriteToDebug("In AICC_GetScore, Returning " + AICC_fltScoreRaw);
  return AICC_fltScoreRaw;
}
function AICC_SetScore(fltScore, fltMaxScore, fltMinScore) {
  WriteToDebug(
    "In AICC_SetScore, fltScore=" +
      fltScore +
      ", fltMaxScore=" +
      fltMaxScore +
      ", fltMinScore=" +
      fltMinScore
  );
  AICC_fltScoreRaw = fltScore;
  AICC_fltScoreMax = fltMaxScore;
  AICC_fltScoreMin = fltMinScore;
  SetDirtyAICCData();
  return true;
}
function AICC_RecordTrueFalseInteraction(
  strID,
  blnResponse,
  blnCorrect,
  blnCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordTrueFalseInteraction strID=" +
      strID +
      ", blnResponse=" +
      blnResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", blnCorrectResponse=" +
      blnCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  var strResponse = "";
  var strCorrectResponse = "";
  if (blnResponse !== null) {
    if (blnResponse) {
      strResponse = "t";
    } else {
      strResponse = "f";
    }
  }
  if (blnCorrectResponse == true) {
    strCorrectResponse = "t";
  } else if (blnCorrectResponse == false) {
    strCorrectResponse = "f";
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_TRUE_FALSE;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponse;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordMultipleChoiceInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordMultipleChoiceInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  var strResponse = "";
  var strResponseLong = "";
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (aryResponse !== null) {
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += ",";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += ",";
      }
      strResponse += aryResponse[i].Short.replace(",", "");
      strResponseLong += aryResponse[i].Long.replace(",", "");
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += ",";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += ",";
    }
    strCorrectResponse += aryCorrectResponse[i].Short.replace(",", "");
    strCorrectResponseLong += aryCorrectResponse[i].Long.replace(",", "");
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_CHOICE;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponseLong;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponseLong;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordFillInInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordFillInInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  if (strResponse === null) {
    strResponse = "";
  }
  if (strCorrectResponse == null || strCorrectResponse == undefined) {
    strCorrectResponse = "";
  }
  strResponse = new String(strResponse);
  if (strResponse.length > 255) {
    strResponse = strResponse.substr(0, 255);
  }
  strCorrectResponse = new String(strCorrectResponse);
  if (strCorrectResponse.length > 255) {
    strCorrectResponse = strCorrectResponse.substr(0, 255);
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_FILL_IN;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponse;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordMatchingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordMatchingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  var strResponse = "";
  var strResponseLong = "";
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (aryResponse !== null) {
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += ",";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += ",";
      }
      strResponse +=
        aryResponse[i].Source.Short.replace(",", "").replace(".", "") +
        "." +
        aryResponse[i].Target.Short.replace(",", "").replace(".", "");
      strResponseLong +=
        aryResponse[i].Source.Long.replace(",", "").replace(".", "") +
        "." +
        aryResponse[i].Target.Long.replace(",", "").replace(".", "");
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += ",";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += ",";
    }
    if (
      aryCorrectResponse[i].Source.Short != "" &&
      aryCorrectResponse[i].Source.Long != ""
    ) {
      strCorrectResponse +=
        aryCorrectResponse[i].Source.Short.replace(",", "").replace(".", "") +
        "." +
        aryCorrectResponse[i].Target.Short.replace(",", "").replace(".", "");
      strCorrectResponseLong +=
        aryCorrectResponse[i].Source.Long.replace(",", "").replace(".", "") +
        "." +
        aryCorrectResponse[i].Target.Long.replace(",", "").replace(".", "");
    }
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_MATCHING;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponseLong;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponseLong;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordPerformanceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordPerformanceInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  if (strResponse === null) {
    strResponse = "";
  }
  if (strCorrectResponse == null || strCorrectResponse == undefined) {
    strCorrectResponse = "";
  }
  strResponse = new String(strResponse);
  if (strResponse.length > 255) {
    strResponse = strResponse.substr(0, 255);
  }
  strCorrectResponse = new String(strCorrectResponse);
  if (strCorrectResponse.length > 255) {
    strCorrectResponse = strCorrectResponse.substr(0, 255);
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_PERFORMANCE;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponse;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordSequencingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordSequencingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  var strResponse = "";
  var strResponseLong = "";
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (aryResponse !== null) {
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += ",";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += ",";
      }
      strResponse += aryResponse[i].Short.replace(",", "");
      strResponseLong += aryResponse[i].Long.replace(",", "");
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += ",";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += ",";
    }
    strCorrectResponse += aryCorrectResponse[i].Short.replace(",", "");
    strCorrectResponseLong += aryCorrectResponse[i].Long.replace(",", "");
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_SEQUENCING;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponseLong;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponseLong;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordLikertInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In RecordLikertInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  var strResponse = "";
  var strResponseLong = "";
  if (response !== null) {
    strResponse = response.Short;
    strResponseLong = response.Long;
  }
  var strCorrectResponse = "";
  var strCorrectResponseLong = "";
  if (correctResponse != null) {
    strCorrectResponse = correctResponse.Short;
    strCorrectResponseLong = correctResponse.Long;
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_LIKERT;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponseLong;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponseLong;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_RecordNumericInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In AICC_RecordNumericInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var intTotalInteractions;
  var aryData = new Array(10);
  intTotalInteractions = AICC_aryInteractions.length;
  if (intWeighting == null || intWeighting == undefined) {
    intWeighting = "";
  }
  if (intLatency == null || intLatency == undefined) {
    intLatency = "";
  }
  if (blnCorrect == null || blnCorrect == undefined) {
    blnCorrect = "";
  }
  if (strResponse === null) {
    strResponse = "";
  }
  if (strCorrectResponse != undefined && strCorrectResponse != null) {
    if (IsValidDecimalRange(strCorrectResponse)) {
      strCorrectResponse = ConvertDecimalRangeToDecimalBasedOnLearnerResponse(
        strCorrectResponse,
        strResponse,
        blnCorrect
      );
    }
    if (!IsValidDecimal(strCorrectResponse)) {
      WriteToDebug(
        "Returning False - AICC_RecordNumericInteraction received invalid correct response (not a decimal), strCorrectResponse=" +
          strCorrectResponse
      );
      return false;
    }
  } else {
    strCorrectResponse = "";
  }
  aryData[AICC_INTERACTIONS_ID] = strID;
  aryData[AICC_INTERACTIONS_RESPONSE] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT] = blnCorrect;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE] = strCorrectResponse;
  aryData[AICC_INTERACTIONS_TIME_STAMP] = dtmTime;
  aryData[AICC_INTERACTIONS_TYPE] = AICC_INTERACTION_TYPE_NUMERIC;
  aryData[AICC_INTERACTIONS_WEIGHTING] = intWeighting;
  aryData[AICC_INTERACTIONS_LATENCY] = intLatency;
  aryData[AICC_INTERACTIONS_RESPONSE_LONG] = strResponse;
  aryData[AICC_INTERACTIONS_CORRECT_RESPONSE_LONG] = strCorrectResponse;
  AICC_aryInteractions[intTotalInteractions] = aryData;
  WriteToDebug("Added to interactions array, index=" + intTotalInteractions);
  SetDirtyAICCData();
  return true;
}
function AICC_GetEntryMode() {
  WriteToDebug("In AICC_GetEntryMode, Returning " + AICC_Entry);
  return AICC_Entry;
}
function AICC_GetLessonMode() {
  WriteToDebug("In AICC_GetLessonMode, Returning " + AICC_strLessonMode);
  return AICC_strLessonMode;
}
function AICC_GetTakingForCredit() {
  WriteToDebug("In AICC_GetTakingForCredit, Returning " + AICC_blnCredit);
  return AICC_blnCredit;
}
function AICC_SetObjectiveScore(
  strObjectiveID,
  intScore,
  intMaxScore,
  intMinScore
) {
  WriteToDebug(
    "In AICC_SetObjectiveScore, strObjectiveID=" +
      strObjectiveID +
      ", intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  var intNextID;
  var intObjIndex;
  var strAICCScore = "";
  intObjIndex = FindObjectiveById(strObjectiveID, AICC_aryObjectivesRead);
  if (intObjIndex != null) {
    WriteToDebug("Found read objective");
    AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_SCORE] = intScore;
  } else {
    WriteToDebug("Adding new read objective");
    intNextID = AICC_aryObjectivesRead.length;
    AICC_aryObjectivesRead[parseInt(intNextID, 10)] = new Array(3);
    AICC_aryObjectivesRead[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_ID] =
      strObjectiveID;
    AICC_aryObjectivesRead[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_SCORE] =
      intScore;
    AICC_aryObjectivesRead[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_STATUS] = "";
  }
  intObjIndex = FindObjectiveById(strObjectiveID, AICC_aryObjectivesWrite);
  if (intObjIndex != null) {
    WriteToDebug("Found write objective");
    AICC_aryObjectivesWrite[intObjIndex][AICC_OBJ_ARRAY_SCORE] = intScore;
  } else {
    WriteToDebug("Adding new write objective");
    intNextID = AICC_aryObjectivesWrite.length;
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)] = new Array(3);
    strAICCScore = intScore;
    if (AICC_LMS_Version < 3 && strAICCScore != "") {
      strAICCScore = parseInt(strAICCScore, 10);
    }
    if (
      (AICC_REPORT_MIN_MAX_SCORE === undefined ||
        AICC_REPORT_MIN_MAX_SCORE === null ||
        AICC_REPORT_MIN_MAX_SCORE === true) &&
      AICC_LMS_Version >= 3
    ) {
      if (intMaxScore != "" || intMinScore != "") {
        WriteToDebug("Appending Max and Min scores");
        strAICCScore += "," + intMaxScore + "," + intMinScore;
      }
    }
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_ID] =
      strObjectiveID;
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_SCORE] =
      strAICCScore;
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_STATUS] =
      "";
  }
  SetDirtyAICCData();
  return true;
}
function AICC_SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  WriteToDebug(
    "In AICC_SetObjectiveStatus, strObjectiveID=" +
      strObjectiveID +
      ", Lesson_Status=" +
      Lesson_Status
  );
  var intNextID;
  var intObjIdex;
  intObjIdex = FindObjectiveById(strObjectiveID, AICC_aryObjectivesRead);
  if (intObjIdex != null) {
    WriteToDebug("Found read objective");
    AICC_aryObjectivesRead[intObjIdex][AICC_OBJ_ARRAY_STATUS] = Lesson_Status;
  } else {
    WriteToDebug("Adding new read objective");
    intNextID = AICC_aryObjectivesRead.length;
    AICC_aryObjectivesRead[parseInt(intNextID, 10)] = new Array(3);
    AICC_aryObjectivesRead[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_ID] =
      strObjectiveID;
    AICC_aryObjectivesRead[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_STATUS] =
      Lesson_Status;
    AICC_aryObjectivesRead[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_SCORE] = "";
  }
  intObjIdex = FindObjectiveById(strObjectiveID, AICC_aryObjectivesWrite);
  if (intObjIdex != null) {
    WriteToDebug("Found write objective");
    AICC_aryObjectivesWrite[intObjIdex][AICC_OBJ_ARRAY_STATUS] = Lesson_Status;
  } else {
    WriteToDebug("Adding new write objective");
    intNextID = AICC_aryObjectivesWrite.length;
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)] = new Array(3);
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_ID] =
      strObjectiveID;
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_STATUS] =
      Lesson_Status;
    AICC_aryObjectivesWrite[parseInt(intNextID, 10)][AICC_OBJ_ARRAY_SCORE] = "";
  }
  SetDirtyAICCData();
  return true;
}
function AICC_SetObjectiveDescription(strObjectiveID, strObjectiveDescription) {
  WriteToDebug(
    "In AICC_SetObjectiveDescription, strObjectiveID=" +
      strObjectiveID +
      ", strObjectiveDescription=" +
      strObjectiveDescription
  );
  WriteToDebug("Objective descriptions are not supported prior to SCORM 2004");
  return true;
}
function AICC_GetObjectiveScore(strObjectiveID) {
  WriteToDebug("In AICC_SetObjectiveScore, strObjectiveID=" + strObjectiveID);
  var intObjIndex = FindObjectiveById(strObjectiveID, AICC_aryObjectivesRead);
  if (intObjIndex != null) {
    WriteToDebug(
      "Found objective, returning " +
        AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_SCORE]
    );
    return AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_SCORE];
  } else {
    WriteToDebug("Did not find objective, returning ''");
    return "";
  }
}
function AICC_GetObjectiveDescription(strObjectiveID) {
  WriteToDebug(
    "In AICC_GetObjectiveDescription, strObjectiveID=" + strObjectiveID
  );
  WriteToDebug("Objective descriptions are not supported prior to SCORM 2004");
  return "";
}
function AICC_GetObjectiveStatus(strObjectiveID) {
  WriteToDebug("In AICC_SetObjectiveStatus, strObjectiveID=" + strObjectiveID);
  var intObjIndex = FindObjectiveById(strObjectiveID, AICC_aryObjectivesRead);
  if (intObjIndex != null) {
    WriteToDebug(
      "Found objective, returning " +
        AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_STATUS]
    );
    return AICC_aryObjectivesRead[intObjIndex][AICC_OBJ_ARRAY_STATUS];
  } else {
    WriteToDebug(
      "Did not find objective, returning " + LESSON_STATUS_NOT_ATTEMPTED
    );
    return LESSON_STATUS_NOT_ATTEMPTED;
  }
}
function AICC_SetFailed() {
  WriteToDebug("In AICC_SetFailed, Returning true");
  AICC_Status = LESSON_STATUS_FAILED;
  SetDirtyAICCData();
  return true;
}
function AICC_SetPassed() {
  WriteToDebug("In AICC_SetPassed, Returning true");
  AICC_Status = LESSON_STATUS_PASSED;
  SetDirtyAICCData();
  return true;
}
function AICC_SetCompleted() {
  WriteToDebug("In AICC_SetCompleted, Returning true");
  AICC_Status = LESSON_STATUS_COMPLETED;
  SetDirtyAICCData();
  return true;
}
function AICC_ResetStatus() {
  WriteToDebug("In AICC_ResetStatus, Returning true");
  AICC_Status = LESSON_STATUS_INCOMPLETE;
  SetDirtyAICCData();
  return true;
}
function AICC_GetStatus() {
  WriteToDebug("In AICC_GetStatus, Returning " + AICC_Status);
  return AICC_Status;
}
function AICC_GetProgressMeasure() {
  WriteToDebug(
    "AICC_GetProgressMeasure - AICC does not support progress_measure, returning false"
  );
  return false;
}
function AICC_SetProgressMeasure() {
  WriteToDebug(
    "AICC_SetProgressMeasure - AICC does not support progress_measure, returning false"
  );
  return false;
}
function AICC_GetObjectiveProgressMeasure() {
  WriteToDebug(
    "AICC_GetObjectiveProgressMeasure - AICC does not support progress_measure, returning false"
  );
  return false;
}
function AICC_SetObjectiveProgressMeasure() {
  WriteToDebug(
    "AICC_SetObjectiveProgressMeasure - AICC does not support progress_measure, returning false"
  );
  return false;
}
function AICC_SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "AICC_SetPointBasedScore - AICC does not support SetPointBasedScore, falling back to SetScore"
  );
  return AICC_SetScore(intScore, intMaxScore, intMinScore);
}
function AICC_GetScaledScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "AICC_GetScaledScore - AICC does not support GetScaledScore, returning false"
  );
  return false;
}
function AICC_GetLastError() {
  WriteToDebug("In AICC_GetLastError, Returning " + intAICCErrorNum);
  return intAICCErrorNum;
}
function AICC_GetLastErrorDesc() {
  WriteToDebug(
    "In AICC_GetLastErrorDesc, Returning '" + strAICCErrorDesc + "'"
  );
  return strAICCErrorDesc;
}
function AICC_PutParamFailed() {
  WriteToDebug("ERROR: In AICC_PutParamFailed");
  SetDirtyAICCData();
  return;
}
function AICC_PutInteractionsFailed() {
  WriteToDebug("ERROR: In AICC_PutInteractionsFailed");
  SetDirtyAICCData();
  if (parent.blnUseLongInteractionResultValues == true) {
    parent.blnUseLongInteractionResultValues = false;
    parent.AICC_CommitData();
  }
  return;
}
function AICC_SetErrorInfo(strErrorNumLine, strErrorDescLine) {
  WriteToDebug(
    "ERROR: In AICC_SetErrorInfo, strErrorNumLine=" +
      strErrorNumLine +
      ", strErrorDescLine=" +
      strErrorDescLine
  );
  if (strErrorNumLine.toLowerCase().search(/error\s*=\s*0/) == -1) {
    WriteToDebug("Detected No Error");
    intAICCErrorNum = NO_ERROR;
    strAICCErrorDesc = "";
  } else {
    WriteToDebug("Setting Error Info");
    AICC_SetError(
      GetValueFromAICCLine(strAICCErrorLine),
      GetValueFromAICCLine(strAICCErrorDesc)
    );
  }
}
function AICC_SetError(intErrorNum, strErrorDesc) {
  WriteToDebug(
    "ERROR: In AICC_SetError, intErrorNum=" +
      intErrorNum +
      ", strErrorDesc=" +
      strErrorDesc
  );
  intAICCErrorNum = intErrorNum;
  strAICCErrorDesc = strAICCErrorDesc;
}
function SetDirtyAICCData() {
  WriteToDebug("In SetDirtyAICCData");
  blnDirtyAICCData = true;
}
function ClearDirtyAICCData() {
  WriteToDebug("In ClearDirtyAICCData");
  blnDirtyAICCData = false;
}
function IsThereDirtyAICCData() {
  WriteToDebug("In IsThereDirtyAICCData, returning " + blnDirtyAICCData);
  return blnDirtyAICCData;
}
function GetValueFromAICCLine(strLine) {
  WriteToDebug("In GetValueFromAICCLine, strLine=" + strLine);
  var intPos;
  var strValue = "";
  var strTemp;
  strLine = new String(strLine);
  intPos = strLine.indexOf("=");
  WriteToDebug("intPos=" + intPos);
  if (intPos > -1 && intPos + 1 < strLine.length) {
    WriteToDebug("Grabbing value");
    strTemp = strLine.substring(intPos + 1);
    WriteToDebug("strTemp=" + strTemp);
    strTemp = strTemp.replace(/^\s*/, "");
    strTemp = strTemp.replace(/\s*$/, "");
    strValue = strTemp;
  }
  WriteToDebug("returning " + strValue);
  return strValue;
}
function GetNameFromAICCLine(strLine) {
  WriteToDebug("In GetNameFromAICCLine, strLine=" + strLine);
  var intPos;
  var strTemp;
  var strName = "";
  strLine = new String(strLine);
  intPos = strLine.indexOf("=");
  WriteToDebug("intPos=" + intPos);
  if (intPos > -1 && intPos < strLine.length) {
    WriteToDebug("Grabbing name from name/value pair");
    strTemp = strLine.substring(0, intPos);
    WriteToDebug("strTemp=" + strTemp);
    strTemp = strTemp.replace(/^\s*/, "");
    strTemp = strTemp.replace(/\s*$/, "");
    strName = strTemp;
  } else {
    WriteToDebug("Grabbing name from group / section heading");
    intPos = strLine.indexOf("[");
    WriteToDebug("intPos=" + intPos);
    if (intPos > -1) {
      WriteToDebug("Replacing []");
      strTemp = strLine.replace(/[\[|\]]/g, "");
      WriteToDebug("strTemp=" + strTemp);
      strTemp = strTemp.replace(/^\s*/, "");
      strTemp = strTemp.replace(/\s*$/, "");
      strName = strTemp;
    }
  }
  WriteToDebug("returning " + strName);
  return strName;
}
function GetIndexFromAICCName(strLineName) {
  WriteToDebug("In GetIndexFromAICCName, strLineName=" + strLineName);
  var intPos;
  var strIndex = "";
  var strTemp = "";
  strLine = new String(strLineName);
  intPos = strLine.indexOf(".");
  WriteToDebug("intPos=" + intPos);
  if (intPos > -1 && intPos + 1 < strLine.length) {
    WriteToDebug("Grabbing index");
    strTemp = strLine.substring(intPos + 1);
    WriteToDebug("strTemp=" + strTemp);
    WriteToDebug("Checking for equal sign");
    intPos = strTemp.indexOf("=");
    if (intPos > -1 && intPos < strTemp.length) {
      WriteToDebug("Found and removing equal sign");
      strTemp = strLine.substring(0, intPos);
    }
    WriteToDebug("Removing white space");
    strTemp = strTemp.replace(/^\s*/, "");
    strTemp = strTemp.replace(/\s*$/, "");
    strIndex = strTemp;
  }
  WriteToDebug("returning " + strIndex);
  return strIndex;
}
function ParseGetParamData(strLMSResult) {
  WriteToDebug("In ParseGetParamData");
  var aryAICCResponseLines;
  var strLine;
  var strLineName;
  var strLineValue;
  var i, j;
  strLMSResult = new String(strLMSResult);
  aryAICCResponseLines = strLMSResult.split("\n");
  WriteToDebug("Split String");
  for (i = 0; i < aryAICCResponseLines.length; i++) {
    WriteToDebug("Processing Line #" + i + ": " + aryAICCResponseLines[i]);
    strLine = aryAICCResponseLines[i];
    strLineName = "";
    strLineValue = "";
    if (strLine.length > 0) {
      WriteToDebug("Found non-zero length string");
      if (strLine.charAt(0) == "\r") {
        WriteToDebug("Detected leading \\r");
        strLine = strLine.substr(1);
      }
      if (strLine.charAt(strLine.length - 1) == "\r") {
        WriteToDebug("Detected trailing \\r");
        strLine = strLine.substr(0, strLine.length - 1);
      }
      if (strLine.charAt(0) != ";") {
        WriteToDebug("Found non-comment line");
        strLineName = GetNameFromAICCLine(strLine);
        strLineValue = GetValueFromAICCLine(strLine);
        WriteToDebug(
          "strLineName=" + strLineName + ", strLineValue=" + strLineValue
        );
      }
    }
    strLineName = strLineName.toLowerCase();
    if (!AICC_HasItemBeenFound(strLineName)) {
      WriteToDebug("Detected an un-found item");
      AICC_FoundItem(strLineName);
      switch (strLineName) {
        case "version":
          WriteToDebug("Item is version");
          var tempVersion = parseFloat(strLineValue);
          if (isNaN(tempVersion)) {
            tempVersion = 0;
          }
          AICC_LMS_Version = tempVersion;
          break;
        case "student_id":
          WriteToDebug("Item is student_id");
          AICC_Student_ID = strLineValue;
          break;
        case "student_name":
          WriteToDebug("Item is student_name");
          AICC_Student_Name = strLineValue;
          break;
        case "lesson_location":
          WriteToDebug("Item is lesson_location");
          AICC_Lesson_Location = strLineValue;
          break;
        case "score":
          WriteToDebug("Item is score");
          AICC_Score = strLineValue;
          AICC_SeperateScoreValues(AICC_Score);
          break;
        case "credit":
          WriteToDebug("Item is credit");
          AICC_Credit = strLineValue;
          AICC_TranslateCredit(AICC_Credit);
          break;
        case "lesson_status":
          WriteToDebug("Item is lesson_status");
          AICC_Lesson_Status = strLineValue;
          AICC_TranslateLessonStatus(AICC_Lesson_Status);
          break;
        case "time":
          WriteToDebug("Item is time");
          AICC_Time = strLineValue;
          AICC_TranslateTimeToMilliseconds(AICC_Time);
          break;
        case "mastery_score":
          WriteToDebug("Item is mastery_score");
          AICC_Mastery_Score = strLineValue;
          AICC_ValidateMasteryScore(AICC_Mastery_Score);
          break;
        case "lesson_mode":
          WriteToDebug("Item is lesson_mode");
          AICC_Lesson_Mode = strLineValue;
          AICC_TranslateLessonMode(AICC_Lesson_Mode);
          break;
        case "max_time_allowed":
          WriteToDebug("Item is max_time_allowed");
          AICC_Max_Time_Allowed = strLineValue;
          AICC_TranslateMaxTimeToMilliseconds(AICC_Max_Time_Allowed);
          break;
        case "time_limit_action":
          WriteToDebug("Item is time_limit_action");
          AICC_Time_Limit_Action = strLineValue;
          AICC_TranslateTimeLimitAction(AICC_Time_Limit_Action);
          break;
        case "audio":
          WriteToDebug("Item is audio");
          AICC_Audio = strLineValue;
          AICC_TranslateAudio(AICC_Audio);
          break;
        case "speed":
          WriteToDebug("Item is speed");
          AICC_Speed = strLineValue;
          AICC_TranslateSpeed(AICC_Speed);
          break;
        case "language":
          WriteToDebug("Item is language");
          AICC_Language = strLineValue;
          break;
        case "text":
          WriteToDebug("Item is text");
          AICC_Text = strLineValue;
          AICC_TranslateTextPreference(AICC_Text);
          break;
        case "course_id":
          WriteToDebug("Item is course id");
          AICC_CourseID = strLineValue;
          break;
        case "core_vendor":
          WriteToDebug("Item is core_vendor");
          AICC_Launch_Data = "";
          strLine = "";
          j = 1;
          if (i + j < aryAICCResponseLines.length) {
            strLine = aryAICCResponseLines[i + j];
          }
          while (
            i + j < aryAICCResponseLines.length &&
            !IsGroupIdentifier(strLine)
          ) {
            if (strLine.charAt(0) != ";") {
              AICC_Launch_Data += strLine + "\n";
            }
            j = j + 1;
            if (i + j < aryAICCResponseLines.length) {
              strLine = aryAICCResponseLines[i + j];
            }
          }
          i = i + j - 1;
          AICC_Launch_Data = AICC_Launch_Data.replace(/\s*$/, "");
          break;
        case "core_lesson":
          WriteToDebug("Item is core_lesson");
          AICC_Data_Chunk = "";
          strLine = "";
          j = 1;
          if (i + j < aryAICCResponseLines.length) {
            strLine = aryAICCResponseLines[i + j];
          }
          while (
            i + j < aryAICCResponseLines.length &&
            !IsGroupIdentifier(strLine)
          ) {
            if (strLine.charAt(0) != ";") {
              AICC_Data_Chunk += strLine + "\n";
            }
            j = j + 1;
            if (i + j < aryAICCResponseLines.length) {
              strLine = aryAICCResponseLines[i + j];
            }
          }
          i = i + j - 1;
          AICC_Data_Chunk = AICC_Data_Chunk.replace(/\s*$/, "");
          break;
        case "comments":
          WriteToDebug("Item is comments");
          AICC_Comments = "";
          strLine = "";
          j = 1;
          if (i + j < aryAICCResponseLines.length) {
            strLine = aryAICCResponseLines[i + j];
          }
          while (
            i + j < aryAICCResponseLines.length &&
            !IsGroupIdentifier(strLine)
          ) {
            if (strLine.charAt(0) != ";") {
              AICC_Comments += strLine + "\n";
            }
            j = j + 1;
            if (i + j < aryAICCResponseLines.length) {
              strLine = aryAICCResponseLines[i + j];
            }
          }
          i = i + j - 1;
          AICC_Comments = AICC_Comments.replace(/\s*$/, "");
          break;
        case "objectives_status":
          WriteToDebug("Item is objectives_status");
          AICC_Objectives = "";
          strLine = "";
          j = 1;
          if (i + j < aryAICCResponseLines.length) {
            strLine = aryAICCResponseLines[i + j];
          }
          while (
            i + j < aryAICCResponseLines.length &&
            !IsGroupIdentifier(strLine)
          ) {
            if (strLine.charAt(0) != ";") {
              AICC_Objectives += strLine + "\n";
            }
            j = j + 1;
            if (i + j < aryAICCResponseLines.length) {
              strLine = aryAICCResponseLines[i + j];
            }
          }
          i = i + j - 1;
          AICC_Objectives = AICC_Objectives.replace(/\s*$/, "");
          AICC_FormatObjectives(AICC_Objectives);
          break;
        default:
          WriteToDebug("Unknown Item Found");
          break;
      }
    }
  }
  return true;
}
function IsGroupIdentifier(strLine) {
  WriteToDebug("In IsGroupIdentifier, strLine=" + strLine);
  var intPos;
  strLine = strLine.replace(/^\s*/, "");
  intPos = strLine.search(/\[[\w]+\]/);
  WriteToDebug("intPos=" + intPos);
  if (intPos == 0) {
    WriteToDebug("Returning True");
    return true;
  } else {
    WriteToDebug("Returning False");
    return false;
  }
}
function AICC_FoundItem(strItem) {
  WriteToDebug("In AICC_FoundItem, strItem=" + strItem);
  aryAICCFoundItems[strItem] = true;
}
function AICC_HasItemBeenFound(strItem) {
  WriteToDebug("In AICC_HasItemBeenFound, strItem=" + strItem);
  if (aryAICCFoundItems[strItem] == true) {
    WriteToDebug("Returning True");
    return true;
  } else {
    WriteToDebug("Returning False");
    return false;
  }
}
function AICC_SeperateScoreValues(AICC_Score) {
  WriteToDebug("In AICC_SeperateScoreValues, AICC_Score=" + AICC_Score);
  var aryScores;
  aryScore = AICC_Score.split(",");
  AICC_fltScoreRaw = aryScore[0];
  if (IsValidDecimal(AICC_fltScoreRaw)) {
    WriteToDebug("Found a valid decimal");
    AICC_fltScoreRaw = parseFloat(AICC_fltScoreRaw);
  } else {
    WriteToDebug("ERROR - score from LMS is not a valid decimal");
    AICC_SetError(AICC_ERROR_INVALID_DECIMAL, "score is not a valid decimal");
  }
  if (aryScore.length > 1) {
    WriteToDebug("Max score found");
    AICC_fltScoreMax = aryScore[1];
    if (IsValidDecimal(AICC_fltScoreMax)) {
      WriteToDebug("Found a valid decimal");
      AICC_fltScoreMax = parseFloat(AICC_fltScoreMax);
    } else {
      WriteToDebug("ERROR - max score from LMS is not a valid decimal");
      AICC_SetError(
        AICC_ERROR_INVALID_DECIMAL,
        "max score is not a valid decimal"
      );
    }
  }
  if (aryScore.length > 2) {
    WriteToDebug("Max score found");
    AICC_fltScoreMin = aryScore[2];
    if (IsValidDecimal(AICC_fltScoreMin)) {
      WriteToDebug("Found a valid decimal");
      AICC_fltScoreMin = parseFloat(AICC_fltScoreMin);
    } else {
      WriteToDebug("ERROR - min score from LMS is not a valid decimal");
      AICC_SetError(
        AICC_ERROR_INVALID_DECIMAL,
        "min score is not a valid decimal"
      );
    }
  }
}
function AICC_ValidateMasteryScore(strScore) {
  WriteToDebug("In AICC_ValidateMasteryScore, strScore=" + strScore);
  if (IsValidDecimal(strScore)) {
    AICC_Mastery_Score = parseFloat(strScore);
  } else {
    WriteToDebug("ERROR - mastery score from LMS is not a valid decimal");
    AICC_SetError(
      AICC_ERROR_INVALID_DECIMAL,
      "mastery score is not a valid decimal"
    );
  }
}
function AICC_TranslateCredit(strCredit) {
  WriteToDebug("In AICC_TranslateCredit, strCredit=" + strCredit);
  var strFirstChar;
  strFirstChar = strCredit.toLowerCase().charAt(0);
  if (strFirstChar == "c") {
    WriteToDebug("Credit = true");
    AICC_blnCredit = true;
  } else if (strFirstChar == "n") {
    WriteToDebug("Credit = false");
    AICC_blnCredit = false;
  } else {
    WriteToDebug("ERROR - credit value from LMS is not a valid");
    AICC_SetError(
      AICC_ERROR_INVALID_CREDIT,
      "credit value from LMS is not a valid"
    );
  }
}
function AICC_TranslateLessonMode(strMode) {
  WriteToDebug("In AICC_TranslateLessonMode, strMode=" + strMode);
  var strFirstChar;
  strFirstChar = strMode.toLowerCase().charAt(0);
  if (strFirstChar == "b") {
    WriteToDebug("Lesson Mode = Browse");
    AICC_strLessonMode = MODE_BROWSE;
  } else if (strFirstChar == "n") {
    WriteToDebug("Lesson Mode = normal");
    AICC_strLessonMode = MODE_NORMAL;
  } else if (strFirstChar == "r") {
    WriteToDebug("Lesson Mode = review");
    AICC_strLessonMode = MODE_REVIEW;
    if (
      !(typeof REVIEW_MODE_IS_READ_ONLY == "undefined") &&
      REVIEW_MODE_IS_READ_ONLY === true
    ) {
      blnReviewModeSoReadOnly = true;
    }
  } else {
    WriteToDebug("ERROR - lesson_mode value from LMS is not a valid");
    AICC_SetError(
      AICC_ERROR_INVALID_LESSON_MODE,
      "lesson_mode value from LMS is not a valid"
    );
  }
}
function AICC_TranslateTimeToMilliseconds(strCMITime) {
  WriteToDebug("In AICC_TranslateTimeToMilliseconds, strCMITime=" + strCMITime);
  if (IsValidCMITimeSpan(strCMITime)) {
    AICC_intPreviouslyAccumulatedMilliseconds =
      ConvertCMITimeSpanToMS(strCMITime);
  } else {
    WriteToDebug("ERROR - Invalid CMITimeSpan");
    AICC_SetError(
      AICC_ERROR_INVALID_TIMESPAN,
      "Invalid timespan (previously accumulated time) received from LMS"
    );
  }
}
function AICC_TranslateMaxTimeToMilliseconds(strCMITime) {
  WriteToDebug(
    "In AICC_TranslateMaxTimeToMilliseconds, strCMITime=" + strCMITime
  );
  if (IsValidCMITimeSpan(strCMITime)) {
    AICC_intMaxTimeAllowedMilliseconds = ConvertCMITimeSpanToMS(strCMITime);
  } else {
    WriteToDebug("ERROR - Invalid CMITimeSpan");
    AICC_SetError(
      AICC_ERROR_INVALID_TIMESPAN,
      "Invalid timespan (max time allowed) received from LMS"
    );
  }
}
function AICC_TranslateTimeLimitAction(strTimeLimitAction) {
  WriteToDebug(
    "In AICC_TranslateTimeLimitAction, strTimeLimitAction=" + strTimeLimitAction
  );
  var arySplit;
  var blnError = false;
  var strChar1 = "";
  var strChar2 = "";
  arySplit = strTimeLimitAction.split(",");
  if (arySplit.length == 2) {
    WriteToDebug("Found 2 elements");
    strChar1 = arySplit[0].charAt(0).toLowerCase();
    strChar2 = arySplit[1].charAt(0).toLowerCase();
    WriteToDebug(
      "Got characters, strChar1=" + strChar1 + ", strChar2=" + strChar2
    );
    if (
      (strChar1 != "e" &&
        strChar1 != "c" &&
        strChar1 != "m" &&
        strChar1 != "n") ||
      (strChar2 != "e" &&
        strChar2 != "c" &&
        strChar2 != "m" &&
        strChar2 != "n") ||
      strChar1 == strChar2
    ) {
      blnError = true;
      WriteToDebug("Found an invalid character, or 2 identical characters");
    }
    if (strChar1 == "e" || strChar2 == "e") {
      AICC_blnExitOnTimeout = true;
    }
    if (strChar1 == "c" || strChar2 == "c") {
      AICC_blnExitOnTimeout = false;
    }
    if (strChar1 == "n" || strChar2 == "n") {
      AICC_blnShowMessageOnTimeout = false;
    }
    if (strChar1 == "m" || strChar2 == "m") {
      AICC_blnShowMessageOnTimeout = true;
    }
    WriteToDebug(
      "AICC_blnExitOnTimeout=" +
        AICC_blnExitOnTimeout +
        ", AICC_blnShowMessageOnTimeout" +
        AICC_blnShowMessageOnTimeout
    );
  } else {
    WriteToDebug("Line does not contain two comma-delimited elements");
    blnError = true;
  }
  if (blnError) {
    WriteToDebug("ERROR - Invalid Time Limit Action");
    AICC_SetError(
      AICC_ERROR_INVALID_TIME_LIMIT_ACTION,
      "Invalid time limit action received from LMS"
    );
  }
}
function AICC_TranslateTextPreference(strPreference) {
  WriteToDebug(
    "In AICC_TranslateTextPreference, strPreference=" + strPreference
  );
  if (strPreference == -1) {
    WriteToDebug("Text Preference = off");
    AICC_TextPreference = PREFERENCE_OFF;
  } else if (strPreference == 0) {
    WriteToDebug("Text Preference = default");
    AICC_TextPreference = PREFERENCE_DEFAULT;
  } else if (strPreference == 1) {
    WriteToDebug("Text Preference = on");
    AICC_TextPreference = PREFERENCE_ON;
  } else {
    WriteToDebug("ERROR - Invalid Text Preference");
    AICC_SetError(
      AICC_ERROR_INVALID_PREFERENCE,
      "Invalid Text Preference received from LMS"
    );
  }
}
function AICC_TranslateLessonStatus(strStatus) {
  WriteToDebug("In AICC_TranslateLessonStatus, strStatus=" + strStatus);
  var strFirstChar;
  var intPos;
  var strEntry;
  strFirstChar = strStatus.charAt(0).toLowerCase();
  AICC_Status = AICC_ConvertAICCStatusIntoLocalStatus(strFirstChar);
  WriteToDebug("AICC_Status=" + AICC_Status);
  intPos = strStatus.indexOf(",");
  if (intPos > 0) {
    strEntry = strStatus.substr(intPos);
    strEntry = strEntry.replace(/,/, "");
    strFirstChar = strEntry.charAt(0).toLowerCase();
    if (strFirstChar == "a") {
      WriteToDebug("Entry is Ab initio");
      AICC_Entry = ENTRY_FIRST_TIME;
    } else if (strFirstChar == "r") {
      WriteToDebug("Entry is Resume");
      AICC_Entry = ENTRY_RESUME;
    } else {
      WriteToDebug("ERROR - entry not found");
      AICC_SetError(
        AICC_ERROR_INVALID_ENTRY,
        "Invalid lesson status received from LMS"
      );
    }
  }
}
function AICC_ConvertAICCStatusIntoLocalStatus(strFirstCharOfAICCStatus) {
  WriteToDebug(
    "In AICC_ConvertAICCStatusIntoLocalStatus, strFirstCharOfAICCStatus=" +
      strFirstCharOfAICCStatus
  );
  if (strFirstCharOfAICCStatus == "p") {
    WriteToDebug("Status is Passed");
    return LESSON_STATUS_PASSED;
  } else if (strFirstCharOfAICCStatus == "f") {
    WriteToDebug("Status is Failed");
    return LESSON_STATUS_FAILED;
  } else if (strFirstCharOfAICCStatus == "c") {
    WriteToDebug("Status is Completed");
    return LESSON_STATUS_COMPLETED;
  } else if (strFirstCharOfAICCStatus == "b") {
    WriteToDebug("Status is Browsed");
    return LESSON_STATUS_BROWSED;
  } else if (strFirstCharOfAICCStatus == "i") {
    WriteToDebug("Status is Incomplete");
    return LESSON_STATUS_INCOMPLETE;
  } else if (strFirstCharOfAICCStatus == "n") {
    WriteToDebug("Status is Not Attempted");
    return LESSON_STATUS_NOT_ATTEMPTED;
  } else {
    WriteToDebug("ERROR - status not found");
    AICC_SetError(SCORM_ERROR_INVALID_STATUS, "Invalid status");
    return LESSON_STATUS_NOT_ATTEMPTED;
  }
}
function AICC_TranslateAudio(strAudio) {
  WriteToDebug("In AICC_TranslateAudio, strAudio=" + strAudio);
  var intTempPreference = parseInt(strAudio, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0 && intTempPreference <= 100) {
    WriteToDebug("Returning On");
    AICC_AudioPlayPreference = PREFERENCE_ON;
    AICC_intAudioVolume = intTempPreference;
  } else if (intTempPreference == 0) {
    WriteToDebug("Returning Default");
    AICC_AudioPlayPreference = PREFERENCE_DEFAULT;
  } else if (intTempPreference < 0) {
    WriteToDebug("returning Off");
    AICC_AudioPlayPreference = PREFERENCE_OFF;
  } else {
    WriteToDebug("Error: Invalid preference");
    AICC_SetError(
      AICC_ERROR_INVALID_PREFERENCE,
      "Invalid audio preference received from LMS"
    );
  }
}
function AICC_TranslateSpeed(intAICCSpeed) {
  WriteToDebug("In AICC_TranslateSpeed, intAICCSpeed=" + intAICCSpeed);
  var intPercentOfMax;
  if (!ValidInteger(intAICCSpeed)) {
    WriteToDebug("ERROR - invalid integer");
    AICC_SetError(
      AICC_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - not an integer"
    );
    return;
  }
  intAICCSpeed = parseInt(intAICCSpeed, 10);
  if (intAICCSpeed < -100 || intAICCSpeed > 100) {
    WriteToDebug("ERROR - out of range");
    AICC_SetError(
      AICC_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - out of range"
    );
    return;
  }
  AICC_Speed = intAICCSpeed;
  intPercentOfMax = (intAICCSpeed + 100) / 2;
  intPercentOfMax = parseInt(intPercentOfMax, 10);
  WriteToDebug("Returning " + intPercentOfMax);
  AICC_intPercentOfMaxSpeed = intPercentOfMax;
}
function AICC_FormatObjectives(strObjectivesFromLMS) {
  WriteToDebug(
    "In AICC_FormatObjectives, strObjectivesFromLMS=" + strObjectivesFromLMS
  );
  var aryLines;
  var i;
  var strLineName;
  var strLineValue;
  var strLineType;
  var strIndex;
  aryLines = strObjectivesFromLMS.split("\n");
  for (i = 0; i < aryLines.length; i++) {
    WriteToDebug("Extracting Index From Line: " + aryLines[i]);
    strLineName = GetNameFromAICCLine(aryLines[i]);
    strIndex = GetIndexFromAICCName(strLineName);
    strIndex = parseInt(strIndex, 10);
    WriteToDebug("strIndex: " + strIndex);
    AICC_aryObjectivesRead[parseInt(strIndex, 10)] = new Array(3);
  }
  for (i = 0; i < aryLines.length; i++) {
    WriteToDebug("Populating Line " + aryLines[i]);
    strLineName = GetNameFromAICCLine(aryLines[i]);
    strLineValue = GetValueFromAICCLine(aryLines[i]);
    strIndex = GetIndexFromAICCName(strLineName);
    strIndex = strIndex;
    WriteToDebug("strLineName: " + strLineName);
    WriteToDebug("strLineValue: " + strLineValue);
    WriteToDebug("strIndex: " + strIndex);
    strLineType = strLineName.substr(0, 4).toLowerCase();
    if (strLineType == "j_id") {
      WriteToDebug("Found ID");
      AICC_aryObjectivesRead[parseInt(strIndex, 10)][AICC_OBJ_ARRAY_ID] =
        strLineValue;
    } else if (strLineType == "j_st") {
      WriteToDebug("Found Status");
      AICC_aryObjectivesRead[parseInt(strIndex, 10)][AICC_OBJ_ARRAY_STATUS] =
        AICC_ConvertAICCStatusIntoLocalStatus(
          strLineValue.charAt(0).toLowerCase()
        );
    } else if (strLineType == "j_sc") {
      WriteToDebug("Found Score");
      AICC_aryObjectivesRead[parseInt(strIndex, 10)][AICC_OBJ_ARRAY_SCORE] =
        AICC_ExtractSingleScoreFromObjective(strLineValue);
    } else {
      WriteToDebug(
        "WARNING - unidentified objective data found - " + aryLines[i]
      );
    }
  }
}
function AICC_ExtractSingleScoreFromObjective(strLineValue) {
  WriteToDebug(
    "In AICC_ExtractSingleScoreFromObjective, strLineValue=" + strLineValue
  );
  var aryParts;
  aryParts = strLineValue.split(";");
  aryParts = aryParts[0].split(",");
  WriteToDebug("returning " + aryParts[0]);
  return aryParts[0];
}
function FindObjectiveById(strID, aryObjectives) {
  WriteToDebug("In FindObjectiveById, strID=" + strID);
  for (var i = 0; i <= aryObjectives.length; i++) {
    WriteToDebug("Searching element " + i);
    if (aryObjectives[i]) {
      WriteToDebug("Element Exists");
      if (aryObjectives[i][AICC_OBJ_ARRAY_ID].toString() == strID.toString()) {
        WriteToDebug("Element matches");
        return i;
      }
    }
  }
  return null;
}
function AICC_CreateValidIdentifier(str) {
  return CreateValidIdentifierLegacy(str);
}
function AICC_FindInteractionIndexFromID(strInteractionID) {
  WriteToDebug(
    "AICC_FindInteractionIndexFromID - AICC does not support interaction retrieval, returning null"
  );
  return null;
}
function AICC_GetInteractionType(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionType - AICC does not support interaction retrieval, returning empty string"
  );
  return "";
}
function AICC_GetInteractionTimestamp(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionTimestamp - AICC does not support interaction retrieval, returning empty string"
  );
  return "";
}
function AICC_GetInteractionCorrectResponses(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionCorrectResponses - AICC does not support interaction retrieval, returning empty array"
  );
  return new Array();
}
function AICC_GetInteractionWeighting(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionWeighting - AICC does not support interaction retrieval, returning empty string"
  );
  return "";
}
function AICC_GetInteractionLearnerResponses(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionLearnerResponses - AICC does not support interaction retrieval, returning empty array"
  );
  return new Array();
}
function AICC_GetInteractionResult(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionResult - AICC does not support interaction retrieval, returning empty string"
  );
  return "";
}
function AICC_GetInteractionLatency(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionDescription - AICC does not support interaction retrieval, returning empty string"
  );
  return "";
}
function AICC_GetInteractionDescription(strInteractionID) {
  WriteToDebug(
    "AICC_GetInteractionDescription - AICC does not support interaction retrieval, returning empty string"
  );
  return "";
}
function AICC_CreateDataBucket(strBucketId, intMinSize, intMaxSize) {
  WriteToDebug(
    "AICC_CreateDataBucket - AICC does not support SSP, returning false"
  );
  return false;
}
function AICC_GetDataFromBucket(strBucketId) {
  WriteToDebug(
    "AICC_GetDataFromBucket - AICC does not support SSP, returning empty string"
  );
  return "";
}
function AICC_PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug(
    "AICC_PutDataInBucket - AICC does not support SSP, returning false"
  );
  return false;
}
function AICC_DetectSSPSupport() {
  WriteToDebug(
    "AICC_DetectSSPSupport - AICC does not support SSP, returning false"
  );
  return false;
}
function AICC_GetBucketInfo(strBucketId) {
  WriteToDebug(
    "AICC_DetectSSPSupport - AICC does not support SSP, returning empty SSPBucketSize"
  );
  return new SSPBucketSize(0, 0);
}
function AICC_SetNavigationRequest(strNavRequest) {
  WriteToDebug(
    "AICC_SetNavigationRequest - AICC does not support navigation requests, returning false"
  );
  return false;
}
function AICC_GetNavigationRequest() {
  WriteToDebug(
    "AICC_SetNavigationRequest - AICC does not support navigation requests, returning false"
  );
  return false;
}
function FormAICCPostData() {
  WriteToDebug("In FormAICCPostData");
  var strAICCData = "";
  strAICCData += "[Core]\r\n";
  strAICCData += "Lesson_Location=" + AICC_Lesson_Location + "\r\n";
  strAICCData +=
    "Lesson_Status=" + AICC_TranslateLessonStatusToAICC(AICC_Status) + "\r\n";
  strAICCData += "Score=" + AICC_TranslateScoreToAICC() + "\r\n";
  strAICCData += "Time=" + AICC_TranslateTimeToAICC() + "\r\n";
  strAICCData += "[Comments]\r\n" + AICC_TranslateCommentsToAICC() + "\r\n";
  strAICCData +=
    "[Objectives_Status]\r\n" + AICC_TranslateObjectivesToAICC() + "\r\n";
  strAICCData += "[Student_Preferences]\r\n";
  strAICCData += "Audio=" + AICC_TranslateAudioToAICC() + "\r\n";
  strAICCData += "Language=" + AICC_Language + "\r\n";
  strAICCData += "Speed=" + AICC_TranslateSpeedToAICC() + "\r\n";
  strAICCData += "Text=" + AICC_TranslateTextToAICC() + "\r\n";
  strAICCData += "[Core_Lesson]\r\n";
  strAICCData += AICC_Data_Chunk;
  WriteToDebug("FormAICCPostData returning: " + strAICCData);
  return strAICCData;
}
function AICC_TranslateLessonStatusToAICC(intStatus) {
  WriteToDebug("In AICC_TranslateLessonStatusToAICC");
  switch (intStatus) {
    case LESSON_STATUS_PASSED:
      WriteToDebug("Status is passed");
      AICC_Lesson_Status = "P";
      break;
    case LESSON_STATUS_COMPLETED:
      WriteToDebug("Status is completed");
      AICC_Lesson_Status = "C";
      break;
    case LESSON_STATUS_FAILED:
      WriteToDebug("Status is failed");
      AICC_Lesson_Status = "F";
      break;
    case LESSON_STATUS_INCOMPLETE:
      WriteToDebug("Status is incomplete");
      AICC_Lesson_Status = "I";
      break;
    case LESSON_STATUS_BROWSED:
      WriteToDebug("Status is browsed");
      AICC_Lesson_Status = "B";
      break;
    case LESSON_STATUS_NOT_ATTEMPTED:
      WriteToDebug("Status is not attempted");
      AICC_Lesson_Status = "N";
      break;
  }
  return AICC_Lesson_Status;
}
function AICC_TranslateScoreToAICC() {
  WriteToDebug("In AICC_TranslateScoreToAICC");
  AICC_Score = AICC_fltScoreRaw;
  if (AICC_LMS_Version < 3 && AICC_fltScoreRaw != "") {
    AICC_Score = parseInt(AICC_Score, 10);
  }
  if (
    (AICC_REPORT_MIN_MAX_SCORE === undefined ||
      AICC_REPORT_MIN_MAX_SCORE === null ||
      AICC_REPORT_MIN_MAX_SCORE === true) &&
    AICC_LMS_Version >= 3
  ) {
    WriteToDebug("Using max and min values if available.");
    if (AICC_fltScoreMax != "" || AICC_fltScoreMin != "") {
      WriteToDebug("Appending Max and Min scores");
      AICC_Score += "," + AICC_fltScoreMax + "," + AICC_fltScoreMin;
    }
  }
  WriteToDebug("AICC_Score=" + AICC_Score);
  return AICC_Score;
}
function AICC_TranslateTimeToAICC() {
  WriteToDebug("In AICC_TranslateTimeToAICC");
  var strTime;
  strTime = ConvertMilliSecondsToSCORMTime(
    AICC_intSessionTimeMilliseconds,
    false
  );
  return strTime;
}
function AICC_TranslateCommentsToAICC() {
  WriteToDebug("In AICC_TranslateCommentsToAICC");
  var strComments = "";
  for (var i = 0; i < AICC_aryCommentsFromLearner.length; i++) {
    strComments +=
      "<" +
      (i + 1) +
      ">" +
      AICC_aryCommentsFromLearner[i] +
      "<e." +
      (i + 1) +
      ">";
  }
  return strComments;
}
function AICC_TranslateObjectivesToAICC() {
  WriteToDebug("In AICC_TranslateObjectivesToAICC");
  var strObjectives = "";
  for (var i = 0; i < AICC_aryObjectivesWrite.length; i++) {
    WriteToDebug("Looking at index: " + i);
    if (AICC_aryObjectivesWrite[i]) {
      WriteToDebug(
        "Element " +
          i +
          " exists, id=" +
          AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_ID] +
          ", score=" +
          AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_SCORE] +
          ", status=" +
          AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_STATUS]
      );
      strObjectives +=
        "J_ID." +
        (i + 1) +
        "=" +
        AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_ID] +
        "\r\n";
      if (AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_SCORE] != "") {
        strObjectives +=
          "J_Score." +
          (i + 1) +
          "=" +
          AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_SCORE] +
          "\r\n";
      }
      if (AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_STATUS] != "") {
        strObjectives +=
          "J_Status." +
          (i + 1) +
          "=" +
          AICC_TranslateLessonStatusToAICC(
            AICC_aryObjectivesWrite[i][AICC_OBJ_ARRAY_STATUS]
          ) +
          "\r\n";
      }
    }
  }
  return strObjectives;
}
function AICC_TranslateAudioToAICC() {
  WriteToDebug("In AICC_TranslateAudioToAICC");
  var strReturn;
  switch (AICC_AudioPlayPreference) {
    case PREFERENCE_ON:
      WriteToDebug("Preference is ON");
      strReturn = AICC_intAudioVolume;
      break;
    case PREFERENCE_DEFAULT:
      WriteToDebug("Preference is DEFAULT");
      strReturn = 0;
      break;
    case PREFERENCE_OFF:
      WriteToDebug("Preference is OFF");
      strReturn = -1;
      break;
  }
  return strReturn;
}
function AICC_TranslateSpeedToAICC() {
  WriteToDebug("In AICC_TranslateSpeedToAICC");
  var intAICCSpeed;
  intAICCSpeed = AICC_intPercentOfMaxSpeed * 2 - 100;
  return intAICCSpeed;
}
function AICC_TranslateTextToAICC() {
  WriteToDebug("In AICC_TranslateTextToAICC");
  var strPreference = 0;
  if (AICC_TextPreference == PREFERENCE_OFF) {
    strPreference = -1;
  } else if (AICC_TextPreference == PREFERENCE_DEFAULT) {
    strPreference = 0;
  } else if (AICC_TextPreference == PREFERENCE_ON) {
    strPreference = 1;
  }
  return strPreference;
}
function FormAICCInteractionsData() {
  WriteToDebug("In FormAICCInteractionsData");
  var strInteractions;
  var strDate;
  var strTime;
  var strResult = "";
  strInteractions =
    '"course_id","student_id","lesson_id","date","time","interaction_id",' +
    '"objective_id","type_interaction","correct_response","student_response",' +
    '"result","weighting","latency"\r\n';
  var blnCorrect = "";
  var strResponse = "";
  var strCorrectResponse = "";
  var strLatency = "";
  for (var i = 0; i < AICC_aryInteractions.length; i++) {
    blnCorrect = AICC_aryInteractions[i][AICC_INTERACTIONS_CORRECT];
    strResult = "";
    if (blnCorrect == true || blnCorrect == INTERACTION_RESULT_CORRECT) {
      strResult = AICC_RESULT_CORRECT;
    } else if (
      blnCorrect == "false" ||
      blnCorrect == INTERACTION_RESULT_WRONG
    ) {
      strResult = AICC_RESULT_WRONG;
    } else if (blnCorrect == INTERACTION_RESULT_UNANTICIPATED) {
      strResult = AICC_RESULT_UNANTICIPATED;
    } else if (blnCorrect == INTERACTION_RESULT_NEUTRAL) {
      strResult = AICC_RESULT_NEUTRAL;
    }
    strDate = ConvertDateToCMIDate(
      AICC_aryInteractions[i][AICC_INTERACTIONS_TIME_STAMP]
    );
    strTime = ConvertDateToCMITime(
      AICC_aryInteractions[i][AICC_INTERACTIONS_TIME_STAMP]
    );
    if (blnUseLongInteractionResultValues == true) {
      strResponse = AICC_aryInteractions[i][AICC_INTERACTIONS_RESPONSE_LONG];
      strCorrectResponse =
        AICC_aryInteractions[i][AICC_INTERACTIONS_CORRECT_RESPONSE_LONG];
    } else {
      strResponse = AICC_aryInteractions[i][AICC_INTERACTIONS_RESPONSE];
      strCorrectResponse =
        AICC_aryInteractions[i][AICC_INTERACTIONS_CORRECT_RESPONSE];
    }
    strResponse = new String(strResponse);
    strCorrectResponse = new String(strCorrectResponse);
    var tempLatency = AICC_aryInteractions[i][AICC_INTERACTIONS_LATENCY];
    if (
      tempLatency !== null &&
      tempLatency !== undefined &&
      tempLatency != ""
    ) {
      strLatency = ConvertMilliSecondsToSCORMTime(tempLatency, false);
    }
    strInteractions +=
      '"' +
      AICC_CourseID.replace('"', "") +
      '","' +
      AICC_Student_ID.replace('"', "") +
      '","' +
      AICC_LESSON_ID.replace('"', "") +
      '","' +
      strDate +
      '","' +
      strTime +
      '","' +
      AICC_aryInteractions[i][AICC_INTERACTIONS_ID].replace('"', "") +
      '",' +
      '""' +
      ',"' +
      AICC_aryInteractions[i][AICC_INTERACTIONS_TYPE] +
      '","' +
      strCorrectResponse.replace('"', "") +
      '","' +
      strResponse.replace('"', "") +
      '","' +
      strResult +
      '","' +
      AICC_aryInteractions[i][AICC_INTERACTIONS_WEIGHTING] +
      '","' +
      strLatency +
      '"\r\n';
  }
  return strInteractions;
}
function DisplayAICCVariables() {
  var strAlert = "";
  strAlert += "AICC_Student_ID = " + AICC_Student_ID + "\n";
  strAlert += "AICC_Student_Name = " + AICC_Student_Name + "\n";
  strAlert += "AICC_Lesson_Location = " + AICC_Lesson_Location + "\n";
  strAlert += "AICC_Score = " + AICC_Score + "\n";
  strAlert += "AICC_Credit = " + AICC_Credit + "\n";
  strAlert += "AICC_Lesson_Status = " + AICC_Lesson_Status + "\n";
  strAlert += "AICC_Time = " + AICC_Time + "\n";
  strAlert += "AICC_Mastery_Score = " + AICC_Mastery_Score + "\n";
  strAlert += "AICC_Lesson_Mode = " + AICC_Lesson_Mode + "\n";
  strAlert += "AICC_Max_Time_Allowed = " + AICC_Max_Time_Allowed + "\n";
  strAlert += "AICC_Time_Limit_Action = " + AICC_Time_Limit_Action + "\n";
  strAlert += "AICC_Audio = " + AICC_Audio + "\n";
  strAlert += "AICC_Speed = " + AICC_Speed + "\n";
  strAlert += "AICC_Language = " + AICC_Language + "\n";
  strAlert += "AICC_Text = " + AICC_Text + "\n";
  strAlert += "AICC_Launch_Data = " + AICC_Launch_Data + "\n";
  strAlert += "AICC_Data_Chunk = " + AICC_Data_Chunk + "\n";
  strAlert += "AICC_Comments = " + AICC_Comments + "\n";
  strAlert += "AICC_Objectives = " + AICC_Objectives + "\n";
  alert(strAlert);
}
function NONE_Initialize() {
  WriteToDebug("In NONE_Initialize, Returning true");
  InitializeExecuted(true, "");
  return true;
}
function NONE_Finish(strExitType, blnStatusWasSet) {
  WriteToDebug("In NONE_Finish, Returning true");
  return true;
}
function NONE_CommitData() {
  WriteToDebug("In NONE_CommitData, Returning true");
  return true;
}
function NONE_GetStudentID() {
  WriteToDebug("In NONE_GetStudentID, Returning ''");
  return "";
}
function NONE_GetStudentName() {
  WriteToDebug("In NONE_GetStudentName, Returning ''");
  return "";
}
function NONE_GetBookmark() {
  WriteToDebug("In NONE_GetBookmark, Returning ''");
  return "";
}
function NONE_SetBookmark(strBookmark) {
  WriteToDebug("In NONE_SetBookmark, Returning true");
  return true;
}
function NONE_GetDataChunk() {
  WriteToDebug("In NONE_GetDataChunk, Returning ''");
  return "";
}
function NONE_SetDataChunk(strData) {
  WriteToDebug("In NONE_SetDataChunk, Returning true");
  return true;
}
function NONE_GetLaunchData() {
  WriteToDebug("In NONE_GetLaunchData, Returning ''");
  return "";
}
function NONE_GetComments() {
  WriteToDebug("In NONE_GetComments, Returning ''");
  return "";
}
function NONE_WriteComment(strComment) {
  WriteToDebug("In NONE_WriteComment, Returning true");
  return true;
}
function NONE_GetLMSComments() {
  WriteToDebug("In NONE_GetLMSComments, Returning ''");
  return "";
}
function NONE_GetAudioPlayPreference() {
  WriteToDebug(
    "In NONE_GetAudioPlayPreference, Returning " + PREFERENCE_DEFAULT
  );
  return PREFERENCE_DEFAULT;
}
function NONE_GetAudioVolumePreference() {
  WriteToDebug("In NONE_GetAudioVolumePreference, Returning 100");
  return 100;
}
function NONE_SetAudioPreference(PlayPreference, intPercentOfMaxSpeed) {
  WriteToDebug("In NONE_SetAudioPreference, Returning true");
  return true;
}
function NONE_SetLanguagePreference(strLanguage) {
  WriteToDebug("In NONE_SetLanguagePreference, Returning true");
  return true;
}
function NONE_GetLanguagePreference() {
  WriteToDebug("In NONE_GetLanguagePreference, Returning ''");
  return "";
}
function NONE_SetSpeedPreference(intPercentOfMax) {
  WriteToDebug("In NONE_SetSpeedPreference, Returning true");
  return true;
}
function NONE_GetSpeedPreference() {
  WriteToDebug("In NONE_GetSpeedPreference, Returning 100");
  return 100;
}
function NONE_SetTextPreference(intPreference) {
  WriteToDebug("In NONE_SetTextPreference, Returning true");
  return true;
}
function NONE_GetTextPreference() {
  WriteToDebug("In NONE_GetTextPreference, Returning " + PREFERENCE_DEFAULT);
  return PREFERENCE_DEFAULT;
}
function NONE_GetPreviouslyAccumulatedTime() {
  WriteToDebug("In NONE_GetPreviouslyAccumulatedTime, Returning 0");
  return 0;
}
function NONE_SaveTime(intMilliSeconds) {
  WriteToDebug("In intMilliSeconds, Returning true");
  return true;
}
function NONE_GetMaxTimeAllowed() {
  WriteToDebug("In NONE_GetMaxTimeAllowed, Returning 36002439999");
  return MAX_CMI_TIME;
}
function NONE_DisplayMessageOnTimeout() {
  WriteToDebug("In NONE_DisplayMessageOnTimeout, Returning false");
  return false;
}
function NONE_ExitOnTimeout() {
  WriteToDebug("In NONE_ExitOnTimeout, Returning false");
  return false;
}
function NONE_GetPassingScore() {
  WriteToDebug("In NONE_GetPassingScore, Returning ''");
  return "";
}
function NONE_GetScore() {
  WriteToDebug("In NONE_GetScore, Returning 0");
  return 0;
}
function NONE_SetScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug("In NONE_SetScore, Returning true");
  return true;
}
function NONE_RecordTrueFalseInteraction() {
  WriteToDebug("In NONE_RecordTrueFalseInteraction, Returning true");
  return true;
}
function NONE_RecordMultipleChoiceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse
) {
  WriteToDebug("In NONE_RecordMultipleChoiceInteraction, Returning true");
  return true;
}
function NONE_RecordFillInInteraction() {
  WriteToDebug("In NONE_RecordFillInInteraction, Returning true");
  return true;
}
function NONE_RecordMatchingInteraction() {
  WriteToDebug("In NONE_RecordMatchingInteraction, Returning true");
  return true;
}
function NONE_RecordPerformanceInteraction() {
  WriteToDebug("In NONE_RecordPerformanceInteraction, Returning true");
  return true;
}
function NONE_RecordSequencingInteraction() {
  WriteToDebug("In NONE_RecordSequencingInteraction, Returning true");
  return true;
}
function NONE_RecordLikertInteraction() {
  WriteToDebug("In RecordLikertInteraction, Returning true");
  return true;
}
function NONE_RecordNumericInteraction() {
  WriteToDebug("In NONE_RecordNumericInteraction, Returning true");
  return true;
}
function NONE_GetEntryMode() {
  WriteToDebug("In NONE_GetEntryMode, Returning " + ENTRY_FIRST_TIME);
  return ENTRY_FIRST_TIME;
}
function NONE_GetLessonMode() {
  WriteToDebug("In NONE_GetLessonMode, Returning " + MODE_NORMAL);
  return MODE_NORMAL;
}
function NONE_GetTakingForCredit() {
  WriteToDebug("In NONE_GetTakingForCredit, Returning true");
  return true;
}
function NONE_SetObjectiveScore(
  strObjectiveID,
  intScore,
  intMaxScore,
  intMinScore
) {
  WriteToDebug("In NONE_SetObjectiveScore, Returning true");
  return true;
}
function NONE_SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  WriteToDebug("In NONE_SetObjectiveStatus, Returning true");
  return true;
}
function NONE_SetObjectiveDescription(strObjectiveID, strObjectiveDescription) {
  WriteToDebug("In NONE_SetObjectiveDescription, Returning true");
  return true;
}
function NONE_GetObjectiveScore(strObjectiveID) {
  WriteToDebug("In NONE_SetObjectiveScore, Returning ''");
  return "";
}
function NONE_GetObjectiveStatus(strObjectiveID) {
  WriteToDebug("In NONE_SetObjectiveStatus, Returning Not Attempted");
  return LESSON_STATUS_NOT_ATTEMPTED;
}
function NONE_GetObjectiveDescription(strObjectiveID) {
  WriteToDebug("In NONE_GetObjectiveDescription, ''");
  return "";
}
function NONE_CreateValidIdentifier(str) {
  return CreateUriIdentifier(str);
}
function NONE_FindInteractionIndexFromID(strInteractionID) {
  WriteToDebug(
    "NONE_FindInteractionIndexFromID - NONE does not support interaction retrieval, returning null"
  );
  return null;
}
function NONE_GetInteractionType(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionType - NONE does not support interaction retrieval, returning empty string"
  );
  return "";
}
function NONE_GetInteractionTimestamp(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionTimestamp - NONE does not support interaction retrieval, returning empty string"
  );
  return "";
}
function NONE_GetInteractionCorrectResponses(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionCorrectResponses - NONE does not support interaction retrieval, returning empty array"
  );
  return new Array();
}
function NONE_GetInteractionWeighting(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionWeighting - NONE does not support interaction retrieval, returning empty string"
  );
  return "";
}
function NONE_GetInteractionLearnerResponses(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionLearnerResponses - NONE does not support interaction retrieval, returning empty array"
  );
  return new Array();
}
function NONE_GetInteractionResult(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionResult - NONE does not support interaction retrieval, returning empty string"
  );
  return "";
}
function NONE_GetInteractionLatency(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionDescription - NONE does not support interaction retrieval, returning empty string"
  );
  return "";
}
function NONE_GetInteractionDescription(strInteractionID) {
  WriteToDebug(
    "NONE_GetInteractionDescription - NONE does not support interaction retrieval, returning empty string"
  );
  return "";
}
function NONE_CreateDataBucket(strBucketId, intMinSize, intMaxSize) {
  WriteToDebug(
    "NONE_CreateDataBucket - NONE does not support SSP, returning false"
  );
  return false;
}
function NONE_GetDataFromBucket(strBucketId) {
  WriteToDebug(
    "NONE_GetDataFromBucket - NONE does not support SSP, returning empty string"
  );
  return "";
}
function NONE_PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug(
    "NONE_PutDataInBucket - NONE does not support SSP, returning false"
  );
  return false;
}
function NONE_DetectSSPSupport() {
  WriteToDebug(
    "NONE_DetectSSPSupport - NONE does not support SSP, returning false"
  );
  return false;
}
function NONE_GetBucketInfo(strBucketId) {
  WriteToDebug(
    "NONE_DetectSSPSupport - NONE does not support SSP, returning empty SSPBucketSize"
  );
  return new SSPBucketSize(0, 0);
}
function NONE_SetNavigationRequest(strNavRequest) {
  WriteToDebug(
    "NONE_SetNavigationRequest - NONE does not support navigation requests, returning false"
  );
  return false;
}
function NONE_GetNavigationRequest() {
  WriteToDebug(
    "NONE_GetNavigationRequest - NONE does not support navigation requests, returning false"
  );
  return false;
}
function NONE_SetFailed() {
  WriteToDebug("In NONE_SetFailed, Returning true");
  return true;
}
function NONE_SetPassed() {
  WriteToDebug("In NONE_SetPassed, Returning true");
  return true;
}
function NONE_SetCompleted() {
  WriteToDebug("In NONE_SetCompleted, Returning true");
  return true;
}
function NONE_ResetStatus() {
  WriteToDebug("In NONE_ResetStatus, Returning true");
  return true;
}
function NONE_GetStatus() {
  WriteToDebug("In NONE_GetStatus, Returning " + LESSON_STATUS_INCOMPLETE);
  return LESSON_STATUS_INCOMPLETE;
}
function NONE_GetProgressMeasure() {
  WriteToDebug(
    "NONE_GetProgressMeasure - NONE does not support progress_measure, returning false"
  );
  return false;
}
function NONE_SetProgressMeasure() {
  WriteToDebug(
    "NONE_SetProgressMeasure - NONE does not support progress_measure, returning false"
  );
  return false;
}
function NONE_GetObjectiveProgressMeasure() {
  WriteToDebug(
    "NONE_GetObjectiveProgressMeasure - NONE does not support progress_measure, returning false"
  );
  return false;
}
function NONE_SetObjectiveProgressMeasure() {
  WriteToDebug(
    "NONE_SetObjectiveProgressMeasure - NONE does not support progress_measure, returning false"
  );
  return false;
}
function NONE_SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "NONE_SetPointBasedScore - NONE does not support SetPointBasedScore, returning false"
  );
  return false;
}
function NONE_GetScaledScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "NONE_GetScaledScore - NONE does not support GetScaledScore, returning false"
  );
  return false;
}
function NONE_GetLastError() {
  WriteToDebug("In NONE_GetLastError, Returning " + NO_ERROR);
  return NO_ERROR;
}
function NONE_GetLastErrorDesc() {
  WriteToDebug("In NONE_GetLastErrorDesc, Returning ''");
  return "";
}
("0.50.0");
var CryptoJS =
  CryptoJS ||
  (function (e, m) {
    var p = {},
      j = (p.lib = {}),
      l = function () {},
      f = (j.Base = {
        extend: function (a) {
          l.prototype = this;
          var c = new l();
          a && c.mixIn(a);
          c.hasOwnProperty("init") ||
            (c.init = function () {
              c.$super.init.apply(this, arguments);
            });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function () {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      n = (j.WordArray = f.extend({
        init: function (a, c) {
          a = this.words = a || [];
          this.sigBytes = c != m ? c : 4 * a.length;
        },
        toString: function (a) {
          return (a || h).stringify(this);
        },
        concat: function (a) {
          var c = this.words,
            q = a.words,
            d = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (d % 4)
            for (var b = 0; b < a; b++)
              c[(d + b) >>> 2] |=
                ((q[b >>> 2] >>> (24 - 8 * (b % 4))) & 255) <<
                (24 - 8 * ((d + b) % 4));
          else if (65535 < q.length)
            for (b = 0; b < a; b += 4) c[(d + b) >>> 2] = q[b >>> 2];
          else c.push.apply(c, q);
          this.sigBytes += a;
          return this;
        },
        clamp: function () {
          var a = this.words,
            c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4));
          a.length = e.ceil(c / 4);
        },
        clone: function () {
          var a = f.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function (a) {
          for (var c = [], b = 0; b < a; b += 4)
            c.push((4294967296 * e.random()) | 0);
          return new n.init(c, a);
        },
      })),
      b = (p.enc = {}),
      h = (b.Hex = {
        stringify: function (a) {
          var c = a.words;
          a = a.sigBytes;
          for (var b = [], d = 0; d < a; d++) {
            var f = (c[d >>> 2] >>> (24 - 8 * (d % 4))) & 255;
            b.push((f >>> 4).toString(16));
            b.push((f & 15).toString(16));
          }
          return b.join("");
        },
        parse: function (a) {
          for (var c = a.length, b = [], d = 0; d < c; d += 2)
            b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << (24 - 4 * (d % 8));
          return new n.init(b, c / 2);
        },
      }),
      g = (b.Latin1 = {
        stringify: function (a) {
          var c = a.words;
          a = a.sigBytes;
          for (var b = [], d = 0; d < a; d++)
            b.push(
              String.fromCharCode((c[d >>> 2] >>> (24 - 8 * (d % 4))) & 255)
            );
          return b.join("");
        },
        parse: function (a) {
          for (var c = a.length, b = [], d = 0; d < c; d++)
            b[d >>> 2] |= (a.charCodeAt(d) & 255) << (24 - 8 * (d % 4));
          return new n.init(b, c);
        },
      }),
      r = (b.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(g.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return g.parse(unescape(encodeURIComponent(a)));
        },
      }),
      k = (j.BufferedBlockAlgorithm = f.extend({
        reset: function () {
          this._data = new n.init();
          this._nDataBytes = 0;
        },
        _append: function (a) {
          "string" == typeof a && (a = r.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function (a) {
          var c = this._data,
            b = c.words,
            d = c.sigBytes,
            f = this.blockSize,
            h = d / (4 * f),
            h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0);
          a = h * f;
          d = e.min(4 * a, d);
          if (a) {
            for (var g = 0; g < a; g += f) this._doProcessBlock(b, g);
            g = b.splice(0, a);
            c.sigBytes -= d;
          }
          return new n.init(g, d);
        },
        clone: function () {
          var a = f.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0,
      }));
    j.Hasher = k.extend({
      cfg: f.extend(),
      init: function (a) {
        this.cfg = this.cfg.extend(a);
        this.reset();
      },
      reset: function () {
        k.reset.call(this);
        this._doReset();
      },
      update: function (a) {
        this._append(a);
        this._process();
        return this;
      },
      finalize: function (a) {
        a && this._append(a);
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (c, b) {
          return new a.init(b).finalize(c);
        };
      },
      _createHmacHelper: function (a) {
        return function (b, f) {
          return new s.HMAC.init(a, f).finalize(b);
        };
      },
    });
    var s = (p.algo = {});
    return p;
  })(Math);
(function () {
  var e = CryptoJS,
    m = e.lib,
    p = m.WordArray,
    j = m.Hasher,
    l = [],
    m = (e.algo.SHA1 = j.extend({
      _doReset: function () {
        this._hash = new p.init([
          1732584193, 4023233417, 2562383102, 271733878, 3285377520,
        ]);
      },
      _doProcessBlock: function (f, n) {
        for (
          var b = this._hash.words,
            h = b[0],
            g = b[1],
            e = b[2],
            k = b[3],
            j = b[4],
            a = 0;
          80 > a;
          a++
        ) {
          if (16 > a) l[a] = f[n + a] | 0;
          else {
            var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16];
            l[a] = (c << 1) | (c >>> 31);
          }
          c = ((h << 5) | (h >>> 27)) + j + l[a];
          c =
            20 > a
              ? c + (((g & e) | (~g & k)) + 1518500249)
              : 40 > a
              ? c + ((g ^ e ^ k) + 1859775393)
              : 60 > a
              ? c + (((g & e) | (g & k) | (e & k)) - 1894007588)
              : c + ((g ^ e ^ k) - 899497514);
          j = k;
          k = e;
          e = (g << 30) | (g >>> 2);
          g = h;
          h = c;
        }
        b[0] = (b[0] + h) | 0;
        b[1] = (b[1] + g) | 0;
        b[2] = (b[2] + e) | 0;
        b[3] = (b[3] + k) | 0;
        b[4] = (b[4] + j) | 0;
      },
      _doFinalize: function () {
        var f = this._data,
          e = f.words,
          b = 8 * this._nDataBytes,
          h = 8 * f.sigBytes;
        e[h >>> 5] |= 128 << (24 - (h % 32));
        e[(((h + 64) >>> 9) << 4) + 14] = Math.floor(b / 4294967296);
        e[(((h + 64) >>> 9) << 4) + 15] = b;
        f.sigBytes = 4 * e.length;
        this._process();
        return this._hash;
      },
      clone: function () {
        var e = j.clone.call(this);
        e._hash = this._hash.clone();
        return e;
      },
    }));
  e.SHA1 = j._createHelper(m);
  e.HmacSHA1 = j._createHmacHelper(m);
})();
var CryptoJS =
  CryptoJS ||
  (function (h, s) {
    var f = {},
      t = (f.lib = {}),
      g = function () {},
      j = (t.Base = {
        extend: function (a) {
          g.prototype = this;
          var c = new g();
          a && c.mixIn(a);
          c.hasOwnProperty("init") ||
            (c.init = function () {
              c.$super.init.apply(this, arguments);
            });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function () {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      q = (t.WordArray = j.extend({
        init: function (a, c) {
          a = this.words = a || [];
          this.sigBytes = c != s ? c : 4 * a.length;
        },
        toString: function (a) {
          return (a || u).stringify(this);
        },
        concat: function (a) {
          var c = this.words,
            d = a.words,
            b = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (b % 4)
            for (var e = 0; e < a; e++)
              c[(b + e) >>> 2] |=
                ((d[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((b + e) % 4));
          else if (65535 < d.length)
            for (e = 0; e < a; e += 4) c[(b + e) >>> 2] = d[e >>> 2];
          else c.push.apply(c, d);
          this.sigBytes += a;
          return this;
        },
        clamp: function () {
          var a = this.words,
            c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4));
          a.length = h.ceil(c / 4);
        },
        clone: function () {
          var a = j.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function (a) {
          for (var c = [], d = 0; d < a; d += 4)
            c.push((4294967296 * h.random()) | 0);
          return new q.init(c, a);
        },
      })),
      v = (f.enc = {}),
      u = (v.Hex = {
        stringify: function (a) {
          var c = a.words;
          a = a.sigBytes;
          for (var d = [], b = 0; b < a; b++) {
            var e = (c[b >>> 2] >>> (24 - 8 * (b % 4))) & 255;
            d.push((e >>> 4).toString(16));
            d.push((e & 15).toString(16));
          }
          return d.join("");
        },
        parse: function (a) {
          for (var c = a.length, d = [], b = 0; b < c; b += 2)
            d[b >>> 3] |= parseInt(a.substr(b, 2), 16) << (24 - 4 * (b % 8));
          return new q.init(d, c / 2);
        },
      }),
      k = (v.Latin1 = {
        stringify: function (a) {
          var c = a.words;
          a = a.sigBytes;
          for (var d = [], b = 0; b < a; b++)
            d.push(
              String.fromCharCode((c[b >>> 2] >>> (24 - 8 * (b % 4))) & 255)
            );
          return d.join("");
        },
        parse: function (a) {
          for (var c = a.length, d = [], b = 0; b < c; b++)
            d[b >>> 2] |= (a.charCodeAt(b) & 255) << (24 - 8 * (b % 4));
          return new q.init(d, c);
        },
      }),
      l = (v.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(k.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return k.parse(unescape(encodeURIComponent(a)));
        },
      }),
      x = (t.BufferedBlockAlgorithm = j.extend({
        reset: function () {
          this._data = new q.init();
          this._nDataBytes = 0;
        },
        _append: function (a) {
          "string" == typeof a && (a = l.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function (a) {
          var c = this._data,
            d = c.words,
            b = c.sigBytes,
            e = this.blockSize,
            f = b / (4 * e),
            f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
          a = f * e;
          b = h.min(4 * a, b);
          if (a) {
            for (var m = 0; m < a; m += e) this._doProcessBlock(d, m);
            m = d.splice(0, a);
            c.sigBytes -= b;
          }
          return new q.init(m, b);
        },
        clone: function () {
          var a = j.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0,
      }));
    t.Hasher = x.extend({
      cfg: j.extend(),
      init: function (a) {
        this.cfg = this.cfg.extend(a);
        this.reset();
      },
      reset: function () {
        x.reset.call(this);
        this._doReset();
      },
      update: function (a) {
        this._append(a);
        this._process();
        return this;
      },
      finalize: function (a) {
        a && this._append(a);
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (c, d) {
          return new a.init(d).finalize(c);
        };
      },
      _createHmacHelper: function (a) {
        return function (c, d) {
          return new w.HMAC.init(a, d).finalize(c);
        };
      },
    });
    var w = (f.algo = {});
    return f;
  })(Math);
(function (h) {
  for (
    var s = CryptoJS,
      f = s.lib,
      t = f.WordArray,
      g = f.Hasher,
      f = s.algo,
      j = [],
      q = [],
      v = function (a) {
        return (4294967296 * (a - (a | 0))) | 0;
      },
      u = 2,
      k = 0;
    64 > k;

  ) {
    var l;
    a: {
      l = u;
      for (var x = h.sqrt(l), w = 2; w <= x; w++)
        if (!(l % w)) {
          l = !1;
          break a;
        }
      l = !0;
    }
    l && (8 > k && (j[k] = v(h.pow(u, 0.5))), (q[k] = v(h.pow(u, 1 / 3))), k++);
    u++;
  }
  var a = [],
    f = (f.SHA256 = g.extend({
      _doReset: function () {
        this._hash = new t.init(j.slice(0));
      },
      _doProcessBlock: function (c, d) {
        for (
          var b = this._hash.words,
            e = b[0],
            f = b[1],
            m = b[2],
            h = b[3],
            p = b[4],
            j = b[5],
            k = b[6],
            l = b[7],
            n = 0;
          64 > n;
          n++
        ) {
          if (16 > n) a[n] = c[d + n] | 0;
          else {
            var r = a[n - 15],
              g = a[n - 2];
            a[n] =
              (((r << 25) | (r >>> 7)) ^ ((r << 14) | (r >>> 18)) ^ (r >>> 3)) +
              a[n - 7] +
              (((g << 15) | (g >>> 17)) ^
                ((g << 13) | (g >>> 19)) ^
                (g >>> 10)) +
              a[n - 16];
          }
          r =
            l +
            (((p << 26) | (p >>> 6)) ^
              ((p << 21) | (p >>> 11)) ^
              ((p << 7) | (p >>> 25))) +
            ((p & j) ^ (~p & k)) +
            q[n] +
            a[n];
          g =
            (((e << 30) | (e >>> 2)) ^
              ((e << 19) | (e >>> 13)) ^
              ((e << 10) | (e >>> 22))) +
            ((e & f) ^ (e & m) ^ (f & m));
          l = k;
          k = j;
          j = p;
          p = (h + r) | 0;
          h = m;
          m = f;
          f = e;
          e = (r + g) | 0;
        }
        b[0] = (b[0] + e) | 0;
        b[1] = (b[1] + f) | 0;
        b[2] = (b[2] + m) | 0;
        b[3] = (b[3] + h) | 0;
        b[4] = (b[4] + p) | 0;
        b[5] = (b[5] + j) | 0;
        b[6] = (b[6] + k) | 0;
        b[7] = (b[7] + l) | 0;
      },
      _doFinalize: function () {
        var a = this._data,
          d = a.words,
          b = 8 * this._nDataBytes,
          e = 8 * a.sigBytes;
        d[e >>> 5] |= 128 << (24 - (e % 32));
        d[(((e + 64) >>> 9) << 4) + 14] = h.floor(b / 4294967296);
        d[(((e + 64) >>> 9) << 4) + 15] = b;
        a.sigBytes = 4 * d.length;
        this._process();
        return this._hash;
      },
      clone: function () {
        var a = g.clone.call(this);
        a._hash = this._hash.clone();
        return a;
      },
    }));
  s.SHA256 = g._createHelper(f);
  s.HmacSHA256 = g._createHmacHelper(f);
})(Math);
(function () {
  var C = CryptoJS;
  var C_lib = C.lib;
  var WordArray = C_lib.WordArray;
  var C_enc = C.enc;
  var Base64 = (C_enc.Base64 = {
    stringify: function (wordArray) {
      var words = wordArray.words;
      var sigBytes = wordArray.sigBytes;
      var map = this._map;
      wordArray.clamp();
      var base64Chars = [];
      for (var i = 0; i < sigBytes; i += 3) {
        var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
        var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
        var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
        for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
          base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
        }
      }
      var paddingChar = map.charAt(64);
      if (paddingChar) {
        while (base64Chars.length % 4) {
          base64Chars.push(paddingChar);
        }
      }
      return base64Chars.join("");
    },
    parse: function (base64Str) {
      var base64StrLength = base64Str.length;
      var map = this._map;
      var paddingChar = map.charAt(64);
      if (paddingChar) {
        var paddingIndex = base64Str.indexOf(paddingChar);
        if (paddingIndex != -1) {
          base64StrLength = paddingIndex;
        }
      }
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
          var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
          words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
          nBytes++;
        }
      }
      return WordArray.create(words, nBytes);
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  });
})();
(function () {
  if (typeof ArrayBuffer != "function") {
    return;
  }
  var C = CryptoJS;
  var C_lib = C.lib;
  var WordArray = C_lib.WordArray;
  var superInit = WordArray.init;
  var subInit = (WordArray.init = function (typedArray) {
    if (typedArray instanceof ArrayBuffer) {
      typedArray = new Uint8Array(typedArray);
    }
    if (
      typedArray instanceof Int8Array ||
      typedArray instanceof Uint8ClampedArray ||
      typedArray instanceof Int16Array ||
      typedArray instanceof Uint16Array ||
      typedArray instanceof Int32Array ||
      typedArray instanceof Uint32Array ||
      typedArray instanceof Float32Array ||
      typedArray instanceof Float64Array
    ) {
      typedArray = new Uint8Array(
        typedArray.buffer,
        typedArray.byteOffset,
        typedArray.byteLength
      );
    }
    if (typedArray instanceof Uint8Array) {
      var typedArrayByteLength = typedArray.byteLength;
      var words = [];
      for (var i = 0; i < typedArrayByteLength; i++) {
        words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
      }
      superInit.call(this, words, typedArrayByteLength);
    } else {
      superInit.apply(this, arguments);
    }
  });
  subInit.prototype = WordArray;
})();
var TinCan;
(function () {
  "use strict";
  var _reservedQSParams = {
    statementId: true,
    voidedStatementId: true,
    verb: true,
    object: true,
    registration: true,
    context: true,
    actor: true,
    since: true,
    until: true,
    limit: true,
    authoritative: true,
    sparse: true,
    instructor: true,
    ascending: true,
    continueToken: true,
    agent: true,
    activityId: true,
    stateId: true,
    profileId: true,
    activity_platform: true,
    grouping: true,
    "Accept-Language": true,
  };
  TinCan = function (cfg) {
    this.log("constructor");
    this.recordStores = [];
    this.actor = null;
    this.activity = null;
    this.registration = null;
    this.context = null;
    this.init(cfg);
  };
  TinCan.prototype = {
    LOG_SRC: "TinCan",
    log: function (msg, src) {
      if (TinCan.DEBUG && typeof console !== "undefined" && console.log) {
        src = src || this.LOG_SRC || "TinCan";
        console.log("TinCan." + src + ": " + msg);
      }
    },
    init: function (cfg) {
      this.log("init");
      var i;
      cfg = cfg || {};
      if (cfg.hasOwnProperty("url") && cfg.url !== "") {
        this._initFromQueryString(cfg.url);
      }
      if (
        cfg.hasOwnProperty("recordStores") &&
        cfg.recordStores !== undefined
      ) {
        for (i = 0; i < cfg.recordStores.length; i += 1) {
          this.addRecordStore(cfg.recordStores[i]);
        }
      }
      if (cfg.hasOwnProperty("activity")) {
        if (cfg.activity instanceof TinCan.Activity) {
          this.activity = cfg.activity;
        } else {
          this.activity = new TinCan.Activity(cfg.activity);
        }
      }
      if (cfg.hasOwnProperty("actor")) {
        if (cfg.actor instanceof TinCan.Agent) {
          this.actor = cfg.actor;
        } else {
          this.actor = new TinCan.Agent(cfg.actor);
        }
      }
      if (cfg.hasOwnProperty("context")) {
        if (cfg.context instanceof TinCan.Context) {
          this.context = cfg.context;
        } else {
          this.context = new TinCan.Context(cfg.context);
        }
      }
      if (cfg.hasOwnProperty("registration")) {
        this.registration = cfg.registration;
      }
    },
    _initFromQueryString: function (url) {
      this.log("_initFromQueryString");
      var i,
        prop,
        qsParams = TinCan.Utils.parseURL(url).params,
        lrsProps = ["endpoint", "auth"],
        lrsCfg = {},
        contextCfg,
        extended = null;
      if (qsParams.hasOwnProperty("actor")) {
        this.log("_initFromQueryString - found actor: " + qsParams.actor);
        try {
          this.actor = TinCan.Agent.fromJSON(qsParams.actor);
          delete qsParams.actor;
        } catch (ex) {
          this.log("_initFromQueryString - failed to set actor: " + ex);
        }
      }
      if (qsParams.hasOwnProperty("activity_id")) {
        this.activity = new TinCan.Activity({ id: qsParams.activity_id });
        delete qsParams.activity_id;
      }
      if (
        qsParams.hasOwnProperty("activity_platform") ||
        qsParams.hasOwnProperty("registration") ||
        qsParams.hasOwnProperty("grouping")
      ) {
        contextCfg = {};
        if (qsParams.hasOwnProperty("activity_platform")) {
          contextCfg.platform = qsParams.activity_platform;
          delete qsParams.activity_platform;
        }
        if (qsParams.hasOwnProperty("registration")) {
          contextCfg.registration = this.registration = qsParams.registration;
          delete qsParams.registration;
        }
        if (qsParams.hasOwnProperty("grouping")) {
          contextCfg.contextActivities = {};
          contextCfg.contextActivities.grouping = qsParams.grouping;
          delete qsParams.grouping;
        }
        this.context = new TinCan.Context(contextCfg);
      }
      if (qsParams.hasOwnProperty("endpoint")) {
        for (i = 0; i < lrsProps.length; i += 1) {
          prop = lrsProps[i];
          if (qsParams.hasOwnProperty(prop)) {
            lrsCfg[prop] = qsParams[prop];
            delete qsParams[prop];
          }
        }
        for (i in qsParams) {
          if (qsParams.hasOwnProperty(i)) {
            if (_reservedQSParams.hasOwnProperty(i)) {
              delete qsParams[i];
            } else {
              extended = extended || {};
              extended[i] = qsParams[i];
            }
          }
        }
        if (extended !== null) {
          lrsCfg.extended = extended;
        }
        lrsCfg.allowFail = false;
        this.addRecordStore(lrsCfg);
      }
    },
    addRecordStore: function (cfg) {
      this.log("addRecordStore");
      var lrs;
      if (cfg instanceof TinCan.LRS) {
        lrs = cfg;
      } else {
        lrs = new TinCan.LRS(cfg);
      }
      this.recordStores.push(lrs);
    },
    prepareStatement: function (stmt) {
      this.log("prepareStatement");
      if (!(stmt instanceof TinCan.Statement)) {
        stmt = new TinCan.Statement(stmt);
      }
      if (stmt.actor === null && this.actor !== null) {
        stmt.actor = this.actor;
      }
      if (stmt.target === null && this.activity !== null) {
        stmt.target = this.activity;
      }
      if (this.context !== null) {
        if (stmt.context === null) {
          stmt.context = this.context;
        } else {
          if (stmt.context.registration === null) {
            stmt.context.registration = this.context.registration;
          }
          if (stmt.context.platform === null) {
            stmt.context.platform = this.context.platform;
          }
          if (this.context.contextActivities !== null) {
            if (stmt.context.contextActivities === null) {
              stmt.context.contextActivities = this.context.contextActivities;
            } else {
              if (
                this.context.contextActivities.grouping !== null &&
                stmt.context.contextActivities.grouping === null
              ) {
                stmt.context.contextActivities.grouping =
                  this.context.contextActivities.grouping;
              }
              if (
                this.context.contextActivities.parent !== null &&
                stmt.context.contextActivities.parent === null
              ) {
                stmt.context.contextActivities.parent =
                  this.context.contextActivities.parent;
              }
              if (
                this.context.contextActivities.other !== null &&
                stmt.context.contextActivities.other === null
              ) {
                stmt.context.contextActivities.other =
                  this.context.contextActivities.other;
              }
            }
          }
        }
      }
      return stmt;
    },
    sendStatement: function (stmt, callback) {
      this.log("sendStatement");
      var self = this,
        lrs,
        statement = this.prepareStatement(stmt),
        rsCount = this.recordStores.length,
        i,
        results = [],
        callbackWrapper,
        callbackResults = [];
      if (rsCount > 0) {
        if (typeof callback === "function") {
          callbackWrapper = function (err, xhr) {
            var args;
            self.log("sendStatement - callbackWrapper: " + rsCount);
            if (rsCount > 1) {
              rsCount -= 1;
              callbackResults.push({ err: err, xhr: xhr });
            } else if (rsCount === 1) {
              callbackResults.push({ err: err, xhr: xhr });
              args = [callbackResults, statement];
              callback.apply(this, args);
            } else {
              self.log(
                "sendStatement - unexpected record store count: " + rsCount
              );
            }
          };
        }
        for (i = 0; i < rsCount; i += 1) {
          lrs = this.recordStores[i];
          results.push(
            lrs.saveStatement(statement, { callback: callbackWrapper })
          );
        }
      } else {
        this.log(
          "[warning] sendStatement: No LRSs added yet (statement not sent)"
        );
        if (typeof callback === "function") {
          callback.apply(this, [null, statement]);
        }
      }
      return { statement: statement, results: results };
    },
    getStatement: function (stmtId, callback, cfg) {
      this.log("getStatement");
      var lrs;
      cfg = cfg || {};
      cfg.params = cfg.params || {};
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        return lrs.retrieveStatement(stmtId, {
          callback: callback,
          params: cfg.params,
        });
      }
      this.log(
        "[warning] getStatement: No LRSs added yet (statement not retrieved)"
      );
    },
    voidStatement: function (stmt, callback, options) {
      this.log("voidStatement");
      var self = this,
        lrs,
        actor,
        voidingStatement,
        rsCount = this.recordStores.length,
        i,
        results = [],
        callbackWrapper,
        callbackResults = [];
      if (stmt instanceof TinCan.Statement) {
        stmt = stmt.id;
      }
      if (typeof options.actor !== "undefined") {
        actor = options.actor;
      } else if (this.actor !== null) {
        actor = this.actor;
      }
      voidingStatement = new TinCan.Statement({
        actor: actor,
        verb: { id: "http://adlnet.gov/expapi/verbs/voided" },
        target: { objectType: "StatementRef", id: stmt },
      });
      if (rsCount > 0) {
        if (typeof callback === "function") {
          callbackWrapper = function (err, xhr) {
            var args;
            self.log("voidStatement - callbackWrapper: " + rsCount);
            if (rsCount > 1) {
              rsCount -= 1;
              callbackResults.push({ err: err, xhr: xhr });
            } else if (rsCount === 1) {
              callbackResults.push({ err: err, xhr: xhr });
              args = [callbackResults, voidingStatement];
              callback.apply(this, args);
            } else {
              self.log(
                "voidStatement - unexpected record store count: " + rsCount
              );
            }
          };
        }
        for (i = 0; i < rsCount; i += 1) {
          lrs = this.recordStores[i];
          results.push(
            lrs.saveStatement(voidingStatement, { callback: callbackWrapper })
          );
        }
      } else {
        this.log(
          "[warning] voidStatement: No LRSs added yet (statement not sent)"
        );
        if (typeof callback === "function") {
          callback.apply(this, [null, voidingStatement]);
        }
      }
      return { statement: voidingStatement, results: results };
    },
    getVoidedStatement: function (stmtId, callback) {
      this.log("getVoidedStatement");
      var lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        return lrs.retrieveVoidedStatement(stmtId, { callback: callback });
      }
      this.log(
        "[warning] getVoidedStatement: No LRSs added yet (statement not retrieved)"
      );
    },
    sendStatements: function (stmts, callback) {
      this.log("sendStatements");
      var self = this,
        lrs,
        statements = [],
        rsCount = this.recordStores.length,
        i,
        results = [],
        callbackWrapper,
        callbackResults = [];
      if (stmts.length === 0) {
        if (typeof callback === "function") {
          callback.apply(this, [null, statements]);
        }
      } else {
        for (i = 0; i < stmts.length; i += 1) {
          statements.push(this.prepareStatement(stmts[i]));
        }
        if (rsCount > 0) {
          if (typeof callback === "function") {
            callbackWrapper = function (err, xhr) {
              var args;
              self.log("sendStatements - callbackWrapper: " + rsCount);
              if (rsCount > 1) {
                rsCount -= 1;
                callbackResults.push({ err: err, xhr: xhr });
              } else if (rsCount === 1) {
                callbackResults.push({ err: err, xhr: xhr });
                args = [callbackResults, statements];
                callback.apply(this, args);
              } else {
                self.log(
                  "sendStatements - unexpected record store count: " + rsCount
                );
              }
            };
          }
          for (i = 0; i < rsCount; i += 1) {
            lrs = this.recordStores[i];
            results.push(
              lrs.saveStatements(statements, { callback: callbackWrapper })
            );
          }
        } else {
          this.log(
            "[warning] sendStatements: No LRSs added yet (statements not sent)"
          );
          if (typeof callback === "function") {
            callback.apply(this, [null, statements]);
          }
        }
      }
      return { statements: statements, results: results };
    },
    getStatements: function (cfg) {
      this.log("getStatements");
      var queryCfg = {},
        lrs,
        params;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        params = cfg.params || {};
        if (cfg.sendActor && this.actor !== null) {
          if (lrs.version === "0.9" || lrs.version === "0.95") {
            params.actor = this.actor;
          } else {
            params.agent = this.actor;
          }
        }
        if (cfg.sendActivity && this.activity !== null) {
          if (lrs.version === "0.9" || lrs.version === "0.95") {
            params.target = this.activity;
          } else {
            params.activity = this.activity;
          }
        }
        if (
          typeof params.registration === "undefined" &&
          this.registration !== null
        ) {
          params.registration = this.registration;
        }
        queryCfg = { params: params };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.queryStatements(queryCfg);
      }
      this.log(
        "[warning] getStatements: No LRSs added yet (statements not read)"
      );
    },
    getState: function (key, cfg) {
      this.log("getState");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          agent: typeof cfg.agent !== "undefined" ? cfg.agent : this.actor,
          activity:
            typeof cfg.activity !== "undefined" ? cfg.activity : this.activity,
        };
        if (typeof cfg.registration !== "undefined") {
          queryCfg.registration = cfg.registration;
        } else if (this.registration !== null) {
          queryCfg.registration = this.registration;
        }
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.retrieveState(key, queryCfg);
      }
      this.log("[warning] getState: No LRSs added yet (state not retrieved)");
    },
    setState: function (key, val, cfg) {
      this.log("setState");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          agent: typeof cfg.agent !== "undefined" ? cfg.agent : this.actor,
          activity:
            typeof cfg.activity !== "undefined" ? cfg.activity : this.activity,
        };
        if (typeof cfg.registration !== "undefined") {
          queryCfg.registration = cfg.registration;
        } else if (this.registration !== null) {
          queryCfg.registration = this.registration;
        }
        if (typeof cfg.lastSHA1 !== "undefined") {
          queryCfg.lastSHA1 = cfg.lastSHA1;
        }
        if (typeof cfg.contentType !== "undefined") {
          queryCfg.contentType = cfg.contentType;
          if (
            typeof cfg.overwriteJSON !== "undefined" &&
            !cfg.overwriteJSON &&
            TinCan.Utils.isApplicationJSON(cfg.contentType)
          ) {
            queryCfg.method = "POST";
          }
        }
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.saveState(key, val, queryCfg);
      }
      this.log("[warning] setState: No LRSs added yet (state not saved)");
    },
    deleteState: function (key, cfg) {
      this.log("deleteState");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          agent: typeof cfg.agent !== "undefined" ? cfg.agent : this.actor,
          activity:
            typeof cfg.activity !== "undefined" ? cfg.activity : this.activity,
        };
        if (typeof cfg.registration !== "undefined") {
          queryCfg.registration = cfg.registration;
        } else if (this.registration !== null) {
          queryCfg.registration = this.registration;
        }
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.dropState(key, queryCfg);
      }
      this.log("[warning] deleteState: No LRSs added yet (state not deleted)");
    },
    getActivityProfile: function (key, cfg) {
      this.log("getActivityProfile");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          activity:
            typeof cfg.activity !== "undefined" ? cfg.activity : this.activity,
        };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.retrieveActivityProfile(key, queryCfg);
      }
      this.log(
        "[warning] getActivityProfile: No LRSs added yet (activity profile not retrieved)"
      );
    },
    setActivityProfile: function (key, val, cfg) {
      this.log("setActivityProfile");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          activity:
            typeof cfg.activity !== "undefined" ? cfg.activity : this.activity,
        };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        if (typeof cfg.lastSHA1 !== "undefined") {
          queryCfg.lastSHA1 = cfg.lastSHA1;
        }
        if (typeof cfg.contentType !== "undefined") {
          queryCfg.contentType = cfg.contentType;
          if (
            typeof cfg.overwriteJSON !== "undefined" &&
            !cfg.overwriteJSON &&
            TinCan.Utils.isApplicationJSON(cfg.contentType)
          ) {
            queryCfg.method = "POST";
          }
        }
        return lrs.saveActivityProfile(key, val, queryCfg);
      }
      this.log(
        "[warning] setActivityProfile: No LRSs added yet (activity profile not saved)"
      );
    },
    deleteActivityProfile: function (key, cfg) {
      this.log("deleteActivityProfile");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          activity:
            typeof cfg.activity !== "undefined" ? cfg.activity : this.activity,
        };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.dropActivityProfile(key, queryCfg);
      }
      this.log(
        "[warning] deleteActivityProfile: No LRSs added yet (activity profile not deleted)"
      );
    },
    getAgentProfile: function (key, cfg) {
      this.log("getAgentProfile");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          agent: typeof cfg.agent !== "undefined" ? cfg.agent : this.actor,
        };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.retrieveAgentProfile(key, queryCfg);
      }
      this.log(
        "[warning] getAgentProfile: No LRSs added yet (agent profile not retrieved)"
      );
    },
    setAgentProfile: function (key, val, cfg) {
      this.log("setAgentProfile");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          agent: typeof cfg.agent !== "undefined" ? cfg.agent : this.actor,
        };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        if (typeof cfg.lastSHA1 !== "undefined") {
          queryCfg.lastSHA1 = cfg.lastSHA1;
        }
        if (typeof cfg.contentType !== "undefined") {
          queryCfg.contentType = cfg.contentType;
          if (
            typeof cfg.overwriteJSON !== "undefined" &&
            !cfg.overwriteJSON &&
            TinCan.Utils.isApplicationJSON(cfg.contentType)
          ) {
            queryCfg.method = "POST";
          }
        }
        return lrs.saveAgentProfile(key, val, queryCfg);
      }
      this.log(
        "[warning] setAgentProfile: No LRSs added yet (agent profile not saved)"
      );
    },
    deleteAgentProfile: function (key, cfg) {
      this.log("deleteAgentProfile");
      var queryCfg, lrs;
      if (this.recordStores.length > 0) {
        lrs = this.recordStores[0];
        cfg = cfg || {};
        queryCfg = {
          agent: typeof cfg.agent !== "undefined" ? cfg.agent : this.actor,
        };
        if (typeof cfg.callback !== "undefined") {
          queryCfg.callback = cfg.callback;
        }
        return lrs.dropAgentProfile(key, queryCfg);
      }
      this.log(
        "[warning] deleteAgentProfile: No LRSs added yet (agent profile not deleted)"
      );
    },
  };
  TinCan.DEBUG = false;
  TinCan.enableDebug = function () {
    TinCan.DEBUG = true;
  };
  TinCan.disableDebug = function () {
    TinCan.DEBUG = false;
  };
  TinCan.versions = function () {
    return ["1.0.2", "1.0.1", "1.0.0", "0.95", "0.9"];
  };
  if (typeof module === "object") {
    module.exports = TinCan;
  }
})();
(function () {
  "use strict";
  TinCan.Utils = {
    defaultEncoding: "utf8",
    getUUID: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    getISODateString: function (d) {
      function pad(val, n) {
        var padder, tempVal;
        if (typeof val === "undefined" || val === null) {
          val = 0;
        }
        if (typeof n === "undefined" || n === null) {
          n = 2;
        }
        padder = Math.pow(10, n - 1);
        tempVal = val.toString();
        while (val < padder && padder > 1) {
          tempVal = "0" + tempVal;
          padder = padder / 10;
        }
        return tempVal;
      }
      return (
        d.getUTCFullYear() +
        "-" +
        pad(d.getUTCMonth() + 1) +
        "-" +
        pad(d.getUTCDate()) +
        "T" +
        pad(d.getUTCHours()) +
        ":" +
        pad(d.getUTCMinutes()) +
        ":" +
        pad(d.getUTCSeconds()) +
        "." +
        pad(d.getUTCMilliseconds(), 3) +
        "Z"
      );
    },
    convertISO8601DurationToMilliseconds: function (ISO8601Duration) {
      var isValueNegative = ISO8601Duration.indexOf("-") >= 0,
        indexOfT = ISO8601Duration.indexOf("T"),
        indexOfH = ISO8601Duration.indexOf("H"),
        indexOfM = ISO8601Duration.indexOf("M"),
        indexOfS = ISO8601Duration.indexOf("S"),
        hours,
        minutes,
        seconds,
        durationInMilliseconds;
      if (
        indexOfT === -1 ||
        (indexOfM !== -1 && indexOfM < indexOfT) ||
        ISO8601Duration.indexOf("D") !== -1 ||
        ISO8601Duration.indexOf("Y") !== -1
      ) {
        throw new Error(
          "ISO 8601 timestamps including years, months and/or days are not currently supported"
        );
      }
      if (indexOfH === -1) {
        indexOfH = indexOfT;
        hours = 0;
      } else {
        hours = parseInt(ISO8601Duration.slice(indexOfT + 1, indexOfH), 10);
      }
      if (indexOfM === -1) {
        indexOfM = indexOfT;
        minutes = 0;
      } else {
        minutes = parseInt(ISO8601Duration.slice(indexOfH + 1, indexOfM), 10);
      }
      seconds = parseFloat(ISO8601Duration.slice(indexOfM + 1, indexOfS));
      durationInMilliseconds = parseInt(
        ((hours * 60 + minutes) * 60 + seconds) * 1000,
        10
      );
      if (isNaN(durationInMilliseconds)) {
        durationInMilliseconds = 0;
      }
      if (isValueNegative) {
        durationInMilliseconds = durationInMilliseconds * -1;
      }
      return durationInMilliseconds;
    },
    convertMillisecondsToISO8601Duration: function (inputMilliseconds) {
      var hours,
        minutes,
        seconds,
        i_inputMilliseconds = parseInt(inputMilliseconds, 10),
        i_inputCentiseconds,
        inputIsNegative = "",
        rtnStr = "";
      i_inputCentiseconds = Math.round(i_inputMilliseconds / 10);
      if (i_inputCentiseconds < 0) {
        inputIsNegative = "-";
        i_inputCentiseconds = i_inputCentiseconds * -1;
      }
      hours = parseInt(i_inputCentiseconds / 360000, 10);
      minutes = parseInt((i_inputCentiseconds % 360000) / 6000, 10);
      seconds = ((i_inputCentiseconds % 360000) % 6000) / 100;
      rtnStr = inputIsNegative + "PT";
      if (hours > 0) {
        rtnStr += hours + "H";
      }
      if (minutes > 0) {
        rtnStr += minutes + "M";
      }
      rtnStr += seconds + "S";
      return rtnStr;
    },
    getSHA1String: function (str) {
      return CryptoJS.SHA1(str).toString(CryptoJS.enc.Hex);
    },
    getSHA256String: function (content) {
      if (Object.prototype.toString.call(content) === "[object ArrayBuffer]") {
        content = CryptoJS.lib.WordArray.create(content);
      }
      return CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
    },
    getBase64String: function (str) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(str));
    },
    getLangDictionaryValue: function (prop, lang) {
      var langDict = this[prop],
        key;
      if (
        typeof lang !== "undefined" &&
        typeof langDict[lang] !== "undefined"
      ) {
        return langDict[lang];
      }
      if (typeof langDict.und !== "undefined") {
        return langDict.und;
      }
      if (typeof langDict["en-US"] !== "undefined") {
        return langDict["en-US"];
      }
      for (key in langDict) {
        if (langDict.hasOwnProperty(key)) {
          return langDict[key];
        }
      }
      return "";
    },
    parseURL: function (url, cfg) {
      var isRelative = url.charAt(0) === "/",
        _reURLInformation = ["(/[^?#]*)", "(\\?[^#]*|)", "(#.*|)$"],
        reURLInformation,
        match,
        result,
        paramMatch,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
          return decodeURIComponent(s.replace(pl, " "));
        };
      cfg = cfg || {};
      if (!isRelative) {
        _reURLInformation.unshift("^(https?:)//", "(([^:/?#]*)(?::([0-9]+))?)");
        if (url.indexOf("/", 8) === -1) {
          url = url + "/";
        }
      } else {
        if (typeof cfg.allowRelative === "undefined" || !cfg.allowRelative) {
          throw new Error(
            "Refusing to parse relative URL without 'allowRelative' option"
          );
        }
      }
      reURLInformation = new RegExp(_reURLInformation.join(""));
      match = url.match(reURLInformation);
      if (match === null) {
        throw new Error(
          "Unable to parse URL regular expression did not match: '" + url + "'"
        );
      }
      if (isRelative) {
        result = {
          protocol: null,
          host: null,
          hostname: null,
          port: null,
          path: null,
          pathname: match[1],
          search: match[2],
          hash: match[3],
          params: {},
        };
        result.path = result.pathname;
      } else {
        result = {
          protocol: match[1],
          host: match[2],
          hostname: match[3],
          port: match[4],
          pathname: match[5],
          search: match[6],
          hash: match[7],
          params: {},
        };
        result.path = result.protocol + "//" + result.host + result.pathname;
      }
      if (result.search !== "") {
        while ((paramMatch = search.exec(result.search.substring(1)))) {
          result.params[decode(paramMatch[1])] = decode(paramMatch[2]);
        }
      }
      return result;
    },
    getServerRoot: function (absoluteUrl) {
      var urlParts = absoluteUrl.split("/");
      return urlParts[0] + "//" + urlParts[2];
    },
    getContentTypeFromHeader: function (header) {
      return String(header).split(";")[0];
    },
    isApplicationJSON: function (header) {
      return (
        TinCan.Utils.getContentTypeFromHeader(header)
          .toLowerCase()
          .indexOf("application/json") === 0
      );
    },
    stringToArrayBuffer: function () {
      TinCan.prototype.log(
        "stringToArrayBuffer not overloaded - no environment loaded?"
      );
    },
    stringFromArrayBuffer: function () {
      TinCan.prototype.log(
        "stringFromArrayBuffer not overloaded - no environment loaded?"
      );
    },
  };
})();
(function () {
  "use strict";
  var LRS = (TinCan.LRS = function (cfg) {
    this.log("constructor");
    this.endpoint = null;
    this.version = null;
    this.auth = null;
    this.allowFail = true;
    this.extended = null;
    this.init(cfg);
  });
  LRS.prototype = {
    LOG_SRC: "LRS",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var versions = TinCan.versions(),
        versionMatch = false,
        i;
      cfg = cfg || {};
      if (cfg.hasOwnProperty("alertOnRequestFailure")) {
        this.log(
          "'alertOnRequestFailure' is deprecated (alerts have been removed) no need to set it now"
        );
      }
      if (
        !cfg.hasOwnProperty("endpoint") ||
        cfg.endpoint === null ||
        cfg.endpoint === ""
      ) {
        this.log("[error] LRS invalid: no endpoint");
        throw { code: 3, mesg: "LRS invalid: no endpoint" };
      }
      this.endpoint = String(cfg.endpoint);
      if (this.endpoint.slice(-1) !== "/") {
        this.log("adding trailing slash to endpoint");
        this.endpoint += "/";
      }
      if (cfg.hasOwnProperty("allowFail")) {
        this.allowFail = cfg.allowFail;
      }
      if (cfg.hasOwnProperty("auth")) {
        this.auth = cfg.auth;
      } else if (
        cfg.hasOwnProperty("username") &&
        cfg.hasOwnProperty("password")
      ) {
        this.auth =
          "Basic " +
          TinCan.Utils.getBase64String(cfg.username + ":" + cfg.password);
      }
      if (cfg.hasOwnProperty("extended")) {
        this.extended = cfg.extended;
      }
      this._initByEnvironment(cfg);
      if (typeof cfg.version !== "undefined") {
        this.log("version: " + cfg.version);
        for (i = 0; i < versions.length; i += 1) {
          if (versions[i] === cfg.version) {
            versionMatch = true;
            break;
          }
        }
        if (!versionMatch) {
          this.log(
            "[error] LRS invalid: version not supported (" + cfg.version + ")"
          );
          throw {
            code: 5,
            mesg: "LRS invalid: version not supported (" + cfg.version + ")",
          };
        }
        this.version = cfg.version;
      } else {
        this.version = versions[0];
      }
    },
    _getBoundary: function () {
      return TinCan.Utils.getUUID().replace(/-/g, "");
    },
    _initByEnvironment: function () {
      this.log("_initByEnvironment not overloaded - no environment loaded?");
    },
    _makeRequest: function () {
      this.log("_makeRequest not overloaded - no environment loaded?");
    },
    _getMultipartRequestData: function () {
      this.log(
        "_getMultipartRequestData not overloaded - no environment loaded?"
      );
    },
    _IEModeConversion: function () {
      this.log(
        "_IEModeConversion not overloaded - browser environment not loaded."
      );
    },
    _processGetStatementResult: function (xhr, params) {
      var boundary,
        parsedResponse,
        statement,
        attachmentMap = {},
        i;
      if (!params.attachments) {
        return TinCan.Statement.fromJSON(xhr.responseText);
      }
      boundary = xhr.getResponseHeader("Content-Type").split("boundary=")[1];
      parsedResponse = this._parseMultipart(boundary, xhr.response);
      statement = JSON.parse(parsedResponse[0].body);
      for (i = 1; i < parsedResponse.length; i += 1) {
        attachmentMap[parsedResponse[i].headers["X-Experience-API-Hash"]] =
          parsedResponse[i].body;
      }
      this._assignAttachmentContent([statement], attachmentMap);
      return new TinCan.Statement(statement);
    },
    sendRequest: function (cfg) {
      this.log("sendRequest");
      var fullUrl = this.endpoint + cfg.url,
        headers = {},
        prop;
      if (cfg.url.indexOf("http") === 0) {
        fullUrl = cfg.url;
      }
      if (this.extended !== null) {
        cfg.params = cfg.params || {};
        for (prop in this.extended) {
          if (this.extended.hasOwnProperty(prop)) {
            if (!cfg.params.hasOwnProperty(prop)) {
              if (this.extended[prop] !== null) {
                cfg.params[prop] = this.extended[prop];
              }
            }
          }
        }
      }
      headers.Authorization = this.auth;
      if (this.version !== "0.9") {
        headers["X-Experience-API-Version"] = this.version;
      }
      for (prop in cfg.headers) {
        if (cfg.headers.hasOwnProperty(prop)) {
          headers[prop] = cfg.headers[prop];
        }
      }
      return this._makeRequest(fullUrl, headers, cfg);
    },
    about: function (cfg) {
      this.log("about");
      var requestCfg, requestResult, callbackWrapper;
      cfg = cfg || {};
      requestCfg = { url: "about", method: "GET", params: {} };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            result = TinCan.About.fromJSON(xhr.responseText);
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (callbackWrapper) {
        return;
      }
      if (requestResult.err === null) {
        requestResult.xhr = TinCan.About.fromJSON(
          requestResult.xhr.responseText
        );
      }
      return requestResult;
    },
    saveStatement: function (stmt, cfg) {
      this.log("saveStatement");
      var requestCfg = { url: "statements", headers: {} },
        versionedStatement,
        requestAttachments = [],
        boundary,
        i;
      cfg = cfg || {};
      try {
        versionedStatement = stmt.asVersion(this.version);
      } catch (ex) {
        if (this.allowFail) {
          this.log(
            "[warning] statement could not be serialized in version (" +
              this.version +
              "): " +
              ex
          );
          if (typeof cfg.callback !== "undefined") {
            cfg.callback(null, null);
            return;
          }
          return { err: null, xhr: null };
        }
        this.log(
          "[error] statement could not be serialized in version (" +
            this.version +
            "): " +
            ex
        );
        if (typeof cfg.callback !== "undefined") {
          cfg.callback(ex, null);
          return;
        }
        return { err: ex, xhr: null };
      }
      if (
        versionedStatement.hasOwnProperty("attachments") &&
        stmt.hasAttachmentWithContent()
      ) {
        boundary = this._getBoundary();
        requestCfg.headers["Content-Type"] =
          "multipart/mixed; boundary=" + boundary;
        for (i = 0; i < stmt.attachments.length; i += 1) {
          if (stmt.attachments[i].content !== null) {
            requestAttachments.push(stmt.attachments[i]);
          }
        }
        try {
          requestCfg.data = this._getMultipartRequestData(
            boundary,
            versionedStatement,
            requestAttachments
          );
        } catch (ex) {
          if (this.allowFail) {
            this.log(
              "[warning] multipart request data could not be created (attachments probably not supported): " +
                ex
            );
            if (typeof cfg.callback !== "undefined") {
              cfg.callback(null, null);
              return;
            }
            return { err: null, xhr: null };
          }
          this.log(
            "[error] multipart request data could not be created (attachments probably not supported): " +
              ex
          );
          if (typeof cfg.callback !== "undefined") {
            cfg.callback(ex, null);
            return;
          }
          return { err: ex, xhr: null };
        }
      } else {
        requestCfg.headers["Content-Type"] = "application/json";
        requestCfg.data = JSON.stringify(versionedStatement);
      }
      if (stmt.id !== null) {
        requestCfg.method = "PUT";
        requestCfg.params = { statementId: stmt.id };
      } else {
        requestCfg.method = "POST";
      }
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      return this.sendRequest(requestCfg);
    },
    retrieveStatement: function (stmtId, cfg) {
      this.log("retrieveStatement");
      var requestCfg,
        requestResult,
        callbackWrapper,
        lrs = this;
      cfg = cfg || {};
      cfg.params = cfg.params || {};
      requestCfg = {
        url: "statements",
        method: "GET",
        params: { statementId: stmtId },
      };
      if (cfg.params.attachments) {
        requestCfg.params.attachments = true;
        requestCfg.expectMultipart = true;
      }
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            result = lrs._processGetStatementResult(xhr, cfg.params);
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.statement = null;
        if (requestResult.err === null) {
          requestResult.statement = lrs._processGetStatementResult(
            requestResult.xhr,
            cfg.params
          );
        }
      }
      return requestResult;
    },
    retrieveVoidedStatement: function (stmtId, cfg) {
      this.log("retrieveVoidedStatement");
      var requestCfg,
        requestResult,
        callbackWrapper,
        lrs = this;
      cfg = cfg || {};
      cfg.params = cfg.params || {};
      requestCfg = { url: "statements", method: "GET", params: {} };
      if (this.version === "0.9" || this.version === "0.95") {
        requestCfg.params.statementId = stmtId;
      } else {
        requestCfg.params.voidedStatementId = stmtId;
        if (cfg.params.attachments) {
          requestCfg.params.attachments = true;
          requestCfg.expectMultipart = true;
        }
      }
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            result = lrs._processGetStatementResult(xhr, cfg.params);
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.statement = null;
        if (requestResult.err === null) {
          requestResult.statement = lrs._processGetStatementResult(
            requestResult.xhr,
            cfg.params
          );
        }
      }
      return requestResult;
    },
    saveStatements: function (stmts, cfg) {
      this.log("saveStatements");
      var requestCfg = { url: "statements", method: "POST", headers: {} },
        versionedStatement,
        versionedStatements = [],
        requestAttachments = [],
        boundary,
        i,
        j;
      cfg = cfg || {};
      if (stmts.length === 0) {
        if (typeof cfg.callback !== "undefined") {
          cfg.callback(new Error("no statements"), null);
          return;
        }
        return { err: new Error("no statements"), xhr: null };
      }
      for (i = 0; i < stmts.length; i += 1) {
        try {
          versionedStatement = stmts[i].asVersion(this.version);
        } catch (ex) {
          if (this.allowFail) {
            this.log(
              "[warning] statement could not be serialized in version (" +
                this.version +
                "): " +
                ex
            );
            if (typeof cfg.callback !== "undefined") {
              cfg.callback(null, null);
              return;
            }
            return { err: null, xhr: null };
          }
          this.log(
            "[error] statement could not be serialized in version (" +
              this.version +
              "): " +
              ex
          );
          if (typeof cfg.callback !== "undefined") {
            cfg.callback(ex, null);
            return;
          }
          return { err: ex, xhr: null };
        }
        if (stmts[i].hasAttachmentWithContent()) {
          for (j = 0; j < stmts[i].attachments.length; j += 1) {
            if (stmts[i].attachments[j].content !== null) {
              requestAttachments.push(stmts[i].attachments[j]);
            }
          }
        }
        versionedStatements.push(versionedStatement);
      }
      if (requestAttachments.length !== 0) {
        boundary = this._getBoundary();
        requestCfg.headers["Content-Type"] =
          "multipart/mixed; boundary=" + boundary;
        try {
          requestCfg.data = this._getMultipartRequestData(
            boundary,
            versionedStatements,
            requestAttachments
          );
        } catch (ex) {
          if (this.allowFail) {
            this.log(
              "[warning] multipart request data could not be created (attachments probably not supported): " +
                ex
            );
            if (typeof cfg.callback !== "undefined") {
              cfg.callback(null, null);
              return;
            }
            return { err: null, xhr: null };
          }
          this.log(
            "[error] multipart request data could not be created (attachments probably not supported): " +
              ex
          );
          if (typeof cfg.callback !== "undefined") {
            cfg.callback(ex, null);
            return;
          }
          return { err: ex, xhr: null };
        }
      } else {
        requestCfg.headers["Content-Type"] = "application/json";
        requestCfg.data = JSON.stringify(versionedStatements);
      }
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      return this.sendRequest(requestCfg);
    },
    queryStatements: function (cfg) {
      this.log("queryStatements");
      var requestCfg,
        requestResult,
        callbackWrapper,
        lrs = this;
      cfg = cfg || {};
      cfg.params = cfg.params || {};
      try {
        requestCfg = this._queryStatementsRequestCfg(cfg);
        if (cfg.params.attachments) {
          requestCfg.expectMultipart = true;
        }
      } catch (ex) {
        this.log("[error] Query statements failed - " + ex);
        if (typeof cfg.callback !== "undefined") {
          cfg.callback(ex, {});
        }
        return { err: ex, statementsResult: null };
      }
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr,
            parsedResponse,
            boundary,
            statements,
            attachmentMap = {},
            i;
          if (err === null) {
            if (!cfg.params.attachments) {
              result = TinCan.StatementsResult.fromJSON(xhr.responseText);
            } else {
              boundary = xhr
                .getResponseHeader("Content-Type")
                .split("boundary=")[1];
              parsedResponse = lrs._parseMultipart(boundary, xhr.response);
              statements = JSON.parse(parsedResponse[0].body);
              for (i = 1; i < parsedResponse.length; i += 1) {
                attachmentMap[
                  parsedResponse[i].headers["X-Experience-API-Hash"]
                ] = parsedResponse[i].body;
              }
              lrs._assignAttachmentContent(
                statements.statements,
                attachmentMap
              );
              result = new TinCan.StatementsResult({
                statements: statements.statements,
              });
              for (i = 0; i < result.statements.length; i += 1) {
                if (!(result.statements[i] instanceof TinCan.Statement)) {
                  result.statements[i] = new TinCan.Statement(
                    result.statements[i]
                  );
                }
              }
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      requestResult.config = requestCfg;
      if (!callbackWrapper) {
        requestResult.statementsResult = null;
        if (requestResult.err === null) {
          requestResult.statementsResult = TinCan.StatementsResult.fromJSON(
            requestResult.xhr.responseText
          );
        }
      }
      return requestResult;
    },
    _queryStatementsRequestCfg: function (cfg) {
      this.log("_queryStatementsRequestCfg");
      var params = {},
        returnCfg = { url: "statements", method: "GET", params: params },
        jsonProps = ["agent", "actor", "object", "instructor"],
        idProps = ["verb", "activity"],
        valProps = [
          "registration",
          "context",
          "since",
          "until",
          "limit",
          "authoritative",
          "sparse",
          "ascending",
          "related_activities",
          "related_agents",
          "format",
          "attachments",
        ],
        i,
        prop,
        universal = {
          verb: true,
          registration: true,
          since: true,
          until: true,
          limit: true,
          ascending: true,
        },
        compatibility = {
          0.9: {
            supported: {
              actor: true,
              instructor: true,
              target: true,
              object: true,
              context: true,
              authoritative: true,
              sparse: true,
            },
          },
          "1.0.0": {
            supported: {
              agent: true,
              activity: true,
              related_activities: true,
              related_agents: true,
              format: true,
              attachments: true,
            },
          },
        };
      compatibility["0.95"] = compatibility["0.9"];
      compatibility["1.0.1"] = compatibility["1.0.0"];
      compatibility["1.0.2"] = compatibility["1.0.0"];
      if (cfg.params.hasOwnProperty("target")) {
        cfg.params.object = cfg.params.target;
      }
      for (prop in cfg.params) {
        if (cfg.params.hasOwnProperty(prop)) {
          if (
            typeof universal[prop] === "undefined" &&
            typeof compatibility[this.version].supported[prop] === "undefined"
          ) {
            throw "Unrecognized query parameter configured: " + prop;
          }
        }
      }
      for (i = 0; i < jsonProps.length; i += 1) {
        if (typeof cfg.params[jsonProps[i]] !== "undefined") {
          params[jsonProps[i]] = JSON.stringify(
            cfg.params[jsonProps[i]].asVersion(this.version)
          );
        }
      }
      for (i = 0; i < idProps.length; i += 1) {
        if (typeof cfg.params[idProps[i]] !== "undefined") {
          if (typeof cfg.params[idProps[i]].id === "undefined") {
            params[idProps[i]] = cfg.params[idProps[i]];
          } else {
            params[idProps[i]] = cfg.params[idProps[i]].id;
          }
        }
      }
      for (i = 0; i < valProps.length; i += 1) {
        if (
          typeof cfg.params[valProps[i]] !== "undefined" &&
          cfg.params[valProps[i]] !== null
        ) {
          params[valProps[i]] = cfg.params[valProps[i]];
        }
      }
      return returnCfg;
    },
    _assignAttachmentContent: function (stmts, attachmentMap) {
      var i, j;
      for (i = 0; i < stmts.length; i += 1) {
        if (
          stmts[i].hasOwnProperty("attachments") &&
          stmts[i].attachments !== null
        ) {
          for (j = 0; j < stmts[i].attachments.length; j += 1) {
            if (attachmentMap.hasOwnProperty(stmts[i].attachments[j].sha2)) {
              stmts[i].attachments[j].content =
                attachmentMap[stmts[i].attachments[j].sha2];
            }
          }
        }
      }
    },
    _parseMultipart: function (boundary, response) {
      var __boundary = "--" + boundary,
        byteArray,
        bodyEncodedInString,
        fullBodyEnd,
        sliceStart,
        sliceEnd,
        headerStart,
        headerEnd,
        bodyStart,
        bodyEnd,
        headers,
        body,
        parts = [],
        CRLF = 2;
      byteArray = new Uint8Array(response);
      bodyEncodedInString = this.__uint8ToString(byteArray);
      fullBodyEnd = bodyEncodedInString.indexOf(__boundary + "--");
      sliceStart = bodyEncodedInString.indexOf(__boundary);
      while (sliceStart !== -1) {
        sliceEnd = bodyEncodedInString.indexOf(
          __boundary,
          sliceStart + __boundary.length
        );
        headerStart = sliceStart + __boundary.length + CRLF;
        headerEnd = bodyEncodedInString.indexOf("\r\n\r\n", sliceStart);
        bodyStart = headerEnd + CRLF + CRLF;
        bodyEnd = sliceEnd - 2;
        headers = this._parseHeaders(
          this.__uint8ToString(
            new Uint8Array(response.slice(headerStart, headerEnd))
          )
        );
        body = response.slice(bodyStart, bodyEnd);
        if (parts.length === 0) {
          body = TinCan.Utils.stringFromArrayBuffer(body);
        }
        parts.push({ headers: headers, body: body });
        if (sliceEnd === fullBodyEnd) {
          sliceStart = -1;
        } else {
          sliceStart = sliceEnd;
        }
      }
      return parts;
    },
    __uint8ToString: function (byteArray) {
      var result = "",
        len = byteArray.byteLength,
        i;
      for (i = 0; i < len; i += 1) {
        result += String.fromCharCode(byteArray[i]);
      }
      return result;
    },
    _parseHeaders: function (rawHeaders) {
      var headers = {},
        headerList,
        key,
        h,
        i;
      headerList = rawHeaders.split("\n");
      for (i = 0; i < headerList.length; i += 1) {
        h = headerList[i].split(":", 2);
        if (h[1] !== null) {
          headers[h[0]] = h[1].replace(/^\s+|\s+$/g, "");
          key = h[0];
        } else {
          if (h[0].substring(0, 1) === "\t") {
            headers[h[0]] = h[1].replace(/^\s+|\s+$/g, "");
          }
        }
      }
      return headers;
    },
    moreStatements: function (cfg) {
      this.log("moreStatements: " + cfg.url);
      var requestCfg, requestResult, callbackWrapper, parsedURL, serverRoot;
      cfg = cfg || {};
      parsedURL = TinCan.Utils.parseURL(cfg.url, { allowRelative: true });
      serverRoot = TinCan.Utils.getServerRoot(this.endpoint);
      if (parsedURL.path.indexOf("/statements") === 0) {
        parsedURL.path = this.endpoint.replace(serverRoot, "") + parsedURL.path;
        this.log("converting non-standard more URL to " + parsedURL.path);
      }
      if (parsedURL.path.indexOf("/") !== 0) {
        parsedURL.path = "/" + parsedURL.path;
      }
      requestCfg = {
        method: "GET",
        url: serverRoot + parsedURL.path,
        params: parsedURL.params,
      };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            result = TinCan.StatementsResult.fromJSON(xhr.responseText);
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      requestResult.config = requestCfg;
      if (!callbackWrapper) {
        requestResult.statementsResult = null;
        if (requestResult.err === null) {
          requestResult.statementsResult = TinCan.StatementsResult.fromJSON(
            requestResult.xhr.responseText
          );
        }
      }
      return requestResult;
    },
    retrieveState: function (key, cfg) {
      this.log("retrieveState");
      var requestParams = {},
        requestCfg = {},
        requestResult,
        callbackWrapper,
        requestHeaders,
        self = this;
      requestHeaders = cfg.requestHeaders || {};
      requestParams = { stateId: key, activityId: cfg.activity.id };
      if (this.version === "0.9") {
        requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
      } else {
        requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
      }
      if (
        typeof cfg.registration !== "undefined" &&
        cfg.registration !== null
      ) {
        if (this.version === "0.9") {
          requestParams.registrationId = cfg.registration;
        } else {
          requestParams.registration = cfg.registration;
        }
      }
      requestCfg = {
        url: "activities/state",
        method: "GET",
        params: requestParams,
        ignore404: true,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            if (xhr.status === 404) {
              result = null;
            } else {
              result = new TinCan.State({
                id: key,
                contents: xhr.responseText,
              });
              if (
                typeof xhr.getResponseHeader !== "undefined" &&
                xhr.getResponseHeader("ETag") !== null &&
                xhr.getResponseHeader("ETag") !== ""
              ) {
                result.etag = xhr.getResponseHeader("ETag");
              } else {
                result.etag =
                  '"' + TinCan.Utils.getSHA1String(xhr.responseText) + '"';
              }
              if (typeof xhr.contentType !== "undefined") {
                result.contentType = xhr.contentType;
              } else if (
                typeof xhr.getResponseHeader !== "undefined" &&
                xhr.getResponseHeader("Content-Type") !== null &&
                xhr.getResponseHeader("Content-Type") !== ""
              ) {
                result.contentType = xhr.getResponseHeader("Content-Type");
              }
              if (TinCan.Utils.isApplicationJSON(result.contentType)) {
                try {
                  result.contents = JSON.parse(result.contents);
                } catch (ex) {
                  self.log("retrieveState - failed to deserialize JSON: " + ex);
                }
              }
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.state = null;
        if (requestResult.err === null && requestResult.xhr.status !== 404) {
          requestResult.state = new TinCan.State({
            id: key,
            contents: requestResult.xhr.responseText,
          });
          if (
            typeof requestResult.xhr.getResponseHeader !== "undefined" &&
            requestResult.xhr.getResponseHeader("ETag") !== null &&
            requestResult.xhr.getResponseHeader("ETag") !== ""
          ) {
            requestResult.state.etag =
              requestResult.xhr.getResponseHeader("ETag");
          } else {
            requestResult.state.etag =
              '"' +
              TinCan.Utils.getSHA1String(requestResult.xhr.responseText) +
              '"';
          }
          if (typeof requestResult.xhr.contentType !== "undefined") {
            requestResult.state.contentType = requestResult.xhr.contentType;
          } else if (
            typeof requestResult.xhr.getResponseHeader !== "undefined" &&
            requestResult.xhr.getResponseHeader("Content-Type") !== null &&
            requestResult.xhr.getResponseHeader("Content-Type") !== ""
          ) {
            requestResult.state.contentType =
              requestResult.xhr.getResponseHeader("Content-Type");
          }
          if (TinCan.Utils.isApplicationJSON(requestResult.state.contentType)) {
            try {
              requestResult.state.contents = JSON.parse(
                requestResult.state.contents
              );
            } catch (ex) {
              this.log("retrieveState - failed to deserialize JSON: " + ex);
            }
          }
        }
      }
      return requestResult;
    },
    retrieveStateIds: function (cfg) {
      this.log("retrieveStateIds");
      var requestParams = {},
        requestCfg,
        requestHeaders,
        requestResult,
        callbackWrapper;
      cfg = cfg || {};
      requestHeaders = cfg.requestHeaders || {};
      requestParams.activityId = cfg.activity.id;
      if (this.version === "0.9") {
        requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
      } else {
        requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
      }
      if (
        typeof cfg.registration !== "undefined" &&
        cfg.registration !== null
      ) {
        if (this.version === "0.9") {
          requestParams.registrationId = cfg.registration;
        } else {
          requestParams.registration = cfg.registration;
        }
      }
      requestCfg = {
        url: "activities/state",
        method: "GET",
        params: requestParams,
        headers: requestHeaders,
        ignore404: true,
      };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err !== null) {
            cfg.callback(err, result);
            return;
          }
          if (xhr.status === 404) {
            result = [];
          } else {
            try {
              result = JSON.parse(xhr.responseText);
            } catch (ex) {
              err = "Response JSON parse error: " + ex;
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      if (typeof cfg.since !== "undefined") {
        requestCfg.params.since = cfg.since;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.profileIds = null;
        if (requestResult.err !== null) {
          return requestResult;
        }
        if (requestResult.xhr.status === 404) {
          requestResult.profileIds = [];
        } else {
          try {
            requestResult.profileIds = JSON.parse(
              requestResult.xhr.responseText
            );
          } catch (ex) {
            requestResult.err = "retrieveStateIds - JSON parse error: " + ex;
          }
        }
      }
      return requestResult;
    },
    saveState: function (key, val, cfg) {
      this.log("saveState");
      var requestParams, requestCfg, requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      if (typeof cfg.contentType === "undefined") {
        cfg.contentType = "application/octet-stream";
      }
      requestHeaders["Content-Type"] = cfg.contentType;
      if (
        typeof val === "object" &&
        TinCan.Utils.isApplicationJSON(cfg.contentType)
      ) {
        val = JSON.stringify(val);
      }
      if (typeof cfg.method === "undefined" || cfg.method !== "POST") {
        cfg.method = "PUT";
      }
      requestParams = { stateId: key, activityId: cfg.activity.id };
      if (this.version === "0.9") {
        requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
      } else {
        requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
      }
      if (
        typeof cfg.registration !== "undefined" &&
        cfg.registration !== null
      ) {
        if (this.version === "0.9") {
          requestParams.registrationId = cfg.registration;
        } else {
          requestParams.registration = cfg.registration;
        }
      }
      requestCfg = {
        url: "activities/state",
        method: cfg.method,
        params: requestParams,
        data: val,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      if (typeof cfg.lastSHA1 !== "undefined" && cfg.lastSHA1 !== null) {
        requestCfg.headers["If-Match"] = cfg.lastSHA1;
      }
      return this.sendRequest(requestCfg);
    },
    dropState: function (key, cfg) {
      this.log("dropState");
      var requestParams, requestCfg, requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      requestParams = { activityId: cfg.activity.id };
      if (this.version === "0.9") {
        requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
      } else {
        requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
      }
      if (key !== null) {
        requestParams.stateId = key;
      }
      if (
        typeof cfg.registration !== "undefined" &&
        cfg.registration !== null
      ) {
        if (this.version === "0.9") {
          requestParams.registrationId = cfg.registration;
        } else {
          requestParams.registration = cfg.registration;
        }
      }
      requestCfg = {
        url: "activities/state",
        method: "DELETE",
        params: requestParams,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      return this.sendRequest(requestCfg);
    },
    retrieveActivity: function (activityId, cfg) {
      this.log("retrieveActivity");
      var requestCfg = {},
        requestResult,
        callbackWrapper,
        requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      requestCfg = {
        url: "activities",
        method: "GET",
        params: { activityId: activityId },
        ignore404: true,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            if (xhr.status === 404) {
              result = new TinCan.Activity({ id: activityId });
            } else {
              result = TinCan.Activity.fromJSON(xhr.responseText);
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.activity = null;
        if (requestResult.err === null) {
          if (requestResult.xhr.status === 404) {
            requestResult.activity = new TinCan.Activity({ id: activityId });
          } else {
            requestResult.activity = TinCan.Activity.fromJSON(
              requestResult.xhr.responseText
            );
          }
        }
      }
      return requestResult;
    },
    retrieveActivityProfile: function (key, cfg) {
      this.log("retrieveActivityProfile");
      var requestCfg = {},
        requestResult,
        callbackWrapper,
        requestHeaders,
        self = this;
      requestHeaders = cfg.requestHeaders || {};
      requestCfg = {
        url: "activities/profile",
        method: "GET",
        params: { profileId: key, activityId: cfg.activity.id },
        ignore404: true,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            if (xhr.status === 404) {
              result = null;
            } else {
              result = new TinCan.ActivityProfile({
                id: key,
                activity: cfg.activity,
                contents: xhr.responseText,
              });
              if (
                typeof xhr.getResponseHeader !== "undefined" &&
                xhr.getResponseHeader("ETag") !== null &&
                xhr.getResponseHeader("ETag") !== ""
              ) {
                result.etag = xhr.getResponseHeader("ETag");
              } else {
                result.etag =
                  '"' + TinCan.Utils.getSHA1String(xhr.responseText) + '"';
              }
              if (typeof xhr.contentType !== "undefined") {
                result.contentType = xhr.contentType;
              } else if (
                typeof xhr.getResponseHeader !== "undefined" &&
                xhr.getResponseHeader("Content-Type") !== null &&
                xhr.getResponseHeader("Content-Type") !== ""
              ) {
                result.contentType = xhr.getResponseHeader("Content-Type");
              }
              if (TinCan.Utils.isApplicationJSON(result.contentType)) {
                try {
                  result.contents = JSON.parse(result.contents);
                } catch (ex) {
                  self.log(
                    "retrieveActivityProfile - failed to deserialize JSON: " +
                      ex
                  );
                }
              }
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.profile = null;
        if (requestResult.err === null && requestResult.xhr.status !== 404) {
          requestResult.profile = new TinCan.ActivityProfile({
            id: key,
            activity: cfg.activity,
            contents: requestResult.xhr.responseText,
          });
          if (
            typeof requestResult.xhr.getResponseHeader !== "undefined" &&
            requestResult.xhr.getResponseHeader("ETag") !== null &&
            requestResult.xhr.getResponseHeader("ETag") !== ""
          ) {
            requestResult.profile.etag =
              requestResult.xhr.getResponseHeader("ETag");
          } else {
            requestResult.profile.etag =
              '"' +
              TinCan.Utils.getSHA1String(requestResult.xhr.responseText) +
              '"';
          }
          if (typeof requestResult.xhr.contentType !== "undefined") {
            requestResult.profile.contentType = requestResult.xhr.contentType;
          } else if (
            typeof requestResult.xhr.getResponseHeader !== "undefined" &&
            requestResult.xhr.getResponseHeader("Content-Type") !== null &&
            requestResult.xhr.getResponseHeader("Content-Type") !== ""
          ) {
            requestResult.profile.contentType =
              requestResult.xhr.getResponseHeader("Content-Type");
          }
          if (
            TinCan.Utils.isApplicationJSON(requestResult.profile.contentType)
          ) {
            try {
              requestResult.profile.contents = JSON.parse(
                requestResult.profile.contents
              );
            } catch (ex) {
              this.log(
                "retrieveActivityProfile - failed to deserialize JSON: " + ex
              );
            }
          }
        }
      }
      return requestResult;
    },
    retrieveActivityProfileIds: function (cfg) {
      this.log("retrieveActivityProfileIds");
      var requestCfg, requestHeaders, requestResult, callbackWrapper;
      cfg = cfg || {};
      requestHeaders = cfg.requestHeaders || {};
      requestCfg = {
        url: "activities/profile",
        method: "GET",
        params: { activityId: cfg.activity.id },
        headers: requestHeaders,
        ignore404: true,
      };
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err !== null) {
            cfg.callback(err, result);
            return;
          }
          if (xhr.status === 404) {
            result = [];
          } else {
            try {
              result = JSON.parse(xhr.responseText);
            } catch (ex) {
              err = "Response JSON parse error: " + ex;
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      if (typeof cfg.since !== "undefined") {
        requestCfg.params.since = cfg.since;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.profileIds = null;
        if (requestResult.err !== null) {
          return requestResult;
        }
        if (requestResult.xhr.status === 404) {
          requestResult.profileIds = [];
        } else {
          try {
            requestResult.profileIds = JSON.parse(
              requestResult.xhr.responseText
            );
          } catch (ex) {
            requestResult.err =
              "retrieveActivityProfileIds - JSON parse error: " + ex;
          }
        }
      }
      return requestResult;
    },
    saveActivityProfile: function (key, val, cfg) {
      this.log("saveActivityProfile");
      var requestCfg, requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      if (typeof cfg.contentType === "undefined") {
        cfg.contentType = "application/octet-stream";
      }
      requestHeaders["Content-Type"] = cfg.contentType;
      if (typeof cfg.method === "undefined" || cfg.method !== "POST") {
        cfg.method = "PUT";
      }
      if (
        typeof val === "object" &&
        TinCan.Utils.isApplicationJSON(cfg.contentType)
      ) {
        val = JSON.stringify(val);
      }
      requestCfg = {
        url: "activities/profile",
        method: cfg.method,
        params: { profileId: key, activityId: cfg.activity.id },
        data: val,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      if (typeof cfg.lastSHA1 !== "undefined" && cfg.lastSHA1 !== null) {
        requestCfg.headers["If-Match"] = cfg.lastSHA1;
      } else {
        requestCfg.headers["If-None-Match"] = "*";
      }
      return this.sendRequest(requestCfg);
    },
    dropActivityProfile: function (key, cfg) {
      this.log("dropActivityProfile");
      var requestParams, requestCfg, requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      requestParams = { profileId: key, activityId: cfg.activity.id };
      requestCfg = {
        url: "activities/profile",
        method: "DELETE",
        params: requestParams,
        headers: requestHeaders,
      };
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      return this.sendRequest(requestCfg);
    },
    retrieveAgentProfile: function (key, cfg) {
      this.log("retrieveAgentProfile");
      var requestCfg = {},
        requestResult,
        callbackWrapper,
        requestHeaders,
        self = this;
      requestHeaders = cfg.requestHeaders || {};
      requestCfg = {
        method: "GET",
        params: { profileId: key },
        ignore404: true,
        headers: requestHeaders,
      };
      if (this.version === "0.9") {
        requestCfg.url = "actors/profile";
        requestCfg.params.actor = JSON.stringify(
          cfg.agent.asVersion(this.version)
        );
      } else {
        requestCfg.url = "agents/profile";
        requestCfg.params.agent = JSON.stringify(
          cfg.agent.asVersion(this.version)
        );
      }
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err === null) {
            if (xhr.status === 404) {
              result = null;
            } else {
              result = new TinCan.AgentProfile({
                id: key,
                agent: cfg.agent,
                contents: xhr.responseText,
              });
              if (
                typeof xhr.getResponseHeader !== "undefined" &&
                xhr.getResponseHeader("ETag") !== null &&
                xhr.getResponseHeader("ETag") !== ""
              ) {
                result.etag = xhr.getResponseHeader("ETag");
              } else {
                result.etag =
                  '"' + TinCan.Utils.getSHA1String(xhr.responseText) + '"';
              }
              if (typeof xhr.contentType !== "undefined") {
                result.contentType = xhr.contentType;
              } else if (
                typeof xhr.getResponseHeader !== "undefined" &&
                xhr.getResponseHeader("Content-Type") !== null &&
                xhr.getResponseHeader("Content-Type") !== ""
              ) {
                result.contentType = xhr.getResponseHeader("Content-Type");
              }
              if (TinCan.Utils.isApplicationJSON(result.contentType)) {
                try {
                  result.contents = JSON.parse(result.contents);
                } catch (ex) {
                  self.log(
                    "retrieveAgentProfile - failed to deserialize JSON: " + ex
                  );
                }
              }
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.profile = null;
        if (requestResult.err === null && requestResult.xhr.status !== 404) {
          requestResult.profile = new TinCan.AgentProfile({
            id: key,
            agent: cfg.agent,
            contents: requestResult.xhr.responseText,
          });
          if (
            typeof requestResult.xhr.getResponseHeader !== "undefined" &&
            requestResult.xhr.getResponseHeader("ETag") !== null &&
            requestResult.xhr.getResponseHeader("ETag") !== ""
          ) {
            requestResult.profile.etag =
              requestResult.xhr.getResponseHeader("ETag");
          } else {
            requestResult.profile.etag =
              '"' +
              TinCan.Utils.getSHA1String(requestResult.xhr.responseText) +
              '"';
          }
          if (typeof requestResult.xhr.contentType !== "undefined") {
            requestResult.profile.contentType = requestResult.xhr.contentType;
          } else if (
            typeof requestResult.xhr.getResponseHeader !== "undefined" &&
            requestResult.xhr.getResponseHeader("Content-Type") !== null &&
            requestResult.xhr.getResponseHeader("Content-Type") !== ""
          ) {
            requestResult.profile.contentType =
              requestResult.xhr.getResponseHeader("Content-Type");
          }
          if (
            TinCan.Utils.isApplicationJSON(requestResult.profile.contentType)
          ) {
            try {
              requestResult.profile.contents = JSON.parse(
                requestResult.profile.contents
              );
            } catch (ex) {
              this.log(
                "retrieveAgentProfile - failed to deserialize JSON: " + ex
              );
            }
          }
        }
      }
      return requestResult;
    },
    retrieveAgentProfileIds: function (cfg) {
      this.log("retrieveAgentProfileIds");
      var requestParams = {},
        requestCfg,
        requestHeaders,
        requestResult,
        callbackWrapper;
      cfg = cfg || {};
      requestHeaders = cfg.requestHeaders || {};
      requestCfg = {
        method: "GET",
        params: requestParams,
        headers: requestHeaders,
        ignore404: true,
      };
      if (this.version === "0.9") {
        requestCfg.url = "actors/profile";
        requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
      } else {
        requestCfg.url = "agents/profile";
        requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
      }
      if (typeof cfg.callback !== "undefined") {
        callbackWrapper = function (err, xhr) {
          var result = xhr;
          if (err !== null) {
            cfg.callback(err, result);
            return;
          }
          if (xhr.status === 404) {
            result = [];
          } else {
            try {
              result = JSON.parse(xhr.responseText);
            } catch (ex) {
              err = "Response JSON parse error: " + ex;
            }
          }
          cfg.callback(err, result);
        };
        requestCfg.callback = callbackWrapper;
      }
      if (typeof cfg.since !== "undefined") {
        requestCfg.params.since = cfg.since;
      }
      requestResult = this.sendRequest(requestCfg);
      if (!callbackWrapper) {
        requestResult.profileIds = null;
        if (requestResult.err !== null) {
          return requestResult;
        }
        if (requestResult.xhr.status === 404) {
          requestResult.profileIds = [];
        } else {
          try {
            requestResult.profileIds = JSON.parse(
              requestResult.xhr.responseText
            );
          } catch (ex) {
            requestResult.err =
              "retrieveAgentProfileIds - JSON parse error: " + ex;
          }
        }
      }
      return requestResult;
    },
    saveAgentProfile: function (key, val, cfg) {
      this.log("saveAgentProfile");
      var requestCfg, requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      if (typeof cfg.contentType === "undefined") {
        cfg.contentType = "application/octet-stream";
      }
      requestHeaders["Content-Type"] = cfg.contentType;
      if (typeof cfg.method === "undefined" || cfg.method !== "POST") {
        cfg.method = "PUT";
      }
      if (
        typeof val === "object" &&
        TinCan.Utils.isApplicationJSON(cfg.contentType)
      ) {
        val = JSON.stringify(val);
      }
      requestCfg = {
        method: cfg.method,
        params: { profileId: key },
        data: val,
        headers: requestHeaders,
      };
      if (this.version === "0.9") {
        requestCfg.url = "actors/profile";
        requestCfg.params.actor = JSON.stringify(
          cfg.agent.asVersion(this.version)
        );
      } else {
        requestCfg.url = "agents/profile";
        requestCfg.params.agent = JSON.stringify(
          cfg.agent.asVersion(this.version)
        );
      }
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      if (typeof cfg.lastSHA1 !== "undefined" && cfg.lastSHA1 !== null) {
        requestCfg.headers["If-Match"] = cfg.lastSHA1;
      } else {
        requestCfg.headers["If-None-Match"] = "*";
      }
      return this.sendRequest(requestCfg);
    },
    dropAgentProfile: function (key, cfg) {
      this.log("dropAgentProfile");
      var requestParams, requestCfg, requestHeaders;
      requestHeaders = cfg.requestHeaders || {};
      requestParams = { profileId: key };
      requestCfg = {
        method: "DELETE",
        params: requestParams,
        headers: requestHeaders,
      };
      if (this.version === "0.9") {
        requestCfg.url = "actors/profile";
        requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
      } else {
        requestCfg.url = "agents/profile";
        requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
      }
      if (typeof cfg.callback !== "undefined") {
        requestCfg.callback = cfg.callback;
      }
      return this.sendRequest(requestCfg);
    },
  };
  LRS.syncEnabled = null;
})();
(function () {
  "use strict";
  var AgentAccount = (TinCan.AgentAccount = function (cfg) {
    this.log("constructor");
    this.homePage = null;
    this.name = null;
    this.init(cfg);
  });
  AgentAccount.prototype = {
    LOG_SRC: "AgentAccount",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["name", "homePage"];
      cfg = cfg || {};
      if (typeof cfg.accountServiceHomePage !== "undefined") {
        cfg.homePage = cfg.accountServiceHomePage;
      }
      if (typeof cfg.accountName !== "undefined") {
        cfg.name = cfg.accountName;
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    toString: function () {
      this.log("toString");
      var result = "";
      if (this.name !== null || this.homePage !== null) {
        result += this.name !== null ? this.name : "-";
        result += ":";
        result += this.homePage !== null ? this.homePage : "-";
      } else {
        result = "AgentAccount: unidentified";
      }
      return result;
    },
    asVersion: function (version) {
      this.log("asVersion: " + version);
      var result = {};
      version = version || TinCan.versions()[0];
      if (version === "0.9") {
        result.accountName = this.name;
        result.accountServiceHomePage = this.homePage;
      } else {
        result.name = this.name;
        result.homePage = this.homePage;
      }
      return result;
    },
  };
  AgentAccount.fromJSON = function (acctJSON) {
    AgentAccount.prototype.log("fromJSON");
    var _acct = JSON.parse(acctJSON);
    return new AgentAccount(_acct);
  };
})();
(function () {
  "use strict";
  var Agent = (TinCan.Agent = function (cfg) {
    this.log("constructor");
    this.name = null;
    this.mbox = null;
    this.mbox_sha1sum = null;
    this.openid = null;
    this.account = null;
    this.degraded = false;
    this.init(cfg);
  });
  Agent.prototype = {
    objectType: "Agent",
    LOG_SRC: "Agent",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["name", "mbox", "mbox_sha1sum", "openid"],
        val;
      cfg = cfg || {};
      if (
        typeof cfg.lastName !== "undefined" ||
        typeof cfg.firstName !== "undefined"
      ) {
        cfg.name = "";
        if (typeof cfg.firstName !== "undefined" && cfg.firstName.length > 0) {
          cfg.name = cfg.firstName[0];
          if (cfg.firstName.length > 1) {
            this.degraded = true;
          }
        }
        if (cfg.name !== "") {
          cfg.name += " ";
        }
        if (typeof cfg.lastName !== "undefined" && cfg.lastName.length > 0) {
          cfg.name += cfg.lastName[0];
          if (cfg.lastName.length > 1) {
            this.degraded = true;
          }
        }
      } else if (
        typeof cfg.familyName !== "undefined" ||
        typeof cfg.givenName !== "undefined"
      ) {
        cfg.name = "";
        if (typeof cfg.givenName !== "undefined" && cfg.givenName.length > 0) {
          cfg.name = cfg.givenName[0];
          if (cfg.givenName.length > 1) {
            this.degraded = true;
          }
        }
        if (cfg.name !== "") {
          cfg.name += " ";
        }
        if (
          typeof cfg.familyName !== "undefined" &&
          cfg.familyName.length > 0
        ) {
          cfg.name += cfg.familyName[0];
          if (cfg.familyName.length > 1) {
            this.degraded = true;
          }
        }
      }
      if (typeof cfg.name === "object" && cfg.name !== null) {
        if (cfg.name.length > 1) {
          this.degraded = true;
        }
        cfg.name = cfg.name[0];
      }
      if (typeof cfg.mbox === "object" && cfg.mbox !== null) {
        if (cfg.mbox.length > 1) {
          this.degraded = true;
        }
        cfg.mbox = cfg.mbox[0];
      }
      if (typeof cfg.mbox_sha1sum === "object" && cfg.mbox_sha1sum !== null) {
        if (cfg.mbox_sha1sum.length > 1) {
          this.degraded = true;
        }
        cfg.mbox_sha1sum = cfg.mbox_sha1sum[0];
      }
      if (typeof cfg.openid === "object" && cfg.openid !== null) {
        if (cfg.openid.length > 1) {
          this.degraded = true;
        }
        cfg.openid = cfg.openid[0];
      }
      if (
        typeof cfg.account === "object" &&
        cfg.account !== null &&
        typeof cfg.account.homePage === "undefined" &&
        typeof cfg.account.name === "undefined"
      ) {
        if (cfg.account.length === 0) {
          delete cfg.account;
        } else {
          if (cfg.account.length > 1) {
            this.degraded = true;
          }
          cfg.account = cfg.account[0];
        }
      }
      if (cfg.hasOwnProperty("account")) {
        if (cfg.account instanceof TinCan.AgentAccount) {
          this.account = cfg.account;
        } else {
          this.account = new TinCan.AgentAccount(cfg.account);
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          val = cfg[directProps[i]];
          if (directProps[i] === "mbox" && val.indexOf("mailto:") === -1) {
            val = "mailto:" + val;
          }
          this[directProps[i]] = val;
        }
      }
    },
    toString: function () {
      this.log("toString");
      if (this.name !== null) {
        return this.name;
      }
      if (this.mbox !== null) {
        return this.mbox.replace("mailto:", "");
      }
      if (this.mbox_sha1sum !== null) {
        return this.mbox_sha1sum;
      }
      if (this.openid !== null) {
        return this.openid;
      }
      if (this.account !== null) {
        return this.account.toString();
      }
      return this.objectType + ": unidentified";
    },
    asVersion: function (version) {
      this.log("asVersion: " + version);
      var result = { objectType: this.objectType };
      version = version || TinCan.versions()[0];
      if (version === "0.9") {
        if (this.mbox !== null) {
          result.mbox = [this.mbox];
        } else if (this.mbox_sha1sum !== null) {
          result.mbox_sha1sum = [this.mbox_sha1sum];
        } else if (this.openid !== null) {
          result.openid = [this.openid];
        } else if (this.account !== null) {
          result.account = [this.account.asVersion(version)];
        }
        if (this.name !== null) {
          result.name = [this.name];
        }
      } else {
        if (this.mbox !== null) {
          result.mbox = this.mbox;
        } else if (this.mbox_sha1sum !== null) {
          result.mbox_sha1sum = this.mbox_sha1sum;
        } else if (this.openid !== null) {
          result.openid = this.openid;
        } else if (this.account !== null) {
          result.account = this.account.asVersion(version);
        }
        if (this.name !== null) {
          result.name = this.name;
        }
      }
      return result;
    },
  };
  Agent.fromJSON = function (agentJSON) {
    Agent.prototype.log("fromJSON");
    var _agent = JSON.parse(agentJSON);
    return new Agent(_agent);
  };
})();
(function () {
  "use strict";
  var Group = (TinCan.Group = function (cfg) {
    this.log("constructor");
    this.name = null;
    this.mbox = null;
    this.mbox_sha1sum = null;
    this.openid = null;
    this.account = null;
    this.member = [];
    this.init(cfg);
  });
  Group.prototype = {
    objectType: "Group",
    LOG_SRC: "Group",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i;
      cfg = cfg || {};
      TinCan.Agent.prototype.init.call(this, cfg);
      if (typeof cfg.member !== "undefined") {
        for (i = 0; i < cfg.member.length; i += 1) {
          if (cfg.member[i] instanceof TinCan.Agent) {
            this.member.push(cfg.member[i]);
          } else {
            this.member.push(new TinCan.Agent(cfg.member[i]));
          }
        }
      }
    },
    toString: function (lang) {
      this.log("toString");
      var result = TinCan.Agent.prototype.toString.call(this, lang);
      if (result !== this.objectType + ": unidentified") {
        result = this.objectType + ": " + result;
      }
      return result;
    },
    asVersion: function (version) {
      this.log("asVersion: " + version);
      var result, i;
      version = version || TinCan.versions()[0];
      result = TinCan.Agent.prototype.asVersion.call(this, version);
      if (this.member.length > 0) {
        result.member = [];
        for (i = 0; i < this.member.length; i += 1) {
          result.member.push(this.member[i].asVersion(version));
        }
      }
      return result;
    },
  };
  Group.fromJSON = function (groupJSON) {
    Group.prototype.log("fromJSON");
    var _group = JSON.parse(groupJSON);
    return new Group(_group);
  };
})();
(function () {
  "use strict";
  var _downConvertMap = {
      "http://adlnet.gov/expapi/verbs/experienced": "experienced",
      "http://adlnet.gov/expapi/verbs/attended": "attended",
      "http://adlnet.gov/expapi/verbs/attempted": "attempted",
      "http://adlnet.gov/expapi/verbs/completed": "completed",
      "http://adlnet.gov/expapi/verbs/passed": "passed",
      "http://adlnet.gov/expapi/verbs/failed": "failed",
      "http://adlnet.gov/expapi/verbs/answered": "answered",
      "http://adlnet.gov/expapi/verbs/interacted": "interacted",
      "http://adlnet.gov/expapi/verbs/imported": "imported",
      "http://adlnet.gov/expapi/verbs/created": "created",
      "http://adlnet.gov/expapi/verbs/shared": "shared",
      "http://adlnet.gov/expapi/verbs/voided": "voided",
    },
    Verb = (TinCan.Verb = function (cfg) {
      this.log("constructor");
      this.id = null;
      this.display = null;
      this.init(cfg);
    });
  Verb.prototype = {
    LOG_SRC: "Verb",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id", "display"],
        prop;
      if (typeof cfg === "string") {
        this.id = cfg;
        this.display = { und: this.id };
        for (prop in _downConvertMap) {
          if (
            _downConvertMap.hasOwnProperty(prop) &&
            _downConvertMap[prop] === cfg
          ) {
            this.id = prop;
            break;
          }
        }
      } else {
        cfg = cfg || {};
        for (i = 0; i < directProps.length; i += 1) {
          if (
            cfg.hasOwnProperty(directProps[i]) &&
            cfg[directProps[i]] !== null
          ) {
            this[directProps[i]] = cfg[directProps[i]];
          }
        }
        if (
          this.display === null &&
          typeof _downConvertMap[this.id] !== "undefined"
        ) {
          this.display = { und: _downConvertMap[this.id] };
        }
      }
    },
    toString: function (lang) {
      this.log("toString");
      if (this.display !== null) {
        return this.getLangDictionaryValue("display", lang);
      }
      return this.id;
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result;
      version = version || TinCan.versions()[0];
      if (version === "0.9") {
        result = _downConvertMap[this.id];
      } else {
        result = { id: this.id };
        if (this.display !== null) {
          result.display = this.display;
        }
      }
      return result;
    },
    getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue,
  };
  Verb.fromJSON = function (verbJSON) {
    Verb.prototype.log("fromJSON");
    var _verb = JSON.parse(verbJSON);
    return new Verb(_verb);
  };
})();
(function () {
  "use strict";
  var Result = (TinCan.Result = function (cfg) {
    this.log("constructor");
    this.score = null;
    this.success = null;
    this.completion = null;
    this.duration = null;
    this.response = null;
    this.extensions = null;
    this.init(cfg);
  });
  Result.prototype = {
    LOG_SRC: "Result",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = [
          "completion",
          "duration",
          "extensions",
          "response",
          "success",
        ];
      cfg = cfg || {};
      if (cfg.hasOwnProperty("score") && cfg.score !== null) {
        if (cfg.score instanceof TinCan.Score) {
          this.score = cfg.score;
        } else {
          this.score = new TinCan.Score(cfg.score);
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
      if (this.completion === "Completed") {
        this.completion = true;
      }
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = {},
        optionalDirectProps = ["success", "duration", "response", "extensions"],
        optionalObjProps = ["score"],
        i;
      version = version || TinCan.versions()[0];
      for (i = 0; i < optionalDirectProps.length; i += 1) {
        if (this[optionalDirectProps[i]] !== null) {
          result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
        }
      }
      for (i = 0; i < optionalObjProps.length; i += 1) {
        if (this[optionalObjProps[i]] !== null) {
          result[optionalObjProps[i]] =
            this[optionalObjProps[i]].asVersion(version);
        }
      }
      if (this.completion !== null) {
        if (version === "0.9") {
          if (this.completion) {
            result.completion = "Completed";
          }
        } else {
          result.completion = this.completion;
        }
      }
      return result;
    },
  };
  Result.fromJSON = function (resultJSON) {
    Result.prototype.log("fromJSON");
    var _result = JSON.parse(resultJSON);
    return new Result(_result);
  };
})();
(function () {
  "use strict";
  var Score = (TinCan.Score = function (cfg) {
    this.log("constructor");
    this.scaled = null;
    this.raw = null;
    this.min = null;
    this.max = null;
    this.init(cfg);
  });
  Score.prototype = {
    LOG_SRC: "Score",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["scaled", "raw", "min", "max"];
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = {},
        optionalDirectProps = ["scaled", "raw", "min", "max"],
        i;
      version = version || TinCan.versions()[0];
      for (i = 0; i < optionalDirectProps.length; i += 1) {
        if (this[optionalDirectProps[i]] !== null) {
          result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
        }
      }
      return result;
    },
  };
  Score.fromJSON = function (scoreJSON) {
    Score.prototype.log("fromJSON");
    var _score = JSON.parse(scoreJSON);
    return new Score(_score);
  };
})();
(function () {
  "use strict";
  var InteractionComponent = (TinCan.InteractionComponent = function (cfg) {
    this.log("constructor");
    this.id = null;
    this.description = null;
    this.init(cfg);
  });
  InteractionComponent.prototype = {
    LOG_SRC: "InteractionComponent",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id", "description"];
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = { id: this.id },
        optionalDirectProps = ["description"],
        i,
        prop;
      version = version || TinCan.versions()[0];
      for (i = 0; i < optionalDirectProps.length; i += 1) {
        prop = optionalDirectProps[i];
        if (this[prop] !== null) {
          result[prop] = this[prop];
        }
      }
      return result;
    },
    getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue,
  };
  InteractionComponent.fromJSON = function (icJSON) {
    InteractionComponent.prototype.log("fromJSON");
    var _ic = JSON.parse(icJSON);
    return new InteractionComponent(_ic);
  };
})();
(function () {
  "use strict";
  var _downConvertMap = {
      "http://adlnet.gov/expapi/activities/course": "course",
      "http://adlnet.gov/expapi/activities/module": "module",
      "http://adlnet.gov/expapi/activities/meeting": "meeting",
      "http://adlnet.gov/expapi/activities/media": "media",
      "http://adlnet.gov/expapi/activities/performance": "performance",
      "http://adlnet.gov/expapi/activities/simulation": "simulation",
      "http://adlnet.gov/expapi/activities/assessment": "assessment",
      "http://adlnet.gov/expapi/activities/interaction": "interaction",
      "http://adlnet.gov/expapi/activities/cmi.interaction": "cmi.interaction",
      "http://adlnet.gov/expapi/activities/question": "question",
      "http://adlnet.gov/expapi/activities/objective": "objective",
      "http://adlnet.gov/expapi/activities/link": "link",
    },
    ActivityDefinition = (TinCan.ActivityDefinition = function (cfg) {
      this.log("constructor");
      this.name = null;
      this.description = null;
      this.type = null;
      this.moreInfo = null;
      this.extensions = null;
      this.interactionType = null;
      this.correctResponsesPattern = null;
      this.choices = null;
      this.scale = null;
      this.source = null;
      this.target = null;
      this.steps = null;
      this.init(cfg);
    });
  ActivityDefinition.prototype = {
    LOG_SRC: "ActivityDefinition",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        j,
        prop,
        directProps = [
          "name",
          "description",
          "moreInfo",
          "extensions",
          "correctResponsesPattern",
        ],
        interactionComponentProps = [];
      cfg = cfg || {};
      if (cfg.hasOwnProperty("type") && cfg.type !== null) {
        for (prop in _downConvertMap) {
          if (
            _downConvertMap.hasOwnProperty(prop) &&
            _downConvertMap[prop] === cfg.type
          ) {
            cfg.type = _downConvertMap[prop];
          }
        }
        this.type = cfg.type;
      }
      if (
        cfg.hasOwnProperty("interactionType") &&
        cfg.interactionType !== null
      ) {
        this.interactionType = cfg.interactionType;
        if (
          cfg.interactionType === "choice" ||
          cfg.interactionType === "sequencing"
        ) {
          interactionComponentProps.push("choices");
        } else if (cfg.interactionType === "likert") {
          interactionComponentProps.push("scale");
        } else if (cfg.interactionType === "matching") {
          interactionComponentProps.push("source");
          interactionComponentProps.push("target");
        } else if (cfg.interactionType === "performance") {
          interactionComponentProps.push("steps");
        }
        if (interactionComponentProps.length > 0) {
          for (i = 0; i < interactionComponentProps.length; i += 1) {
            prop = interactionComponentProps[i];
            if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
              this[prop] = [];
              for (j = 0; j < cfg[prop].length; j += 1) {
                if (cfg[prop][j] instanceof TinCan.InteractionComponent) {
                  this[prop].push(cfg[prop][j]);
                } else {
                  this[prop].push(
                    new TinCan.InteractionComponent(cfg[prop][j])
                  );
                }
              }
            }
          }
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    toString: function (lang) {
      this.log("toString");
      if (this.name !== null) {
        return this.getLangDictionaryValue("name", lang);
      }
      if (this.description !== null) {
        return this.getLangDictionaryValue("description", lang);
      }
      return "";
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = {},
        directProps = [
          "name",
          "description",
          "interactionType",
          "correctResponsesPattern",
          "extensions",
        ],
        interactionComponentProps = [
          "choices",
          "scale",
          "source",
          "target",
          "steps",
        ],
        i,
        j,
        prop;
      version = version || TinCan.versions()[0];
      if (this.type !== null) {
        if (version === "0.9") {
          result.type = _downConvertMap[this.type];
        } else {
          result.type = this.type;
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        prop = directProps[i];
        if (this[prop] !== null) {
          result[prop] = this[prop];
        }
      }
      for (i = 0; i < interactionComponentProps.length; i += 1) {
        prop = interactionComponentProps[i];
        if (this[prop] !== null) {
          result[prop] = [];
          for (j = 0; j < this[prop].length; j += 1) {
            result[prop].push(this[prop][j].asVersion(version));
          }
        }
      }
      if (version.indexOf("0.9") !== 0) {
        if (this.moreInfo !== null) {
          result.moreInfo = this.moreInfo;
        }
      }
      return result;
    },
    getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue,
  };
  ActivityDefinition.fromJSON = function (definitionJSON) {
    ActivityDefinition.prototype.log("fromJSON");
    var _definition = JSON.parse(definitionJSON);
    return new ActivityDefinition(_definition);
  };
})();
(function () {
  "use strict";
  var Activity = (TinCan.Activity = function (cfg) {
    this.log("constructor");
    this.objectType = "Activity";
    this.id = null;
    this.definition = null;
    this.init(cfg);
  });
  Activity.prototype = {
    LOG_SRC: "Activity",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id"];
      cfg = cfg || {};
      if (cfg.hasOwnProperty("definition")) {
        if (cfg.definition instanceof TinCan.ActivityDefinition) {
          this.definition = cfg.definition;
        } else {
          this.definition = new TinCan.ActivityDefinition(cfg.definition);
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    toString: function (lang) {
      this.log("toString");
      var defString = "";
      if (this.definition !== null) {
        defString = this.definition.toString(lang);
        if (defString !== "") {
          return defString;
        }
      }
      if (this.id !== null) {
        return this.id;
      }
      return "Activity: unidentified";
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = { id: this.id, objectType: this.objectType };
      version = version || TinCan.versions()[0];
      if (this.definition !== null) {
        result.definition = this.definition.asVersion(version);
      }
      return result;
    },
  };
  Activity.fromJSON = function (activityJSON) {
    Activity.prototype.log("fromJSON");
    var _activity = JSON.parse(activityJSON);
    return new Activity(_activity);
  };
})();
(function () {
  "use strict";
  var ContextActivities = (TinCan.ContextActivities = function (cfg) {
    this.log("constructor");
    this.category = null;
    this.parent = null;
    this.grouping = null;
    this.other = null;
    this.init(cfg);
  });
  ContextActivities.prototype = {
    LOG_SRC: "ContextActivities",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        j,
        objProps = ["category", "parent", "grouping", "other"],
        prop,
        val;
      cfg = cfg || {};
      for (i = 0; i < objProps.length; i += 1) {
        prop = objProps[i];
        if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
          if (Object.prototype.toString.call(cfg[prop]) === "[object Array]") {
            for (j = 0; j < cfg[prop].length; j += 1) {
              this.add(prop, cfg[prop][j]);
            }
          } else {
            val = cfg[prop];
            this.add(prop, val);
          }
        }
      }
    },
    add: function (key, val) {
      if (
        key !== "category" &&
        key !== "parent" &&
        key !== "grouping" &&
        key !== "other"
      ) {
        return;
      }
      if (this[key] === null) {
        this[key] = [];
      }
      if (!(val instanceof TinCan.Activity)) {
        val = typeof val === "string" ? { id: val } : val;
        val = new TinCan.Activity(val);
      }
      this[key].push(val);
      return this[key].length - 1;
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = {},
        optionalObjProps = ["parent", "grouping", "other"],
        i,
        j;
      version = version || TinCan.versions()[0];
      for (i = 0; i < optionalObjProps.length; i += 1) {
        if (
          this[optionalObjProps[i]] !== null &&
          this[optionalObjProps[i]].length > 0
        ) {
          if (version === "0.9" || version === "0.95") {
            if (this[optionalObjProps[i]].length > 1) {
              this.log(
                "[warning] version does not support multiple values in: " +
                  optionalObjProps[i]
              );
            }
            result[optionalObjProps[i]] =
              this[optionalObjProps[i]][0].asVersion(version);
          } else {
            result[optionalObjProps[i]] = [];
            for (j = 0; j < this[optionalObjProps[i]].length; j += 1) {
              result[optionalObjProps[i]].push(
                this[optionalObjProps[i]][j].asVersion(version)
              );
            }
          }
        }
      }
      if (this.category !== null && this.category.length > 0) {
        if (version === "0.9" || version === "0.95") {
          this.log(
            "[error] version does not support the 'category' property: " +
              version
          );
          throw new Error(
            version + " does not support the 'category' property"
          );
        } else {
          result.category = [];
          for (i = 0; i < this.category.length; i += 1) {
            result.category.push(this.category[i].asVersion(version));
          }
        }
      }
      return result;
    },
  };
  ContextActivities.fromJSON = function (contextActivitiesJSON) {
    ContextActivities.prototype.log("fromJSON");
    var _contextActivities = JSON.parse(contextActivitiesJSON);
    return new ContextActivities(_contextActivities);
  };
})();
(function () {
  "use strict";
  var Context = (TinCan.Context = function (cfg) {
    this.log("constructor");
    this.registration = null;
    this.instructor = null;
    this.team = null;
    this.contextActivities = null;
    this.revision = null;
    this.platform = null;
    this.language = null;
    this.statement = null;
    this.extensions = null;
    this.init(cfg);
  });
  Context.prototype = {
    LOG_SRC: "Context",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = [
          "registration",
          "revision",
          "platform",
          "language",
          "extensions",
        ],
        agentGroupProps = ["instructor", "team"],
        prop,
        val;
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        prop = directProps[i];
        if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
          this[prop] = cfg[prop];
        }
      }
      for (i = 0; i < agentGroupProps.length; i += 1) {
        prop = agentGroupProps[i];
        if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
          val = cfg[prop];
          if (
            typeof val.objectType === "undefined" ||
            val.objectType === "Person"
          ) {
            val.objectType = "Agent";
          }
          if (val.objectType === "Agent" && !(val instanceof TinCan.Agent)) {
            val = new TinCan.Agent(val);
          } else if (
            val.objectType === "Group" &&
            !(val instanceof TinCan.Group)
          ) {
            val = new TinCan.Group(val);
          }
          this[prop] = val;
        }
      }
      if (
        cfg.hasOwnProperty("contextActivities") &&
        cfg.contextActivities !== null
      ) {
        if (cfg.contextActivities instanceof TinCan.ContextActivities) {
          this.contextActivities = cfg.contextActivities;
        } else {
          this.contextActivities = new TinCan.ContextActivities(
            cfg.contextActivities
          );
        }
      }
      if (cfg.hasOwnProperty("statement") && cfg.statement !== null) {
        if (cfg.statement instanceof TinCan.StatementRef) {
          this.statement = cfg.statement;
        } else if (cfg.statement instanceof TinCan.SubStatement) {
          this.statement = cfg.statement;
        } else if (cfg.statement.objectType === "StatementRef") {
          this.statement = new TinCan.StatementRef(cfg.statement);
        } else if (cfg.statement.objectType === "SubStatement") {
          this.statement = new TinCan.SubStatement(cfg.statement);
        } else {
          this.log("Unable to parse statement.context.statement property.");
        }
      }
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = {},
        optionalDirectProps = [
          "registration",
          "revision",
          "platform",
          "language",
          "extensions",
        ],
        optionalObjProps = [
          "instructor",
          "team",
          "contextActivities",
          "statement",
        ],
        i;
      version = version || TinCan.versions()[0];
      if (
        this.statement instanceof TinCan.SubStatement &&
        version !== "0.9" &&
        version !== "0.95"
      ) {
        this.log(
          "[error] version does not support SubStatements in the 'statement' property: " +
            version
        );
        throw new Error(
          version +
            " does not support SubStatements in the 'statement' property"
        );
      }
      for (i = 0; i < optionalDirectProps.length; i += 1) {
        if (this[optionalDirectProps[i]] !== null) {
          result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
        }
      }
      for (i = 0; i < optionalObjProps.length; i += 1) {
        if (this[optionalObjProps[i]] !== null) {
          result[optionalObjProps[i]] =
            this[optionalObjProps[i]].asVersion(version);
        }
      }
      return result;
    },
  };
  Context.fromJSON = function (contextJSON) {
    Context.prototype.log("fromJSON");
    var _context = JSON.parse(contextJSON);
    return new Context(_context);
  };
})();
(function () {
  "use strict";
  var StatementRef = (TinCan.StatementRef = function (cfg) {
    this.log("constructor");
    this.id = null;
    this.init(cfg);
  });
  StatementRef.prototype = {
    objectType: "StatementRef",
    LOG_SRC: "StatementRef",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id"];
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    toString: function () {
      this.log("toString");
      return this.id;
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = { objectType: this.objectType, id: this.id };
      if (version === "0.9") {
        result.objectType = "Statement";
      }
      return result;
    },
  };
  StatementRef.fromJSON = function (stRefJSON) {
    StatementRef.prototype.log("fromJSON");
    var _stRef = JSON.parse(stRefJSON);
    return new StatementRef(_stRef);
  };
})();
(function () {
  "use strict";
  var SubStatement = (TinCan.SubStatement = function (cfg) {
    this.log("constructor");
    this.actor = null;
    this.verb = null;
    this.target = null;
    this.result = null;
    this.context = null;
    this.timestamp = null;
    this.init(cfg);
  });
  SubStatement.prototype = {
    objectType: "SubStatement",
    LOG_SRC: "SubStatement",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["timestamp"];
      cfg = cfg || {};
      if (cfg.hasOwnProperty("object")) {
        cfg.target = cfg.object;
      }
      if (cfg.hasOwnProperty("actor")) {
        if (
          typeof cfg.actor.objectType === "undefined" ||
          cfg.actor.objectType === "Person"
        ) {
          cfg.actor.objectType = "Agent";
        }
        if (cfg.actor.objectType === "Agent") {
          if (cfg.actor instanceof TinCan.Agent) {
            this.actor = cfg.actor;
          } else {
            this.actor = new TinCan.Agent(cfg.actor);
          }
        } else if (cfg.actor.objectType === "Group") {
          if (cfg.actor instanceof TinCan.Group) {
            this.actor = cfg.actor;
          } else {
            this.actor = new TinCan.Group(cfg.actor);
          }
        }
      }
      if (cfg.hasOwnProperty("verb")) {
        if (cfg.verb instanceof TinCan.Verb) {
          this.verb = cfg.verb;
        } else {
          this.verb = new TinCan.Verb(cfg.verb);
        }
      }
      if (cfg.hasOwnProperty("target")) {
        if (
          cfg.target instanceof TinCan.Activity ||
          cfg.target instanceof TinCan.Agent ||
          cfg.target instanceof TinCan.Group ||
          cfg.target instanceof TinCan.SubStatement ||
          cfg.target instanceof TinCan.StatementRef
        ) {
          this.target = cfg.target;
        } else {
          if (typeof cfg.target.objectType === "undefined") {
            cfg.target.objectType = "Activity";
          }
          if (cfg.target.objectType === "Activity") {
            this.target = new TinCan.Activity(cfg.target);
          } else if (cfg.target.objectType === "Agent") {
            this.target = new TinCan.Agent(cfg.target);
          } else if (cfg.target.objectType === "Group") {
            this.target = new TinCan.Group(cfg.target);
          } else if (cfg.target.objectType === "SubStatement") {
            this.target = new TinCan.SubStatement(cfg.target);
          } else if (cfg.target.objectType === "StatementRef") {
            this.target = new TinCan.StatementRef(cfg.target);
          } else {
            this.log("Unrecognized target type: " + cfg.target.objectType);
          }
        }
      }
      if (cfg.hasOwnProperty("result")) {
        if (cfg.result instanceof TinCan.Result) {
          this.result = cfg.result;
        } else {
          this.result = new TinCan.Result(cfg.result);
        }
      }
      if (cfg.hasOwnProperty("context")) {
        if (cfg.context instanceof TinCan.Context) {
          this.context = cfg.context;
        } else {
          this.context = new TinCan.Context(cfg.context);
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
    toString: function (lang) {
      this.log("toString");
      return (
        (this.actor !== null ? this.actor.toString(lang) : "") +
        " " +
        (this.verb !== null ? this.verb.toString(lang) : "") +
        " " +
        (this.target !== null ? this.target.toString(lang) : "")
      );
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result,
        optionalDirectProps = ["timestamp"],
        optionalObjProps = ["actor", "verb", "result", "context"],
        i;
      result = { objectType: this.objectType };
      version = version || TinCan.versions()[0];
      for (i = 0; i < optionalDirectProps.length; i += 1) {
        if (this[optionalDirectProps[i]] !== null) {
          result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
        }
      }
      for (i = 0; i < optionalObjProps.length; i += 1) {
        if (this[optionalObjProps[i]] !== null) {
          result[optionalObjProps[i]] =
            this[optionalObjProps[i]].asVersion(version);
        }
      }
      if (this.target !== null) {
        result.object = this.target.asVersion(version);
      }
      if (version === "0.9") {
        result.objectType = "Statement";
      }
      return result;
    },
  };
  SubStatement.fromJSON = function (subStJSON) {
    SubStatement.prototype.log("fromJSON");
    var _subSt = JSON.parse(subStJSON);
    return new SubStatement(_subSt);
  };
})();
(function () {
  "use strict";
  var Statement = (TinCan.Statement = function (cfg, initCfg) {
    this.log("constructor");
    if (typeof initCfg === "number") {
      initCfg = { storeOriginal: initCfg };
    } else {
      initCfg = initCfg || {};
    }
    if (typeof initCfg.storeOriginal === "undefined") {
      initCfg.storeOriginal = null;
    }
    if (typeof initCfg.doStamp === "undefined") {
      initCfg.doStamp = true;
    }
    this.id = null;
    this.actor = null;
    this.verb = null;
    this.target = null;
    this.result = null;
    this.context = null;
    this.timestamp = null;
    this.stored = null;
    this.authority = null;
    this.attachments = null;
    this.version = null;
    this.degraded = false;
    this.voided = null;
    this.inProgress = null;
    this.originalJSON = null;
    this.init(cfg, initCfg);
  });
  Statement.prototype = {
    LOG_SRC: "Statement",
    log: TinCan.prototype.log,
    init: function (cfg, initCfg) {
      this.log("init");
      var i,
        directProps = [
          "id",
          "stored",
          "timestamp",
          "version",
          "inProgress",
          "voided",
        ];
      cfg = cfg || {};
      if (initCfg.storeOriginal) {
        this.originalJSON = JSON.stringify(cfg, null, initCfg.storeOriginal);
      }
      if (cfg.hasOwnProperty("object")) {
        cfg.target = cfg.object;
      }
      if (cfg.hasOwnProperty("actor")) {
        if (
          typeof cfg.actor.objectType === "undefined" ||
          cfg.actor.objectType === "Person"
        ) {
          cfg.actor.objectType = "Agent";
        }
        if (cfg.actor.objectType === "Agent") {
          if (cfg.actor instanceof TinCan.Agent) {
            this.actor = cfg.actor;
          } else {
            this.actor = new TinCan.Agent(cfg.actor);
          }
        } else if (cfg.actor.objectType === "Group") {
          if (cfg.actor instanceof TinCan.Group) {
            this.actor = cfg.actor;
          } else {
            this.actor = new TinCan.Group(cfg.actor);
          }
        }
      }
      if (cfg.hasOwnProperty("authority")) {
        if (
          typeof cfg.authority.objectType === "undefined" ||
          cfg.authority.objectType === "Person"
        ) {
          cfg.authority.objectType = "Agent";
        }
        if (cfg.authority.objectType === "Agent") {
          if (cfg.authority instanceof TinCan.Agent) {
            this.authority = cfg.authority;
          } else {
            this.authority = new TinCan.Agent(cfg.authority);
          }
        } else if (cfg.authority.objectType === "Group") {
          if (cfg.actor instanceof TinCan.Group) {
            this.authority = cfg.authority;
          } else {
            this.authority = new TinCan.Group(cfg.authority);
          }
        }
      }
      if (cfg.hasOwnProperty("verb")) {
        if (cfg.verb instanceof TinCan.Verb) {
          this.verb = cfg.verb;
        } else {
          this.verb = new TinCan.Verb(cfg.verb);
        }
      }
      if (cfg.hasOwnProperty("target")) {
        if (
          cfg.target instanceof TinCan.Activity ||
          cfg.target instanceof TinCan.Agent ||
          cfg.target instanceof TinCan.Group ||
          cfg.target instanceof TinCan.SubStatement ||
          cfg.target instanceof TinCan.StatementRef
        ) {
          this.target = cfg.target;
        } else {
          if (typeof cfg.target.objectType === "undefined") {
            cfg.target.objectType = "Activity";
          }
          if (cfg.target.objectType === "Activity") {
            this.target = new TinCan.Activity(cfg.target);
          } else if (cfg.target.objectType === "Agent") {
            this.target = new TinCan.Agent(cfg.target);
          } else if (cfg.target.objectType === "Group") {
            this.target = new TinCan.Group(cfg.target);
          } else if (cfg.target.objectType === "SubStatement") {
            this.target = new TinCan.SubStatement(cfg.target);
          } else if (cfg.target.objectType === "StatementRef") {
            this.target = new TinCan.StatementRef(cfg.target);
          } else {
            this.log("Unrecognized target type: " + cfg.target.objectType);
          }
        }
      }
      if (cfg.hasOwnProperty("result")) {
        if (cfg.result instanceof TinCan.Result) {
          this.result = cfg.result;
        } else {
          this.result = new TinCan.Result(cfg.result);
        }
      }
      if (cfg.hasOwnProperty("context")) {
        if (cfg.context instanceof TinCan.Context) {
          this.context = cfg.context;
        } else {
          this.context = new TinCan.Context(cfg.context);
        }
      }
      if (cfg.hasOwnProperty("attachments") && cfg.attachments !== null) {
        this.attachments = [];
        for (i = 0; i < cfg.attachments.length; i += 1) {
          if (!(cfg.attachments[i] instanceof TinCan.Attachment)) {
            this.attachments.push(new TinCan.Attachment(cfg.attachments[i]));
          } else {
            this.attachments.push(cfg.attachments[i]);
          }
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
      if (initCfg.doStamp) {
        this.stamp();
      }
    },
    toString: function (lang) {
      this.log("toString");
      return (
        (this.actor !== null ? this.actor.toString(lang) : "") +
        " " +
        (this.verb !== null ? this.verb.toString(lang) : "") +
        " " +
        (this.target !== null ? this.target.toString(lang) : "")
      );
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result = {},
        optionalDirectProps = ["id", "timestamp"],
        optionalObjProps = ["actor", "verb", "result", "context", "authority"],
        i;
      version = version || TinCan.versions()[0];
      for (i = 0; i < optionalDirectProps.length; i += 1) {
        if (this[optionalDirectProps[i]] !== null) {
          result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
        }
      }
      for (i = 0; i < optionalObjProps.length; i += 1) {
        if (this[optionalObjProps[i]] !== null) {
          result[optionalObjProps[i]] =
            this[optionalObjProps[i]].asVersion(version);
        }
      }
      if (this.target !== null) {
        result.object = this.target.asVersion(version);
      }
      if (version === "0.9" || version === "0.95") {
        if (this.voided !== null) {
          result.voided = this.voided;
        }
      }
      if (version === "0.9" && this.inProgress !== null) {
        result.inProgress = this.inProgress;
      }
      if (this.attachments !== null) {
        if (!(version === "0.9" || version === "0.95")) {
          result.attachments = [];
          for (i = 0; i < this.attachments.length; i += 1) {
            if (this.attachments[i] instanceof TinCan.Attachment) {
              result.attachments.push(this.attachments[i].asVersion(version));
            } else {
              result.attachments.push(
                new TinCan.Attachment(this.attachments[i]).asVersion(version)
              );
            }
          }
        }
      }
      return result;
    },
    stamp: function () {
      this.log("stamp");
      if (this.id === null) {
        this.id = TinCan.Utils.getUUID();
      }
      if (this.timestamp === null) {
        this.timestamp = TinCan.Utils.getISODateString(new Date());
      }
    },
    hasAttachmentWithContent: function () {
      this.log("hasAttachmentWithContent");
      var i;
      if (this.attachments === null) {
        return false;
      }
      for (i = 0; i < this.attachments.length; i += 1) {
        if (this.attachments[i].content !== null) {
          return true;
        }
      }
      return false;
    },
  };
  Statement.fromJSON = function (stJSON) {
    Statement.prototype.log("fromJSON");
    var _st = JSON.parse(stJSON);
    return new Statement(_st);
  };
})();
(function () {
  "use strict";
  var StatementsResult = (TinCan.StatementsResult = function (cfg) {
    this.log("constructor");
    this.statements = null;
    this.more = null;
    this.init(cfg);
  });
  StatementsResult.prototype = {
    LOG_SRC: "StatementsResult",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      cfg = cfg || {};
      if (cfg.hasOwnProperty("statements")) {
        this.statements = cfg.statements;
      }
      if (cfg.hasOwnProperty("more")) {
        this.more = cfg.more;
      }
    },
  };
  StatementsResult.fromJSON = function (resultJSON) {
    StatementsResult.prototype.log("fromJSON");
    var _result,
      stmts = [],
      stmt,
      i;
    try {
      _result = JSON.parse(resultJSON);
    } catch (parseError) {
      StatementsResult.prototype.log(
        "fromJSON - JSON.parse error: " + parseError
      );
    }
    if (_result) {
      for (i = 0; i < _result.statements.length; i += 1) {
        try {
          stmt = new TinCan.Statement(_result.statements[i], 4);
        } catch (error) {
          StatementsResult.prototype.log(
            "fromJSON - statement instantiation failed: " +
              error +
              " (" +
              JSON.stringify(_result.statements[i]) +
              ")"
          );
          stmt = new TinCan.Statement({ id: _result.statements[i].id }, 4);
        }
        stmts.push(stmt);
      }
      _result.statements = stmts;
    }
    return new StatementsResult(_result);
  };
})();
(function () {
  "use strict";
  var State = (TinCan.State = function (cfg) {
    this.log("constructor");
    this.id = null;
    this.updated = null;
    this.contents = null;
    this.etag = null;
    this.contentType = null;
    this.init(cfg);
  });
  State.prototype = {
    LOG_SRC: "State",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id", "contents", "etag", "contentType"];
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
      this.updated = false;
    },
  };
  State.fromJSON = function (stateJSON) {
    State.prototype.log("fromJSON");
    var _state = JSON.parse(stateJSON);
    return new State(_state);
  };
})();
(function () {
  "use strict";
  var ActivityProfile = (TinCan.ActivityProfile = function (cfg) {
    this.log("constructor");
    this.id = null;
    this.activity = null;
    this.updated = null;
    this.contents = null;
    this.etag = null;
    this.contentType = null;
    this.init(cfg);
  });
  ActivityProfile.prototype = {
    LOG_SRC: "ActivityProfile",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id", "contents", "etag", "contentType"];
      cfg = cfg || {};
      if (cfg.hasOwnProperty("activity")) {
        if (cfg.activity instanceof TinCan.Activity) {
          this.activity = cfg.activity;
        } else {
          this.activity = new TinCan.Activity(cfg.activity);
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
      this.updated = false;
    },
  };
  ActivityProfile.fromJSON = function (stateJSON) {
    ActivityProfile.prototype.log("fromJSON");
    var _state = JSON.parse(stateJSON);
    return new ActivityProfile(_state);
  };
})();
(function () {
  "use strict";
  var AgentProfile = (TinCan.AgentProfile = function (cfg) {
    this.log("constructor");
    this.id = null;
    this.agent = null;
    this.updated = null;
    this.contents = null;
    this.etag = null;
    this.contentType = null;
    this.init(cfg);
  });
  AgentProfile.prototype = {
    LOG_SRC: "AgentProfile",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["id", "contents", "etag", "contentType"];
      cfg = cfg || {};
      if (cfg.hasOwnProperty("agent")) {
        if (cfg.agent instanceof TinCan.Agent) {
          this.agent = cfg.agent;
        } else {
          this.agent = new TinCan.Agent(cfg.agent);
        }
      }
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
      this.updated = false;
    },
  };
  AgentProfile.fromJSON = function (stateJSON) {
    AgentProfile.prototype.log("fromJSON");
    var _state = JSON.parse(stateJSON);
    return new AgentProfile(_state);
  };
})();
(function () {
  "use strict";
  var About = (TinCan.About = function (cfg) {
    this.log("constructor");
    this.version = null;
    this.init(cfg);
  });
  About.prototype = {
    LOG_SRC: "About",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = ["version"];
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
    },
  };
  About.fromJSON = function (aboutJSON) {
    About.prototype.log("fromJSON");
    var _about = JSON.parse(aboutJSON);
    return new About(_about);
  };
})();
(function () {
  "use strict";
  var Attachment = (TinCan.Attachment = function (cfg) {
    this.log("constructor");
    this.usageType = null;
    this.display = null;
    this.contentType = null;
    this.length = null;
    this.sha2 = null;
    this.description = null;
    this.fileUrl = null;
    this.content = null;
    this.init(cfg);
  });
  Attachment.prototype = {
    LOG_SRC: "Attachment",
    log: TinCan.prototype.log,
    init: function (cfg) {
      this.log("init");
      var i,
        directProps = [
          "contentType",
          "length",
          "sha2",
          "usageType",
          "display",
          "description",
          "fileUrl",
        ];
      cfg = cfg || {};
      for (i = 0; i < directProps.length; i += 1) {
        if (
          cfg.hasOwnProperty(directProps[i]) &&
          cfg[directProps[i]] !== null
        ) {
          this[directProps[i]] = cfg[directProps[i]];
        }
      }
      if (cfg.hasOwnProperty("content") && cfg.content !== null) {
        if (typeof cfg.content === "string") {
          this.setContentFromString(cfg.content);
        } else {
          this.setContent(cfg.content);
        }
      }
    },
    asVersion: function (version) {
      this.log("asVersion");
      var result;
      version = version || TinCan.versions()[0];
      if (version === "0.9" || version === "0.95") {
        result = null;
      } else {
        result = {
          contentType: this.contentType,
          display: this.display,
          length: this.length,
          sha2: this.sha2,
          usageType: this.usageType,
        };
        if (this.fileUrl !== null) {
          result.fileUrl = this.fileUrl;
        }
        if (this.description !== null) {
          result.description = this.description;
        }
      }
      return result;
    },
    getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue,
    setContent: function (content) {
      this.content = content;
      this.length = content.byteLength;
      this.sha2 = TinCan.Utils.getSHA256String(content);
    },
    setContentFromString: function (content) {
      var _content = content;
      _content = TinCan.Utils.stringToArrayBuffer(content);
      this.setContent(_content);
    },
    getContentAsString: function () {
      return TinCan.Utils.stringFromArrayBuffer(this.content);
    },
  };
  Attachment.fromJSON = function (attachmentJSON) {
    Attachment.prototype.log("fromJSON");
    var _attachment = JSON.parse(attachmentJSON);
    return new Attachment(_attachment);
  };
  Attachment._defaultEncoding = "utf-8";
})();
(function () {
  "use strict";
  var LOG_SRC = "Environment.Browser",
    requestComplete,
    __IEModeConversion,
    nativeRequest,
    xdrRequest,
    __createJSONSegment,
    __createAttachmentSegment,
    __delay,
    env = {},
    log = TinCan.prototype.log;
  if (typeof window === "undefined") {
    log("'window' not defined", LOG_SRC);
    return;
  }
  if (!window.JSON) {
    window.JSON = {
      parse: function (sJSON) {
        return eval("(" + sJSON + ")");
      },
      stringify: function (vContent) {
        var sOutput = "",
          nId,
          sProp;
        if (vContent instanceof Object) {
          if (vContent.constructor === Array) {
            for (nId = 0; nId < vContent.length; nId += 1) {
              sOutput += this.stringify(vContent[nId]) + ",";
            }
            return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
          }
          if (vContent.toString !== Object.prototype.toString) {
            return '"' + vContent.toString().replace(/"/g, "\\$&") + '"';
          }
          for (sProp in vContent) {
            if (vContent.hasOwnProperty(sProp)) {
              sOutput +=
                '"' +
                sProp.replace(/"/g, "\\$&") +
                '":' +
                this.stringify(vContent[sProp]) +
                ",";
            }
          }
          return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
        }
        return typeof vContent === "string"
          ? '"' + vContent.replace(/"/g, "\\$&") + '"'
          : String(vContent);
      },
    };
  }
  if (!Date.now) {
    Date.now = function () {
      return +new Date();
    };
  }
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun) {
      if (this === void 0 || this === null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function") {
        throw new TypeError();
      }
      var thisp = arguments[1],
        i;
      for (i = 0; i < len; i += 1) {
        if (i in t) {
          fun.call(thisp, t[i], i, t);
        }
      }
    };
  }
  env.hasCORS = false;
  env.useXDR = false;
  if (
    typeof XMLHttpRequest !== "undefined" &&
    typeof new XMLHttpRequest().withCredentials !== "undefined"
  ) {
    env.hasCORS = true;
  } else if (typeof XDomainRequest !== "undefined") {
    env.hasCORS = true;
    env.useXDR = true;
  }
  requestComplete = function (xhr, cfg, control) {
    log(
      "requestComplete: " + control.finished + ", xhr.status: " + xhr.status,
      LOG_SRC
    );
    var requestCompleteResult, notFoundOk, httpStatus;
    if (typeof xhr.status === "undefined") {
      httpStatus = control.fakeStatus;
    } else {
      httpStatus = xhr.status === 1223 ? 204 : xhr.status;
    }
    if (!control.finished) {
      control.finished = true;
      notFoundOk = cfg.ignore404 && httpStatus === 404;
      if ((httpStatus >= 200 && httpStatus < 400) || notFoundOk) {
        if (cfg.callback) {
          cfg.callback(null, xhr);
        } else {
          requestCompleteResult = { err: null, xhr: xhr };
          return requestCompleteResult;
        }
      } else {
        requestCompleteResult = { err: httpStatus, xhr: xhr };
        if (httpStatus === 0) {
          log(
            "[warning] There was a problem communicating with the Learning Record Store. Aborted, offline, or invalid CORS endpoint (" +
              httpStatus +
              ")",
            LOG_SRC
          );
        } else {
          log(
            "[warning] There was a problem communicating with the Learning Record Store. (" +
              httpStatus +
              " | " +
              xhr.responseText +
              ")",
            LOG_SRC
          );
        }
        if (cfg.callback) {
          cfg.callback(httpStatus, xhr);
        }
        return requestCompleteResult;
      }
    } else {
      return requestCompleteResult;
    }
  };
  __IEModeConversion = function (fullUrl, headers, pairs, cfg) {
    var prop;
    for (prop in headers) {
      if (headers.hasOwnProperty(prop)) {
        pairs.push(prop + "=" + encodeURIComponent(headers[prop]));
      }
    }
    if (typeof cfg.data !== "undefined") {
      pairs.push("content=" + encodeURIComponent(cfg.data));
    }
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    fullUrl += "?method=" + cfg.method;
    cfg.method = "POST";
    cfg.params = {};
    if (pairs.length > 0) {
      cfg.data = pairs.join("&");
    }
    return fullUrl;
  };
  nativeRequest = function (fullUrl, headers, cfg) {
    log("sendRequest using XMLHttpRequest", LOG_SRC);
    var self = this,
      xhr,
      prop,
      pairs = [],
      data,
      control = { finished: false, fakeStatus: null },
      async = typeof cfg.callback !== "undefined",
      fullRequest = fullUrl,
      err,
      MAX_REQUEST_LENGTH = 2048;
    log("sendRequest using XMLHttpRequest - async: " + async, LOG_SRC);
    for (prop in cfg.params) {
      if (cfg.params.hasOwnProperty(prop)) {
        pairs.push(prop + "=" + encodeURIComponent(cfg.params[prop]));
      }
    }
    if (pairs.length > 0) {
      fullRequest += "?" + pairs.join("&");
    }
    if (fullRequest.length >= MAX_REQUEST_LENGTH) {
      if (typeof cfg.method === "undefined") {
        err = new Error(
          "method must not be undefined for an IE Mode Request conversion"
        );
        if (typeof cfg.callback !== "undefined") {
          cfg.callback(err, null);
        }
        return { err: err, xhr: null };
      }
      fullUrl = __IEModeConversion(fullUrl, headers, pairs, cfg);
    } else {
      fullUrl = fullRequest;
    }
    if (typeof XMLHttpRequest !== "undefined") {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
      if (cfg.expectMultipart) {
        err = new Error("Attachment support not available");
        if (typeof cfg.callback !== "undefined") {
          cfg.callback(err, null);
        }
        return { err: err, xhr: null };
      }
    }
    xhr.open(cfg.method, fullUrl, async);
    if (cfg.expectMultipart) {
      xhr.responseType = "arraybuffer";
    }
    for (prop in headers) {
      if (headers.hasOwnProperty(prop)) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
    }
    data = cfg.data;
    if (async) {
      xhr.onreadystatechange = function () {
        log(
          "xhr.onreadystatechange - xhr.readyState: " + xhr.readyState,
          LOG_SRC
        );
        if (xhr.readyState === 4) {
          requestComplete.call(self, xhr, cfg, control);
        }
      };
    }
    try {
      xhr.send(data);
    } catch (ex) {
      log("sendRequest caught send exception: " + ex, LOG_SRC);
    }
    if (async) {
      return xhr;
    }
    return requestComplete.call(this, xhr, cfg, control);
  };
  xdrRequest = function (fullUrl, headers, cfg) {
    log("sendRequest using XDomainRequest", LOG_SRC);
    var self = this,
      xhr,
      pairs = [],
      data,
      prop,
      until,
      control = { finished: false, fakeStatus: null },
      err;
    if (cfg.expectMultipart) {
      err = new Error("Attachment support not available");
      if (typeof cfg.callback !== "undefined") {
        cfg.callback(err, null);
      }
      return { err: err, xhr: null };
    }
    fullUrl += "?method=" + cfg.method;
    for (prop in cfg.params) {
      if (cfg.params.hasOwnProperty(prop)) {
        pairs.push(prop + "=" + encodeURIComponent(cfg.params[prop]));
      }
    }
    for (prop in headers) {
      if (headers.hasOwnProperty(prop)) {
        pairs.push(prop + "=" + encodeURIComponent(headers[prop]));
      }
    }
    if (typeof cfg.data !== "undefined") {
      pairs.push("content=" + encodeURIComponent(cfg.data));
    }
    data = pairs.join("&");
    xhr = new XDomainRequest();
    xhr.open("POST", fullUrl);
    if (!cfg.callback) {
      xhr.onload = function () {
        control.fakeStatus = 200;
      };
      xhr.onerror = function () {
        control.fakeStatus = 400;
      };
      xhr.ontimeout = function () {
        control.fakeStatus = 0;
      };
    } else {
      xhr.onload = function () {
        control.fakeStatus = 200;
        requestComplete.call(self, xhr, cfg, control);
      };
      xhr.onerror = function () {
        control.fakeStatus = 400;
        requestComplete.call(self, xhr, cfg, control);
      };
      xhr.ontimeout = function () {
        control.fakeStatus = 0;
        requestComplete.call(self, xhr, cfg, control);
      };
    }
    xhr.onprogress = function () {};
    xhr.timeout = 0;
    try {
      xhr.send(data);
    } catch (ex) {
      log("sendRequest caught send exception: " + ex, LOG_SRC);
    }
    if (!cfg.callback) {
      until = 10000 + Date.now();
      log(
        "sendRequest - until: " + until + ", finished: " + control.finished,
        LOG_SRC
      );
      while (Date.now() < until && control.fakeStatus === null) {
        __delay();
      }
      return requestComplete.call(self, xhr, cfg, control);
    }
    return xhr;
  };
  TinCan.LRS.prototype._initByEnvironment = function (cfg) {
    log("_initByEnvironment", LOG_SRC);
    var urlParts, schemeMatches, locationPort, isXD;
    cfg = cfg || {};
    this._makeRequest = nativeRequest;
    this._IEModeConversion = __IEModeConversion;
    urlParts = this.endpoint
      .toLowerCase()
      .match(/([A-Za-z]+:)\/\/([^:\/]+):?(\d+)?(\/.*)?$/);
    if (urlParts === null) {
      log("[error] LRS invalid: failed to divide URL parts", LOG_SRC);
      throw { code: 4, mesg: "LRS invalid: failed to divide URL parts" };
    }
    locationPort = location.port;
    schemeMatches = location.protocol.toLowerCase() === urlParts[1];
    if (locationPort === "") {
      locationPort =
        location.protocol.toLowerCase() === "http:"
          ? "80"
          : location.protocol.toLowerCase() === "https:"
          ? "443"
          : "";
    }
    isXD =
      !schemeMatches ||
      location.hostname.toLowerCase() !== urlParts[2] ||
      locationPort !==
        (urlParts[3] !== null &&
        typeof urlParts[3] !== "undefined" &&
        urlParts[3] !== ""
          ? urlParts[3]
          : urlParts[1] === "http:"
          ? "80"
          : urlParts[1] === "https:"
          ? "443"
          : "");
    if (isXD) {
      if (env.hasCORS) {
        if (env.useXDR && schemeMatches) {
          this._makeRequest = xdrRequest;
        } else if (env.useXDR && !schemeMatches) {
          if (cfg.allowFail) {
            log(
              "[warning] LRS invalid: cross domain request for differing scheme in IE with XDR (allowed to fail)",
              LOG_SRC
            );
          } else {
            log(
              "[error] LRS invalid: cross domain request for differing scheme in IE with XDR",
              LOG_SRC
            );
            throw {
              code: 2,
              mesg: "LRS invalid: cross domain request for differing scheme in IE with XDR",
            };
          }
        }
      } else {
        if (cfg.allowFail) {
          log(
            "[warning] LRS invalid: cross domain requests not supported in this browser (allowed to fail)",
            LOG_SRC
          );
        } else {
          log(
            "[error] LRS invalid: cross domain requests not supported in this browser",
            LOG_SRC
          );
          throw {
            code: 1,
            mesg: "LRS invalid: cross domain requests not supported in this browser",
          };
        }
      }
    }
  };
  __delay = function () {
    var xhr = new XMLHttpRequest(),
      url = window.location + "?forcenocache=" + TinCan.Utils.getUUID();
    xhr.open("GET", url, false);
    xhr.send(null);
  };
  TinCan.LRS.syncEnabled = true;
  TinCan.LRS.prototype._getMultipartRequestData = function (
    boundary,
    jsonContent,
    requestAttachments
  ) {
    var parts = [],
      i;
    parts.push(__createJSONSegment(boundary, jsonContent));
    for (i = 0; i < requestAttachments.length; i += 1) {
      if (requestAttachments[i].content !== null) {
        parts.push(
          __createAttachmentSegment(
            boundary,
            requestAttachments[i].content,
            requestAttachments[i].sha2,
            requestAttachments[i].contentType
          )
        );
      }
    }
    parts.push("\r\n--" + boundary + "--\r\n");
    return new Blob(parts);
  };
  __createJSONSegment = function (boundary, jsonContent) {
    var content = [
      "--" + boundary,
      "Content-Type: application/json",
      "",
      JSON.stringify(jsonContent),
    ].join("\r\n");
    content += "\r\n";
    return content;
  };
  __createAttachmentSegment = function (boundary, content, sha2, contentType) {
    var blobParts = [],
      header = [
        "--" + boundary,
        "Content-Type: " + contentType,
        "Content-Transfer-Encoding: binary",
        "X-Experience-API-Hash: " + sha2,
      ].join("\r\n");
    header += "\r\n\r\n";
    blobParts.push(header);
    blobParts.push(content);
    return new Blob(blobParts);
  };
  TinCan.Utils.stringToArrayBuffer = function (content, encoding) {
    var encoder;
    if (!encoding) {
      encoding = TinCan.Utils.defaultEncoding;
    }
    encoder = new TextEncoder(encoding);
    return encoder.encode(content).buffer;
  };
  TinCan.Utils.stringFromArrayBuffer = function (content, encoding) {
    var decoder;
    if (!encoding) {
      encoding = TinCan.Utils.defaultEncoding;
    }
    decoder = new TextDecoder(encoding);
    return decoder.decode(content);
  };
})();
(function (global) {
  "use strict";
  var undefined = void 0;
  var MAX_ARRAY_LENGTH = 1e5;
  function Type(v) {
    switch (typeof v) {
      case "undefined":
        return "undefined";
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      default:
        return v === null ? "null" : "object";
    }
  }
  function Class(v) {
    return Object.prototype.toString.call(v).replace(/^\[object *|\]$/g, "");
  }
  function IsCallable(o) {
    return typeof o === "function";
  }
  function ToObject(v) {
    if (v === null || v === undefined) throw TypeError();
    return Object(v);
  }
  function ToInt32(v) {
    return v >> 0;
  }
  function ToUint32(v) {
    return v >>> 0;
  }
  var LN2 = Math.LN2,
    abs = Math.abs,
    floor = Math.floor,
    log = Math.log,
    max = Math.max,
    min = Math.min,
    pow = Math.pow,
    round = Math.round;
  (function () {
    var orig = Object.defineProperty;
    var dom_only = !(function () {
      try {
        return Object.defineProperty({}, "x", {});
      } catch (_) {
        return false;
      }
    })();
    if (!orig || dom_only) {
      Object.defineProperty = function (o, prop, desc) {
        if (orig)
          try {
            return orig(o, prop, desc);
          } catch (_) {}
        if (o !== Object(o))
          throw TypeError("Object.defineProperty called on non-object");
        if (Object.prototype.__defineGetter__ && "get" in desc)
          Object.prototype.__defineGetter__.call(o, prop, desc.get);
        if (Object.prototype.__defineSetter__ && "set" in desc)
          Object.prototype.__defineSetter__.call(o, prop, desc.set);
        if ("value" in desc) o[prop] = desc.value;
        return o;
      };
    }
  })();
  function makeArrayAccessors(obj) {
    if ("TYPED_ARRAY_POLYFILL_NO_ARRAY_ACCESSORS" in global) return;
    if (obj.length > MAX_ARRAY_LENGTH)
      throw RangeError("Array too large for polyfill");
    function makeArrayAccessor(index) {
      Object.defineProperty(obj, index, {
        get: function () {
          return obj._getter(index);
        },
        set: function (v) {
          obj._setter(index, v);
        },
        enumerable: true,
        configurable: false,
      });
    }
    var i;
    for (i = 0; i < obj.length; i += 1) {
      makeArrayAccessor(i);
    }
  }
  function as_signed(value, bits) {
    var s = 32 - bits;
    return (value << s) >> s;
  }
  function as_unsigned(value, bits) {
    var s = 32 - bits;
    return (value << s) >>> s;
  }
  function packI8(n) {
    return [n & 0xff];
  }
  function unpackI8(bytes) {
    return as_signed(bytes[0], 8);
  }
  function packU8(n) {
    return [n & 0xff];
  }
  function unpackU8(bytes) {
    return as_unsigned(bytes[0], 8);
  }
  function packU8Clamped(n) {
    n = round(Number(n));
    return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff];
  }
  function packI16(n) {
    return [n & 0xff, (n >> 8) & 0xff];
  }
  function unpackI16(bytes) {
    return as_signed((bytes[1] << 8) | bytes[0], 16);
  }
  function packU16(n) {
    return [n & 0xff, (n >> 8) & 0xff];
  }
  function unpackU16(bytes) {
    return as_unsigned((bytes[1] << 8) | bytes[0], 16);
  }
  function packI32(n) {
    return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
  }
  function unpackI32(bytes) {
    return as_signed(
      (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0],
      32
    );
  }
  function packU32(n) {
    return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
  }
  function unpackU32(bytes) {
    return as_unsigned(
      (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0],
      32
    );
  }
  function packIEEE754(v, ebits, fbits) {
    var bias = (1 << (ebits - 1)) - 1;
    function roundToEven(n) {
      var w = floor(n),
        f = n - w;
      if (f < 0.5) return w;
      if (f > 0.5) return w + 1;
      return w % 2 ? w + 1 : w;
    }
    var s, e, f;
    if (v !== v) {
      e = (1 << ebits) - 1;
      f = pow(2, fbits - 1);
      s = 0;
    } else if (v === Infinity || v === -Infinity) {
      e = (1 << ebits) - 1;
      f = 0;
      s = v < 0 ? 1 : 0;
    } else if (v === 0) {
      e = 0;
      f = 0;
      s = 1 / v === -Infinity ? 1 : 0;
    } else {
      s = v < 0;
      v = abs(v);
      if (v >= pow(2, 1 - bias)) {
        e = min(floor(log(v) / LN2), 1023);
        var significand = v / pow(2, e);
        if (significand < 1) {
          e -= 1;
          significand *= 2;
        }
        if (significand >= 2) {
          e += 1;
          significand /= 2;
        }
        var d = pow(2, fbits);
        f = roundToEven(significand * d) - d;
        e += bias;
        if (f / d >= 1) {
          e += 1;
          f = 0;
        }
        if (e > 2 * bias) {
          e = (1 << ebits) - 1;
          f = 0;
        }
      } else {
        e = 0;
        f = roundToEven(v / pow(2, 1 - bias - fbits));
      }
    }
    var bits = [],
      i;
    for (i = fbits; i; i -= 1) {
      bits.push(f % 2 ? 1 : 0);
      f = floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
      bits.push(e % 2 ? 1 : 0);
      e = floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    var str = bits.join("");
    var bytes = [];
    while (str.length) {
      bytes.unshift(parseInt(str.substring(0, 8), 2));
      str = str.substring(8);
    }
    return bytes;
  }
  function unpackIEEE754(bytes, ebits, fbits) {
    var bits = [],
      i,
      j,
      b,
      str,
      bias,
      s,
      e,
      f;
    for (i = 0; i < bytes.length; ++i) {
      b = bytes[i];
      for (j = 8; j; j -= 1) {
        bits.push(b % 2 ? 1 : 0);
        b = b >> 1;
      }
    }
    bits.reverse();
    str = bits.join("");
    bias = (1 << (ebits - 1)) - 1;
    s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    e = parseInt(str.substring(1, 1 + ebits), 2);
    f = parseInt(str.substring(1 + ebits), 2);
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN : s * Infinity;
    } else if (e > 0) {
      return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
    } else if (f !== 0) {
      return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
    } else {
      return s < 0 ? -0 : 0;
    }
  }
  function unpackF64(b) {
    return unpackIEEE754(b, 11, 52);
  }
  function packF64(v) {
    return packIEEE754(v, 11, 52);
  }
  function unpackF32(b) {
    return unpackIEEE754(b, 8, 23);
  }
  function packF32(v) {
    return packIEEE754(v, 8, 23);
  }
  (function () {
    function ArrayBuffer(length) {
      length = ToInt32(length);
      if (length < 0)
        throw RangeError(
          "ArrayBuffer size is not a small enough positive integer."
        );
      Object.defineProperty(this, "byteLength", { value: length });
      Object.defineProperty(this, "_bytes", { value: Array(length) });
      for (var i = 0; i < length; i += 1) this._bytes[i] = 0;
    }
    global.ArrayBuffer = global.ArrayBuffer || ArrayBuffer;
    function $TypedArray$() {
      if (!arguments.length || typeof arguments[0] !== "object") {
        return function (length) {
          length = ToInt32(length);
          if (length < 0)
            throw RangeError("length is not a small enough positive integer.");
          Object.defineProperty(this, "length", { value: length });
          Object.defineProperty(this, "byteLength", {
            value: length * this.BYTES_PER_ELEMENT,
          });
          Object.defineProperty(this, "buffer", {
            value: new ArrayBuffer(this.byteLength),
          });
          Object.defineProperty(this, "byteOffset", { value: 0 });
        }.apply(this, arguments);
      }
      if (
        arguments.length >= 1 &&
        Type(arguments[0]) === "object" &&
        arguments[0] instanceof $TypedArray$
      ) {
        return function (typedArray) {
          if (this.constructor !== typedArray.constructor) throw TypeError();
          var byteLength = typedArray.length * this.BYTES_PER_ELEMENT;
          Object.defineProperty(this, "buffer", {
            value: new ArrayBuffer(byteLength),
          });
          Object.defineProperty(this, "byteLength", { value: byteLength });
          Object.defineProperty(this, "byteOffset", { value: 0 });
          Object.defineProperty(this, "length", { value: typedArray.length });
          for (var i = 0; i < this.length; i += 1)
            this._setter(i, typedArray._getter(i));
        }.apply(this, arguments);
      }
      if (
        arguments.length >= 1 &&
        Type(arguments[0]) === "object" &&
        !(arguments[0] instanceof $TypedArray$) &&
        !(
          arguments[0] instanceof ArrayBuffer ||
          Class(arguments[0]) === "ArrayBuffer"
        )
      ) {
        return function (array) {
          var byteLength = array.length * this.BYTES_PER_ELEMENT;
          Object.defineProperty(this, "buffer", {
            value: new ArrayBuffer(byteLength),
          });
          Object.defineProperty(this, "byteLength", { value: byteLength });
          Object.defineProperty(this, "byteOffset", { value: 0 });
          Object.defineProperty(this, "length", { value: array.length });
          for (var i = 0; i < this.length; i += 1) {
            var s = array[i];
            this._setter(i, Number(s));
          }
        }.apply(this, arguments);
      }
      if (
        arguments.length >= 1 &&
        Type(arguments[0]) === "object" &&
        (arguments[0] instanceof ArrayBuffer ||
          Class(arguments[0]) === "ArrayBuffer")
      ) {
        return function (buffer, byteOffset, length) {
          byteOffset = ToUint32(byteOffset);
          if (byteOffset > buffer.byteLength)
            throw RangeError("byteOffset out of range");
          if (byteOffset % this.BYTES_PER_ELEMENT)
            throw RangeError(
              "buffer length minus the byteOffset is not a multiple of the element size."
            );
          if (length === undefined) {
            var byteLength = buffer.byteLength - byteOffset;
            if (byteLength % this.BYTES_PER_ELEMENT)
              throw RangeError(
                "length of buffer minus byteOffset not a multiple of the element size"
              );
            length = byteLength / this.BYTES_PER_ELEMENT;
          } else {
            length = ToUint32(length);
            byteLength = length * this.BYTES_PER_ELEMENT;
          }
          if (byteOffset + byteLength > buffer.byteLength)
            throw RangeError(
              "byteOffset and length reference an area beyond the end of the buffer"
            );
          Object.defineProperty(this, "buffer", { value: buffer });
          Object.defineProperty(this, "byteLength", { value: byteLength });
          Object.defineProperty(this, "byteOffset", { value: byteOffset });
          Object.defineProperty(this, "length", { value: length });
        }.apply(this, arguments);
      }
      throw TypeError();
    }
    Object.defineProperty($TypedArray$, "from", {
      value: function (iterable) {
        return new this(iterable);
      },
    });
    Object.defineProperty($TypedArray$, "of", {
      value: function () {
        return new this(arguments);
      },
    });
    var $TypedArrayPrototype$ = {};
    $TypedArray$.prototype = $TypedArrayPrototype$;
    Object.defineProperty($TypedArray$.prototype, "_getter", {
      value: function (index) {
        if (arguments.length < 1) throw SyntaxError("Not enough arguments");
        index = ToUint32(index);
        if (index >= this.length) return undefined;
        var bytes = [],
          i,
          o;
        for (
          i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
          i < this.BYTES_PER_ELEMENT;
          i += 1, o += 1
        ) {
          bytes.push(this.buffer._bytes[o]);
        }
        return this._unpack(bytes);
      },
    });
    Object.defineProperty($TypedArray$.prototype, "get", {
      value: $TypedArray$.prototype._getter,
    });
    Object.defineProperty($TypedArray$.prototype, "_setter", {
      value: function (index, value) {
        if (arguments.length < 2) throw SyntaxError("Not enough arguments");
        index = ToUint32(index);
        if (index >= this.length) return;
        var bytes = this._pack(value),
          i,
          o;
        for (
          i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
          i < this.BYTES_PER_ELEMENT;
          i += 1, o += 1
        ) {
          this.buffer._bytes[o] = bytes[i];
        }
      },
    });
    Object.defineProperty($TypedArray$.prototype, "constructor", {
      value: $TypedArray$,
    });
    Object.defineProperty($TypedArray$.prototype, "copyWithin", {
      value: function (target, start) {
        var end = arguments[2];
        var o = ToObject(this);
        var lenVal = o.length;
        var len = ToUint32(lenVal);
        len = max(len, 0);
        var relativeTarget = ToInt32(target);
        var to;
        if (relativeTarget < 0) to = max(len + relativeTarget, 0);
        else to = min(relativeTarget, len);
        var relativeStart = ToInt32(start);
        var from;
        if (relativeStart < 0) from = max(len + relativeStart, 0);
        else from = min(relativeStart, len);
        var relativeEnd;
        if (end === undefined) relativeEnd = len;
        else relativeEnd = ToInt32(end);
        var final;
        if (relativeEnd < 0) final = max(len + relativeEnd, 0);
        else final = min(relativeEnd, len);
        var count = min(final - from, len - to);
        var direction;
        if (from < to && to < from + count) {
          direction = -1;
          from = from + count - 1;
          to = to + count - 1;
        } else {
          direction = 1;
        }
        while (count > 0) {
          o._setter(to, o._getter(from));
          from = from + direction;
          to = to + direction;
          count = count - 1;
        }
        return o;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "every", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        var thisArg = arguments[1];
        for (var i = 0; i < len; i++) {
          if (!callbackfn.call(thisArg, t._getter(i), i, t)) return false;
        }
        return true;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "fill", {
      value: function (value) {
        var start = arguments[1],
          end = arguments[2];
        var o = ToObject(this);
        var lenVal = o.length;
        var len = ToUint32(lenVal);
        len = max(len, 0);
        var relativeStart = ToInt32(start);
        var k;
        if (relativeStart < 0) k = max(len + relativeStart, 0);
        else k = min(relativeStart, len);
        var relativeEnd;
        if (end === undefined) relativeEnd = len;
        else relativeEnd = ToInt32(end);
        var final;
        if (relativeEnd < 0) final = max(len + relativeEnd, 0);
        else final = min(relativeEnd, len);
        while (k < final) {
          o._setter(k, value);
          k += 1;
        }
        return o;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "filter", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
          var val = t._getter(i);
          if (callbackfn.call(thisp, val, i, t)) res.push(val);
        }
        return new this.constructor(res);
      },
    });
    Object.defineProperty($TypedArray$.prototype, "find", {
      value: function (predicate) {
        var o = ToObject(this);
        var lenValue = o.length;
        var len = ToUint32(lenValue);
        if (!IsCallable(predicate)) throw TypeError();
        var t = arguments.length > 1 ? arguments[1] : undefined;
        var k = 0;
        while (k < len) {
          var kValue = o._getter(k);
          var testResult = predicate.call(t, kValue, k, o);
          if (Boolean(testResult)) return kValue;
          ++k;
        }
        return undefined;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "findIndex", {
      value: function (predicate) {
        var o = ToObject(this);
        var lenValue = o.length;
        var len = ToUint32(lenValue);
        if (!IsCallable(predicate)) throw TypeError();
        var t = arguments.length > 1 ? arguments[1] : undefined;
        var k = 0;
        while (k < len) {
          var kValue = o._getter(k);
          var testResult = predicate.call(t, kValue, k, o);
          if (Boolean(testResult)) return k;
          ++k;
        }
        return -1;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "forEach", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
          callbackfn.call(thisp, t._getter(i), i, t);
      },
    });
    Object.defineProperty($TypedArray$.prototype, "indexOf", {
      value: function (searchElement) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (len === 0) return -1;
        var n = 0;
        if (arguments.length > 0) {
          n = Number(arguments[1]);
          if (n !== n) {
            n = 0;
          } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
            n = (n > 0 || -1) * floor(abs(n));
          }
        }
        if (n >= len) return -1;
        var k = n >= 0 ? n : max(len - abs(n), 0);
        for (; k < len; k++) {
          if (t._getter(k) === searchElement) {
            return k;
          }
        }
        return -1;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "join", {
      value: function (separator) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        var tmp = Array(len);
        for (var i = 0; i < len; ++i) tmp[i] = t._getter(i);
        return tmp.join(separator === undefined ? "," : separator);
      },
    });
    Object.defineProperty($TypedArray$.prototype, "lastIndexOf", {
      value: function (searchElement) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (len === 0) return -1;
        var n = len;
        if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n !== n) {
            n = 0;
          } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
            n = (n > 0 || -1) * floor(abs(n));
          }
        }
        var k = n >= 0 ? min(n, len - 1) : len - abs(n);
        for (; k >= 0; k--) {
          if (t._getter(k) === searchElement) return k;
        }
        return -1;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "map", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        var res = [];
        res.length = len;
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
          res[i] = callbackfn.call(thisp, t._getter(i), i, t);
        return new this.constructor(res);
      },
    });
    Object.defineProperty($TypedArray$.prototype, "reduce", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        if (len === 0 && arguments.length === 1) throw TypeError();
        var k = 0;
        var accumulator;
        if (arguments.length >= 2) {
          accumulator = arguments[1];
        } else {
          accumulator = t._getter(k++);
        }
        while (k < len) {
          accumulator = callbackfn.call(
            undefined,
            accumulator,
            t._getter(k),
            k,
            t
          );
          k++;
        }
        return accumulator;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "reduceRight", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        if (len === 0 && arguments.length === 1) throw TypeError();
        var k = len - 1;
        var accumulator;
        if (arguments.length >= 2) {
          accumulator = arguments[1];
        } else {
          accumulator = t._getter(k--);
        }
        while (k >= 0) {
          accumulator = callbackfn.call(
            undefined,
            accumulator,
            t._getter(k),
            k,
            t
          );
          k--;
        }
        return accumulator;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "reverse", {
      value: function () {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        var half = floor(len / 2);
        for (var i = 0, j = len - 1; i < half; ++i, --j) {
          var tmp = t._getter(i);
          t._setter(i, t._getter(j));
          t._setter(j, tmp);
        }
        return t;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "set", {
      value: function (index, value) {
        if (arguments.length < 1) throw SyntaxError("Not enough arguments");
        var array, sequence, offset, len, i, s, d, byteOffset, byteLength, tmp;
        if (
          typeof arguments[0] === "object" &&
          arguments[0].constructor === this.constructor
        ) {
          array = arguments[0];
          offset = ToUint32(arguments[1]);
          if (offset + array.length > this.length) {
            throw RangeError("Offset plus length of array is out of range");
          }
          byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
          byteLength = array.length * this.BYTES_PER_ELEMENT;
          if (array.buffer === this.buffer) {
            tmp = [];
            for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
              tmp[i] = array.buffer._bytes[s];
            }
            for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
              this.buffer._bytes[d] = tmp[i];
            }
          } else {
            for (
              i = 0, s = array.byteOffset, d = byteOffset;
              i < byteLength;
              i += 1, s += 1, d += 1
            ) {
              this.buffer._bytes[d] = array.buffer._bytes[s];
            }
          }
        } else if (
          typeof arguments[0] === "object" &&
          typeof arguments[0].length !== "undefined"
        ) {
          sequence = arguments[0];
          len = ToUint32(sequence.length);
          offset = ToUint32(arguments[1]);
          if (offset + len > this.length) {
            throw RangeError("Offset plus length of array is out of range");
          }
          for (i = 0; i < len; i += 1) {
            s = sequence[i];
            this._setter(offset + i, Number(s));
          }
        } else {
          throw TypeError("Unexpected argument type(s)");
        }
      },
    });
    Object.defineProperty($TypedArray$.prototype, "slice", {
      value: function (start, end) {
        var o = ToObject(this);
        var lenVal = o.length;
        var len = ToUint32(lenVal);
        var relativeStart = ToInt32(start);
        var k =
          relativeStart < 0
            ? max(len + relativeStart, 0)
            : min(relativeStart, len);
        var relativeEnd = end === undefined ? len : ToInt32(end);
        var final =
          relativeEnd < 0 ? max(len + relativeEnd, 0) : min(relativeEnd, len);
        var count = final - k;
        var c = o.constructor;
        var a = new c(count);
        var n = 0;
        while (k < final) {
          var kValue = o._getter(k);
          a._setter(n, kValue);
          ++k;
          ++n;
        }
        return a;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "some", {
      value: function (callbackfn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        if (!IsCallable(callbackfn)) throw TypeError();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
          if (callbackfn.call(thisp, t._getter(i), i, t)) {
            return true;
          }
        }
        return false;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "sort", {
      value: function (comparefn) {
        if (this === undefined || this === null) throw TypeError();
        var t = Object(this);
        var len = ToUint32(t.length);
        var tmp = Array(len);
        for (var i = 0; i < len; ++i) tmp[i] = t._getter(i);
        if (comparefn) tmp.sort(comparefn);
        else tmp.sort();
        for (i = 0; i < len; ++i) t._setter(i, tmp[i]);
        return t;
      },
    });
    Object.defineProperty($TypedArray$.prototype, "subarray", {
      value: function (start, end) {
        function clamp(v, min, max) {
          return v < min ? min : v > max ? max : v;
        }
        start = ToInt32(start);
        end = ToInt32(end);
        if (arguments.length < 1) {
          start = 0;
        }
        if (arguments.length < 2) {
          end = this.length;
        }
        if (start < 0) {
          start = this.length + start;
        }
        if (end < 0) {
          end = this.length + end;
        }
        start = clamp(start, 0, this.length);
        end = clamp(end, 0, this.length);
        var len = end - start;
        if (len < 0) {
          len = 0;
        }
        return new this.constructor(
          this.buffer,
          this.byteOffset + start * this.BYTES_PER_ELEMENT,
          len
        );
      },
    });
    function makeTypedArray(elementSize, pack, unpack) {
      var TypedArray = function () {
        Object.defineProperty(this, "constructor", { value: TypedArray });
        $TypedArray$.apply(this, arguments);
        makeArrayAccessors(this);
      };
      if ("__proto__" in TypedArray) {
        TypedArray.__proto__ = $TypedArray$;
      } else {
        TypedArray.from = $TypedArray$.from;
        TypedArray.of = $TypedArray$.of;
      }
      TypedArray.BYTES_PER_ELEMENT = elementSize;
      var TypedArrayPrototype = function () {};
      TypedArrayPrototype.prototype = $TypedArrayPrototype$;
      TypedArray.prototype = new TypedArrayPrototype();
      Object.defineProperty(TypedArray.prototype, "BYTES_PER_ELEMENT", {
        value: elementSize,
      });
      Object.defineProperty(TypedArray.prototype, "_pack", { value: pack });
      Object.defineProperty(TypedArray.prototype, "_unpack", { value: unpack });
      return TypedArray;
    }
    var Int8Array = makeTypedArray(1, packI8, unpackI8);
    var Uint8Array = makeTypedArray(1, packU8, unpackU8);
    var Uint8ClampedArray = makeTypedArray(1, packU8Clamped, unpackU8);
    var Int16Array = makeTypedArray(2, packI16, unpackI16);
    var Uint16Array = makeTypedArray(2, packU16, unpackU16);
    var Int32Array = makeTypedArray(4, packI32, unpackI32);
    var Uint32Array = makeTypedArray(4, packU32, unpackU32);
    var Float32Array = makeTypedArray(4, packF32, unpackF32);
    var Float64Array = makeTypedArray(8, packF64, unpackF64);
    global.Int8Array = global.Int8Array || Int8Array;
    global.Uint8Array = global.Uint8Array || Uint8Array;
    global.Uint8ClampedArray = global.Uint8ClampedArray || Uint8ClampedArray;
    global.Int16Array = global.Int16Array || Int16Array;
    global.Uint16Array = global.Uint16Array || Uint16Array;
    global.Int32Array = global.Int32Array || Int32Array;
    global.Uint32Array = global.Uint32Array || Uint32Array;
    global.Float32Array = global.Float32Array || Float32Array;
    global.Float64Array = global.Float64Array || Float64Array;
  })();
  (function () {
    function r(array, index) {
      return IsCallable(array.get) ? array.get(index) : array[index];
    }
    var IS_BIG_ENDIAN = (function () {
      var u16array = new Uint16Array([0x1234]),
        u8array = new Uint8Array(u16array.buffer);
      return r(u8array, 0) === 0x12;
    })();
    function DataView(buffer, byteOffset, byteLength) {
      if (!(buffer instanceof ArrayBuffer || Class(buffer) === "ArrayBuffer"))
        throw TypeError();
      byteOffset = ToUint32(byteOffset);
      if (byteOffset > buffer.byteLength)
        throw RangeError("byteOffset out of range");
      if (byteLength === undefined) byteLength = buffer.byteLength - byteOffset;
      else byteLength = ToUint32(byteLength);
      if (byteOffset + byteLength > buffer.byteLength)
        throw RangeError(
          "byteOffset and length reference an area beyond the end of the buffer"
        );
      Object.defineProperty(this, "buffer", { value: buffer });
      Object.defineProperty(this, "byteLength", { value: byteLength });
      Object.defineProperty(this, "byteOffset", { value: byteOffset });
    }
    function makeGetter(arrayType) {
      return function GetViewValue(byteOffset, littleEndian) {
        byteOffset = ToUint32(byteOffset);
        if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength)
          throw RangeError("Array index out of range");
        byteOffset += this.byteOffset;
        var uint8Array = new Uint8Array(
            this.buffer,
            byteOffset,
            arrayType.BYTES_PER_ELEMENT
          ),
          bytes = [];
        for (var i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1)
          bytes.push(r(uint8Array, i));
        if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) bytes.reverse();
        return r(new arrayType(new Uint8Array(bytes).buffer), 0);
      };
    }
    Object.defineProperty(DataView.prototype, "getUint8", {
      value: makeGetter(Uint8Array),
    });
    Object.defineProperty(DataView.prototype, "getInt8", {
      value: makeGetter(Int8Array),
    });
    Object.defineProperty(DataView.prototype, "getUint16", {
      value: makeGetter(Uint16Array),
    });
    Object.defineProperty(DataView.prototype, "getInt16", {
      value: makeGetter(Int16Array),
    });
    Object.defineProperty(DataView.prototype, "getUint32", {
      value: makeGetter(Uint32Array),
    });
    Object.defineProperty(DataView.prototype, "getInt32", {
      value: makeGetter(Int32Array),
    });
    Object.defineProperty(DataView.prototype, "getFloat32", {
      value: makeGetter(Float32Array),
    });
    Object.defineProperty(DataView.prototype, "getFloat64", {
      value: makeGetter(Float64Array),
    });
    function makeSetter(arrayType) {
      return function SetViewValue(byteOffset, value, littleEndian) {
        byteOffset = ToUint32(byteOffset);
        if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength)
          throw RangeError("Array index out of range");
        var typeArray = new arrayType([value]),
          byteArray = new Uint8Array(typeArray.buffer),
          bytes = [],
          i,
          byteView;
        for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1)
          bytes.push(r(byteArray, i));
        if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) bytes.reverse();
        byteView = new Uint8Array(
          this.buffer,
          byteOffset,
          arrayType.BYTES_PER_ELEMENT
        );
        byteView.set(bytes);
      };
    }
    Object.defineProperty(DataView.prototype, "setUint8", {
      value: makeSetter(Uint8Array),
    });
    Object.defineProperty(DataView.prototype, "setInt8", {
      value: makeSetter(Int8Array),
    });
    Object.defineProperty(DataView.prototype, "setUint16", {
      value: makeSetter(Uint16Array),
    });
    Object.defineProperty(DataView.prototype, "setInt16", {
      value: makeSetter(Int16Array),
    });
    Object.defineProperty(DataView.prototype, "setUint32", {
      value: makeSetter(Uint32Array),
    });
    Object.defineProperty(DataView.prototype, "setInt32", {
      value: makeSetter(Int32Array),
    });
    Object.defineProperty(DataView.prototype, "setFloat32", {
      value: makeSetter(Float32Array),
    });
    Object.defineProperty(DataView.prototype, "setFloat64", {
      value: makeSetter(Float64Array),
    });
    global.DataView = global.DataView || DataView;
  })();
})(self);
(function (undefined) {
  "use strict";
  function clamp(val, length) {
    val = val | 0 || 0;
    if (val < 0) {
      return Math.max(val + length, 0);
    }
    return Math.min(val, length);
  }
  if (!ArrayBuffer.prototype.slice) {
    ArrayBuffer.prototype.slice = function (from, to) {
      var length = this.byteLength;
      var begin = clamp(from, length);
      var end = length;
      if (to !== undefined) {
        end = clamp(to, length);
      }
      if (begin > end) {
        return new ArrayBuffer(0);
      }
      var num = end - begin;
      var target = new ArrayBuffer(num);
      var targetArray = new Uint8Array(target);
      var sourceArray = new Uint8Array(this, begin, num);
      targetArray.set(sourceArray);
      return target;
    };
  }
})();
if (typeof module !== "undefined" && module.exports) {
  this["encoding-indexes"] = require("./encoding-indexes.js")[
    "encoding-indexes"
  ];
}
(function (global) {
  "use strict";
  function inRange(a, min, max) {
    return min <= a && a <= max;
  }
  function includes(array, item) {
    return array.indexOf(item) !== -1;
  }
  var floor = Math.floor;
  function ToDictionary(o) {
    if (o === undefined) return {};
    if (o === Object(o)) return o;
    throw TypeError("Could not convert argument to dictionary");
  }
  function stringToCodePoints(string) {
    var s = String(string);
    var n = s.length;
    var i = 0;
    var u = [];
    while (i < n) {
      var c = s.charCodeAt(i);
      if (c < 0xd800 || c > 0xdfff) {
        u.push(c);
      } else if (0xdc00 <= c && c <= 0xdfff) {
        u.push(0xfffd);
      } else if (0xd800 <= c && c <= 0xdbff) {
        if (i === n - 1) {
          u.push(0xfffd);
        } else {
          var d = string.charCodeAt(i + 1);
          if (0xdc00 <= d && d <= 0xdfff) {
            var a = c & 0x3ff;
            var b = d & 0x3ff;
            u.push(0x10000 + (a << 10) + b);
            i += 1;
          } else {
            u.push(0xfffd);
          }
        }
      }
      i += 1;
    }
    return u;
  }
  function codePointsToString(code_points) {
    var s = "";
    for (var i = 0; i < code_points.length; ++i) {
      var cp = code_points[i];
      if (cp <= 0xffff) {
        s += String.fromCharCode(cp);
      } else {
        cp -= 0x10000;
        s += String.fromCharCode((cp >> 10) + 0xd800, (cp & 0x3ff) + 0xdc00);
      }
    }
    return s;
  }
  function isASCIIByte(a) {
    return 0x00 <= a && a <= 0x7f;
  }
  var isASCIICodePoint = isASCIIByte;
  var end_of_stream = -1;
  function Stream(tokens) {
    this.tokens = [].slice.call(tokens);
    this.tokens.reverse();
  }
  Stream.prototype = {
    endOfStream: function () {
      return !this.tokens.length;
    },
    read: function () {
      if (!this.tokens.length) return end_of_stream;
      return this.tokens.pop();
    },
    prepend: function (token) {
      if (Array.isArray(token)) {
        var tokens = token;
        while (tokens.length) this.tokens.push(tokens.pop());
      } else {
        this.tokens.push(token);
      }
    },
    push: function (token) {
      if (Array.isArray(token)) {
        var tokens = token;
        while (tokens.length) this.tokens.unshift(tokens.shift());
      } else {
        this.tokens.unshift(token);
      }
    },
  };
  var finished = -1;
  function decoderError(fatal, opt_code_point) {
    if (fatal) throw TypeError("Decoder error");
    return opt_code_point || 0xfffd;
  }
  function encoderError(code_point) {
    throw TypeError("The code point " + code_point + " could not be encoded.");
  }
  function Decoder() {}
  Decoder.prototype = { handler: function (stream, bite) {} };
  function Encoder() {}
  Encoder.prototype = { handler: function (stream, code_point) {} };
  function getEncoding(label) {
    label = String(label).trim().toLowerCase();
    if (Object.prototype.hasOwnProperty.call(label_to_encoding, label)) {
      return label_to_encoding[label];
    }
    return null;
  }
  var encodings = [
    {
      encodings: [
        { labels: ["unicode-1-1-utf-8", "utf-8", "utf8"], name: "UTF-8" },
      ],
      heading: "The Encoding",
    },
    {
      encodings: [
        { labels: ["866", "cp866", "csibm866", "ibm866"], name: "IBM866" },
        {
          labels: [
            "csisolatin2",
            "iso-8859-2",
            "iso-ir-101",
            "iso8859-2",
            "iso88592",
            "iso_8859-2",
            "iso_8859-2:1987",
            "l2",
            "latin2",
          ],
          name: "ISO-8859-2",
        },
        {
          labels: [
            "csisolatin3",
            "iso-8859-3",
            "iso-ir-109",
            "iso8859-3",
            "iso88593",
            "iso_8859-3",
            "iso_8859-3:1988",
            "l3",
            "latin3",
          ],
          name: "ISO-8859-3",
        },
        {
          labels: [
            "csisolatin4",
            "iso-8859-4",
            "iso-ir-110",
            "iso8859-4",
            "iso88594",
            "iso_8859-4",
            "iso_8859-4:1988",
            "l4",
            "latin4",
          ],
          name: "ISO-8859-4",
        },
        {
          labels: [
            "csisolatincyrillic",
            "cyrillic",
            "iso-8859-5",
            "iso-ir-144",
            "iso8859-5",
            "iso88595",
            "iso_8859-5",
            "iso_8859-5:1988",
          ],
          name: "ISO-8859-5",
        },
        {
          labels: [
            "arabic",
            "asmo-708",
            "csiso88596e",
            "csiso88596i",
            "csisolatinarabic",
            "ecma-114",
            "iso-8859-6",
            "iso-8859-6-e",
            "iso-8859-6-i",
            "iso-ir-127",
            "iso8859-6",
            "iso88596",
            "iso_8859-6",
            "iso_8859-6:1987",
          ],
          name: "ISO-8859-6",
        },
        {
          labels: [
            "csisolatingreek",
            "ecma-118",
            "elot_928",
            "greek",
            "greek8",
            "iso-8859-7",
            "iso-ir-126",
            "iso8859-7",
            "iso88597",
            "iso_8859-7",
            "iso_8859-7:1987",
            "sun_eu_greek",
          ],
          name: "ISO-8859-7",
        },
        {
          labels: [
            "csiso88598e",
            "csisolatinhebrew",
            "hebrew",
            "iso-8859-8",
            "iso-8859-8-e",
            "iso-ir-138",
            "iso8859-8",
            "iso88598",
            "iso_8859-8",
            "iso_8859-8:1988",
            "visual",
          ],
          name: "ISO-8859-8",
        },
        {
          labels: ["csiso88598i", "iso-8859-8-i", "logical"],
          name: "ISO-8859-8-I",
        },
        {
          labels: [
            "csisolatin6",
            "iso-8859-10",
            "iso-ir-157",
            "iso8859-10",
            "iso885910",
            "l6",
            "latin6",
          ],
          name: "ISO-8859-10",
        },
        {
          labels: ["iso-8859-13", "iso8859-13", "iso885913"],
          name: "ISO-8859-13",
        },
        {
          labels: ["iso-8859-14", "iso8859-14", "iso885914"],
          name: "ISO-8859-14",
        },
        {
          labels: [
            "csisolatin9",
            "iso-8859-15",
            "iso8859-15",
            "iso885915",
            "iso_8859-15",
            "l9",
          ],
          name: "ISO-8859-15",
        },
        { labels: ["iso-8859-16"], name: "ISO-8859-16" },
        {
          labels: ["cskoi8r", "koi", "koi8", "koi8-r", "koi8_r"],
          name: "KOI8-R",
        },
        { labels: ["koi8-ru", "koi8-u"], name: "KOI8-U" },
        {
          labels: ["csmacintosh", "mac", "macintosh", "x-mac-roman"],
          name: "macintosh",
        },
        {
          labels: [
            "dos-874",
            "iso-8859-11",
            "iso8859-11",
            "iso885911",
            "tis-620",
            "windows-874",
          ],
          name: "windows-874",
        },
        {
          labels: ["cp1250", "windows-1250", "x-cp1250"],
          name: "windows-1250",
        },
        {
          labels: ["cp1251", "windows-1251", "x-cp1251"],
          name: "windows-1251",
        },
        {
          labels: [
            "ansi_x3.4-1968",
            "ascii",
            "cp1252",
            "cp819",
            "csisolatin1",
            "ibm819",
            "iso-8859-1",
            "iso-ir-100",
            "iso8859-1",
            "iso88591",
            "iso_8859-1",
            "iso_8859-1:1987",
            "l1",
            "latin1",
            "us-ascii",
            "windows-1252",
            "x-cp1252",
          ],
          name: "windows-1252",
        },
        {
          labels: ["cp1253", "windows-1253", "x-cp1253"],
          name: "windows-1253",
        },
        {
          labels: [
            "cp1254",
            "csisolatin5",
            "iso-8859-9",
            "iso-ir-148",
            "iso8859-9",
            "iso88599",
            "iso_8859-9",
            "iso_8859-9:1989",
            "l5",
            "latin5",
            "windows-1254",
            "x-cp1254",
          ],
          name: "windows-1254",
        },
        {
          labels: ["cp1255", "windows-1255", "x-cp1255"],
          name: "windows-1255",
        },
        {
          labels: ["cp1256", "windows-1256", "x-cp1256"],
          name: "windows-1256",
        },
        {
          labels: ["cp1257", "windows-1257", "x-cp1257"],
          name: "windows-1257",
        },
        {
          labels: ["cp1258", "windows-1258", "x-cp1258"],
          name: "windows-1258",
        },
        {
          labels: ["x-mac-cyrillic", "x-mac-ukrainian"],
          name: "x-mac-cyrillic",
        },
      ],
      heading: "Legacy single-byte encodings",
    },
    {
      encodings: [
        {
          labels: [
            "chinese",
            "csgb2312",
            "csiso58gb231280",
            "gb2312",
            "gb_2312",
            "gb_2312-80",
            "gbk",
            "iso-ir-58",
            "x-gbk",
          ],
          name: "GBK",
        },
        { labels: ["gb18030"], name: "gb18030" },
      ],
      heading: "Legacy multi-byte Chinese (simplified) encodings",
    },
    {
      encodings: [
        {
          labels: ["big5", "big5-hkscs", "cn-big5", "csbig5", "x-x-big5"],
          name: "Big5",
        },
      ],
      heading: "Legacy multi-byte Chinese (traditional) encodings",
    },
    {
      encodings: [
        {
          labels: ["cseucpkdfmtjapanese", "euc-jp", "x-euc-jp"],
          name: "EUC-JP",
        },
        { labels: ["csiso2022jp", "iso-2022-jp"], name: "ISO-2022-JP" },
        {
          labels: [
            "csshiftjis",
            "ms932",
            "ms_kanji",
            "shift-jis",
            "shift_jis",
            "sjis",
            "windows-31j",
            "x-sjis",
          ],
          name: "Shift_JIS",
        },
      ],
      heading: "Legacy multi-byte Japanese encodings",
    },
    {
      encodings: [
        {
          labels: [
            "cseuckr",
            "csksc56011987",
            "euc-kr",
            "iso-ir-149",
            "korean",
            "ks_c_5601-1987",
            "ks_c_5601-1989",
            "ksc5601",
            "ksc_5601",
            "windows-949",
          ],
          name: "EUC-KR",
        },
      ],
      heading: "Legacy multi-byte Korean encodings",
    },
    {
      encodings: [
        {
          labels: [
            "csiso2022kr",
            "hz-gb-2312",
            "iso-2022-cn",
            "iso-2022-cn-ext",
            "iso-2022-kr",
          ],
          name: "replacement",
        },
        { labels: ["utf-16be"], name: "UTF-16BE" },
        { labels: ["utf-16", "utf-16le"], name: "UTF-16LE" },
        { labels: ["x-user-defined"], name: "x-user-defined" },
      ],
      heading: "Legacy miscellaneous encodings",
    },
  ];
  var label_to_encoding = {};
  encodings.forEach(function (category) {
    category.encodings.forEach(function (encoding) {
      encoding.labels.forEach(function (label) {
        label_to_encoding[label] = encoding;
      });
    });
  });
  var encoders = {};
  var decoders = {};
  function indexCodePointFor(pointer, index) {
    if (!index) return null;
    return index[pointer] || null;
  }
  function indexPointerFor(code_point, index) {
    var pointer = index.indexOf(code_point);
    return pointer === -1 ? null : pointer;
  }
  function index(name) {
    if (!("encoding-indexes" in global)) {
      throw Error(
        "Indexes missing." + " Did you forget to include encoding-indexes.js?"
      );
    }
    return global["encoding-indexes"][name];
  }
  function indexGB18030RangesCodePointFor(pointer) {
    if ((pointer > 39419 && pointer < 189000) || pointer > 1237575) return null;
    if (pointer === 7457) return 0xe7c7;
    var offset = 0;
    var code_point_offset = 0;
    var idx = index("gb18030");
    var i;
    for (i = 0; i < idx.length; ++i) {
      var entry = idx[i];
      if (entry[0] <= pointer) {
        offset = entry[0];
        code_point_offset = entry[1];
      } else {
        break;
      }
    }
    return code_point_offset + pointer - offset;
  }
  function indexGB18030RangesPointerFor(code_point) {
    if (code_point === 0xe7c7) return 7457;
    var offset = 0;
    var pointer_offset = 0;
    var idx = index("gb18030");
    var i;
    for (i = 0; i < idx.length; ++i) {
      var entry = idx[i];
      if (entry[1] <= code_point) {
        offset = entry[1];
        pointer_offset = entry[0];
      } else {
        break;
      }
    }
    return pointer_offset + code_point - offset;
  }
  function indexShiftJISPointerFor(code_point) {
    var pointer = indexPointerFor(code_point, index("jis0208"));
    if (pointer === null || inRange(pointer, 8272, 8835)) return null;
    return pointer;
  }
  function indexBig5PointerFor(code_point) {
    var index_ = index("big5");
    if (
      code_point === 0x2550 ||
      code_point === 0x255e ||
      code_point === 0x2561 ||
      code_point === 0x256a ||
      code_point === 0x5341 ||
      code_point === 0x5345
    ) {
      return index_.lastIndexOf(code_point);
    }
    return indexPointerFor(code_point, index_);
  }
  var DEFAULT_ENCODING = "utf-8";
  function TextDecoder(label, options) {
    if (!(this instanceof TextDecoder))
      throw TypeError("Called as a function. Did you forget 'new'?");
    label = label !== undefined ? String(label) : DEFAULT_ENCODING;
    options = ToDictionary(options);
    this._encoding = null;
    this._decoder = null;
    this._ignoreBOM = false;
    this._BOMseen = false;
    this._error_mode = "replacement";
    this._do_not_flush = false;
    var encoding = getEncoding(label);
    if (encoding === null || encoding.name === "replacement")
      throw RangeError("Unknown encoding: " + label);
    if (!decoders[encoding.name]) {
      throw Error(
        "Decoder not present." +
          " Did you forget to include encoding-indexes.js?"
      );
    }
    var dec = this;
    dec._encoding = encoding;
    if (Boolean(options["fatal"])) dec._error_mode = "fatal";
    if (Boolean(options["ignoreBOM"])) dec._ignoreBOM = true;
    if (!Object.defineProperty) {
      this.encoding = dec._encoding.name.toLowerCase();
      this.fatal = dec._error_mode === "fatal";
      this.ignoreBOM = dec._ignoreBOM;
    }
    return dec;
  }
  if (Object.defineProperty) {
    Object.defineProperty(TextDecoder.prototype, "encoding", {
      get: function () {
        return this._encoding.name.toLowerCase();
      },
    });
    Object.defineProperty(TextDecoder.prototype, "fatal", {
      get: function () {
        return this._error_mode === "fatal";
      },
    });
    Object.defineProperty(TextDecoder.prototype, "ignoreBOM", {
      get: function () {
        return this._ignoreBOM;
      },
    });
  }
  TextDecoder.prototype.decode = function decode(input, options) {
    var bytes;
    if (typeof input === "object" && input instanceof ArrayBuffer) {
      bytes = new Uint8Array(input);
    } else if (
      typeof input === "object" &&
      "buffer" in input &&
      input.buffer instanceof ArrayBuffer
    ) {
      bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    } else {
      bytes = new Uint8Array(0);
    }
    options = ToDictionary(options);
    if (!this._do_not_flush) {
      this._decoder = decoders[this._encoding.name]({
        fatal: this._error_mode === "fatal",
      });
      this._BOMseen = false;
    }
    this._do_not_flush = Boolean(options["stream"]);
    var input_stream = new Stream(bytes);
    var output = [];
    var result;
    while (true) {
      var token = input_stream.read();
      if (token === end_of_stream) break;
      result = this._decoder.handler(input_stream, token);
      if (result === finished) break;
      if (result !== null) {
        if (Array.isArray(result)) output.push.apply(output, result);
        else output.push(result);
      }
    }
    if (!this._do_not_flush) {
      do {
        result = this._decoder.handler(input_stream, input_stream.read());
        if (result === finished) break;
        if (result === null) continue;
        if (Array.isArray(result)) output.push.apply(output, result);
        else output.push(result);
      } while (!input_stream.endOfStream());
      this._decoder = null;
    }
    function serializeStream(stream) {
      if (
        includes(["UTF-8", "UTF-16LE", "UTF-16BE"], this._encoding.name) &&
        !this._ignoreBOM &&
        !this._BOMseen
      ) {
        if (stream.length > 0 && stream[0] === 0xfeff) {
          this._BOMseen = true;
          stream.shift();
        } else if (stream.length > 0) {
          this._BOMseen = true;
        } else {
        }
      }
      return codePointsToString(stream);
    }
    return serializeStream.call(this, output);
  };
  function TextEncoder(label, options) {
    if (!(this instanceof TextEncoder))
      throw TypeError("Called as a function. Did you forget 'new'?");
    options = ToDictionary(options);
    this._encoding = null;
    this._encoder = null;
    this._do_not_flush = false;
    this._fatal = Boolean(options["fatal"]) ? "fatal" : "replacement";
    var enc = this;
    if (Boolean(options["NONSTANDARD_allowLegacyEncoding"])) {
      label = label !== undefined ? String(label) : DEFAULT_ENCODING;
      var encoding = getEncoding(label);
      if (encoding === null || encoding.name === "replacement")
        throw RangeError("Unknown encoding: " + label);
      if (!encoders[encoding.name]) {
        throw Error(
          "Encoder not present." +
            " Did you forget to include encoding-indexes.js?"
        );
      }
      enc._encoding = encoding;
    } else {
      enc._encoding = getEncoding("utf-8");
      if (label !== undefined && "console" in global) {
        console.warn(
          "TextEncoder constructor called with encoding label, " +
            "which is ignored."
        );
      }
    }
    if (!Object.defineProperty)
      this.encoding = enc._encoding.name.toLowerCase();
    return enc;
  }
  if (Object.defineProperty) {
    Object.defineProperty(TextEncoder.prototype, "encoding", {
      get: function () {
        return this._encoding.name.toLowerCase();
      },
    });
  }
  TextEncoder.prototype.encode = function encode(opt_string, options) {
    opt_string = opt_string ? String(opt_string) : "";
    options = ToDictionary(options);
    if (!this._do_not_flush)
      this._encoder = encoders[this._encoding.name]({
        fatal: this._fatal === "fatal",
      });
    this._do_not_flush = Boolean(options["stream"]);
    var input = new Stream(stringToCodePoints(opt_string));
    var output = [];
    var result;
    while (true) {
      var token = input.read();
      if (token === end_of_stream) break;
      result = this._encoder.handler(input, token);
      if (result === finished) break;
      if (Array.isArray(result)) output.push.apply(output, result);
      else output.push(result);
    }
    if (!this._do_not_flush) {
      while (true) {
        result = this._encoder.handler(input, input.read());
        if (result === finished) break;
        if (Array.isArray(result)) output.push.apply(output, result);
        else output.push(result);
      }
      this._encoder = null;
    }
    return new Uint8Array(output);
  };
  function UTF8Decoder(options) {
    var fatal = options.fatal;
    var utf8_code_point = 0,
      utf8_bytes_seen = 0,
      utf8_bytes_needed = 0,
      utf8_lower_boundary = 0x80,
      utf8_upper_boundary = 0xbf;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream && utf8_bytes_needed !== 0) {
        utf8_bytes_needed = 0;
        return decoderError(fatal);
      }
      if (bite === end_of_stream) return finished;
      if (utf8_bytes_needed === 0) {
        if (inRange(bite, 0x00, 0x7f)) {
          return bite;
        }
        if (inRange(bite, 0xc2, 0xdf)) {
          utf8_bytes_needed = 1;
          utf8_code_point = bite - 0xc0;
        } else if (inRange(bite, 0xe0, 0xef)) {
          if (bite === 0xe0) utf8_lower_boundary = 0xa0;
          if (bite === 0xed) utf8_upper_boundary = 0x9f;
          utf8_bytes_needed = 2;
          utf8_code_point = bite - 0xe0;
        } else if (inRange(bite, 0xf0, 0xf4)) {
          if (bite === 0xf0) utf8_lower_boundary = 0x90;
          if (bite === 0xf4) utf8_upper_boundary = 0x8f;
          utf8_bytes_needed = 3;
          utf8_code_point = bite - 0xf0;
        } else {
          return decoderError(fatal);
        }
        utf8_code_point = utf8_code_point << (6 * utf8_bytes_needed);
        return null;
      }
      if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
        utf8_lower_boundary = 0x80;
        utf8_upper_boundary = 0xbf;
        stream.prepend(bite);
        return decoderError(fatal);
      }
      utf8_lower_boundary = 0x80;
      utf8_upper_boundary = 0xbf;
      utf8_bytes_seen += 1;
      utf8_code_point +=
        (bite - 0x80) << (6 * (utf8_bytes_needed - utf8_bytes_seen));
      if (utf8_bytes_seen !== utf8_bytes_needed) return null;
      var code_point = utf8_code_point;
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
      return code_point;
    };
  }
  function UTF8Encoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (inRange(code_point, 0x0000, 0x007f)) return code_point;
      var count, offset;
      if (inRange(code_point, 0x0080, 0x07ff)) {
        count = 1;
        offset = 0xc0;
      } else if (inRange(code_point, 0x0800, 0xffff)) {
        count = 2;
        offset = 0xe0;
      } else if (inRange(code_point, 0x10000, 0x10ffff)) {
        count = 3;
        offset = 0xf0;
      }
      var bytes = [(code_point >> (6 * count)) + offset];
      while (count > 0) {
        var temp = code_point >> (6 * (count - 1));
        bytes.push(0x80 | (temp & 0x3f));
        count -= 1;
      }
      return bytes;
    };
  }
  encoders["UTF-8"] = function (options) {
    return new UTF8Encoder(options);
  };
  decoders["UTF-8"] = function (options) {
    return new UTF8Decoder(options);
  };
  function SingleByteDecoder(index, options) {
    var fatal = options.fatal;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream) return finished;
      if (isASCIIByte(bite)) return bite;
      var code_point = index[bite - 0x80];
      if (code_point === null) return decoderError(fatal);
      return code_point;
    };
  }
  function SingleByteEncoder(index, options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point)) return code_point;
      var pointer = indexPointerFor(code_point, index);
      if (pointer === null) encoderError(code_point);
      return pointer + 0x80;
    };
  }
  (function () {
    if (!("encoding-indexes" in global)) return;
    encodings.forEach(function (category) {
      if (category.heading !== "Legacy single-byte encodings") return;
      category.encodings.forEach(function (encoding) {
        var name = encoding.name;
        var idx = index(name.toLowerCase());
        decoders[name] = function (options) {
          return new SingleByteDecoder(idx, options);
        };
        encoders[name] = function (options) {
          return new SingleByteEncoder(idx, options);
        };
      });
    });
  })();
  decoders["GBK"] = function (options) {
    return new GB18030Decoder(options);
  };
  encoders["GBK"] = function (options) {
    return new GB18030Encoder(options, true);
  };
  function GB18030Decoder(options) {
    var fatal = options.fatal;
    var gb18030_first = 0x00,
      gb18030_second = 0x00,
      gb18030_third = 0x00;
    this.handler = function (stream, bite) {
      if (
        bite === end_of_stream &&
        gb18030_first === 0x00 &&
        gb18030_second === 0x00 &&
        gb18030_third === 0x00
      ) {
        return finished;
      }
      if (
        bite === end_of_stream &&
        (gb18030_first !== 0x00 ||
          gb18030_second !== 0x00 ||
          gb18030_third !== 0x00)
      ) {
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        decoderError(fatal);
      }
      var code_point;
      if (gb18030_third !== 0x00) {
        code_point = null;
        if (inRange(bite, 0x30, 0x39)) {
          code_point = indexGB18030RangesCodePointFor(
            (((gb18030_first - 0x81) * 10 + (gb18030_second - 0x30)) * 126 +
              (gb18030_third - 0x81)) *
              10 +
              bite -
              0x30
          );
        }
        var buffer = [gb18030_second, gb18030_third, bite];
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        if (code_point === null) {
          stream.prepend(buffer);
          return decoderError(fatal);
        }
        return code_point;
      }
      if (gb18030_second !== 0x00) {
        if (inRange(bite, 0x81, 0xfe)) {
          gb18030_third = bite;
          return null;
        }
        stream.prepend([gb18030_second, bite]);
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        return decoderError(fatal);
      }
      if (gb18030_first !== 0x00) {
        if (inRange(bite, 0x30, 0x39)) {
          gb18030_second = bite;
          return null;
        }
        var lead = gb18030_first;
        var pointer = null;
        gb18030_first = 0x00;
        var offset = bite < 0x7f ? 0x40 : 0x41;
        if (inRange(bite, 0x40, 0x7e) || inRange(bite, 0x80, 0xfe))
          pointer = (lead - 0x81) * 190 + (bite - offset);
        code_point =
          pointer === null
            ? null
            : indexCodePointFor(pointer, index("gb18030"));
        if (code_point === null && isASCIIByte(bite)) stream.prepend(bite);
        if (code_point === null) return decoderError(fatal);
        return code_point;
      }
      if (isASCIIByte(bite)) return bite;
      if (bite === 0x80) return 0x20ac;
      if (inRange(bite, 0x81, 0xfe)) {
        gb18030_first = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }
  function GB18030Encoder(options, gbk_flag) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point)) return code_point;
      if (code_point === 0xe5e5) return encoderError(code_point);
      if (gbk_flag && code_point === 0x20ac) return 0x80;
      var pointer = indexPointerFor(code_point, index("gb18030"));
      if (pointer !== null) {
        var lead = floor(pointer / 190) + 0x81;
        var trail = pointer % 190;
        var offset = trail < 0x3f ? 0x40 : 0x41;
        return [lead, trail + offset];
      }
      if (gbk_flag) return encoderError(code_point);
      pointer = indexGB18030RangesPointerFor(code_point);
      var byte1 = floor(pointer / 10 / 126 / 10);
      pointer = pointer - byte1 * 10 * 126 * 10;
      var byte2 = floor(pointer / 10 / 126);
      pointer = pointer - byte2 * 10 * 126;
      var byte3 = floor(pointer / 10);
      var byte4 = pointer - byte3 * 10;
      return [byte1 + 0x81, byte2 + 0x30, byte3 + 0x81, byte4 + 0x30];
    };
  }
  encoders["gb18030"] = function (options) {
    return new GB18030Encoder(options);
  };
  decoders["gb18030"] = function (options) {
    return new GB18030Decoder(options);
  };
  function Big5Decoder(options) {
    var fatal = options.fatal;
    var big5_lead = 0x00;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream && big5_lead !== 0x00) {
        big5_lead = 0x00;
        return decoderError(fatal);
      }
      if (bite === end_of_stream && big5_lead === 0x00) return finished;
      if (big5_lead !== 0x00) {
        var lead = big5_lead;
        var pointer = null;
        big5_lead = 0x00;
        var offset = bite < 0x7f ? 0x40 : 0x62;
        if (inRange(bite, 0x40, 0x7e) || inRange(bite, 0xa1, 0xfe))
          pointer = (lead - 0x81) * 157 + (bite - offset);
        switch (pointer) {
          case 1133:
            return [0x00ca, 0x0304];
          case 1135:
            return [0x00ca, 0x030c];
          case 1164:
            return [0x00ea, 0x0304];
          case 1166:
            return [0x00ea, 0x030c];
        }
        var code_point =
          pointer === null ? null : indexCodePointFor(pointer, index("big5"));
        if (code_point === null && isASCIIByte(bite)) stream.prepend(bite);
        if (code_point === null) return decoderError(fatal);
        return code_point;
      }
      if (isASCIIByte(bite)) return bite;
      if (inRange(bite, 0x81, 0xfe)) {
        big5_lead = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }
  function Big5Encoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point)) return code_point;
      var pointer = indexBig5PointerFor(code_point);
      if (pointer === null) return encoderError(code_point);
      var lead = floor(pointer / 157) + 0x81;
      if (lead < 0xa1) return encoderError(code_point);
      var trail = pointer % 157;
      var offset = trail < 0x3f ? 0x40 : 0x62;
      return [lead, trail + offset];
    };
  }
  encoders["Big5"] = function (options) {
    return new Big5Encoder(options);
  };
  decoders["Big5"] = function (options) {
    return new Big5Decoder(options);
  };
  function EUCJPDecoder(options) {
    var fatal = options.fatal;
    var eucjp_jis0212_flag = false,
      eucjp_lead = 0x00;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream && eucjp_lead !== 0x00) {
        eucjp_lead = 0x00;
        return decoderError(fatal);
      }
      if (bite === end_of_stream && eucjp_lead === 0x00) return finished;
      if (eucjp_lead === 0x8e && inRange(bite, 0xa1, 0xdf)) {
        eucjp_lead = 0x00;
        return 0xff61 + bite - 0xa1;
      }
      if (eucjp_lead === 0x8f && inRange(bite, 0xa1, 0xfe)) {
        eucjp_jis0212_flag = true;
        eucjp_lead = bite;
        return null;
      }
      if (eucjp_lead !== 0x00) {
        var lead = eucjp_lead;
        eucjp_lead = 0x00;
        var code_point = null;
        if (inRange(lead, 0xa1, 0xfe) && inRange(bite, 0xa1, 0xfe)) {
          code_point = indexCodePointFor(
            (lead - 0xa1) * 94 + (bite - 0xa1),
            index(!eucjp_jis0212_flag ? "jis0208" : "jis0212")
          );
        }
        eucjp_jis0212_flag = false;
        if (!inRange(bite, 0xa1, 0xfe)) stream.prepend(bite);
        if (code_point === null) return decoderError(fatal);
        return code_point;
      }
      if (isASCIIByte(bite)) return bite;
      if (bite === 0x8e || bite === 0x8f || inRange(bite, 0xa1, 0xfe)) {
        eucjp_lead = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }
  function EUCJPEncoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point)) return code_point;
      if (code_point === 0x00a5) return 0x5c;
      if (code_point === 0x203e) return 0x7e;
      if (inRange(code_point, 0xff61, 0xff9f))
        return [0x8e, code_point - 0xff61 + 0xa1];
      if (code_point === 0x2212) code_point = 0xff0d;
      var pointer = indexPointerFor(code_point, index("jis0208"));
      if (pointer === null) return encoderError(code_point);
      var lead = floor(pointer / 94) + 0xa1;
      var trail = (pointer % 94) + 0xa1;
      return [lead, trail];
    };
  }
  encoders["EUC-JP"] = function (options) {
    return new EUCJPEncoder(options);
  };
  decoders["EUC-JP"] = function (options) {
    return new EUCJPDecoder(options);
  };
  function ISO2022JPDecoder(options) {
    var fatal = options.fatal;
    var states = {
      ASCII: 0,
      Roman: 1,
      Katakana: 2,
      LeadByte: 3,
      TrailByte: 4,
      EscapeStart: 5,
      Escape: 6,
    };
    var iso2022jp_decoder_state = states.ASCII,
      iso2022jp_decoder_output_state = states.ASCII,
      iso2022jp_lead = 0x00,
      iso2022jp_output_flag = false;
    this.handler = function (stream, bite) {
      switch (iso2022jp_decoder_state) {
        default:
        case states.ASCII:
          if (bite === 0x1b) {
            iso2022jp_decoder_state = states.EscapeStart;
            return null;
          }
          if (
            inRange(bite, 0x00, 0x7f) &&
            bite !== 0x0e &&
            bite !== 0x0f &&
            bite !== 0x1b
          ) {
            iso2022jp_output_flag = false;
            return bite;
          }
          if (bite === end_of_stream) {
            return finished;
          }
          iso2022jp_output_flag = false;
          return decoderError(fatal);
        case states.Roman:
          if (bite === 0x1b) {
            iso2022jp_decoder_state = states.EscapeStart;
            return null;
          }
          if (bite === 0x5c) {
            iso2022jp_output_flag = false;
            return 0x00a5;
          }
          if (bite === 0x7e) {
            iso2022jp_output_flag = false;
            return 0x203e;
          }
          if (
            inRange(bite, 0x00, 0x7f) &&
            bite !== 0x0e &&
            bite !== 0x0f &&
            bite !== 0x1b &&
            bite !== 0x5c &&
            bite !== 0x7e
          ) {
            iso2022jp_output_flag = false;
            return bite;
          }
          if (bite === end_of_stream) {
            return finished;
          }
          iso2022jp_output_flag = false;
          return decoderError(fatal);
        case states.Katakana:
          if (bite === 0x1b) {
            iso2022jp_decoder_state = states.EscapeStart;
            return null;
          }
          if (inRange(bite, 0x21, 0x5f)) {
            iso2022jp_output_flag = false;
            return 0xff61 + bite - 0x21;
          }
          if (bite === end_of_stream) {
            return finished;
          }
          iso2022jp_output_flag = false;
          return decoderError(fatal);
        case states.LeadByte:
          if (bite === 0x1b) {
            iso2022jp_decoder_state = states.EscapeStart;
            return null;
          }
          if (inRange(bite, 0x21, 0x7e)) {
            iso2022jp_output_flag = false;
            iso2022jp_lead = bite;
            iso2022jp_decoder_state = states.TrailByte;
            return null;
          }
          if (bite === end_of_stream) {
            return finished;
          }
          iso2022jp_output_flag = false;
          return decoderError(fatal);
        case states.TrailByte:
          if (bite === 0x1b) {
            iso2022jp_decoder_state = states.EscapeStart;
            return decoderError(fatal);
          }
          if (inRange(bite, 0x21, 0x7e)) {
            iso2022jp_decoder_state = states.LeadByte;
            var pointer = (iso2022jp_lead - 0x21) * 94 + bite - 0x21;
            var code_point = indexCodePointFor(pointer, index("jis0208"));
            if (code_point === null) return decoderError(fatal);
            return code_point;
          }
          if (bite === end_of_stream) {
            iso2022jp_decoder_state = states.LeadByte;
            stream.prepend(bite);
            return decoderError(fatal);
          }
          iso2022jp_decoder_state = states.LeadByte;
          return decoderError(fatal);
        case states.EscapeStart:
          if (bite === 0x24 || bite === 0x28) {
            iso2022jp_lead = bite;
            iso2022jp_decoder_state = states.Escape;
            return null;
          }
          stream.prepend(bite);
          iso2022jp_output_flag = false;
          iso2022jp_decoder_state = iso2022jp_decoder_output_state;
          return decoderError(fatal);
        case states.Escape:
          var lead = iso2022jp_lead;
          iso2022jp_lead = 0x00;
          var state = null;
          if (lead === 0x28 && bite === 0x42) state = states.ASCII;
          if (lead === 0x28 && bite === 0x4a) state = states.Roman;
          if (lead === 0x28 && bite === 0x49) state = states.Katakana;
          if (lead === 0x24 && (bite === 0x40 || bite === 0x42))
            state = states.LeadByte;
          if (state !== null) {
            iso2022jp_decoder_state = iso2022jp_decoder_state = state;
            var output_flag = iso2022jp_output_flag;
            iso2022jp_output_flag = true;
            return !output_flag ? null : decoderError(fatal);
          }
          stream.prepend([lead, bite]);
          iso2022jp_output_flag = false;
          iso2022jp_decoder_state = iso2022jp_decoder_output_state;
          return decoderError(fatal);
      }
    };
  }
  function ISO2022JPEncoder(options) {
    var fatal = options.fatal;
    var states = { ASCII: 0, Roman: 1, jis0208: 2 };
    var iso2022jp_state = states.ASCII;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream && iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1b, 0x28, 0x42];
      }
      if (code_point === end_of_stream && iso2022jp_state === states.ASCII)
        return finished;
      if (
        (iso2022jp_state === states.ASCII ||
          iso2022jp_state === states.Roman) &&
        (code_point === 0x000e ||
          code_point === 0x000f ||
          code_point === 0x001b)
      ) {
        return encoderError(0xfffd);
      }
      if (iso2022jp_state === states.ASCII && isASCIICodePoint(code_point))
        return code_point;
      if (
        iso2022jp_state === states.Roman &&
        ((isASCIICodePoint(code_point) &&
          code_point !== 0x005c &&
          code_point !== 0x007e) ||
          code_point == 0x00a5 ||
          code_point == 0x203e)
      ) {
        if (isASCIICodePoint(code_point)) return code_point;
        if (code_point === 0x00a5) return 0x5c;
        if (code_point === 0x203e) return 0x7e;
      }
      if (isASCIICodePoint(code_point) && iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1b, 0x28, 0x42];
      }
      if (
        (code_point === 0x00a5 || code_point === 0x203e) &&
        iso2022jp_state !== states.Roman
      ) {
        stream.prepend(code_point);
        iso2022jp_state = states.Roman;
        return [0x1b, 0x28, 0x4a];
      }
      if (code_point === 0x2212) code_point = 0xff0d;
      var pointer = indexPointerFor(code_point, index("jis0208"));
      if (pointer === null) return encoderError(code_point);
      if (iso2022jp_state !== states.jis0208) {
        stream.prepend(code_point);
        iso2022jp_state = states.jis0208;
        return [0x1b, 0x24, 0x42];
      }
      var lead = floor(pointer / 94) + 0x21;
      var trail = (pointer % 94) + 0x21;
      return [lead, trail];
    };
  }
  encoders["ISO-2022-JP"] = function (options) {
    return new ISO2022JPEncoder(options);
  };
  decoders["ISO-2022-JP"] = function (options) {
    return new ISO2022JPDecoder(options);
  };
  function ShiftJISDecoder(options) {
    var fatal = options.fatal;
    var shiftjis_lead = 0x00;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream && shiftjis_lead !== 0x00) {
        shiftjis_lead = 0x00;
        return decoderError(fatal);
      }
      if (bite === end_of_stream && shiftjis_lead === 0x00) return finished;
      if (shiftjis_lead !== 0x00) {
        var lead = shiftjis_lead;
        var pointer = null;
        shiftjis_lead = 0x00;
        var offset = bite < 0x7f ? 0x40 : 0x41;
        var lead_offset = lead < 0xa0 ? 0x81 : 0xc1;
        if (inRange(bite, 0x40, 0x7e) || inRange(bite, 0x80, 0xfc))
          pointer = (lead - lead_offset) * 188 + bite - offset;
        var code_point =
          pointer === null
            ? null
            : indexCodePointFor(pointer, index("jis0208"));
        if (
          code_point === null &&
          pointer !== null &&
          inRange(pointer, 8836, 10528)
        )
          return 0xe000 + pointer - 8836;
        if (code_point === null && isASCIIByte(bite)) stream.prepend(bite);
        if (code_point === null) return decoderError(fatal);
        return code_point;
      }
      if (isASCIIByte(bite) || bite === 0x80) return bite;
      if (inRange(bite, 0xa1, 0xdf)) return 0xff61 + bite - 0xa1;
      if (inRange(bite, 0x81, 0x9f) || inRange(bite, 0xe0, 0xfc)) {
        shiftjis_lead = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }
  function ShiftJISEncoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point) || code_point === 0x0080)
        return code_point;
      if (code_point === 0x00a5) return 0x5c;
      if (code_point === 0x203e) return 0x7e;
      if (inRange(code_point, 0xff61, 0xff9f))
        return code_point - 0xff61 + 0xa1;
      if (code_point === 0x2212) code_point = 0xff0d;
      var pointer = indexShiftJISPointerFor(code_point);
      if (pointer === null) return encoderError(code_point);
      var lead = floor(pointer / 188);
      var lead_offset = lead < 0x1f ? 0x81 : 0xc1;
      var trail = pointer % 188;
      var offset = trail < 0x3f ? 0x40 : 0x41;
      return [lead + lead_offset, trail + offset];
    };
  }
  encoders["Shift_JIS"] = function (options) {
    return new ShiftJISEncoder(options);
  };
  decoders["Shift_JIS"] = function (options) {
    return new ShiftJISDecoder(options);
  };
  function EUCKRDecoder(options) {
    var fatal = options.fatal;
    var euckr_lead = 0x00;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream && euckr_lead !== 0) {
        euckr_lead = 0x00;
        return decoderError(fatal);
      }
      if (bite === end_of_stream && euckr_lead === 0) return finished;
      if (euckr_lead !== 0x00) {
        var lead = euckr_lead;
        var pointer = null;
        euckr_lead = 0x00;
        if (inRange(bite, 0x41, 0xfe))
          pointer = (lead - 0x81) * 190 + (bite - 0x41);
        var code_point =
          pointer === null ? null : indexCodePointFor(pointer, index("euc-kr"));
        if (pointer === null && isASCIIByte(bite)) stream.prepend(bite);
        if (code_point === null) return decoderError(fatal);
        return code_point;
      }
      if (isASCIIByte(bite)) return bite;
      if (inRange(bite, 0x81, 0xfe)) {
        euckr_lead = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }
  function EUCKREncoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point)) return code_point;
      var pointer = indexPointerFor(code_point, index("euc-kr"));
      if (pointer === null) return encoderError(code_point);
      var lead = floor(pointer / 190) + 0x81;
      var trail = (pointer % 190) + 0x41;
      return [lead, trail];
    };
  }
  encoders["EUC-KR"] = function (options) {
    return new EUCKREncoder(options);
  };
  decoders["EUC-KR"] = function (options) {
    return new EUCKRDecoder(options);
  };
  function convertCodeUnitToBytes(code_unit, utf16be) {
    var byte1 = code_unit >> 8;
    var byte2 = code_unit & 0x00ff;
    if (utf16be) return [byte1, byte2];
    return [byte2, byte1];
  }
  function UTF16Decoder(utf16_be, options) {
    var fatal = options.fatal;
    var utf16_lead_byte = null,
      utf16_lead_surrogate = null;
    this.handler = function (stream, bite) {
      if (
        bite === end_of_stream &&
        (utf16_lead_byte !== null || utf16_lead_surrogate !== null)
      ) {
        return decoderError(fatal);
      }
      if (
        bite === end_of_stream &&
        utf16_lead_byte === null &&
        utf16_lead_surrogate === null
      ) {
        return finished;
      }
      if (utf16_lead_byte === null) {
        utf16_lead_byte = bite;
        return null;
      }
      var code_unit;
      if (utf16_be) {
        code_unit = (utf16_lead_byte << 8) + bite;
      } else {
        code_unit = (bite << 8) + utf16_lead_byte;
      }
      utf16_lead_byte = null;
      if (utf16_lead_surrogate !== null) {
        var lead_surrogate = utf16_lead_surrogate;
        utf16_lead_surrogate = null;
        if (inRange(code_unit, 0xdc00, 0xdfff)) {
          return (
            0x10000 + (lead_surrogate - 0xd800) * 0x400 + (code_unit - 0xdc00)
          );
        }
        stream.prepend(convertCodeUnitToBytes(code_unit, utf16_be));
        return decoderError(fatal);
      }
      if (inRange(code_unit, 0xd800, 0xdbff)) {
        utf16_lead_surrogate = code_unit;
        return null;
      }
      if (inRange(code_unit, 0xdc00, 0xdfff)) return decoderError(fatal);
      return code_unit;
    };
  }
  function UTF16Encoder(utf16_be, options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (inRange(code_point, 0x0000, 0xffff))
        return convertCodeUnitToBytes(code_point, utf16_be);
      var lead = convertCodeUnitToBytes(
        ((code_point - 0x10000) >> 10) + 0xd800,
        utf16_be
      );
      var trail = convertCodeUnitToBytes(
        ((code_point - 0x10000) & 0x3ff) + 0xdc00,
        utf16_be
      );
      return lead.concat(trail);
    };
  }
  encoders["UTF-16BE"] = function (options) {
    return new UTF16Encoder(true, options);
  };
  decoders["UTF-16BE"] = function (options) {
    return new UTF16Decoder(true, options);
  };
  encoders["UTF-16LE"] = function (options) {
    return new UTF16Encoder(false, options);
  };
  decoders["UTF-16LE"] = function (options) {
    return new UTF16Decoder(false, options);
  };
  function XUserDefinedDecoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, bite) {
      if (bite === end_of_stream) return finished;
      if (isASCIIByte(bite)) return bite;
      return 0xf780 + bite - 0x80;
    };
  }
  function XUserDefinedEncoder(options) {
    var fatal = options.fatal;
    this.handler = function (stream, code_point) {
      if (code_point === end_of_stream) return finished;
      if (isASCIICodePoint(code_point)) return code_point;
      if (inRange(code_point, 0xf780, 0xf7ff))
        return code_point - 0xf780 + 0x80;
      return encoderError(code_point);
    };
  }
  encoders["x-user-defined"] = function (options) {
    return new XUserDefinedEncoder(options);
  };
  decoders["x-user-defined"] = function (options) {
    return new XUserDefinedDecoder(options);
  };
  if (!global["TextEncoder"]) global["TextEncoder"] = TextEncoder;
  if (!global["TextDecoder"]) global["TextDecoder"] = TextDecoder;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      TextEncoder: global["TextEncoder"],
      TextDecoder: global["TextDecoder"],
      EncodingIndexes: global["encoding-indexes"],
    };
  }
})(this);
(function () {
  var origInitByEnvironment;
  if (typeof fetch !== "function" || !("keepalive" in new Request(""))) {
    return;
  }
  origInitByEnvironment = TinCan.LRS.prototype._initByEnvironment;
  TinCan.LRS.prototype._initByEnvironment = function (cfg) {
    var lrs = this,
      origMakeRequest;
    origInitByEnvironment.call(this, cfg);
    origMakeRequest = this._makeRequest;
    this._makeRequest = function (_fullUrl, headers, cfg) {
      var origResult = origMakeRequest.apply(lrs, arguments),
        pairs = [],
        fullUrl = _fullUrl,
        fetchRequestCfg;
      if (typeof cfg.callback !== "undefined") {
        return origResult;
      }
      if (!blnUnloading) {
        return origResult;
      }
      if (
        typeof origResult.err === "undefined" ||
        origResult.err === null ||
        origResult.err !== 0
      ) {
        return origResult;
      }
      for (prop in cfg.params) {
        if (cfg.params.hasOwnProperty(prop)) {
          pairs.push(prop + "=" + encodeURIComponent(cfg.params[prop]));
        }
      }
      fullUrl = lrs._IEModeConversion(fullUrl, headers, pairs, cfg);
      fetchRequestCfg = {
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        keepalive: true,
        method: cfg.method,
        headers: { "Content-Type": headers["Content-Type"] },
        body: cfg.data,
      };
      try {
        fetch(fullUrl, fetchRequestCfg)
          .then(function (response) {
            lrs.log(
              "Overridden request Fetch with KeepAlive finished with status " +
                response.status +
                ":" +
                response.statusText
            );
          })
          ["catch"](function (e) {
            lrs.log(
              "Overridden request Fetch with KeepAlive returned error: " +
                e.message
            );
          });
        return { err: null };
      } catch (e) {
        lrs.log(
          "Overridden request Fetch with KeepAlive threw error: " + e.message
        );
        return { err: e.message, xhr: null };
      }
    };
  };
})();
(function (root) {
  var freeExports = typeof exports == "object" && exports;
  var freeModule =
    typeof module == "object" &&
    module &&
    module.exports == freeExports &&
    module;
  var freeGlobal = typeof global == "object" && global;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    root = freeGlobal;
  }
  var punycode,
    maxInt = 2147483647,
    base = 36,
    tMin = 1,
    tMax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128,
    delimiter = "-",
    regexPunycode = /^xn--/,
    regexNonASCII = /[^ -~]/,
    regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g,
    errors = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input",
    },
    baseMinusTMin = base - tMin,
    floor = Math.floor,
    stringFromCharCode = String.fromCharCode,
    key;
  function error(type) {
    throw RangeError(errors[type]);
  }
  function map(array, fn) {
    var length = array.length;
    while (length--) {
      array[length] = fn(array[length]);
    }
    return array;
  }
  function mapDomain(string, fn) {
    return map(string.split(regexSeparators), fn).join(".");
  }
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xd800 && value <= 0xdbff && counter < length) {
        extra = string.charCodeAt(counter++);
        if ((extra & 0xfc00) == 0xdc00) {
          output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  function ucs2encode(array) {
    return map(array, function (value) {
      var output = "";
      if (value > 0xffff) {
        value -= 0x10000;
        output += stringFromCharCode(((value >>> 10) & 0x3ff) | 0xd800);
        value = 0xdc00 | (value & 0x3ff);
      }
      output += stringFromCharCode(value);
      return output;
    }).join("");
  }
  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }
    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }
    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }
    return base;
  }
  function digitToBasic(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > (baseMinusTMin * tMax) >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
  }
  function decode(input) {
    var output = [],
      inputLength = input.length,
      out,
      i = 0,
      n = initialN,
      bias = initialBias,
      basic,
      j,
      index,
      oldi,
      w,
      k,
      digit,
      t,
      length,
      baseMinusT;
    basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }
    for (j = 0; j < basic; ++j) {
      if (input.charCodeAt(j) >= 0x80) {
        error("not-basic");
      }
      output.push(input.charCodeAt(j));
    }
    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
      for (oldi = i, w = 1, k = base; ; k += base) {
        if (index >= inputLength) {
          error("invalid-input");
        }
        digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error("overflow");
        }
        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
        if (digit < t) {
          break;
        }
        baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error("overflow");
        }
        w *= baseMinusT;
      }
      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);
      if (floor(i / out) > maxInt - n) {
        error("overflow");
      }
      n += floor(i / out);
      i %= out;
      output.splice(i++, 0, n);
    }
    return ucs2encode(output);
  }
  function encode(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      inputLength,
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT;
    input = ucs2decode(input);
    inputLength = input.length;
    n = initialN;
    delta = 0;
    bias = initialBias;
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    handledCPCount = basicLength = output.length;
    if (basicLength) {
      output.push(delimiter);
    }
    while (handledCPCount < inputLength) {
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error("overflow");
      }
      delta += (m - n) * handledCPCountPlusOne;
      n = m;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < n && ++delta > maxInt) {
          error("overflow");
        }
        if (currentValue == n) {
          for (q = delta, k = base; ; k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + (qMinusT % baseMinusT), 0))
            );
            q = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(
            delta,
            handledCPCountPlusOne,
            handledCPCount == basicLength
          );
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join("");
  }
  function toUnicode(domain) {
    return mapDomain(domain, function (string) {
      return regexPunycode.test(string)
        ? decode(string.slice(4).toLowerCase())
        : string;
    });
  }
  function toASCII(domain) {
    return mapDomain(domain, function (string) {
      return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
    });
  }
  punycode = {
    version: "1.2.3",
    ucs2: { decode: ucs2decode, encode: ucs2encode },
    decode: decode,
    encode: encode,
    toASCII: toASCII,
    toUnicode: toUnicode,
  };
  if (
    typeof define == "function" &&
    typeof define.amd == "object" &&
    define.amd
  ) {
    define(function () {
      return punycode;
    });
  } else if (freeExports && !freeExports.nodeType) {
    if (freeModule) {
      freeModule.exports = punycode;
    } else {
      for (key in punycode) {
        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
      }
    }
  } else {
    root.punycode = punycode;
  }
})(this);
(function (root, factory) {
  "use strict";
  if (typeof exports === "object") {
    module.exports = factory(
      require("./punycode"),
      require("./IPv6"),
      require("./SecondLevelDomains")
    );
  } else if (typeof define === "function" && define.amd) {
    define(["./punycode", "./IPv6", "./SecondLevelDomains"], factory);
  } else {
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
})(this, function (punycode, IPv6, SLD, root) {
  "use strict";
  var _URI = root && root.URI;
  function URI(url, base) {
    if (!(this instanceof URI)) {
      return new URI(url, base);
    }
    if (url === undefined) {
      if (arguments.length) {
        throw new TypeError("undefined is not a valid argument for URI");
      }
      if (typeof location !== "undefined") {
        url = location.href + "";
      } else {
        url = "";
      }
    }
    this.href(url);
    if (base !== undefined) {
      return this.absoluteTo(base);
    }
    return this;
  }
  URI.version = "1.14.2";
  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;
  function escapeRegEx(string) {
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  }
  function getType(value) {
    if (value === undefined) {
      return "Undefined";
    }
    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }
  function isArray(obj) {
    return getType(obj) === "Array";
  }
  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;
    if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }
    for (i = 0, length = data.length; i < length; i++) {
      if (lookup[data[i]] !== undefined) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }
    return data;
  }
  function arrayContains(list, value) {
    var i, length;
    if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }
      return true;
    }
    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === "RegExp") {
        if (typeof list[i] === "string" && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }
    return false;
  }
  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }
    if (one.length !== two.length) {
      return false;
    }
    one.sort();
    two.sort();
    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }
    return true;
  }
  URI._parts = function () {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace,
    };
  };
  URI.duplicateQueryParameters = false;
  URI.escapeQuerySpace = true;
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  URI.ip6_expression =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  URI.find_uri_expression =
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»]))/gi;
  URI.findUri = {
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    end: /[\s\r\n]|$/,
    trim: /[`!()\[\]{};:'".,<>?«»]+$/,
  };
  URI.defaultPorts = {
    http: "80",
    https: "443",
    ftp: "21",
    gopher: "70",
    ws: "80",
    wss: "443",
  };
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  URI.domAttributes = {
    a: "href",
    blockquote: "cite",
    link: "href",
    base: "href",
    script: "src",
    form: "action",
    img: "src",
    area: "href",
    iframe: "src",
    embed: "src",
    source: "src",
    track: "src",
    input: "src",
    audio: "src",
    video: "src",
  };
  URI.getDomAttribute = function (node) {
    if (!node || !node.nodeName) {
      return undefined;
    }
    var nodeName = node.nodeName.toLowerCase();
    if (nodeName === "input" && node.type !== "image") {
      return undefined;
    }
    return URI.domAttributes[nodeName];
  };
  function escapeForDumbFirefox36(value) {
    return escape(value);
  }
  function strictEncodeURIComponent(string) {
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, "%2A");
  }
  function _isIriCodePoint(point) {
    return (
      point === 0x00002d ||
      point === 0x0002e ||
      point === 0x00005f ||
      point === 0x0007e ||
      (point >= 0x000030 && point < 0x000040) ||
      (point >= 0x000041 && point < 0x00005b) ||
      (point >= 0x000061 && point < 0x00007b) ||
      (point >= 0x0000a0 && point < 0x00d800) ||
      (point >= 0x00e000 && point < 0x00f8ff) ||
      (point >= 0x00f900 && point < 0x00fdd0) ||
      (point >= 0x00fdf0 && point < 0x00fff0) ||
      (point >= 0x010000 && point < 0x01fffe) ||
      (point >= 0x020000 && point < 0x02fffe) ||
      (point >= 0x030000 && point < 0x03fffe) ||
      (point >= 0x040000 && point < 0x04fffe) ||
      (point >= 0x050000 && point < 0x05fffe) ||
      (point >= 0x060000 && point < 0x06fffe) ||
      (point >= 0x070000 && point < 0x07fffe) ||
      (point >= 0x080000 && point < 0x08fffe) ||
      (point >= 0x090000 && point < 0x09fffe) ||
      (point >= 0x0a0000 && point < 0x0afffe) ||
      (point >= 0x0b0000 && point < 0x0bfffe) ||
      (point >= 0x0c0000 && point < 0x0cfffe) ||
      (point >= 0x0d0000 && point < 0x0dfffe) ||
      (point >= 0x0e0000 && point < 0x0efffe) ||
      (point >= 0x0f0000 && point < 0x0ffffe) ||
      (point >= 0x100000 && point < 0x10fffe)
    );
  }
  function encodeIRIComponent(string) {
    var inputCodePoints = punycode.ucs2.decode(string);
    var output = "";
    for (var i = 0; i < inputCodePoints.length; i++) {
      var codePoint = inputCodePoints[i];
      if (_isIriCodePoint(codePoint)) {
        output += punycode.ucs2.encode([codePoint]);
      } else {
        var asString = punycode.ucs2.encode([codePoint]);
        output += strictEncodeURIComponent(asString);
      }
    }
    return output;
  }
  function recodeIRIHostname(string) {
    if (URI.punycode_expression.test(string)) {
      string = punycode.toUnicode(string);
    }
    return encodeIRIComponent(string);
  }
  URI._defaultRecodeHostname = punycode
    ? punycode.toASCII
    : function (string) {
        return string;
      };
  URI.iso8859 = function () {
    URI.recodeHostname = URI._defaultRecodeHostname;
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function () {
    URI.recodeHostname = URI._defaultRecodeHostname;
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.iri = function () {
    URI.recodeHostname = recodeIRIHostname;
    URI.encode = encodeIRIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.unicode();
  URI.characters = {
    pathname: {
      encode: {
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
        map: {
          "%24": "$",
          "%26": "&",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%3A": ":",
          "%40": "@",
        },
      },
      decode: {
        expression: /[\/\?#]/g,
        map: { "/": "%2F", "?": "%3F", "#": "%23" },
      },
    },
    reserved: {
      encode: {
        expression:
          /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
        map: {
          "%3A": ":",
          "%2F": "/",
          "%3F": "?",
          "%23": "#",
          "%5B": "[",
          "%5D": "]",
          "%40": "@",
          "%21": "!",
          "%24": "$",
          "%26": "&",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
        },
      },
    },
    urnpath: {
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
        map: {
          "%21": "!",
          "%24": "$",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%40": "@",
        },
      },
      decode: {
        expression: /[\/\?#:]/g,
        map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" },
      },
    },
  };
  URI.encodeQuery = function (string, escapeQuerySpace) {
    var escaped = URI.encode(string + "");
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }
    return escapeQuerySpace ? escaped.replace(/%20/g, "+") : escaped;
  };
  URI.decodeQuery = function (string, escapeQuerySpace) {
    string += "";
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }
    try {
      return URI.decode(
        escapeQuerySpace ? string.replace(/\+/g, "%20") : string
      );
    } catch (e) {
      return string;
    }
  };
  var _parts = { encode: "encode", decode: "decode" };
  var _part;
  var generateAccessor = function (_group, _part) {
    return function (string) {
      try {
        return URI[_part](string + "").replace(
          URI.characters[_group][_part].expression,
          function (c) {
            return URI.characters[_group][_part].map[c];
          }
        );
      } catch (e) {
        return string;
      }
    };
  };
  for (_part in _parts) {
    URI[_part + "PathSegment"] = generateAccessor("pathname", _parts[_part]);
    URI[_part + "UrnPathSegment"] = generateAccessor("urnpath", _parts[_part]);
  }
  var generateSegmentedPathFunction = function (
    _sep,
    _codingFuncName,
    _innerCodingFuncName
  ) {
    return function (string) {
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function (string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }
      var segments = (string + "").split(_sep);
      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }
      return segments.join(_sep);
    };
  };
  URI.decodePath = generateSegmentedPathFunction("/", "decodePathSegment");
  URI.decodeUrnPath = generateSegmentedPathFunction(
    ":",
    "decodeUrnPathSegment"
  );
  URI.recodePath = generateSegmentedPathFunction(
    "/",
    "encodePathSegment",
    "decode"
  );
  URI.recodeUrnPath = generateSegmentedPathFunction(
    ":",
    "encodeUrnPathSegment",
    "decode"
  );
  URI.encodeReserved = generateAccessor("reserved", "encode");
  URI.parse = function (string, parts) {
    var pos;
    if (!parts) {
      parts = {};
    }
    pos = string.indexOf("#");
    if (pos > -1) {
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }
    pos = string.indexOf("?");
    if (pos > -1) {
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }
    if (string.substring(0, 2) === "//") {
      parts.protocol = null;
      string = string.substring(2);
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(":");
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === "//") {
          string = string.substring(pos + 3);
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }
    parts.path = string;
    return parts;
  };
  URI.parseHost = function (string, parts) {
    var pos = string.indexOf("/");
    var bracketPos;
    var t;
    if (pos === -1) {
      pos = string.length;
    }
    if (string.charAt(0) === "[") {
      bracketPos = string.indexOf("]");
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === "/") {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(":");
      var firstSlash = string.indexOf("/");
      var nextColon = string.indexOf(":", firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(":");
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }
    if (parts.hostname && string.substring(pos).charAt(0) !== "/") {
      pos++;
      string = "/" + string;
    }
    return string.substring(pos) || "/";
  };
  URI.parseAuthority = function (string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function (string, parts) {
    var firstSlash = string.indexOf("/");
    var pos = string.lastIndexOf(
      "@",
      firstSlash > -1 ? firstSlash : string.length - 1
    );
    var t;
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(":");
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(":")) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }
    return string;
  };
  URI.parseQuery = function (string, escapeQuerySpace) {
    if (!string) {
      return {};
    }
    string = string.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "");
    if (!string) {
      return {};
    }
    var items = {};
    var splits = string.split("&");
    var length = splits.length;
    var v, name, value;
    for (var i = 0; i < length; i++) {
      v = splits[i].split("=");
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      value = v.length ? URI.decodeQuery(v.join("="), escapeQuerySpace) : null;
      if (hasOwn.call(items, name)) {
        if (typeof items[name] === "string") {
          items[name] = [items[name]];
        }
        items[name].push(value);
      } else {
        items[name] = value;
      }
    }
    return items;
  };
  URI.build = function (parts) {
    var t = "";
    if (parts.protocol) {
      t += parts.protocol + ":";
    }
    if (!parts.urn && (t || parts.hostname)) {
      t += "//";
    }
    t += URI.buildAuthority(parts) || "";
    if (typeof parts.path === "string") {
      if (parts.path.charAt(0) !== "/" && typeof parts.hostname === "string") {
        t += "/";
      }
      t += parts.path;
    }
    if (typeof parts.query === "string" && parts.query) {
      t += "?" + parts.query;
    }
    if (typeof parts.fragment === "string" && parts.fragment) {
      t += "#" + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function (parts) {
    var t = "";
    if (!parts.hostname) {
      return "";
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += "[" + parts.hostname + "]";
    } else {
      t += parts.hostname;
    }
    if (parts.port) {
      t += ":" + parts.port;
    }
    return t;
  };
  URI.buildAuthority = function (parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function (parts) {
    var t = "";
    if (parts.username) {
      t += URI.encode(parts.username);
      if (parts.password) {
        t += ":" + URI.encode(parts.password);
      }
      t += "@";
    }
    return t;
  };
  URI.buildQuery = function (data, duplicateQueryParameters, escapeQuerySpace) {
    var t = "";
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (
              data[key][i] !== undefined &&
              unique[data[key][i] + ""] === undefined
            ) {
              t +=
                "&" +
                URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ""] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += "&" + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }
    return t.substring(1);
  };
  URI.buildQueryParameter = function (name, value, escapeQuerySpace) {
    return (
      URI.encodeQuery(name, escapeQuerySpace) +
      (value !== null ? "=" + URI.encodeQuery(value, escapeQuerySpace) : "")
    );
  };
  URI.addQuery = function (data, name, value) {
    if (typeof name === "object") {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === "string") {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === "string") {
        data[name] = [data[name]];
      }
      if (!isArray(value)) {
        value = [value];
      }
      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the name parameter"
      );
    }
  };
  URI.removeQuery = function (data, name, value) {
    var i, length, key;
    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (typeof name === "object") {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === "string") {
      if (value !== undefined) {
        if (data[name] === value) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError(
        "URI.removeQuery() accepts an object, string as the first parameter"
      );
    }
  };
  URI.hasQuery = function (data, name, value, withinArray) {
    if (typeof name === "object") {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          if (!URI.hasQuery(data, key, name[key])) {
            return false;
          }
        }
      }
      return true;
    } else if (typeof name !== "string") {
      throw new TypeError(
        "URI.hasQuery() accepts an object, string as the name parameter"
      );
    }
    switch (getType(value)) {
      case "Undefined":
        return name in data;
      case "Boolean":
        var _booly = Boolean(
          isArray(data[name]) ? data[name].length : data[name]
        );
        return value === _booly;
      case "Function":
        return !!value(data[name], name, data);
      case "Array":
        if (!isArray(data[name])) {
          return false;
        }
        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);
      case "RegExp":
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }
        if (!withinArray) {
          return false;
        }
        return arrayContains(data[name], value);
      case "Number":
        value = String(value);
      case "String":
        if (!isArray(data[name])) {
          return data[name] === value;
        }
        if (!withinArray) {
          return false;
        }
        return arrayContains(data[name], value);
      default:
        throw new TypeError(
          "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
        );
    }
  };
  URI.commonPath = function (one, two) {
    var length = Math.min(one.length, two.length);
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }
    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === "/"
        ? "/"
        : "";
    }
    if (one.charAt(pos) !== "/" || two.charAt(pos) !== "/") {
      pos = one.substring(0, pos).lastIndexOf("/");
    }
    return one.substring(0, pos + 1);
  };
  URI.withinString = function (string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;
    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }
      var start = match.index;
      if (options.ignoreHtml) {
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }
      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end).replace(_trim, "");
      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }
      end = start + slice.length;
      var result = callback(slice, start, end, string);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }
    _start.lastIndex = 0;
    return string;
  };
  URI.ensureValidHostname = function (v) {
    if (v.match(URI.invalid_hostname_characters)) {
      if (!punycode) {
        throw new TypeError(
          'Hostname "' +
            v +
            '" contains characters other than [A-Z0-9.-] and Punycode.js is not available'
        );
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError(
          'Hostname "' + v + '" contains characters other than [A-Z0-9.-]'
        );
      }
    }
  };
  URI.noConflict = function (removeAll) {
    if (removeAll) {
      var unconflicted = { URI: this.noConflict() };
      if (
        root.URITemplate &&
        typeof root.URITemplate.noConflict === "function"
      ) {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }
      if (root.IPv6 && typeof root.IPv6.noConflict === "function") {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }
      if (
        root.SecondLevelDomains &&
        typeof root.SecondLevelDomains.noConflict === "function"
      ) {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }
      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }
    return this;
  };
  p.build = function (deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }
    return this;
  };
  p.clone = function () {
    return new URI(this);
  };
  p.valueOf = p.toString = function () {
    return this.build(false)._string;
  };
  function generateSimpleAccessor(_part) {
    return function (v, build) {
      if (v === undefined) {
        return this._parts[_part] || "";
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }
  function generatePrefixAccessor(_part, _key) {
    return function (v, build) {
      if (v === undefined) {
        return this._parts[_part] || "";
      } else {
        if (v !== null) {
          v = v + "";
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }
        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }
  p.protocol = generateSimpleAccessor("protocol");
  p.username = generateSimpleAccessor("username");
  p.password = generateSimpleAccessor("password");
  p.hostname = generateSimpleAccessor("hostname");
  p.port = generateSimpleAccessor("port");
  p.query = generatePrefixAccessor("query", "?");
  p.fragment = generatePrefixAccessor("fragment", "#");
  p.search = function (v, build) {
    var t = this.query(v, build);
    return typeof t === "string" && t.length ? "?" + t : t;
  };
  p.hash = function (v, build) {
    var t = this.fragment(v, build);
    return typeof t === "string" && t.length ? "#" + t : t;
  };
  p.pathname = function (v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? "/" : "");
      return v
        ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res)
        : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : "";
      } else {
        this._parts.path = v ? URI.recodePath(v) : "/";
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function (href, build) {
    var key;
    if (href === undefined) {
      return this.toString();
    }
    this._string = "";
    this._parts = URI._parts();
    var _URI = href instanceof URI;
    var _object =
      typeof href === "object" && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || "";
      _object = false;
    }
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }
    if (typeof href === "string" || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError("invalid input");
    }
    this.build(!build);
    return this;
  };
  p.is = function (what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;
    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }
    switch (what.toLowerCase()) {
      case "relative":
        return relative;
      case "absolute":
        return !relative;
      case "domain":
      case "name":
        return name;
      case "sld":
        return sld;
      case "ip":
        return ip;
      case "ip4":
      case "ipv4":
      case "inet4":
        return ip4;
      case "ip6":
      case "ipv6":
      case "inet6":
        return ip6;
      case "idn":
        return idn;
      case "url":
        return !this._parts.urn;
      case "urn":
        return !!this._parts.urn;
      case "punycode":
        return punycode;
    }
    return null;
  };
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;
  p.protocol = function (v, build) {
    if (v !== undefined) {
      if (v) {
        v = v.replace(/:(\/\/)?$/, "");
        if (!v.match(URI.protocol_expression)) {
          throw new TypeError(
            'Protocol "' +
              v +
              "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
          );
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }
      if (v) {
        v += "";
        if (v.charAt(0) === ":") {
          v = v.substring(1);
        }
        if (v.match(/[^0-9]/)) {
          throw new TypeError(
            'Port "' + v + '" contains characters other than [0-9]'
          );
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v !== undefined) {
      var x = {};
      URI.parseHost(v, x);
      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };
  p.host = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : "";
    } else {
      URI.parseHost(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.authority = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : "";
    } else {
      URI.parseAuthority(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.userinfo = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined) {
      if (!this._parts.username) {
        return "";
      }
      var t = URI.buildUserinfo(this._parts);
      return t.substring(0, t.length - 1);
    } else {
      if (v[v.length - 1] !== "@") {
        v += "@";
      }
      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function (v, build) {
    var parts;
    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }
    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };
  p.subdomain = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined) {
      if (!this._parts.hostname || this.is("IP")) {
        return "";
      }
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || "";
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp("^" + escapeRegEx(sub));
      if (v && v.charAt(v.length - 1) !== ".") {
        v += ".";
      }
      if (v) {
        URI.ensureValidHostname(v);
      }
      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (typeof v === "boolean") {
      build = v;
      v = undefined;
    }
    if (v === undefined) {
      if (!this._parts.hostname || this.is("IP")) {
        return "";
      }
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf(".", end - 1) + 1;
      return this._parts.hostname.substring(end) || "";
    } else {
      if (!v) {
        throw new TypeError("cannot set domain empty");
      }
      URI.ensureValidHostname(v);
      if (!this._parts.hostname || this.is("IP")) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + "$");
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.tld = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (typeof v === "boolean") {
      build = v;
      v = undefined;
    }
    if (v === undefined) {
      if (!this._parts.hostname || this.is("IP")) {
        return "";
      }
      var pos = this._parts.hostname.lastIndexOf(".");
      var tld = this._parts.hostname.substring(pos + 1);
      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }
      return tld;
    } else {
      var replace;
      if (!v) {
        throw new TypeError("cannot set TLD empty");
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + "$");
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError(
            'TLD "' + v + '" contains characters other than [A-Z0-9]'
          );
        }
      } else if (!this._parts.hostname || this.is("IP")) {
        throw new ReferenceError("cannot set TLD on non-domain host");
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + "$");
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.directory = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return "";
      }
      if (this._parts.path === "/") {
        return "/";
      }
      var end = this._parts.path.length - this.filename().length - 1;
      var res =
        this._parts.path.substring(0, end) || (this._parts.hostname ? "/" : "");
      return v ? URI.decodePath(res) : res;
    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp("^" + escapeRegEx(directory));
      if (!this.is("relative")) {
        if (!v) {
          v = "/";
        }
        if (v.charAt(0) !== "/") {
          v = "/" + v;
        }
      }
      if (v && v.charAt(v.length - 1) !== "/") {
        v += "/";
      }
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === "/") {
        return "";
      }
      var pos = this._parts.path.lastIndexOf("/");
      var res = this._parts.path.substring(pos + 1);
      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;
      if (v.charAt(0) === "/") {
        v = v.substring(1);
      }
      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }
      var replace = new RegExp(escapeRegEx(this.filename()) + "$");
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }
      return this;
    }
  };
  p.suffix = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? "" : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === "/") {
        return "";
      }
      var filename = this.filename();
      var pos = filename.lastIndexOf(".");
      var s, res;
      if (pos === -1) {
        return "";
      }
      s = filename.substring(pos + 1);
      res = /^[a-z0-9%]+$/i.test(s) ? s : "";
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === ".") {
        v = v.substring(1);
      }
      var suffix = this.suffix();
      var replace;
      if (!suffix) {
        if (!v) {
          return this;
        }
        this._parts.path += "." + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx("." + suffix) + "$");
      } else {
        replace = new RegExp(escapeRegEx(suffix) + "$");
      }
      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.segment = function (segment, v, build) {
    var separator = this._parts.urn ? ":" : "/";
    var path = this.path();
    var absolute = path.substring(0, 1) === "/";
    var segments = path.split(separator);
    if (segment !== undefined && typeof segment !== "number") {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (segment !== undefined && typeof segment !== "number") {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }
    if (absolute) {
      segments.shift();
    }
    if (segment < 0) {
      segment = Math.max(segments.length + segment, 0);
    }
    if (v === undefined) {
      return segment === undefined ? segments : segments[segment];
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        for (var i = 0, l = v.length; i < l; i++) {
          if (
            !v[i].length &&
            (!segments.length || !segments[segments.length - 1].length)
          ) {
            continue;
          }
          if (segments.length && !segments[segments.length - 1].length) {
            segments.pop();
          }
          segments.push(v[i]);
        }
      } else if (v || typeof v === "string") {
        if (segments[segments.length - 1] === "") {
          segments[segments.length - 1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = v;
      } else {
        segments.splice(segment, 1);
      }
    }
    if (absolute) {
      segments.unshift("");
    }
    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function (segment, v, build) {
    var segments, i, l;
    if (typeof segment !== "number") {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }
      return segments;
    }
    if (!isArray(v)) {
      v = typeof v === "string" || v instanceof String ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.decode(v[i]);
      }
    }
    return this.segment(segment, v, build);
  };
  var q = p.query;
  p.query = function (v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === "function") {
      var data = URI.parseQuery(
        this._parts.query,
        this._parts.escapeQuerySpace
      );
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(
        result || data,
        this._parts.duplicateQueryParameters,
        this._parts.escapeQuerySpace
      );
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== "string") {
      this._parts.query = URI.buildQuery(
        v,
        this._parts.duplicateQueryParameters,
        this._parts.escapeQuerySpace
      );
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if (typeof name === "string" || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === "object") {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the name parameter"
      );
    }
    this._parts.query = URI.buildQuery(
      data,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    if (typeof name !== "string") {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.addQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(
      data,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    if (typeof name !== "string") {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.removeQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(
      data,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    if (typeof name !== "string") {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.hasQuery = function (name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;
  p.normalize = function () {
    if (this._parts.urn) {
      return this.normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }
    return this.normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function (build) {
    if (typeof this._parts.protocol === "string") {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizeHostname = function (build) {
    if (this._parts.hostname) {
      if (this.is("IDN") || this.is("punycode")) {
        this._parts.hostname = URI.recodeHostname(this._parts.hostname);
      } else if (this.is("IPv6") && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }
      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizePort = function (build) {
    if (
      typeof this._parts.protocol === "string" &&
      this._parts.port === URI.defaultPorts[this._parts.protocol]
    ) {
      this._parts.port = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizePath = function (build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }
    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }
    if (this._parts.path === "/") {
      return this;
    }
    var _was_relative;
    var _leadingParents = "";
    var _parent, _pos;
    if (_path.charAt(0) !== "/") {
      _was_relative = true;
      _path = "/" + _path;
    }
    _path = _path.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || "";
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }
    while (true) {
      _parent = _path.indexOf("/..");
      if (_parent === -1) {
        break;
      } else if (_parent === 0) {
        _path = _path.substring(3);
        continue;
      }
      _pos = _path.substring(0, _parent).lastIndexOf("/");
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }
    if (_was_relative && this.is("relative")) {
      _path = _leadingParents + _path.substring(1);
    }
    _path = URI.recodePath(_path);
    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function (build) {
    if (typeof this._parts.query === "string") {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(
          URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
        );
      }
      this.build(!build);
    }
    return this;
  };
  p.normalizeFragment = function (build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;
  function _generateNormalizer(hostnameRecoder, encoder, decoder) {
    return function () {
      var r = URI.recodeHostname;
      var e = URI.encode;
      var d = URI.decode;
      URI.encode = encoder;
      URI.decode = decoder;
      try {
        this.normalize();
      } finally {
        URI.recodeHostname = r;
        URI.encode = e;
        URI.decode = d;
      }
      return this;
    };
  }
  p.iso8859 = _generateNormalizer(
    URI._defaultRecodeHostname,
    escape,
    decodeURIComponent
  );
  p.unicode = _generateNormalizer(
    URI._defaultRecodeHostname,
    strictEncodeURIComponent,
    unescape
  );
  p.iri = _generateNormalizer(
    recodeIRIHostname,
    encodeIRIComponent,
    decodeURIComponent
  );
  p.readable = function () {
    var uri = this.clone();
    uri.username("").password("").normalize();
    var t = "";
    if (uri._parts.protocol) {
      t += uri._parts.protocol + (uri._parts.urn ? ":" : "://");
    }
    if (uri._parts.hostname) {
      if (uri.is("punycode") && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ":" + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }
    if (
      uri._parts.hostname &&
      uri._parts.path &&
      uri._parts.path.charAt(0) !== "/"
    ) {
      t += "/";
    }
    t += uri.path(true);
    if (uri._parts.query) {
      var q = "";
      for (
        var i = 0, qp = uri._parts.query.split("&"), l = qp.length;
        i < l;
        i++
      ) {
        var kv = (qp[i] || "").split("=");
        q +=
          "&" +
          URI.decodeQuery(kv[0], this._parts.escapeQuerySpace).replace(
            /&/g,
            "%26"
          );
        if (kv[1] !== undefined) {
          q +=
            "=" +
            URI.decodeQuery(kv[1], this._parts.escapeQuerySpace).replace(
              /&/g,
              "%26"
            );
        }
      }
      t += "?" + q.substring(1);
    }
    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };
  p.absoluteTo = function (base) {
    var resolved = this.clone();
    var properties = ["protocol", "username", "password", "hostname", "port"];
    var basedir, i, p;
    if (this._parts.urn) {
      throw new Error(
        "URNs do not have any generally defined hierarchical components"
      );
    }
    if (!(base instanceof URI)) {
      base = new URI(base);
    }
    if (!resolved._parts.protocol) {
      resolved._parts.protocol = base._parts.protocol;
    }
    if (this._parts.hostname) {
      return resolved;
    }
    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }
    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else if (resolved._parts.path.substring(-2) === "..") {
      resolved._parts.path += "/";
    }
    if (resolved.path().charAt(0) !== "/") {
      basedir = base.directory();
      resolved._parts.path =
        (basedir ? basedir + "/" : "") + resolved._parts.path;
      resolved.normalizePath();
    }
    resolved.build();
    return resolved;
  };
  p.relativeTo = function (base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;
    if (relative._parts.urn) {
      throw new Error(
        "URNs do not have any generally defined hierarchical components"
      );
    }
    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();
    if (relativePath.charAt(0) !== "/") {
      throw new Error("URI is already relative");
    }
    if (basePath.charAt(0) !== "/") {
      throw new Error(
        "Cannot calculate a URI relative to another relative URI"
      );
    }
    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }
    if (
      relativeParts.username !== baseParts.username ||
      relativeParts.password !== baseParts.password
    ) {
      return relative.build();
    }
    if (
      relativeParts.protocol !== null ||
      relativeParts.username !== null ||
      relativeParts.password !== null
    ) {
      return relative.build();
    }
    if (
      relativeParts.hostname === baseParts.hostname &&
      relativeParts.port === baseParts.port
    ) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }
    if (relativePath === basePath) {
      relativeParts.path = "";
      return relative.build();
    }
    common = URI.commonPath(relative.path(), base.path());
    if (!common) {
      return relative.build();
    }
    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, "")
      .replace(/.*?\//g, "../");
    relativeParts.path = parents + relativeParts.path.substring(common.length);
    return relative.build();
  };
  p.equals = function (uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;
    one.normalize();
    two.normalize();
    if (one.toString() === two.toString()) {
      return true;
    }
    one_query = one.query();
    two_query = two.query();
    one.query("");
    two.query("");
    if (one.toString() !== two.toString()) {
      return false;
    }
    if (one_query.length !== two_query.length) {
      return false;
    }
    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);
    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }
        checked[key] = true;
      }
    }
    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          return false;
        }
      }
    }
    return true;
  };
  p.duplicateQueryParameters = function (v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };
  p.escapeQuerySpace = function (v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };
  return URI;
});
var Cmi5;
(function () {
  "use strict";
  var THIS_LIBRARY = {
      VERSION: "<%= pkg.version %>",
      NAME: "<%= pkg.name %>",
      DESCRIPTION: "<%= pkg.description %>",
    },
    nativeRequest,
    xdrRequest,
    requestComplete,
    __delay,
    env = {},
    STATE_LMS_LAUNCHDATA = "LMS.LaunchData",
    LAUNCH_MODE_NORMAL = "Normal",
    AGENT_PROFILE_LEARNER_PREFS = "cmi5LearnerPreferences",
    CATEGORY_ACTIVITY_CMI5 = new TinCan.Activity({
      id: "https://w3id.org/xapi/cmi5/context/categories/cmi5",
    }),
    CATEGORY_ACTIVITY_MOVEON = new TinCan.Activity({
      id: "https://w3id.org/xapi/cmi5/context/categories/moveon",
    }),
    OTHER_ACTIVITY_CMI5JS = new TinCan.Activity({
      id:
        "http://id.tincanapi.com/activity/software/" +
        THIS_LIBRARY.NAME +
        "/" +
        THIS_LIBRARY.VERSION,
      definition: {
        name: { und: THIS_LIBRARY.NAME + " (" + THIS_LIBRARY.VERSION + ")" },
        description: { en: THIS_LIBRARY.DESCRIPTION },
        type: "http://id.tincanapi.com/activitytype/source",
      },
    }),
    EXTENSION_SESSION_ID =
      "https://w3id.org/xapi/cmi5/context/extensions/sessionid",
    EXTENSION_MASTERY_SCORE =
      "https://w3id.org/xapi/cmi5/context/extensions/masteryscore",
    VERB_INITIALIZED_ID = "http://adlnet.gov/expapi/verbs/initialized",
    VERB_TERMINATED_ID = "http://adlnet.gov/expapi/verbs/terminated",
    VERB_COMPLETED_ID = "http://adlnet.gov/expapi/verbs/completed",
    VERB_PASSED_ID = "http://adlnet.gov/expapi/verbs/passed",
    VERB_FAILED_ID = "http://adlnet.gov/expapi/verbs/failed",
    verbDisplay = {},
    launchParameters = [
      "endpoint",
      "fetch",
      "actor",
      "activityId",
      "registration",
    ],
    isInteger;
  isInteger = function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
  verbDisplay[VERB_INITIALIZED_ID] = { en: "initialized" };
  verbDisplay[VERB_TERMINATED_ID] = { en: "terminated" };
  env.hasCORS = false;
  env.useXDR = false;
  if (
    typeof XMLHttpRequest !== "undefined" &&
    typeof new XMLHttpRequest().withCredentials !== "undefined"
  ) {
    env.hasCORS = true;
  } else if (typeof XDomainRequest !== "undefined") {
    env.hasCORS = true;
    env.useXDR = true;
  }
  Cmi5 = function (launchString) {
    this.log("constructor", launchString);
    var url, cfg, i;
    if (typeof launchString !== "undefined") {
      url = new URI(launchString);
      cfg = url.search(true);
      for (i = 0; i < launchParameters.length; i += 1) {
        if (
          typeof cfg[launchParameters[i]] === "undefined" ||
          cfg[launchParameters[i]] === ""
        ) {
          throw new Error(
            "Invalid launch string missing or empty parameter: " +
              launchParameters[i]
          );
        }
      }
      this.setFetch(cfg.fetch);
      this.setLRS(cfg.endpoint);
      this.setActor(cfg.actor);
      this.setActivity(cfg.activityId);
      this.setRegistration(cfg.registration);
    }
  };
  Cmi5.VERSION = THIS_LIBRARY.VERSION;
  Cmi5.DEBUG = false;
  Cmi5.prototype = {
    _fetch: null,
    _endpoint: null,
    _actor: null,
    _registration: null,
    _activity: null,
    _lrs: null,
    _fetchRequest: null,
    _fetchContent: null,
    _lmsLaunchData: null,
    _contextTemplate: null,
    _learnerPrefs: null,
    _isActive: false,
    _initialized: null,
    _passed: null,
    _failed: null,
    _completed: null,
    _terminated: null,
    _durationStart: null,
    _progress: null,
    _includeSourceActivity: true,
    start: function (callback, events) {
      this.log("start");
      var self = this;
      events = events || {};
      self.postFetch(function (err) {
        var prefix = "Failed to start AU - ";
        if (typeof events.postFetch !== "undefined") {
          events.postFetch.apply(this, arguments);
        }
        if (err !== null) {
          callback(new Error(prefix + " POST to fetch: " + err));
          return;
        }
        self.loadLMSLaunchData(function (err) {
          if (typeof events.launchData !== "undefined") {
            events.launchData.apply(this, arguments);
          }
          if (err !== null) {
            callback(new Error(prefix + " load LMS LaunchData: " + err));
            return;
          }
          self.loadLearnerPrefs(function (err) {
            if (typeof events.learnerPrefs !== "undefined") {
              events.learnerPrefs.apply(this, arguments);
            }
            if (err !== null) {
              callback(new Error(prefix + " load learner preferences: " + err));
              return;
            }
            self.initialize(function (err) {
              if (typeof events.initializeStatement !== "undefined") {
                events.initializeStatement.apply(this, arguments);
              }
              if (err !== null) {
                callback(
                  new Error(prefix + " send initialized statement: " + err)
                );
                return;
              }
              callback(null);
            });
          });
        });
      });
    },
    postFetch: function (callback) {
      this.log("postFetch");
      var self = this,
        cbWrapper;
      if (this._fetch === null) {
        callback(new Error("Can't POST to fetch URL without setFetch"));
        return;
      }
      if (callback) {
        cbWrapper = function (err, xhr) {
          self.log("postFetch::cbWrapper");
          self.log("postFetch::cbWrapper", err);
          self.log("postFetch::cbWrapper", xhr);
          var parsed,
            responseContent = xhr.responseText,
            responseContentType;
          if (err !== null) {
            if (err === 0) {
              err = "Aborted, offline, or invalid CORS endpoint";
            } else if (/^\d+$/.test(err)) {
              if (typeof xhr.getResponseHeader !== "undefined") {
                responseContentType = xhr.getResponseHeader("Content-Type");
              } else if (typeof xhr.contentType !== "undefined") {
                responseContentType = xhr.contentType;
              }
              if (TinCan.Utils.isApplicationJSON(responseContentType)) {
                try {
                  parsed = JSON.parse(responseContent);
                  if (typeof parsed["error-text"] !== "undefined") {
                    err =
                      parsed["error-text"] + " (" + parsed["error-code"] + ")";
                  } else {
                    err =
                      "Failed to detect 'error-text' property in JSON error response";
                  }
                } catch (ex) {
                  err = "Failed to parse JSON error response: " + ex;
                }
              } else {
                err = xhr.responseText;
              }
            } else {
              err = xhr.responseText;
            }
            callback(new Error(err), xhr, parsed);
            return;
          }
          try {
            parsed = JSON.parse(responseContent);
          } catch (ex) {
            self.log(
              "postFetch::cbWrapper - failed to parse JSON response: " + ex
            );
            callback(
              new Error(
                "Post fetch response malformed: failed to parse JSON response (" +
                  ex +
                  ")"
              ),
              xhr
            );
            return;
          }
          if (
            parsed === null ||
            typeof parsed !== "object" ||
            typeof parsed["auth-token"] === "undefined"
          ) {
            self.log(
              "postFetch::cbWrapper - failed to access 'auth-token' property"
            );
            callback(
              new Error(
                "Post fetch response malformed: failed to access 'auth-token' in (" +
                  responseContent +
                  ")"
              ),
              xhr,
              parsed
            );
            return;
          }
          self._fetchContent = parsed;
          self._lrs.auth = "Basic " + parsed["auth-token"];
          callback(err, xhr, parsed);
        };
      }
      return this._fetchRequest(this._fetch, { method: "POST" }, cbWrapper);
    },
    loadLMSLaunchData: function (callback) {
      this.log("loadLMSLaunchData");
      var self = this;
      if (this._fetchContent === null) {
        callback(
          new Error(
            "Can't retrieve LMS Launch Data without successful postFetch"
          )
        );
        return;
      }
      this._lrs.retrieveState(STATE_LMS_LAUNCHDATA, {
        activity: this._activity,
        agent: this._actor,
        registration: this._registration,
        callback: function (err, result) {
          if (err !== null) {
            callback(
              new Error(
                "Failed to retrieve " + STATE_LMS_LAUNCHDATA + " State: " + err
              ),
              result
            );
            return;
          }
          if (result === null) {
            callback(
              new Error(STATE_LMS_LAUNCHDATA + " State not found"),
              result
            );
            return;
          }
          self._lmsLaunchData = result.contents;
          self._contextTemplate = JSON.stringify(
            self._lmsLaunchData.contextTemplate
          );
          callback(null, result);
        },
      });
    },
    loadLearnerPrefs: function (callback) {
      this.log("loadLearnerPrefs");
      var self = this;
      if (this._lmsLaunchData === null) {
        callback(
          new Error(
            "Can't retrieve Learner Preferences without successful loadLMSLaunchData"
          )
        );
        return;
      }
      this._lrs.retrieveAgentProfile(AGENT_PROFILE_LEARNER_PREFS, {
        agent: this._actor,
        callback: function (err, result) {
          if (err !== null) {
            callback(
              new Error(
                "Failed to retrieve " +
                  AGENT_PROFILE_LEARNER_PREFS +
                  " Agent Profile" +
                  err
              ),
              result
            );
            return;
          }
          if (result !== null) {
            self._learnerPrefs = result;
          } else {
            self._learnerPrefs = new TinCan.AgentProfile({
              id: AGENT_PROFILE_LEARNER_PREFS,
              contentType: "application/json",
              contents: {},
            });
          }
          callback(null, result);
        },
      });
    },
    saveLearnerPrefs: function (callback) {
      this.log("saveLearnerPrefs");
      var self = this,
        result,
        cbWrapper;
      if (this._learnerPrefs === null) {
        result = new Error(
          "Can't save Learner Preferences without first loading them"
        );
        if (callback) {
          callback(result);
          return;
        }
        return result;
      }
      if (callback) {
        cbWrapper = function (err, result) {
          self.log("saveLearnerPrefs - saveAgentProfile callback", err, result);
          if (err !== null) {
            callback(
              new Error(
                "Failed to save " +
                  AGENT_PROFILE_LEARNER_PREFS +
                  " Agent Profile: " +
                  err
              ),
              result
            );
            return;
          }
          self._learnerPrefs.etag = TinCan.Utils.getSHA1String(
            typeof self._learnerPrefs.contents === "object" &&
              TinCan.Utils.isApplicationJSON(self._learnerPrefs.contentType)
              ? JSON.stringify(self._learnerPrefs.contents)
              : self._learnerPrefs.contents
          );
          callback(null, result);
        };
      }
      result = this._lrs.saveAgentProfile(
        AGENT_PROFILE_LEARNER_PREFS,
        this._learnerPrefs.contents,
        {
          agent: this._actor,
          lastSHA1: this._learnerPrefs.etag,
          contentType: this._learnerPrefs.contentType,
          callback: cbWrapper,
        }
      );
      if (cbWrapper) {
        return;
      }
      if (result.err !== null) {
        return new Error(
          "Failed to save " +
            AGENT_PROFILE_LEARNER_PREFS +
            " Agent Profile: " +
            result.err
        );
      }
      self._learnerPrefs.etag = TinCan.Utils.getSHA1String(
        typeof self._learnerPrefs.contents === "object" &&
          TinCan.Utils.isApplicationJSON(self._learnerPrefs.contentType)
          ? JSON.stringify(self._learnerPrefs.contents)
          : self._learnerPrefs.contents
      );
      return;
    },
    initialize: function (callback) {
      this.log("initialize");
      var st, err, callbackWrapper, result;
      if (this._learnerPrefs === null) {
        err = new Error(
          "Can't send initialized statement without successful loadLearnerPrefs"
        );
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this._initialized) {
        this.log("initialize - already initialized");
        err = new Error("AU already initialized");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      st = this.initializedStatement();
      if (callback) {
        callbackWrapper = function (err) {
          this.log("initialize - callbackWrapper: " + err);
          if (err === null) {
            this._initialized = true;
            this._isActive = true;
            this._durationStart = new Date().getTime();
          }
          callback.apply(this, arguments);
        }.bind(this);
      }
      result = this.sendStatement(st, callbackWrapper);
      this.log("initialize - result: ", result);
      if (!callback && result.response.err === null) {
        this._initialized = true;
        this._isActive = true;
        this._durationStart = new Date().getTime();
      }
      return result;
    },
    terminate: function (callback) {
      this.log("terminate");
      var st, err, callbackWrapper, result;
      if (!this._initialized) {
        this.log("terminate - not initialized");
        err = new Error("AU not initialized");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this._terminated) {
        this.log("terminate - already terminated");
        err = new Error("AU already terminated");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      st = this.terminatedStatement();
      if (callback) {
        callbackWrapper = function (err) {
          this.log("terminate - callbackWrapper: " + err);
          if (err === null) {
            this._terminated = true;
            this._isActive = false;
          }
          callback.apply(this, arguments);
        }.bind(this);
      }
      result = this.sendStatement(st, callbackWrapper);
      this.log("terminate - result: ", result);
      if (!callback && result.response.err === null) {
        this._terminated = true;
        this._isActive = false;
      }
      return result;
    },
    completed: function (callback) {
      this.log("completed");
      var st, err, callbackWrapper, result;
      if (!this.isActive()) {
        this.log("completed - not active");
        err = new Error("AU not active");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this.getLaunchMode() !== LAUNCH_MODE_NORMAL) {
        this.log("completed - non-Normal launch mode: ", this.getLaunchMode());
        err = new Error("AU not in Normal launch mode");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this._completed) {
        this.log("completed - already completed");
        err = new Error("AU already completed");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      st = this.completedStatement();
      if (callback) {
        callbackWrapper = function (err) {
          this.log("completed - callbackWrapper: " + err);
          if (err === null) {
            this.setProgress(null);
            this._completed = true;
          }
          callback.apply(this, arguments);
        }.bind(this);
      }
      result = this.sendStatement(st, callbackWrapper);
      this.log("completed - result: ", result);
      if (!callback && result.response.err === null) {
        this.setProgress(null);
        this._completed = true;
      }
      return result;
    },
    passed: function (score, callback) {
      this.log("passed");
      var st, err, callbackWrapper, result;
      if (!this.isActive()) {
        this.log("passed - not active");
        err = new Error("AU not active");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this.getLaunchMode() !== LAUNCH_MODE_NORMAL) {
        this.log("passed - non-Normal launch mode: ", this.getLaunchMode());
        err = new Error("AU not in Normal launch mode");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this._passed !== null) {
        this.log("passed - already passed");
        err = new Error("AU already passed");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      try {
        st = this.passedStatement(score);
      } catch (ex) {
        this.log("passed - failed to create passed statement: " + ex);
        if (callback) {
          callback("Failed to create passed statement - " + ex);
          return;
        }
        throw ex;
      }
      if (callback) {
        callbackWrapper = function (err) {
          this.log("passed - callbackWrapper: " + err);
          if (err === null) {
            this._passed = true;
          }
          callback.apply(this, arguments);
        }.bind(this);
      }
      result = this.sendStatement(st, callbackWrapper);
      this.log("passed - result: ", result);
      if (!callback && result.response.err === null) {
        this._passed = true;
      }
      return result;
    },
    failed: function (score, callback) {
      this.log("failed");
      var st, err, callbackWrapper, result;
      if (!this.isActive()) {
        this.log("failed - not active");
        err = new Error("AU not active");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this.getLaunchMode() !== LAUNCH_MODE_NORMAL) {
        this.log("failed - non-Normal launch mode: ", this.getLaunchMode());
        err = new Error("AU not in Normal launch mode");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      if (this._failed !== null || this._passed !== null) {
        this.log("failed - already passed/failed");
        err = new Error("AU already passed/failed");
        if (callback) {
          callback(err);
          return;
        }
        throw err;
      }
      try {
        st = this.failedStatement(score);
      } catch (ex) {
        this.log("failed - failed to create failed statement: " + ex);
        if (callback) {
          callback("Failed to create failed statement - " + ex);
          return;
        }
        throw ex;
      }
      if (callback) {
        callbackWrapper = function (err) {
          this.log("failed - callbackWrapper: " + err);
          if (err === null) {
            this._failed = true;
          }
          callback.apply(this, arguments);
        }.bind(this);
      }
      result = this.sendStatement(st, callbackWrapper);
      this.log("failed - result: ", result);
      if (!callback && result.response.err === null) {
        this._failed = true;
      }
      return result;
    },
    isActive: function () {
      this.log("isActive");
      return this._isActive;
    },
    log: function () {
      if (Cmi5.DEBUG && typeof console !== "undefined" && console.log) {
        arguments[0] = "cmi5.js:" + arguments[0];
        console.log.apply(console, arguments);
      }
    },
    includeSourceActivity: function (val) {
      this._includeSourceActivity = val ? true : false;
    },
    getLaunchMethod: function () {
      this.log("getLaunchMethod");
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine launchMethod until LMS LaunchData has been loaded"
        );
      }
      return this._lmsLaunchData.launchMethod;
    },
    getLaunchMode: function () {
      this.log("getLaunchMode");
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine launchMode until LMS LaunchData has been loaded"
        );
      }
      return this._lmsLaunchData.launchMode;
    },
    getLaunchParameters: function () {
      this.log("getLaunchParameters");
      var result = null;
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine LaunchParameters until LMS LaunchData has been loaded"
        );
      }
      if (typeof this._lmsLaunchData.launchParameters !== "undefined") {
        result = this._lmsLaunchData.launchParameters;
      }
      return result;
    },
    getSessionId: function () {
      this.log("getSessionId");
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine session id until LMS LaunchData has been loaded"
        );
      }
      return this._lmsLaunchData.contextTemplate.extensions[
        EXTENSION_SESSION_ID
      ];
    },
    getMoveOn: function () {
      this.log("getMoveOn");
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine moveOn until LMS LaunchData has been loaded"
        );
      }
      return this._lmsLaunchData.moveOn;
    },
    getMasteryScore: function () {
      this.log("getMasteryScore");
      var result = null;
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine masteryScore until LMS LaunchData has been loaded"
        );
      }
      if (typeof this._lmsLaunchData.masteryScore !== "undefined") {
        result = this._lmsLaunchData.masteryScore;
      }
      return result;
    },
    getReturnURL: function () {
      this.log("getReturnURL");
      var result = null;
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine returnURL until LMS LaunchData has been loaded"
        );
      }
      if (typeof this._lmsLaunchData.returnURL !== "undefined") {
        result = this._lmsLaunchData.returnURL;
      }
      return result;
    },
    getEntitlementKey: function () {
      this.log("getEntitlementKey");
      var result = null;
      if (this._lmsLaunchData === null) {
        throw new Error(
          "Can't determine entitlementKey until LMS LaunchData has been loaded"
        );
      }
      if (typeof this._lmsLaunchData.entitlementKey !== "undefined") {
        if (
          typeof this._lmsLaunchData.entitlementKey.alternate !== "undefined"
        ) {
          result = this._lmsLaunchData.entitlementKey.alternate;
        } else if (
          typeof this._lmsLaunchData.entitlementKey.courseStructure !==
          "undefined"
        ) {
          result = this._lmsLaunchData.entitlementKey.courseStructure;
        }
      }
      return result;
    },
    getLanguagePreference: function () {
      this.log("getLanguagePreference");
      var result = null;
      if (this._learnerPrefs === null) {
        throw new Error(
          "Can't determine language preference until learner preferences have been loaded"
        );
      }
      if (
        typeof this._learnerPrefs.contents.languagePreference !== "undefined"
      ) {
        result = this._learnerPrefs.contents.languagePreference;
      }
      return result;
    },
    setLanguagePreference: function (pref) {
      this.log("setLanguagePreference");
      if (this._learnerPrefs === null) {
        throw new Error(
          "Can't set language preference until learner preferences have been loaded"
        );
      }
      if (pref === "") {
        pref = null;
      }
      this._learnerPrefs.contents.languagePreference = pref;
      return;
    },
    getAudioPreference: function () {
      this.log("getAudioPreference");
      var result = null;
      if (this._learnerPrefs === null) {
        throw new Error(
          "Can't determine audio preference until learner preferences have been loaded"
        );
      }
      if (typeof this._learnerPrefs.contents.audioPreference !== "undefined") {
        result = this._learnerPrefs.contents.audioPreference;
      }
      return result;
    },
    setAudioPreference: function (pref) {
      this.log("setAudioPreference");
      if (this._learnerPrefs === null) {
        throw new Error(
          "Can't set audio preference until learner preferences have been loaded"
        );
      }
      if (pref !== "on" && pref !== "off" && pref !== null) {
        throw new Error("Unrecognized value for audio preference: " + pref);
      }
      this._learnerPrefs.contents.audioPreference = pref;
      return;
    },
    getDuration: function () {
      this.log("getDuration");
      return new Date().getTime() - this._durationStart;
    },
    setProgress: function (progress) {
      this.log("setProgress: ", progress);
      if (progress !== null) {
        if (!isInteger(progress)) {
          throw new Error(
            "Invalid progress measure (not an integer): " + progress
          );
        }
        if (progress < 0 || progress > 100) {
          throw new Error(
            "Invalid progress measure must be greater than or equal to 0 and less than or equal to 100: " +
              progress
          );
        }
      }
      this._progress = progress;
    },
    getProgress: function () {
      this.log("getProgress");
      return this._progress;
    },
    setFetch: function (fetchURL) {
      this.log("setFetch: ", fetchURL);
      var urlParts, schemeMatches, locationPort, isXD;
      this._fetch = fetchURL;
      this._fetchRequest = nativeRequest;
      urlParts = fetchURL
        .toLowerCase()
        .match(/([A-Za-z]+:)\/\/([^:\/]+):?(\d+)?(\/.*)?$/);
      if (urlParts === null) {
        throw new Error("URL invalid: failed to divide URL parts");
      }
      locationPort = location.port;
      schemeMatches = location.protocol.toLowerCase() === urlParts[1];
      if (locationPort === "") {
        locationPort =
          location.protocol.toLowerCase() === "http:"
            ? "80"
            : location.protocol.toLowerCase() === "https:"
            ? "443"
            : "";
      }
      isXD =
        !schemeMatches ||
        location.hostname.toLowerCase() !== urlParts[2] ||
        locationPort !==
          (urlParts[3] !== null &&
          typeof urlParts[3] !== "undefined" &&
          urlParts[3] !== ""
            ? urlParts[3]
            : urlParts[1] === "http:"
            ? "80"
            : urlParts[1] === "https:"
            ? "443"
            : "");
      if (isXD) {
        if (env.hasCORS) {
          if (env.useXDR && schemeMatches) {
            this._fetchRequest = xdrRequest;
          } else if (env.useXDR && !schemeMatches) {
            this.log(
              "[error] URL invalid: cross domain request for differing scheme in IE with XDR"
            );
            throw new Error(
              "URL invalid: cross domain request for differing scheme in IE with XDR"
            );
          }
        } else {
          this.log(
            "[error] URL invalid: cross domain requests not supported in this browser"
          );
          throw new Error(
            "URL invalid: cross domain requests not supported in this browser"
          );
        }
      }
    },
    getFetch: function () {
      return this._fetch;
    },
    setLRS: function (endpoint, auth) {
      this.log("setLRS: ", endpoint, auth);
      if (this._lrs !== null) {
        if (
          (typeof auth === "undefined" && endpoint === null) ||
          endpoint !== null
        ) {
          this._endpoint = this._lrs.endpoint = endpoint;
        }
        if (typeof auth !== "undefined" && auth !== null) {
          this._lrs.auth = auth;
        }
      } else {
        this._lrs = new TinCan.LRS({
          endpoint: endpoint,
          auth: auth,
          allowFail: false,
        });
      }
    },
    getLRS: function () {
      return this._lrs;
    },
    setActor: function (agent) {
      if (!(agent instanceof TinCan.Agent)) {
        agent = TinCan.Agent.fromJSON(agent);
      }
      if (
        agent.account === null ||
        !(agent.account instanceof TinCan.AgentAccount)
      ) {
        throw new Error("Invalid actor: missing or invalid account");
      } else if (agent.account.name === null) {
        throw new Error("Invalid actor: name is null");
      } else if (agent.account.name === "") {
        throw new Error("Invalid actor: name is empty");
      } else if (agent.account.homePage === null) {
        throw new Error("Invalid actor: homePage is null");
      } else if (agent.account.homePage === "") {
        throw new Error("Invalid actor: homePage is empty");
      }
      this._actor = agent;
    },
    getActor: function () {
      return this._actor;
    },
    setActivity: function (activity) {
      if (!(activity instanceof TinCan.Activity)) {
        activity = new TinCan.Activity({ id: activity });
      }
      if (activity.id === null) {
        throw new Error("Invalid activity: id is null");
      } else if (activity.id === "") {
        throw new Error("Invalid activity: id is empty");
      }
      this._activity = activity;
    },
    getActivity: function () {
      return this._activity;
    },
    setRegistration: function (registration) {
      if (registration === null) {
        throw new Error("Invalid registration: null");
      } else if (registration === "") {
        throw new Error("Invalid registration: empty");
      }
      this._registration = registration;
    },
    getRegistration: function () {
      return this._registration;
    },
    validateScore: function (score) {
      if (typeof score === "undefined" || score === null) {
        throw new Error("cannot validate score (score not provided): " + score);
      }
      if (typeof score.min !== "undefined") {
        if (!isInteger(score.min)) {
          throw new Error("score.min is not an integer");
        }
      }
      if (typeof score.max !== "undefined") {
        if (!isInteger(score.max)) {
          throw new Error("score.max is not an integer");
        }
      }
      if (typeof score.scaled !== "undefined") {
        if (!/^(\-|\+)?[01]+(\.[0-9]+)?$/.test(score.scaled)) {
          throw new Error(
            "scaled score not a recognized number: " + score.scaled
          );
        }
        if (score.scaled < 0) {
          throw new Error("scaled score must be greater than or equal to 0");
        }
        if (score.scaled > 1) {
          throw new Error("scaled score must be less than or equal to 1");
        }
      }
      if (typeof score.raw !== "undefined") {
        if (!isInteger(score.raw)) {
          throw new Error("score.raw is not an integer");
        }
        if (typeof score.min === "undefined") {
          throw new Error(
            "minimum score must be provided when including a raw score"
          );
        }
        if (typeof score.max === "undefined") {
          throw new Error(
            "maximum score must be provided when including a raw score"
          );
        }
        if (score.raw < score.min) {
          throw new Error(
            "raw score must be greater than or equal to minimum score"
          );
        }
        if (score.raw > score.max) {
          throw new Error(
            "raw score must be less than or equal to maximum score"
          );
        }
      }
      return true;
    },
    prepareStatement: function (verbId) {
      var stCfg = {
          actor: this._actor,
          verb: { id: verbId },
          target: this._activity,
          context: this._prepareContext(),
        },
        progress = this.getProgress();
      if (typeof verbDisplay[verbId] !== "undefined") {
        stCfg.verb.display = verbDisplay[verbId];
      }
      if (verbId !== VERB_COMPLETED_ID && progress !== null) {
        stCfg.result = {
          extensions: {
            "https://w3id.org/xapi/cmi5/result/extensions/progress": progress,
          },
        };
      }
      return new TinCan.Statement(stCfg);
    },
    sendStatement: function (st, callback) {
      var cbWrapper, result;
      if (callback) {
        cbWrapper = function (err, result) {
          if (err !== null) {
            callback(new Error(err), result);
            return;
          }
          callback(err, result, st);
        };
      }
      result = this._lrs.saveStatement(st, { callback: cbWrapper });
      if (!callback) {
        return { response: result, statement: st };
      }
    },
    initializedStatement: function () {
      this.log("initializedStatement");
      return this._prepareStatement(VERB_INITIALIZED_ID);
    },
    terminatedStatement: function () {
      this.log("terminatedStatement");
      var st = this._prepareStatement(VERB_TERMINATED_ID);
      st.result = st.result || new TinCan.Result();
      st.result.duration = TinCan.Utils.convertMillisecondsToISO8601Duration(
        this.getDuration()
      );
      return st;
    },
    passedStatement: function (score) {
      this.log("passedStatement");
      var st = this._prepareStatement(VERB_PASSED_ID),
        masteryScore;
      st.result = st.result || new TinCan.Result();
      st.result.success = true;
      st.result.duration = TinCan.Utils.convertMillisecondsToISO8601Duration(
        this.getDuration()
      );
      if (score) {
        try {
          this.validateScore(score);
        } catch (ex) {
          throw new Error("Invalid score - " + ex);
        }
        masteryScore = this.getMasteryScore();
        if (masteryScore !== null && typeof score.scaled !== "undefined") {
          if (score.scaled < masteryScore) {
            throw new Error(
              "Invalid score - scaled score does not meet or exceed mastery score (" +
                score.scaled +
                " < " +
                masteryScore +
                ")"
            );
          }
          st.context.extensions = st.context.extensions || {};
          st.context.extensions[EXTENSION_MASTERY_SCORE] = masteryScore;
        }
        st.result.score = new TinCan.Score(score);
      }
      st.context.contextActivities.category.push(CATEGORY_ACTIVITY_MOVEON);
      return st;
    },
    failedStatement: function (score) {
      this.log("failedStatement");
      var st = this._prepareStatement(VERB_FAILED_ID),
        masteryScore;
      st.result = st.result || new TinCan.Result();
      st.result.success = false;
      st.result.duration = TinCan.Utils.convertMillisecondsToISO8601Duration(
        this.getDuration()
      );
      if (score) {
        try {
          this.validateScore(score);
        } catch (ex) {
          throw new Error("Invalid score - " + ex);
        }
        masteryScore = this.getMasteryScore();
        if (masteryScore !== null && typeof score.scaled !== "undefined") {
          if (score.scaled >= masteryScore) {
            throw new Error(
              "Invalid score - scaled score exceeds mastery score (" +
                score.scaled +
                " >= " +
                masteryScore +
                ")"
            );
          }
          st.context.extensions = st.context.extensions || {};
          st.context.extensions[EXTENSION_MASTERY_SCORE] = masteryScore;
        }
        st.result.score = new TinCan.Score(score);
      }
      st.context.contextActivities.category.push(CATEGORY_ACTIVITY_MOVEON);
      return st;
    },
    completedStatement: function () {
      this.log("completedStatement");
      var st = this._prepareStatement(VERB_COMPLETED_ID);
      st.result = st.result || new TinCan.Result();
      st.result.completion = true;
      st.result.duration = TinCan.Utils.convertMillisecondsToISO8601Duration(
        this.getDuration()
      );
      st.context.contextActivities.category.push(CATEGORY_ACTIVITY_MOVEON);
      return st;
    },
    _prepareContext: function () {
      var context = JSON.parse(this._contextTemplate);
      context.registration = this._registration;
      if (this._includeSourceActivity) {
        context.contextActivities =
          context.contextActivities || new TinCan.ContextActivities();
        context.contextActivities.other = context.contextActivities.other || [];
        context.contextActivities.other.push(OTHER_ACTIVITY_CMI5JS);
      }
      return context;
    },
    _prepareStatement: function (verbId) {
      var st = this.prepareStatement(verbId);
      st.context.contextActivities =
        st.context.contextActivities || new TinCan.ContextActivities();
      st.context.contextActivities.category =
        st.context.contextActivities.category || [];
      st.context.contextActivities.category.push(CATEGORY_ACTIVITY_CMI5);
      return st;
    },
  };
  Cmi5.enableDebug = function (includeTinCan) {
    Cmi5.DEBUG = true;
    if (includeTinCan) {
      TinCan.enableDebug();
    }
  };
  Cmi5.disableDebug = function (includeTinCan) {
    Cmi5.DEBUG = false;
    if (includeTinCan) {
      TinCan.disableDebug();
    }
  };
  requestComplete = function (xhr, cfg, control, callback) {
    this.log(
      "requestComplete: " + control.finished + ", xhr.status: " + xhr.status
    );
    var requestCompleteResult, notFoundOk, httpStatus;
    if (typeof xhr.status === "undefined") {
      httpStatus = control.fakeStatus;
    } else {
      httpStatus = xhr.status === 1223 ? 204 : xhr.status;
    }
    if (!control.finished) {
      control.finished = true;
      notFoundOk = cfg.ignore404 && httpStatus === 404;
      if ((httpStatus >= 200 && httpStatus < 400) || notFoundOk) {
        if (callback) {
          callback(null, xhr);
        } else {
          requestCompleteResult = { err: null, xhr: xhr };
          return requestCompleteResult;
        }
      } else {
        requestCompleteResult = { err: httpStatus, xhr: xhr };
        if (httpStatus === 0) {
          this.log(
            "[warning] There was a problem communicating with the server. Aborted, offline, or invalid CORS endpoint (" +
              httpStatus +
              ")"
          );
        } else {
          this.log(
            "[warning] There was a problem communicating with the server. (" +
              httpStatus +
              " | " +
              xhr.responseText +
              ")"
          );
        }
        if (callback) {
          callback(httpStatus, xhr);
        }
        return requestCompleteResult;
      }
    } else {
      return requestCompleteResult;
    }
  };
  nativeRequest = function (fullUrl, cfg, callback) {
    this.log("sendRequest using XMLHttpRequest");
    var self = this,
      xhr,
      prop,
      pairs = [],
      data,
      control = { finished: false, fakeStatus: null },
      async,
      fullRequest = fullUrl;
    this.log("sendRequest using XMLHttpRequest - async: " + async);
    cfg = cfg || {};
    cfg.params = cfg.params || {};
    cfg.headers = cfg.headers || {};
    async = typeof callback !== "undefined";
    for (prop in cfg.params) {
      if (cfg.params.hasOwnProperty(prop)) {
        pairs.push(prop + "=" + encodeURIComponent(cfg.params[prop]));
      }
    }
    if (pairs.length > 0) {
      fullRequest += "?" + pairs.join("&");
    }
    xhr = new XMLHttpRequest();
    xhr.open(cfg.method, fullRequest, async);
    for (prop in cfg.headers) {
      if (cfg.headers.hasOwnProperty(prop)) {
        xhr.setRequestHeader(prop, cfg.headers[prop]);
      }
    }
    if (typeof cfg.data !== "undefined") {
      cfg.data += "";
    }
    data = cfg.data;
    if (async) {
      xhr.onreadystatechange = function () {
        self.log("xhr.onreadystatechange - xhr.readyState: " + xhr.readyState);
        if (xhr.readyState === 4) {
          requestComplete.call(self, xhr, cfg, control, callback);
        }
      };
    }
    try {
      xhr.send(data);
    } catch (ex) {
      this.log("sendRequest caught send exception: " + ex);
    }
    if (async) {
      return;
    }
    return requestComplete.call(this, xhr, cfg, control);
  };
  xdrRequest = function (fullUrl, cfg, callback) {
    this.log("sendRequest using XDomainRequest");
    var self = this,
      xhr,
      pairs = [],
      data,
      prop,
      until,
      control = { finished: false, fakeStatus: null },
      err;
    cfg = cfg || {};
    cfg.params = cfg.params || {};
    cfg.headers = cfg.headers || {};
    if (
      typeof cfg.headers["Content-Type"] !== "undefined" &&
      cfg.headers["Content-Type"] !== "application/json"
    ) {
      err = new Error("Unsupported content type for IE Mode request");
      if (callback) {
        callback(err, null);
        return null;
      }
      return { err: err, xhr: null };
    }
    for (prop in cfg.params) {
      if (cfg.params.hasOwnProperty(prop)) {
        pairs.push(prop + "=" + encodeURIComponent(cfg.params[prop]));
      }
    }
    if (pairs.length > 0) {
      fullUrl += "?" + pairs.join("&");
    }
    xhr = new XDomainRequest();
    xhr.open("POST", fullUrl);
    if (!callback) {
      xhr.onload = function () {
        control.fakeStatus = 200;
      };
      xhr.onerror = function () {
        control.fakeStatus = 400;
      };
      xhr.ontimeout = function () {
        control.fakeStatus = 0;
      };
    } else {
      xhr.onload = function () {
        control.fakeStatus = 200;
        requestComplete.call(self, xhr, cfg, control, callback);
      };
      xhr.onerror = function () {
        control.fakeStatus = 400;
        requestComplete.call(self, xhr, cfg, control, callback);
      };
      xhr.ontimeout = function () {
        control.fakeStatus = 0;
        requestComplete.call(self, xhr, cfg, control, callback);
      };
    }
    xhr.onprogress = function () {};
    xhr.timeout = 0;
    try {
      xhr.send(data);
    } catch (ex) {
      this.log("sendRequest caught send exception: " + ex);
    }
    if (!callback) {
      until = 10000 + Date.now();
      this.log(
        "sendRequest - until: " + until + ", finished: " + control.finished
      );
      while (Date.now() < until && control.fakeStatus === null) {
        __delay();
      }
      return requestComplete.call(self, xhr, cfg, control);
    }
    return;
  };
  __delay = function () {
    var xhr = new XMLHttpRequest(),
      url = window.location + "?forcenocache=" + TinCan.Utils.getUUID();
    xhr.open("GET", url, false);
    xhr.send(null);
  };
})();
var TC_COURSE_ID, TC_COURSE_NAME, TC_COURSE_DESC, TC_RECORD_STORES;
var TCAPI_STATUS = "",
  TCAPI_STATUS_CHANGED = false,
  TCAPI_SCORE = {},
  TCAPI_COMPLETION_STATUS = "",
  TCAPI_SATISFACTION_STATUS = null,
  TCAPI_UPDATES_PENDING = false,
  TCAPI_IN_PROGRESS = false,
  TCAPI_NO_ERROR = "",
  TCAPI_VERB_COMPLETED = "completed",
  TCAPI_VERB_EXPERIENCED = "experienced",
  TCAPI_VERB_ATTEMPTED = "attempted",
  TCAPI_VERB_ANSWERED = "answered",
  TCAPI_VERB_PASSED = "passed",
  TCAPI_VERB_FAILED = "failed",
  TCAPI_INIT_VERB = TCAPI_VERB_ATTEMPTED,
  TCAPI_INTERACTION = "http://adlnet.gov/expapi/activities/cmi.interaction",
  TCAPI_INTERACTION_TYPE_TRUE_FALSE = "true-false",
  TCAPI_INTERACTION_TYPE_CHOICE = "choice",
  TCAPI_INTERACTION_TYPE_FILL_IN = "fill-in",
  TCAPI_INTERACTION_TYPE_MATCHING = "matching",
  TCAPI_INTERACTION_TYPE_PERFORMANCE = "performance",
  TCAPI_INTERACTION_TYPE_SEQUENCING = "sequencing",
  TCAPI_INTERACTION_TYPE_LIKERT = "likert",
  TCAPI_INTERACTION_TYPE_NUMERIC = "numeric",
  TCAPI_STATE_BOOKMARK = "bookmark",
  TCAPI_STATE_TOTAL_TIME = "cumulative_time",
  TCAPI_STATE_SUSPEND_DATA = "suspend_data",
  TCAPI_CONN_ERROR = 998,
  TCAPI_DEP_ERROR = 999,
  TCAPI_ERROR_INVALID_PREFERENCE = 0,
  TCAPI_ERROR_INVALID_TIMESPAN = 1,
  TCAPI_FUNC_NOOP = function () {},
  intTCAPIError,
  strTCAPIErrorString,
  strTCAPIErrorDiagnostic;
var tincan;
var tcapi_cache;
function TCAPI_GetLaunchUrl() {
  WriteToDebug("In TCAPI_GetLaunchUrl");
  return location.href;
}
function TCAPI_Initialize() {
  WriteToDebug("In TCAPI_Initialize");
  tcapi_cache = { totalPrevDuration: null, statementQueue: [] };
  TinCan.prototype.log = TinCan.LRS.prototype.log = function (msg, src) {
    src = src || this.LOG_SRC || "TinCan";
    WriteToDebug("TinCan." + src + ": " + msg);
  };
  try {
    tincan = new TinCan({
      url: TCAPI_GetLaunchUrl(),
      recordStores: TC_RECORD_STORES,
      activity: {
        id: TC_COURSE_ID,
        definition: { name: TC_COURSE_NAME, description: TC_COURSE_DESC },
      },
    });
  } catch (ex) {
    WriteToDebug(
      "TCAPI_Initialize - TinCan construction failed: " + JSON.stringify(ex)
    );
    return;
  }
  if (tincan.recordStores.length === 0) {
    WriteToDebug(
      "TCAPI_Initialize - resulted in no LRS: DATA CANNOT BE STORED"
    );
    return;
  }
  WriteToDebug(
    "TCAPI_Initialize - fetching cumulative time from state: " +
      TCAPI_STATE_TOTAL_TIME
  );
  tincan.getState(TCAPI_STATE_TOTAL_TIME, {
    callback: function (err, state) {
      WriteToDebug("TCAPI_Initialize - getState callback");
      var contents;
      if (err !== null) {
        WriteToDebug(
          "TCAPI_Initialize - getState callback: " +
            err.responseText +
            " (" +
            err.status +
            ")"
        );
        return;
      }
      WriteToDebug("TCAPI_Initialize - getState callback - state: " + state);
      if (
        state !== null &&
        state.contents !== null &&
        state.contents.match(/^\d+$/)
      ) {
        tcapi_cache.totalPrevDuration = Number(state.contents);
      } else {
        tcapi_cache.totalPrevDuration = 0;
      }
    },
  });
  TCAPI_STATUS = TCAPI_INIT_VERB;
  TCAPI_IN_PROGRESS = true;
  WriteToDebug("TCAPI_Initialize - record initial launch statement");
  tincan.sendStatement(
    { verb: TCAPI_INIT_VERB, inProgress: TCAPI_IN_PROGRESS },
    function (results, statement) {
      if (results[0].err !== null) {
        WriteToDebug(
          "TCAPI_Initialize - record initial launch statement - err: " +
            results[0].err.responseText +
            " (" +
            results[0].err.status +
            ")"
        );
        return;
      }
      WriteToDebug(
        "TCAPI_Initialize - record initial launch statement success: " +
          statement.id
      );
    }
  );
  InitializeExecuted(true, "");
  return true;
}
function _TCAPI_SetStateSafe(key, value) {
  var result;
  try {
    result = tincan.setState(key, value);
  } catch (ex) {
    WriteToDebug(
      "In _TCAPI_SetStateSafe - caught exception from setState: " + ex.message
    );
  }
  return result;
}
function TCAPI_GetStudentID() {
  WriteToDebug("In TCAPI_GetStudentID");
  if (tincan.actor.mbox !== null) {
    return tincan.actor.mbox;
  }
  if (tincan.actor.mbox_sha1sum !== null) {
    return tincan.actor.mbox_sha1sum;
  }
  if (tincan.actor.openid !== null) {
    return tincan.actor.openid;
  }
  if (tincan.actor.account !== null) {
    return tincan.actor.account.name;
  }
  return null;
}
function TCAPI_GetStudentName() {
  WriteToDebug("In TCAPI_GetStudentName");
  return tincan.actor !== null ? tincan.actor.toString() : "";
}
function TCAPI_GetBookmark() {
  WriteToDebug("In TCAPI_GetBookmark");
  var bookmark = "",
    getStateResult = tincan.getState(TCAPI_STATE_BOOKMARK);
  if (getStateResult.state !== null) {
    bookmark = getStateResult.state.contents;
  }
  return bookmark;
}
function TCAPI_SetBookmark(value, name) {
  WriteToDebug("In TCAPI_SetBookmark - value: " + value + ", name: " + name);
  _TCAPI_SetStateSafe(TCAPI_STATE_BOOKMARK, value);
  WriteToDebug("In TCAPI_SetBookmark - sending statement: " + value);
  tincan.sendStatement(
    {
      verb: TCAPI_VERB_EXPERIENCED,
      object: {
        id: tincan.activity.id + "/" + value,
        definition: {
          name: { "en-US": name !== undefined && name !== "" ? name : value },
        },
      },
      context: { contextActivities: { parent: tincan.activity } },
    },
    function (results, statement) {
      if (results[0].err !== null) {
        WriteToDebug(
          "TCAPI_SetBookmark - sending statement: " +
            value +
            " - err: " +
            results[0].err.responseText +
            " (" +
            results[0].err.status +
            ")"
        );
        return;
      }
      WriteToDebug(
        "TCAPI_SetBookmark - sending statement success: " +
          value +
          " - id: " +
          statement.id
      );
    }
  );
  return true;
}
function TCAPI_GetDataChunk() {
  WriteToDebug("In TCAPI_GetDataChunk");
  var data = "",
    getStateResult = tincan.getState(TCAPI_STATE_SUSPEND_DATA);
  if (getStateResult.state !== null) {
    data = getStateResult.state.contents;
  }
  return data;
}
function TCAPI_SetDataChunk(value) {
  WriteToDebug("In TCAPI_SetDataChunk");
  _TCAPI_SetStateSafe(TCAPI_STATE_SUSPEND_DATA, value);
  return true;
}
function TCAPI_CommitData() {
  WriteToDebug("In TCAPI_CommitData - TCAPI_STATUS:" + TCAPI_STATUS);
  WriteToDebug(
    "In TCAPI_CommitData - TCAPI_UPDATES_PENDING: " + TCAPI_UPDATES_PENDING
  );
  var stmt,
    requestResults,
    result,
    statementAdded = false;
  TCAPI_ClearErrorInfo();
  if (TCAPI_UPDATES_PENDING) {
    stmt = { verb: TCAPI_STATUS, inProgress: TCAPI_IN_PROGRESS, result: {} };
    if (TCAPI_COMPLETION_STATUS !== "" || !TCAPI_IN_PROGRESS) {
      stmt.result.duration = ConvertMilliSecondsIntoSCORM2004Time(
        GetSessionAccumulatedTime() + TCAPI_GetPreviouslyAccumulatedTime()
      );
    }
    if (TCAPI_COMPLETION_STATUS !== "") {
      stmt.result.completion = true;
    }
    if (TCAPI_SATISFACTION_STATUS !== null) {
      stmt.result.success = TCAPI_SATISFACTION_STATUS;
    }
    if (typeof TCAPI_SCORE.raw !== "undefined") {
      stmt.result.score = TCAPI_SCORE;
    }
    tcapi_cache.statementQueue.push(stmt);
    statementAdded = true;
    TCAPI_UPDATES_PENDING = false;
  }
  if (tcapi_cache.statementQueue.length > 0) {
    requestResults = tincan.sendStatements(tcapi_cache.statementQueue);
    if (
      typeof requestResults.results !== "undefined" &&
      requestResults.results.length > 0
    ) {
      result = requestResults.results[0];
      if (result.err !== null) {
        errMesg = "Failed to commit data: statements";
        if (/^\d+$/.test(result.err)) {
          if (result.err === 0) {
            errCode = TCAPI_CONN_ERROR;
            errDiag = "Aborted, offline, or invalid CORS endpoint";
          } else {
            errCode = result.err;
            errDiag = result.xhr.responseText;
          }
        } else {
          errCode = TCAPI_DEP_ERROR;
          errDiag = result.err;
        }
        if (statementAdded) {
          tcapi_cache.statementQueue.pop();
          TCAPI_UPDATES_PENDING = true;
        }
        TCAPI_SetErrorInfoManually(errCode, errMesg, errDiag);
        return false;
      }
    }
    tcapi_cache.statementQueue = [];
  }
  return true;
}
function TCAPI_Finish(exitType, statusWasSet) {
  WriteToDebug("In TCAPI_Finish - exitType: " + exitType);
  if (exitType === EXIT_TYPE_SUSPEND) {
    _TCAPI_SetStateSafe(
      TCAPI_STATE_TOTAL_TIME,
      TCAPI_GetPreviouslyAccumulatedTime() + GetSessionAccumulatedTime()
    );
    TCAPI_SetSuspended();
  }
  TCAPI_CommitData();
  return true;
}
function TCAPI_GetAudioPlayPreference() {
  WriteToDebug("In TCAPI_GetAudioPlayPreference");
  var intTempPreference = 0,
    getStateResult;
  TCAPI_ClearErrorInfo();
  getStateResult = tincan.getState("cmi.student_preference.audio");
  if (getStateResult.state !== null) {
    intTempPreference = getStateResult.state.contents;
  }
  intTempPreference = parseInt(intTempPreference, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0) {
    WriteToDebug("Returning On");
    return PREFERENCE_ON;
  } else if (intTempPreference == 0) {
    WriteToDebug("Returning Default");
    return PREFERENCE_DEFAULT;
  } else if (intTempPreference < 0) {
    WriteToDebug("returning Off");
    return PREFERENCE_OFF;
  }
  WriteToDebug("Error: Invalid preference");
  TCAPI_SetErrorInfoManually(
    TCAPI_ERROR_INVALID_PREFERENCE,
    "Invalid audio preference received from LMS",
    "intTempPreference=" + intTempPreference
  );
  return null;
}
function TCAPI_GetAudioVolumePreference() {
  WriteToDebug("In TCAPI_GetAudioVollumePreference");
  var intTempPreference = 100,
    getStateResult;
  TCAPI_ClearErrorInfo();
  getStateResult = tincan.getState("cmi.student_preference.audio");
  if (getStateResult.state !== null) {
    intTempPreference = getStateResult.state.contents;
  }
  WriteToDebug("intTempPreference=" + intTempPreference);
  intTempPreference = parseInt(intTempPreference, 10);
  if (intTempPreference <= 0) {
    WriteToDebug("Setting to 100");
    intTempPreference = 100;
  }
  if (intTempPreference > 100) {
    WriteToDebug("ERROR: invalid preference");
    TCAPI_SetErrorInfoManually(
      TCAPI_ERROR_INVALID_PREFERENCE,
      "Invalid audio preference received from LMS",
      "intTempPreference=" + intTempPreference
    );
    return null;
  }
  WriteToDebug("Returning " + intTempPreference);
  return intTempPreference;
}
function TCAPI_SetAudioPreference(PlayPreference, intPercentOfMaxVolume) {
  WriteToDebug(
    "In TCAPI_SetAudioPreference PlayPreference=" +
      PlayPreference +
      ", intPercentOfMaxVolume=" +
      intPercentOfMaxVolume
  );
  TCAPI_ClearErrorInfo();
  if (PlayPreference == PREFERENCE_OFF) {
    WriteToDebug("Setting percent to -1 - OFF");
    intPercentOfMaxVolume = -1;
  }
  _TCAPI_SetStateSafe("cmi.student_preference.audio", intPercentOfMaxVolume);
}
function TCAPI_SetLanguagePreference(strLanguage) {
  WriteToDebug("In TCAPI_SetLanguagePreference strLanguage=" + strLanguage);
  TCAPI_ClearErrorInfo();
  _TCAPI_SetStateSafe("cmi.student_preference.language", strLanguage);
}
function TCAPI_GetLanguagePreference() {
  WriteToDebug("In TCAPI_GetLanguagePreference");
  var pref, getStateResult;
  TCAPI_ClearErrorInfo();
  getStateResult = tincan.getState("cmi.student_preference.language");
  if (getStateResult.state !== null) {
    pref = getStateResult.state.contents;
  }
  return pref;
}
function TCAPI_SetSpeedPreference(intPercentOfMax) {
  WriteToDebug(
    "In TCAPI_SetSpeedPreference intPercentOfMax=" + intPercentOfMax
  );
  var intTCAPISpeed;
  TCAPI_ClearErrorInfo();
  intTCAPISpeed = intPercentOfMax * 2 - 100;
  WriteToDebug("intTCAPISpeed=" + intTCAPISpeed);
  _TCAPI_SetStateSafe("cmi.student_preference.speed", intTCAPISpeed);
}
function TCAPI_GetSpeedPreference() {
  WriteToDebug("In TCAPI_GetSpeedPreference");
  var intTCAPISpeed = 100,
    intPercentOfMax,
    getStateResult;
  TCAPI_ClearErrorInfo();
  getStateResult = tincan.getState("cmi.student_preference.speed");
  if (getStateResult.state !== null) {
    intTCAPISpeed = getStateResult.state.contents;
  }
  WriteToDebug("intTCAPISpeed=" + intTCAPISpeed);
  if (!ValidInteger(intTCAPISpeed)) {
    WriteToDebug("ERROR - invalid integer");
    TCAPI_SetErrorInfoManually(
      TCAPI_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - not an integer",
      "intTCAPISpeed=" + intTCAPISpeed
    );
    return null;
  }
  intTCAPISpeed = parseInt(intTCAPISpeed, 10);
  if (intTCAPISpeed < -100 || intTCAPISpeed > 100) {
    WriteToDebug("ERROR - out of range");
    TCAPI_SetErrorInfoManually(
      TCAPI_ERROR_INVALID_SPEED,
      "Invalid speed preference received from LMS - out of range",
      "intTCAPISpeed=" + intTCAPISpeed
    );
    return null;
  }
  intPercentOfMax = (intTCAPISpeed + 100) / 2;
  intPercentOfMax = parseInt(intPercentOfMax, 10);
  WriteToDebug("Returning " + intPercentOfMax);
  return intPercentOfMax;
}
function TCAPI_SetTextPreference(intPreference) {
  WriteToDebug("In TCAPI_SetTextPreference intPreference=" + intPreference);
  TCAPI_ClearErrorInfo();
  _TCAPI_SetStateSafe("cmi.student_preference.text", intPreference);
}
function TCAPI_GetTextPreference() {
  WriteToDebug("In TCAPI_GetTextPreference");
  var intTempPreference = 0,
    getStateResult;
  TCAPI_ClearErrorInfo();
  getStateResult = tincan.getState("cmi.student_preference.text");
  if (getStateResult.state !== null) {
    intTempPreference = getStateResult.state.contents;
  }
  intTempPreference = parseInt(intTempPreference, 10);
  WriteToDebug("intTempPreference=" + intTempPreference);
  if (intTempPreference > 0) {
    WriteToDebug("Returning On");
    return PREFERENCE_ON;
  } else if (intTempPreference == 0 || intTempPreference == "") {
    WriteToDebug("Returning Default");
    return PREFERENCE_DEFAULT;
  } else if (intTempPreference < 0) {
    WriteToDebug("returning Off");
    return PREFERENCE_OFF;
  }
  WriteToDebug("Error: Invalid preference");
  TCAPI_SetErrorInfoManually(
    TCAPI_ERROR_INVALID_PREFERENCE,
    "Invalid text preference received from LMS",
    "intTempPreference=" + intTempPreference
  );
  return null;
}
function TCAPI_GetPreviouslyAccumulatedTime() {
  WriteToDebug("In TCAPI_GetPreviouslyAccumulatedTime");
  var data = 0,
    getStateResult;
  WriteToDebug(
    "In TCAPI_GetPreviouslyAccumulatedTime - cached: " +
      tcapi_cache.totalPrevDuration
  );
  if (tcapi_cache.totalPrevDuration === null) {
    getStateResult = tincan.getState(TCAPI_STATE_TOTAL_TIME);
    if (getStateResult.state !== null) {
      data = Number(getStateResult.state.contents);
    }
    tcapi_cache.totalPrevDuration = data === NaN ? 0 : data;
  }
  return tcapi_cache.totalPrevDuration;
}
function TCAPI_SaveTime(intMilliSeconds) {
  WriteToDebug("In TCAPI_SaveTime");
  return true;
}
function TCAPI_GetMaxTimeAllowed() {
  WriteToDebug("In TCAPI_GetMaxTimeAllowed");
  return null;
}
function TCAPI_SetScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "In TCAPI_SetScore intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  TCAPI_ClearErrorInfo();
  TCAPI_SCORE["raw"] = intScore;
  TCAPI_SCORE["max"] = intMaxScore;
  TCAPI_SCORE["min"] = intMinScore;
  WriteToDebug("Returning " + TCAPI_SCORE);
  TCAPI_UPDATES_PENDING = true;
  return true;
}
function TCAPI_GetScore() {
  WriteToDebug("In TCAPI_GetScore");
  TCAPI_ClearErrorInfo();
  WriteToDebug("Returning " + TCAPI_SCORE["raw"]);
  return TCAPI_SCORE["raw"];
}
function TCAPI_SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "TCAPI_SetPointBasedScore - TCAPI does not support SetPointBasedScore, falling back to SetScore"
  );
  return TCAPI_SetScore(intScore, intMaxScore, intMinScore);
}
function TCAPI_GetScaledScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "TCAPI_GetScaledScore - TCAPI does not support GetScaledScore, returning false"
  );
  return false;
}
function TCAPI_RecordInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime,
  TCAPIInteractionType,
  strAlternateResponse,
  strAlternateCorrectResponse
) {
  var blnTempResult,
    intInteractionIndex,
    strResult,
    actObj = {},
    stmt,
    activityName,
    interactionActivityId = strID,
    interactionActivityType = TCAPI_INTERACTION;
  TCAPI_ClearErrorInfo();
  if (strID.indexOf(tincan.activity.id + "-") == 0) {
    activityName = strID.substring(tincan.activity.id.length + 1);
  }
  if (!TCAPI_DONT_USE_BROKEN_URN_IDS) {
    interactionActivityId =
      tincan.activity.id + "-urn:scormdriver:" + activityName;
  }
  switch (TCAPIInteractionType) {
    case "true-false":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "true-false",
          name: { und: activityName },
        },
      };
      break;
    case "choice":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "choice",
          name: { und: activityName },
        },
      };
      break;
    case "fill-in":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "fill-in",
          name: { und: activityName },
        },
      };
      break;
    case "matching":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "matching",
          name: { und: activityName },
        },
      };
      break;
    case "performance":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "performance",
          name: { und: activityName },
        },
      };
      break;
    case "sequencing":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "sequencing",
          name: { und: activityName },
        },
      };
      break;
    case "likert":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "likert",
          name: { und: activityName },
        },
      };
      break;
    case "numeric":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "numeric",
          name: { und: activityName },
        },
      };
      break;
    case "other":
      actObj = {
        id: interactionActivityId,
        definition: {
          description: { "en-US": strDescription },
          type: interactionActivityType,
          interactionType: "other",
          name: { und: activityName },
        },
      };
      break;
    default:
      WriteToDebug(
        "TCAPI_RecordInteraction received an invalid TCPAIInteractionType of " +
          TCAPIInteractionType
      );
      return false;
  }
  if (actObj.id !== null) {
    if (strCorrectResponse !== null && strCorrectResponse !== "") {
      actObj.definition.correctResponsesPattern = [strCorrectResponse];
    }
    stmt = {
      verb: TCAPI_VERB_ANSWERED,
      object: actObj,
      context: {
        contextActivities: {
          parent: tincan.activity,
          grouping: { id: tincan.activity.id + "-" + strLearningObjectiveID },
        },
      },
    };
    if (
      strResponse !== null ||
      (intLatency !== null && intLatency !== "") ||
      (intWeighting !== null && intWeighting !== "")
    ) {
      stmt.result = {};
      if (strResponse !== null) {
        stmt.result.response = strResponse;
        if (blnCorrect === true || blnCorrect === INTERACTION_RESULT_CORRECT) {
          stmt.result.success = true;
        } else if (
          blnCorrect === false ||
          blnCorrect === "" ||
          blnCorrect === "false" ||
          blnCorrect === INTERACTION_RESULT_WRONG
        ) {
          stmt.result.success = false;
        }
      }
      if (intLatency !== null && intLatency !== "") {
        stmt.result.duration =
          TinCan.Utils.convertMillisecondsToISO8601Duration(intLatency);
      }
      if (intWeighting !== null && intWeighting !== "") {
        stmt.result.extensions = stmt.result.extensions || {};
        stmt.result.extensions[
          "http://id.tincanapi.com/extension/cmi-interaction-weighting"
        ] = intWeighting;
      }
    }
    tcapi_cache.statementQueue.push(stmt);
  }
  return true;
}
function TCAPI_RecordTrueFalseInteraction(
  strID,
  blnResponse,
  blnCorrect,
  blnCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordTrueFalseInteraction strID=" +
      strID +
      ", blnResponse=" +
      blnResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", blnCorrectResponse=" +
      blnCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strCorrectResponse = null;
  if (blnResponse === true) {
    strResponse = "true";
  } else if (blnResponse === false) {
    strResponse = "false";
  }
  if (blnCorrectResponse === true) {
    strCorrectResponse = "true";
  } else if (blnCorrectResponse === false) {
    strCorrectResponse = "false";
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_TRUE_FALSE,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordMultipleChoiceInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordMultipleChoiceInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strResponseLong = null,
    strCorrectResponse = "",
    strCorrectResponseLong = "";
  if (aryResponse !== null) {
    strResponse = "";
    strResponseLong = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += "[,]";
      }
      strResponse += aryResponse[i].Short;
      strResponseLong += aryResponse[i].Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += "[,]";
    }
    strCorrectResponse += aryCorrectResponse[i].Short;
    strCorrectResponseLong += aryCorrectResponse[i].Long;
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_CHOICE,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordFillInInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordFillInInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strResponse !== null) {
    strResponse = new String(strResponse);
    if (strResponse.length > 255) {
      strResponse = strResponse.substr(0, 255);
    }
  }
  if (strCorrectResponse !== null) {
    strCorrectResponse = new String(strCorrectResponse);
    if (strCorrectResponse.length > 255) {
      strCorrectResponse = strCorrectResponse.substr(0, 255);
    }
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_FILL_IN,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordMatchingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordMatchingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strResponseLong = null,
    strCorrectResponse = "",
    strCorrectResponseLong = "";
  if (aryResponse !== null) {
    strResponse = "";
    strResponseLong = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += "[,]";
      }
      strResponse +=
        aryResponse[i].Source.Short + "[.]" + aryResponse[i].Target.Short;
      strResponseLong +=
        aryResponse[i].Source.Long + "[.]" + aryResponse[i].Target.Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += "[,]";
    }
    strCorrectResponse +=
      aryCorrectResponse[i].Source.Short +
      "[.]" +
      aryCorrectResponse[i].Target.Short;
    strCorrectResponseLong +=
      aryCorrectResponse[i].Source.Long +
      "[.]" +
      aryCorrectResponse[i].Target.Long;
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_MATCHING,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordPerformanceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordPerformanceInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strResponse !== null) {
    strResponse = new String(strResponse);
    if (strResponse.length > 255) {
      strResponse = strResponse.substr(0, 255);
    }
  }
  if (strCorrectResponse !== null) {
    strCorrectResponse = new String(strCorrectResponse);
    if (strCorrectResponse.length > 255) {
      strCorrectResponse = strCorrectResponse.substr(0, 255);
    }
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_PERFORMANCE,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordSequencingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordSequencingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strResponseLong = null,
    strCorrectResponse = "",
    strCorrectResponseLong = "";
  if (aryResponse !== null) {
    strResponse = "";
    strResponseLong = "";
    for (var i = 0; i < aryResponse.length; i++) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      if (strResponseLong.length > 0) {
        strResponseLong += "[,]";
      }
      strResponse += aryResponse[i].Short;
      strResponseLong += aryResponse[i].Long;
    }
  }
  for (var i = 0; i < aryCorrectResponse.length; i++) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    if (strCorrectResponseLong.length > 0) {
      strCorrectResponseLong += "[,]";
    }
    strCorrectResponse += aryCorrectResponse[i].Short;
    strCorrectResponseLong += aryCorrectResponse[i].Long;
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_SEQUENCING,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordLikertInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordLikertInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strResponseLong = null,
    strCorrectResponse = null,
    strCorrectResponseLong = null;
  if (response !== null) {
    strResponse = response.Short;
    strResponseLong = response.Long;
  }
  if (correctResponse !== null) {
    strCorrectResponse = correctResponse.Short;
    strCorrectResponseLong = correctResponse.Long;
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponseLong,
    blnCorrect,
    strCorrectResponseLong,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_LIKERT,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_RecordNumericInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In TCAPI_RecordNumericInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (
    typeof strCorrectResponse !== "undefined" &&
    strCorrectResponse !== null
  ) {
    if (
      !IsValidDecimalRange(strCorrectResponse) &&
      !IsValidDecimal(strCorrectResponse)
    ) {
      WriteToDebug(
        "Returning False -  TCAPI_RecordNumericInteraction received invalid correct response (not a decimal or range), strCorrectResponse=" +
          strCorrectResponse
      );
      return false;
    }
  }
  return TCAPI_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    TCAPI_INTERACTION_TYPE_NUMERIC,
    strResponse,
    strCorrectResponse
  );
}
function TCAPI_GetEntryMode() {
  WriteToDebug("In TCAPI_GetEntryMode");
  return null;
}
function TCAPI_GetLessonMode() {
  WriteToDebug("In TCAPI_GetLessonMode");
  return null;
}
function TCAPI_GetTakingForCredit() {
  WriteToDebug("In TCAPI_GetTakingForCredit");
  return null;
}
function TCAPI_SetObjectiveScore(
  strObjectiveID,
  intScore,
  intMaxScore,
  intMinScore
) {
  WriteToDebug(
    "In TCAPI_SetObjectiveScore, strObejctiveID=" +
      strObjectiveID +
      ", intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  return false;
}
function TCAPI_SetObjectiveDescription(
  strObjectiveID,
  strObjectiveDescription
) {
  WriteToDebug(
    "In TCAPI_SetObjectiveDescription, strObjectiveDescription=" +
      strObjectiveDescription
  );
  return false;
}
function TCAPI_SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  WriteToDebug(
    "In TCAPI_SetObjectiveStatus strObjectiveID=" +
      strObjectiveID +
      ", Lesson_Status=" +
      Lesson_Status
  );
  return false;
}
function TCAPI_GetObjectiveScore(strObjectiveID) {
  WriteToDebug("In TCAPI_GetObjectiveScore, strObejctiveID=" + strObjectiveID);
  return false;
}
function TCAPI_GetObjectiveDescription(strObjectiveID) {
  WriteToDebug(
    "In TCAPI_GetObjectiveDescription, strObejctiveID=" + strObjectiveID
  );
  return false;
}
function TCAPI_GetObjectiveStatus(strObjectiveID) {
  WriteToDebug("In TCAPI_GetObjectiveStatus, strObejctiveID=" + strObjectiveID);
  return false;
}
function TCAPI_SetSuspended() {
  WriteToDebug("In TCAPI_SetSuspended");
  if (TCAPI_IN_PROGRESS) {
    TCAPI_IN_PROGRESS = false;
    TCAPI_UPDATES_PENDING = true;
  }
  return true;
}
function TCAPI_SetFailed() {
  WriteToDebug("In TCAPI_SetFailed");
  TCAPI_STATUS = TCAPI_VERB_FAILED;
  TCAPI_STATUS_CHANGED = true;
  TCAPI_SATISFACTION_STATUS = false;
  TCAPI_IN_PROGRESS = false;
  TCAPI_UPDATES_PENDING = true;
  return true;
}
function TCAPI_SetPassed() {
  WriteToDebug("In TCAPI_SetPassed");
  TCAPI_STATUS = TCAPI_VERB_PASSED;
  TCAPI_STATUS_CHANGED = true;
  TCAPI_SATISFACTION_STATUS = true;
  TCAPI_IN_PROGRESS = false;
  TCAPI_UPDATES_PENDING = true;
  return true;
}
function TCAPI_SetCompleted() {
  WriteToDebug("In TCAPI_SetCompleted");
  TCAPI_ClearErrorInfo();
  if (TCAPI_STATUS === TCAPI_INIT_VERB) {
    TCAPI_STATUS = TCAPI_VERB_COMPLETED;
    TCAPI_STATUS_CHANGED = true;
  }
  TCAPI_COMPLETION_STATUS = TCAPI_VERB_COMPLETED;
  TCAPI_IN_PROGRESS = false;
  TCAPI_UPDATES_PENDING = true;
  return true;
}
function TCAPI_ResetStatus() {
  WriteToDebug("In TCAPI_ResetStatus");
  TCAPI_ClearErrorInfo();
  TCAPI_STATUS = TCAPI_INIT_VERB;
  TCAPI_STATUS_CHANGED = true;
  TCAPI_COMPLETION_STATUS = "";
  TCAPI_SATISFACTION_STATUS = null;
  TCAPI_IN_PROGRESS = true;
  TCAPI_UPDATES_PENDING = true;
  return true;
}
function TCAPI_GetStatus() {
  WriteToDebug("In TCAPI_GetStatus");
  var strStatus = "";
  TCAPI_ClearErrorInfo();
  if (TCAPI_STATUS === TCAPI_VERB_COMPLETED) {
    strStatus = "completed";
  } else if (TCAPI_STATUS === TCAPI_VERB_ATTEMPTED) {
    strStatus = "attempted";
  } else if (TCAPI_STATUS === TCAPI_VERB_PASSED) {
    strStatus = "passed";
  } else if (TCAPI_STATUS === TCAPI_VERB_FAILED) {
    strStatus = "failed";
  } else {
    strStatus = TCAPI_STATUS;
  }
  WriteToDebug("In TCAPI_GetStatus - strStatus=" + strStatus);
  return strStatus;
}
function TCAPI_CreateValidIdentifier(str) {
  return tincan.activity.id + "-" + encodeURIComponent(str);
}
function TCAPI_SetNavigationRequest(strNavRequest) {
  WriteToDebug(
    "TCAPI_GetNavigationRequest - TCAPI does not support navigation requests, returning false"
  );
  return false;
}
function TCAPI_GetNavigationRequest() {
  WriteToDebug(
    "TCAPI_GetNavigationRequest - TCAPI does not support navigation requests, returning false"
  );
  return false;
}
function TCAPI_CreateDataBucket(strBucketId, intMinSize, intMaxSize) {
  WriteToDebug(
    "TCAPI_CreateDataBucket - TCAPI does not support SSP, returning false"
  );
  return false;
}
function TCAPI_GetDataFromBucket(strBucketId) {
  WriteToDebug(
    "TCAPI_GetDataFromBucket - TCAPI does not support SSP, returning empty string"
  );
  return "";
}
function TCAPI_PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug(
    "TCAPI_PutDataInBucket - TCAPI does not support SSP, returning false"
  );
  return false;
}
function TCAPI_DetectSSPSupport() {
  WriteToDebug(
    "TCAPI_DetectSSPSupport - TCAPI does not support SSP, returning false"
  );
  return false;
}
function TCAPI_GetBucketInfo(strBucketId) {
  WriteToDebug(
    "TCAPI_GetBucketInfo - TCAPI does not support SSP, returning empty SSPBucketSize"
  );
  return new SSPBucketSize(0, 0);
}
function TCAPI_WriteComment(strComment) {
  WriteToDebug("In TCAPI_WriteComment - TCAPI does not support comments");
  return false;
}
function TCAPI_GetComments() {
  WriteToDebug("In TCAPI_GetComments - TCAPI does not support comments");
  return "";
}
function TCAPI_GetLMSComments() {
  WriteToDebug("In TCAPI_GetLMSComments - TCAPI does not support LMS comments");
  return "";
}
function TCAPI_GetLaunchData() {
  WriteToDebug("In TCAPI_GetLaunchData - TCAPI does not support launch data");
  return false;
}
function TCAPI_DisplayMessageOnTimeout() {
  TCAPI_ClearErrorInfo();
  WriteToDebug(
    "In TCAPI_DisplayMessageOnTimeout - TCAPI does not support MessageOnTimeout"
  );
  return false;
}
function TCAPI_ExitOnTimeout() {
  WriteToDebug("In TCAPI_ExitOnTimeout - TCAPI does not support ExitOnTimeout");
  return false;
}
function TCAPI_GetPassingScore() {
  WriteToDebug(
    "In TCAPI_GetPassingScore - TCAPI does not support GetPassingScore"
  );
  return false;
}
function TCAPI_GetProgressMeasure() {
  WriteToDebug(
    "TCAPI_GetProgressMeasure - TCAPI does not support progress_measure, returning false"
  );
  return false;
}
function TCAPI_SetProgressMeasure() {
  WriteToDebug(
    "TCAPI_SetProgressMeasure - TCAPI does not support progress_measure, returning false"
  );
  return false;
}
function TCAPI_GetObjectiveProgressMeasure() {
  WriteToDebug(
    "TCAPI_GetObjectiveProgressMeasure - TCAPI does not support progress_measure, returning false"
  );
  return false;
}
function TCAPI_SetObjectiveProgressMeasure() {
  WriteToDebug(
    "TCAPI_SetObjectiveProgressMeasure - TCAPI does not support progress_measure, returning false"
  );
  return false;
}
function TCAPI_GetInteractionType(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionType - TCAPI does not support interaction retrieval, returning empty string"
  );
  return "";
}
function TCAPI_GetInteractionTimestamp(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionTimestamp - TCAPI does not support interaction retrieval, returning empty string"
  );
  return "";
}
function TCAPI_GetInteractionCorrectResponses(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionCorrectResponses - TCAPI does not support interaction retrieval, returning empty array"
  );
  return [];
}
function TCAPI_GetInteractionWeighting(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionWeighting - TCAPI does not support interaction retrieval, returning empty string"
  );
  return "";
}
function TCAPI_GetInteractionLearnerResponses(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionLearnerResponses - TCAPI does not support interaction retrieval, returning empty array"
  );
  return [];
}
function TCAPI_GetInteractionResult(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionResult - TCAPI does not support interaction retrieval, returning empty string"
  );
  return "";
}
function TCAPI_GetInteractionLatency(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionDescription - TCAPI does not support interaction retrieval, returning empty string"
  );
  return "";
}
function TCAPI_GetInteractionDescription(strInteractionID) {
  WriteToDebug(
    "TCAPI_GetInteractionDescription - TCAPI does not support interaction retrieval, returning empty string"
  );
  return "";
}
function TCAPI_ClearErrorInfo() {
  WriteToDebug("In TCAPI_ClearErrorInfo");
  intTCAPIError = TCAPI_NO_ERROR;
  strTCAPIErrorString = "";
  strTCAPIErrorDiagnostic = "";
}
function TCAPI_SetErrorInfoManually(intNum, strString, strDiagnostic) {
  WriteToDebug("In TCAPI_SetErrorInfoManually");
  WriteToDebug("ERROR-Num=" + intNum);
  WriteToDebug("      String=" + strString);
  WriteToDebug("      Diag=" + strDiagnostic);
  intTCAPIError = intNum;
  strTCAPIErrorString = strString;
  strTCAPIErrorDiagnostic = strDiagnostic;
}
function TCAPI_GetLastError() {
  WriteToDebug("In TCAPI_GetLastError");
  if (intTCAPIError === TCAPI_NO_ERROR) {
    WriteToDebug("Returning No Error");
    return NO_ERROR;
  } else {
    WriteToDebug("Returning " + intTCAPIError);
    return intTCAPIError;
  }
}
function TCAPI_GetLastErrorDesc() {
  WriteToDebug(
    "In TCAPI_GetLastErrorDesc, " +
      strTCAPIErrorString +
      "\n" +
      strTCAPIErrorDiagnostic
  );
  return strTCAPIErrorString + "\n" + strTCAPIErrorDiagnostic;
}
var CMI5_PENDING_STATUS = { completion: null, success: null, score: null },
  CMI5_COMMITTED_STATUS = {
    completion: null,
    success: null,
    score: null,
    launchModes: [],
  },
  CMI5_STATEMENT_QUEUE = [],
  CMI5_SESSION_DURATION = null,
  CMI5_TOTAL_PREV_DURATION = null,
  CMI5_ENTRY_MODE = null,
  CMI5_INTERACTIONS = {},
  CMI5_SSP_BUCKETS = {},
  CMI5_VERB_ID_FAILED = "http://adlnet.gov/expapi/verbs/failed",
  CMI5_VERB_ID_PASSED = "http://adlnet.gov/expapi/verbs/passed",
  CMI5_VERB_ID_COMPLETED = "http://adlnet.gov/expapi/verbs/completed",
  CMI5_EXTENSION_MASTERY_SCORE =
    "https://w3id.org/xapi/cmi5/context/extensions/masteryscore",
  CMI5_PREF_AUDIO_PLAY = null,
  CMI5_PREF_AUDIO_VOLUME = null,
  CMI5_PREF_LANGUAGE = null,
  CMI5_PREF_SPEED = null,
  CMI5_PREF_TEXT = null,
  CMI5_INTERACTION_ACTIVITY_TYPE =
    "http://adlnet.gov/expapi/activities/cmi.interaction",
  CMI5_INTERACTION_TYPE_TRUE_FALSE = "true-false",
  CMI5_INTERACTION_TYPE_CHOICE = "choice",
  CMI5_INTERACTION_TYPE_FILL_IN = "fill-in",
  CMI5_INTERACTION_TYPE_LONG_FILL_IN = "long-fill-in",
  CMI5_INTERACTION_TYPE_MATCHING = "matching",
  CMI5_INTERACTION_TYPE_PERFORMANCE = "performance",
  CMI5_INTERACTION_TYPE_SEQUENCING = "sequencing",
  CMI5_INTERACTION_TYPE_LIKERT = "likert",
  CMI5_INTERACTION_TYPE_NUMERIC = "numeric",
  CMI5_STATE_BOOKMARK = "bookmark",
  CMI5_STATE_GENERIC_DATA = "generic_data",
  CMI5_STATE_TOTAL_TIME = "cumulative_time",
  CMI5_STATE_COMMITTED_STATUS = "status",
  CMI5_STATE_COMMENTS = "learner_comments",
  CMI5_STATE_SSP_BUCKET_PREFIX = "sspBucket",
  CMI5_STATE_LANGUAGE_PREFERENCE = "cmi.student_preference.language",
  CMI5_STATE_VOLUME_PREFERENCE = "cmi.student_preference.audio",
  CMI5_STATE_SPEED_PREFERENCE = "cmi.student_preference.speed",
  CMI5_STATE_TEXT_PREFERENCE = "cmi.student_preference.text",
  CMI5_NO_ERROR = "",
  CMI5_CONN_ERROR = 998,
  CMI5_DEP_ERROR = 999,
  CMI5_ERROR_NOT_IMPLEMENTED = 998,
  CMI5_ERROR_INVALID_SCORE = 1,
  CMI5_ERROR_UNRECOGNIZED_SSP_BUCKET = 2,
  CMI5_ERROR_UNRECOGNIZED_INTERACTION = 3,
  CMI5_ERROR_NON_NORMAL_MODE = 4,
  CMI5_ERROR_ALREADY_COMMITTED = 5,
  CMI5_ERROR_INVALID_STATUS_BASED_ON_SCORE = 6,
  CMI5_ERROR_SSP_BUCKET_LOAD_FAILED = 7,
  CMI5_ERROR_SSP_BUCKET_ALREADY_EXISTS = 8,
  CMI5_ERROR_SSP_BUCKET_INVALID_JSON = 9,
  CMI5_ERROR_INTERACTION_INVALID_JSON = 10,
  CMI5_ERROR_INTERACTION_LOAD_FAILED = 11,
  intCMI5Error = CMI5_NO_ERROR,
  strCMI5ErrorString = "",
  strCMI5ErrorDiagnostic = "",
  cmi5;
function CMI5_SaveState(key, value, contentType, includeRegistration) {
  WriteToDebug("In CMI5_SaveState - key: " + key + ", value: " + value);
  var saveStateCfg = {
      agent: cmi5.getActor(),
      activity: cmi5.getActivity(),
      contentType: contentType,
    },
    result,
    errCode,
    errMesg,
    errDiag;
  if (
    typeof includeRegistration === "undefined" ||
    includeRegistration === null ||
    includeRegistration
  ) {
    saveStateCfg.registration = cmi5.getRegistration();
  }
  result = cmi5.getLRS().saveState(key, value, saveStateCfg);
  if (result.err !== null) {
    WriteToDebug("Failed to save " + key + " in state: " + result.err);
    errMesg = "Failed to save state: " + key;
    if (/^\d+$/.test(result.err)) {
      errCode = result.err;
      if (result.err === 0) {
        errDiag = "Aborted, offline, or invalid CORS endpoint";
      } else {
        errDiag = result.xhr.responseText;
      }
    } else {
      errCode = CMI5_DEP_ERROR;
      errDiag = result.err;
    }
    CMI5_SetErrorInfoManually(errCode, errMesg, errDiag);
    return false;
  }
  return true;
}
function CMI5_RetrieveState(key, includeRegistration) {
  WriteToDebug("In CMI5_RetrieveState - key: " + key);
  var retrieveStateCfg = {
      agent: cmi5.getActor(),
      activity: cmi5.getActivity(),
    },
    result,
    value = "",
    errCode,
    errMesg,
    errDiag;
  if (
    typeof includeRegistration === "undefined" ||
    includeRegistration === null ||
    includeRegistration
  ) {
    retrieveStateCfg.registration = cmi5.getRegistration();
  }
  result = cmi5.getLRS().retrieveState(key, retrieveStateCfg);
  if (result.err !== null) {
    WriteToDebug("Failed to retrieve " + key + " from state: " + result.err);
    errMesg = "Failed to retrieve state: " + key;
    if (/^\d+$/.test(result.err)) {
      errCode = result.err;
      if (result.err === 0) {
        errDiag = "Aborted, offline, or invalid CORS endpoint";
      } else {
        errDiag = result.xhr.responseText;
      }
    } else {
      errCode = CMI5_DEP_ERROR;
      errDiag = result.err;
    }
    CMI5_SetErrorInfoManually(errCode, errMesg, errDiag);
    return "";
  }
  if (result.state !== null) {
    value = result.state.contents;
  }
  return value;
}
function CMI5_GetLaunchUrl() {
  WriteToDebug("In CMI5_GetLaunchUrl");
  return document.location.href;
}
function CMI5_Initialize() {
  WriteToDebug("In CMI5_Initialize");
  var launchUrl;
  Cmi5.prototype.log = function () {
    var mesg = "cmi5.js:",
      i;
    for (i = 0; i < arguments.length; i += 1) {
      mesg += " ";
      mesg +=
        typeof arguments[i] === "string"
          ? arguments[i]
          : JSON.stringify(arguments[i]);
    }
    WriteToDebug(mesg);
  };
  TinCan.LRS.prototype.log = function (msg, src) {
    src = src || this.LOG_SRC || "LRS";
    WriteToDebug("TinCan." + src + ": " + msg);
  };
  try {
    launchUrl = CMI5_GetLaunchUrl();
    WriteToDebug(
      "CMI5_Initialize - instantiating cmi5 object from launch URL = " +
        launchUrl
    );
    cmi5 = new Cmi5(launchUrl);
    cmi5.includeSourceActivity(false);
  } catch (ex) {
    InitializeExecuted(
      false,
      "Failed to initialize cmi5 object (caught exception): " + ex
    );
    return;
  }
  WriteToDebug("CMI5_Initialize - calling start on cmi5 instance");
  cmi5.start(
    function (err) {
      var committedState, result;
      if (err !== null) {
        WriteToDebug("CMI5_Initialize - cmi5 start failed: " + err);
        InitializeExecuted(false, "Failed to initialize: " + err.message);
        return;
      }
      WriteToDebug("CMI5_Initialize - cmi5 start succeeded");
      committedState = CMI5_RetrieveState(CMI5_STATE_COMMITTED_STATUS);
      if (intCMI5Error) {
        WriteToDebug(
          "CMI5_Initialize - failed to retrieve state for committed status: " +
            strCMI5ErrorString
        );
        InitializeExecuted(
          false,
          "Failed to initialize: " + strCMI5ErrorString
        );
        return;
      }
      if (committedState !== "") {
        if (typeof committedState.launchModes === "undefined") {
          WriteToDebug(
            "CMI5_Initialize - failed to retrieve state for committed status: likely invalid JSON parse failure"
          );
          InitializeExecuted(
            false,
            "Failed to initialize: likely invalid JSON parse failure"
          );
          return;
        }
        CMI5_COMMITTED_STATUS = committedState;
      }
      if (CMI5_COMMITTED_STATUS.completion === true) {
        CMI5_ENTRY_MODE = ENTRY_REVIEW;
      } else if (CMI5_COMMITTED_STATUS.launchModes.length > 0) {
        CMI5_ENTRY_MODE = ENTRY_RESUME;
      } else {
        CMI5_ENTRY_MODE = ENTRY_FIRST_TIME;
      }
      CMI5_COMMITTED_STATUS.launchModes.push(cmi5.getLaunchMode());
      result = CMI5_SaveState(
        CMI5_STATE_COMMITTED_STATUS,
        CMI5_COMMITTED_STATUS,
        "application/json"
      );
      if (!result) {
        WriteToDebug("CMI5_Initialize - failed to store committed status");
        InitializeExecuted(
          false,
          "Failed to initialize - failed to store committed status"
        );
        return;
      }
      WriteToDebug("CMI5_Initialize - succeeded");
      InitializeExecuted(true, "");
      window.setTimeout(function () {
        CMI5_GetPreviouslyAccumulatedTime();
      }, 200);
    },
    {
      postFetch: function (err, response, parsed) {
        var rootActivity;
        if (err !== null) {
          return;
        }
        rootActivity = cmi5.getActivity();
        cmi5.getLRS().retrieveActivity(rootActivity.id, {
          callback: function (err, result) {
            if (err === null) {
              cmi5.setActivity(result);
            }
          },
        });
      },
    }
  );
  return true;
}
function CMI5_CommitData() {
  WriteToDebug("In CMI5_CommitData");
  var i,
    st,
    auActivityId,
    errMesg,
    errCode,
    errDiag,
    saveCommittedStatus = false,
    sourceActivity = new TinCan.Activity({
      id: "http://id.tincanapi.com/activity/software/scormdriver/" + VERSION,
      definition: {
        name: { und: "ScormDriver (" + VERSION + ")" },
        description: { en: "ScormDriver (" + VERSION + ")" },
        type: "http://id.tincanapi.com/activitytype/source",
      },
    });
  CMI5_ClearErrorInfo();
  if (CMI5_PENDING_STATUS.completion !== null) {
    saveCommittedStatus = true;
    CMI5_COMMITTED_STATUS.completion = CMI5_PENDING_STATUS.completion;
  }
  if (CMI5_PENDING_STATUS.success !== null) {
    saveCommittedStatus = true;
    CMI5_COMMITTED_STATUS.success = CMI5_PENDING_STATUS.success;
    if (CMI5_PENDING_STATUS.score !== null) {
      CMI5_COMMITTED_STATUS.score = CMI5_PENDING_STATUS.score;
    }
  }
  if (saveCommittedStatus) {
    result = CMI5_SaveState(
      CMI5_STATE_COMMITTED_STATUS,
      CMI5_COMMITTED_STATUS,
      "application/json"
    );
    if (!result) {
      WriteToDebug("CMI5_CommitData - failed to commit status");
      return result;
    }
  }
  if (CMI5_STATEMENT_QUEUE.length > 0) {
    if (
      CMI5_PENDING_STATUS.score !== null &&
      CMI5_PENDING_STATUS.success !== null
    ) {
      auActivityId = cmi5.getActivity().id;
      for (i = 0; i < CMI5_STATEMENT_QUEUE.length; i += 1) {
        st = CMI5_STATEMENT_QUEUE[i];
        if (
          st.target.id === auActivityId &&
          (st.verb.id === CMI5_VERB_ID_FAILED ||
            st.verb.id === CMI5_VERB_ID_PASSED)
        ) {
          st.result = st.result || new TinCan.Result();
          st.result.score = new TinCan.Score(CMI5_PENDING_STATUS.score);
        }
      }
    }
    for (i = 0; i < CMI5_STATEMENT_QUEUE.length; i += 1) {
      st = CMI5_STATEMENT_QUEUE[i];
      st.context.contextActivities.grouping =
        st.context.contextActivities.grouping || [];
      st.context.contextActivities.grouping.push(sourceActivity);
    }
    result = cmi5.getLRS().saveStatements(CMI5_STATEMENT_QUEUE);
    if (result.err !== null) {
      errMesg = "Failed to commit data: statements";
      if (/^\d+$/.test(result.err)) {
        if (result.err === 0) {
          errCode = CMI5_CONN_ERROR;
          errDiag = "Aborted, offline, or invalid CORS endpoint";
        } else {
          errCode = result.err;
          errDiag = result.xhr.responseText;
        }
      } else {
        errCode = CMI5_DEP_ERROR;
        errDiag = result.err;
      }
      CMI5_SetErrorInfoManually(errCode, errMesg, errDiag);
      return false;
    }
    CMI5_STATEMENT_QUEUE = [];
  }
  return true;
}
function CMI5_Finish(exitType, statusWasSet) {
  WriteToDebug("In CMI5_Finish - exitType: " + exitType);
  var st = cmi5.terminatedStatement(),
    result;
  CMI5_ClearErrorInfo();
  CMI5_SetDurationInStatement(st);
  CMI5_STATEMENT_QUEUE.push(st);
  result = CMI5_SaveState(
    CMI5_STATE_TOTAL_TIME,
    CMI5_GetPreviouslyAccumulatedTime() + GetSessionAccumulatedTime(),
    "text/plain"
  );
  if (!result) {
    WriteToDebug("CMI5_Finish - failed to record total time to State");
    return false;
  }
  result = CMI5_CommitData();
  if (!result) {
    WriteToDebug("CMI5_Finish - failed to commit data");
    return false;
  }
  return true;
}
function CMI5_ConcedeControl() {
  WriteToDebug("In CMI5_ConcedeControl");
  var returnURL = cmi5.getReturnURL(),
    contentRoot = SearchParentsForContentRoot();
  if (returnURL !== null && contentRoot !== null) {
    contentRoot.location.assign(returnURL);
    return true;
  }
  if (contentRoot !== null) {
    contentRoot.close();
    return true;
  }
  return true;
}
function CMI5_GetStudentID() {
  WriteToDebug("In CMI5_GetStudentID");
  var actor = cmi5.getActor();
  return actor.account.name;
}
function CMI5_GetStudentName() {
  WriteToDebug("In CMI5_GetStudentName");
  return cmi5.getActor().toString();
}
function CMI5_GetBookmark() {
  WriteToDebug("In CMI5_GetBookmark");
  return CMI5_RetrieveState(CMI5_STATE_BOOKMARK);
}
function CMI5_SetBookmark(location, description) {
  WriteToDebug(
    "In CMI5_SetBookmark - location: " +
      location +
      ", description: " +
      description
  );
  var st,
    targetId = CreateValidIdentifier(location);
  if (targetId !== "") {
    st = cmi5.prepareStatement("http://adlnet.gov/expapi/verbs/experienced");
    st.context.contextActivities =
      st.context.contextActivities || new TinCan.ContextActivities();
    st.context.contextActivities.parent =
      st.context.contextActivities.parent || [];
    st.context.contextActivities.parent.push(st.target);
    st.target = new TinCan.Activity({ id: targetId });
    CMI5_SetDurationInStatement(st);
    CMI5_STATEMENT_QUEUE.push(st);
  } else {
    WriteToDebug("WARNING - No bookmarking statement written, empty location");
  }
  return CMI5_SaveState(CMI5_STATE_BOOKMARK, location, "text/plain");
}
function CMI5_GetDataChunk() {
  WriteToDebug("In CMI5_GetDataChunk");
  return CMI5_RetrieveState(CMI5_STATE_GENERIC_DATA);
}
function CMI5_SetDataChunk(value) {
  WriteToDebug("In CMI5_SetDataChunk");
  return CMI5_SaveState(CMI5_STATE_GENERIC_DATA, value, "text/plain");
}
function CMI5_GetLaunchData() {
  WriteToDebug("In CMI5_GetLaunchData");
  var result = cmi5.getLaunchParameters();
  if (result === null) {
    result = "";
  }
  return result;
}
function CMI5_GetAudioPlayPreference() {
  WriteToDebug("In CMI5_GetAudioPlayPreference");
  var audioPref;
  CMI5_ClearErrorInfo();
  if (CMI5_PREF_AUDIO_PLAY === null) {
    audioPref = cmi5.getAudioPreference();
    if (audioPref === "on") {
      WriteToDebug("    Caching On");
      CMI5_PREF_AUDIO_PLAY = PREFERENCE_ON;
    } else if (audioPref === "off") {
      WriteToDebug("    Caching Off");
      CMI5_PREF_AUDIO_PLAY = PREFERENCE_OFF;
    } else {
      WriteToDebug("    Caching Default");
      CMI5_PREF_AUDIO_PLAY = PREFERENCE_DEFAULT;
    }
  }
  WriteToDebug("Returning preference: " + CMI5_PREF_AUDIO_PLAY);
  return CMI5_PREF_AUDIO_PLAY;
}
function CMI5_GetAudioVolumePreference() {
  WriteToDebug("In CMI5_GetAudioVolumePreference");
  var volumePref;
  CMI5_ClearErrorInfo();
  if (CMI5_PREF_AUDIO_VOLUME === null) {
    volumePref = CMI5_RetrieveState(CMI5_STATE_VOLUME_PREFERENCE, false);
    if (volumePref === "") {
      volumePref = 100;
    }
    CMI5_PREF_AUDIO_VOLUME = parseInt(volumePref, 10);
  }
  WriteToDebug("Returning " + CMI5_PREF_AUDIO_VOLUME);
  return CMI5_PREF_AUDIO_VOLUME;
}
function CMI5_SetAudioPreference(PlayPreference, intPercentOfMaxVolume) {
  WriteToDebug(
    "In CMI5_SetAudioPreference PlayPreference=" +
      PlayPreference +
      ", intPercentOfMaxVolume=" +
      intPercentOfMaxVolume
  );
  var currentPlayPreference = cmi5.getAudioPreference(),
    overallResult = true,
    prefChanged = false,
    result;
  CMI5_ClearErrorInfo();
  CMI5_PREF_AUDIO_PLAY = PlayPreference;
  CMI5_PREF_AUDIO_VOLUME = intPercentOfMaxVolume;
  if (
    PlayPreference == PREFERENCE_OFF &&
    (currentPlayPreference === null || currentPlayPreference === "on")
  ) {
    cmi5.setAudioPreference("off");
    prefChanged = true;
  } else if (
    PlayPreference != PREFERENCE_OFF &&
    (currentPlayPreference === null || currentPlayPreference === "off")
  ) {
    cmi5.setAudioPreference("on");
    prefChanged = true;
  }
  if (prefChanged) {
    result = cmi5.saveLearnerPrefs();
    if (result) {
      WriteToDebug(
        "  failed to save learner prefs, setting overall result to false"
      );
      overallResult = false;
      CMI5_SetErrorInfoManually(
        CMI5_DEP_ERROR,
        "Failed to save learner preferences",
        result
      );
    }
  }
  result = CMI5_SaveState(
    CMI5_STATE_VOLUME_PREFERENCE,
    intPercentOfMaxVolume,
    "text/plain",
    false
  );
  if (!result) {
    WriteToDebug(
      "  failed to save volume preference in state, setting overall result to false"
    );
    overallResult = false;
  }
  return overallResult;
}
function CMI5_SetLanguagePreference(strLanguage) {
  WriteToDebug("In CMI5_SetLanguagePreference strLanguage=" + strLanguage);
  CMI5_ClearErrorInfo();
  CMI5_PREF_LANGUAGE = strLanguage;
  return CMI5_SaveState(
    CMI5_STATE_LANGUAGE_PREFERENCE,
    strLanguage,
    "text/plain",
    false
  );
}
function CMI5_GetLanguagePreference() {
  WriteToDebug("In CMI5_GetLanguagePreference");
  CMI5_ClearErrorInfo();
  if (CMI5_PREF_LANGUAGE === null) {
    CMI5_PREF_LANGUAGE = CMI5_RetrieveState(
      CMI5_STATE_LANGUAGE_PREFERENCE,
      false
    );
  }
  return CMI5_PREF_LANGUAGE;
}
function CMI5_SetSpeedPreference(intPercentOfMax) {
  WriteToDebug("In CMI5_SetSpeedPreference intPercentOfMax=" + intPercentOfMax);
  CMI5_ClearErrorInfo();
  CMI5_PREF_SPEED = intPercentOfMax;
  return CMI5_SaveState(
    CMI5_STATE_SPEED_PREFERENCE,
    intPercentOfMax,
    "text/plain",
    false
  );
}
function CMI5_GetSpeedPreference() {
  WriteToDebug("In CMI5_GetSpeedPreference");
  var pref;
  CMI5_ClearErrorInfo();
  if (CMI5_PREF_SPEED === null) {
    pref = CMI5_RetrieveState(CMI5_STATE_SPEED_PREFERENCE, false);
    if (pref === "") {
      pref = 100;
    }
    CMI5_PREF_SPEED = pref;
  }
  return CMI5_PREF_SPEED;
}
function CMI5_SetTextPreference(intPreference) {
  WriteToDebug("In CMI5_SetTextPreference intPreference=" + intPreference);
  CMI5_ClearErrorInfo();
  CMI5_PREF_TEXT = intPreference;
  return CMI5_SaveState(
    CMI5_STATE_TEXT_PREFERENCE,
    intPreference,
    "text/plain",
    false
  );
}
function CMI5_GetTextPreference() {
  WriteToDebug("In CMI5_GetTextPreference");
  CMI5_ClearErrorInfo();
  if (CMI5_PREF_TEXT === null) {
    CMI5_PREF_TEXT = CMI5_RetrieveState(CMI5_STATE_TEXT_PREFERENCE, false);
    if (CMI5_PREF_TEXT === "") {
      CMI5_PREF_TEXT = PREFERENCE_DEFAULT;
    }
  }
  return CMI5_PREF_TEXT;
}
function CMI5_GetEntryMode() {
  WriteToDebug("In CMI5_GetEntryMode");
  CMI5_ClearErrorInfo();
  return CMI5_ENTRY_MODE;
}
function CMI5_GetLessonMode() {
  WriteToDebug("In CMI5_GetLessonMode - launchMode: " + cmi5.getLaunchMode());
  var launchMode = cmi5.getLaunchMode();
  CMI5_ClearErrorInfo();
  if (launchMode === "Normal") {
    return MODE_NORMAL;
  } else if (launchMode === "Browse") {
    return MODE_BROWSE;
  } else if (launchMode === "Review") {
    return MODE_REVIEW;
  }
  CMI5_SetErrorInfoManually(
    CMI5_DEP_ERROR,
    "Invalid launch mode from LMS",
    "launchMode = " + launchMode
  );
  return null;
}
function CMI5_GetTakingForCredit() {
  WriteToDebug(
    "In CMI5_GetTakingForCredit - launchMode: " + cmi5.getLaunchMode()
  );
  if (cmi5.getLaunchMode() === "Normal") {
    return true;
  }
  return false;
}
function CMI5_GetPreviouslyAccumulatedTime() {
  var retrievedValue;
  WriteToDebug(
    "In CMI5_GetPreviouslyAccumulatedTime - cached: " + CMI5_TOTAL_PREV_DURATION
  );
  if (CMI5_TOTAL_PREV_DURATION === null) {
    retrievedValue = CMI5_RetrieveState(CMI5_STATE_TOTAL_TIME);
    WriteToDebug("   fetched previous duration for caching: " + retrievedValue);
    if (retrievedValue === "") {
      WriteToDebug("   empty value converting to zero");
      CMI5_TOTAL_PREV_DURATION = 0;
    } else {
      CMI5_TOTAL_PREV_DURATION = parseInt(retrievedValue, 10);
    }
  }
  return CMI5_TOTAL_PREV_DURATION;
}
function CMI5_SaveTime(intMilliSeconds) {
  WriteToDebug("In CMI5_SaveTime");
  CMI5_SESSION_DURATION = intMilliSeconds;
  return true;
}
function CMI5_GetMaxTimeAllowed() {
  WriteToDebug("In CMI5_GetMaxTimeAllowed");
  return MAX_CMI_TIME;
}
function CMI5_SetScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "In CMI5_SetScore intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  var score, masteryScore;
  CMI5_ClearErrorInfo();
  if (cmi5.getLaunchMode() !== "Normal") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_NON_NORMAL_MODE,
      "Failed to SetScore: " + intScore,
      "launch mode (" + cmi5.getLaunchMode() + ") not a recording mode"
    );
    return false;
  }
  if (CMI5_COMMITTED_STATUS.success === true) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_ALREADY_COMMITTED,
      "Failed to SetScore: " + intScore,
      "success status already committed"
    );
    return false;
  }
  score = {
    raw: intScore,
    max: intMaxScore,
    min: intMinScore,
    scaled: RoundToPrecision(intScore / 100, 2),
  };
  try {
    cmi5.validateScore(score);
  } catch (ex) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INVALID_SCORE,
      "Failed to SetScore: " + intScore,
      "invalid score: " + ex.message
    );
    return false;
  }
  CMI5_PENDING_STATUS.score = score;
  masteryScore = cmi5.getMasteryScore();
  if (masteryScore !== null) {
    if (score.scaled >= masteryScore) {
      WriteToDebug("   automatically calling SetPassed based on masteryScore");
      return CMI5_SetPassed();
    } else if (score.scaled < masteryScore) {
      WriteToDebug("   automatically calling SetFailed based on masteryScore");
      return CMI5_SetFailed();
    }
  }
  return true;
}
function CMI5_GetScore() {
  WriteToDebug("In CMI5_GetScore");
  var result = "";
  CMI5_ClearErrorInfo();
  if (
    CMI5_COMMITTED_STATUS !== null &&
    typeof CMI5_COMMITTED_STATUS.score !== "undefined" &&
    CMI5_COMMITTED_STATUS.score !== null
  ) {
    result = CMI5_COMMITTED_STATUS.score.raw;
  } else if (CMI5_PENDING_STATUS.score !== null) {
    result = CMI5_PENDING_STATUS.score.raw;
  }
  return result;
}
function CMI5_GetScaledScore() {
  WriteToDebug("CMI5_GetScaledScore");
  var result = "";
  CMI5_ClearErrorInfo();
  if (
    CMI5_COMMITTED_STATUS !== null &&
    typeof CMI5_COMMITTED_STATUS.score !== "undefined" &&
    CMI5_COMMITTED_STATUS.score !== null
  ) {
    result = CMI5_COMMITTED_STATUS.score.scaled;
  } else if (CMI5_PENDING_STATUS.score !== null) {
    result = CMI5_PENDING_STATUS.score.scaled;
  }
  return result;
}
function CMI5_SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "CMI5_SetPointBasedScore - cmi5 does not support SetPointBasedScore, falling back to SetScore"
  );
  return CMI5_SetScore(intScore, intMaxScore, intMinScore);
}
function CMI5_RecordInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime,
  interactionType,
  strAlternateResponse,
  strAlternateCorrectResponse
) {
  var st;
  CMI5_ClearErrorInfo();
  if (cmi5.getLaunchMode() !== "Normal") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_NON_NORMAL_MODE,
      "Failed to RecordInteraction: launch mode (" +
        cmi5.getLaunchMode() +
        ") not a recording mode"
    );
    return false;
  }
  st = cmi5.prepareStatement("http://adlnet.gov/expapi/verbs/answered");
  st.result = st.result || new TinCan.Result();
  if (strResponse !== null) {
    st.result.response = strResponse;
  }
  if (blnCorrect === true || blnCorrect === INTERACTION_RESULT_CORRECT) {
    st.result.success = true;
  } else if (
    blnCorrect === false ||
    blnCorrect === "" ||
    blnCorrect === "false" ||
    blnCorrect === INTERACTION_RESULT_WRONG
  ) {
    st.result.success = false;
  }
  if (intLatency !== null && intLatency !== "") {
    st.result.duration =
      TinCan.Utils.convertMillisecondsToISO8601Duration(intLatency);
  }
  if (intWeighting !== null && intWeighting !== "") {
    st.result.extensions = st.result.extensions || {};
    st.result.extensions[
      "http://id.tincanapi.com/extension/cmi-interaction-weighting"
    ] = intWeighting;
  }
  st.context.contextActivities =
    st.context.contextActivities || new TinCan.ContextActivities();
  st.context.contextActivities.parent =
    st.context.contextActivities.parent || [];
  st.context.contextActivities.parent.push(st.target);
  if (strLearningObjectiveID !== "") {
    st.context.contextActivities.grouping =
      st.context.contextActivities.grouping || [];
    st.context.contextActivities.grouping.push(
      new TinCan.Activity({ id: strLearningObjectiveID })
    );
  }
  st.target = new TinCan.Activity({
    id: strID,
    definition: {
      type: CMI5_INTERACTION_ACTIVITY_TYPE,
      interactionType: interactionType,
    },
  });
  if (strDescription !== null && strDescription !== "") {
    st.target.definition.description = { und: strDescription };
  }
  if (strCorrectResponse !== null && strCorrectResponse !== "") {
    st.target.definition.correctResponsesPattern = [strCorrectResponse];
  }
  CMI5_STATEMENT_QUEUE.push(st);
  CMI5_CreateInteraction.apply(this, arguments);
  CMI5_SaveInteraction(strID);
  return true;
}
function CMI5_RecordTrueFalseInteraction(
  strID,
  blnResponse,
  blnCorrect,
  blnCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordTrueFalseInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strCorrectResponse = null;
  if (blnResponse === true) {
    strResponse = "true";
  } else if (blnResponse === false) {
    strResponse = "false";
  }
  if (blnCorrectResponse === true) {
    strCorrectResponse = "true";
  } else if (blnCorrectResponse === false) {
    strCorrectResponse = "false";
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_TRUE_FALSE
  );
}
function CMI5_RecordMultipleChoiceInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordMultipleChoiceInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strCorrectResponse = "",
    i;
  if (aryResponse !== null) {
    strResponse = "";
    for (i = 0; i < aryResponse.length; i += 1) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      strResponse +=
        aryResponse[i].Long !== "" ? aryResponse[i].Long : aryResponse[i].Short;
    }
  }
  for (i = 0; i < aryCorrectResponse.length; i += 1) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    strCorrectResponse +=
      aryCorrectResponse[i].Long !== ""
        ? aryCorrectResponse[i].Long
        : aryCorrectResponse[i].Short;
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_CHOICE
  );
}
function CMI5_RecordFillInInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordFillInInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var interactionType = CMI5_INTERACTION_TYPE_FILL_IN;
  if (strResponse !== null) {
    strResponse = new String(strResponse);
  }
  if (strCorrectResponse !== null) {
    strCorrectResponse = new String(strCorrectResponse);
    if (strCorrectResponse.length > 250) {
      interactionType = CMI5_INTERACTION_TYPE_LONG_FILL_IN;
    }
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    interactionType
  );
}
function CMI5_RecordMatchingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordMatchingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strCorrectResponse = "",
    i;
  if (aryResponse !== null) {
    strResponse = "";
    for (i = 0; i < aryResponse.length; i += 1) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      strResponse +=
        (aryResponse[i].Source.Long !== ""
          ? aryResponse[i].Source.Long
          : aryResponse[i].Source.Short) +
        "[.]" +
        (aryResponse[i].Target.Long !== ""
          ? aryResponse[i].Target.Long
          : aryResponse[i].Target.Short);
    }
  }
  for (i = 0; i < aryCorrectResponse.length; i += 1) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    strCorrectResponse +=
      (aryCorrectResponse[i].Source.Long !== ""
        ? aryCorrectResponse[i].Source.Long
        : aryCorrectResponse[i].Source.Short) +
      "[.]" +
      (aryCorrectResponse[i].Target.Long !== ""
        ? aryCorrectResponse[i].Target.Long
        : aryCorrectResponse[i].Target.Short);
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_MATCHING
  );
}
function CMI5_RecordPerformanceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordPerformanceInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (strResponse !== null) {
    strResponse = new String(strResponse);
  }
  if (strCorrectResponse !== null) {
    strCorrectResponse = new String(strCorrectResponse);
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_PERFORMANCE
  );
}
function CMI5_RecordSequencingInteraction(
  strID,
  aryResponse,
  blnCorrect,
  aryCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordSequencingInteraction strID=" +
      strID +
      ", aryResponse=" +
      aryResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", aryCorrectResponse=" +
      aryCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strCorrectResponse = "",
    i;
  if (aryResponse !== null) {
    strResponse = "";
    for (i = 0; i < aryResponse.length; i += 1) {
      if (strResponse.length > 0) {
        strResponse += "[,]";
      }
      strResponse +=
        aryResponse[i].Long !== "" ? aryResponse[i].Long : aryResponse[i].Short;
    }
  }
  for (i = 0; i < aryCorrectResponse.length; i += 1) {
    if (strCorrectResponse.length > 0) {
      strCorrectResponse += "[,]";
    }
    strCorrectResponse +=
      aryCorrectResponse[i].Long !== ""
        ? aryCorrectResponse[i].Long
        : aryCorrectResponse[i].Short;
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_SEQUENCING
  );
}
function CMI5_RecordLikertInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordLikertInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  var strResponse = null,
    strCorrectResponse = "";
  if (response !== null) {
    strResponse = response.Long !== "" ? response.Long : response.Short;
  }
  if (correctResponse !== null) {
    strCorrectResponse =
      correctResponse.Long !== ""
        ? correctResponse.Long
        : correctResponse.Short;
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_LIKERT
  );
}
function CMI5_RecordNumericInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime
) {
  WriteToDebug(
    "In CMI5_RecordNumericInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID +
      ", dtmTime=" +
      dtmTime
  );
  if (
    typeof strCorrectResponse !== "undefined" &&
    strCorrectResponse !== null
  ) {
    if (
      !IsValidDecimalRange(strCorrectResponse) &&
      !IsValidDecimal(strCorrectResponse)
    ) {
      WriteToDebug(
        "Returning False - CMI5_RecordNumericInteraction received invalid correct response (not a decimal or range), strCorrectResponse=" +
          strCorrectResponse
      );
      return false;
    }
  }
  return CMI5_RecordInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime,
    CMI5_INTERACTION_TYPE_NUMERIC
  );
}
function CMI5_CreateInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID,
  dtmTime,
  interactionType,
  strAlternateResponse,
  strAlternateCorrectResponse
) {
  CMI5_INTERACTIONS[strID] = {
    type: interactionType,
    timestamp: dtmTime.toJSON(),
    correctResponses: strCorrectResponse,
    learnerResponses: strResponse,
    weighting: intWeighting,
    result: blnCorrect,
    latency: intLatency,
    description: strDescription,
  };
  return;
}
function CMI5_LoadInteraction(strInteractionId) {
  WriteToDebug("CMI5_LoadInteraction - strInteractionId = " + strInteractionId);
  var result;
  if (typeof CMI5_INTERACTIONS[strInteractionId] !== "undefined") {
    WriteToDebug("    already locally cached, returning");
    return true;
  }
  result = CMI5_RetrieveState(strInteractionId);
  if (intCMI5Error) {
    WriteToDebug(
      "    failed to retrieve state for interaction: " + strCMI5ErrorString
    );
    return false;
  }
  if (result !== "" && typeof result.timestamp === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_INVALID_JSON,
      "Invalid JSON for interaction in State",
      "result= " + result
    );
    return false;
  }
  if (result === "") {
    return true;
  }
  CMI5_INTERACTIONS[strInteractionId] = result;
  WriteToDebug("    cached interaction locally");
  return true;
}
function CMI5_SaveInteraction(strInteractionId) {
  WriteToDebug("CMI5_SaveInteraction - strInteractionId = " + strInteractionId);
  if (typeof CMI5_INTERACTIONS[strInteractionId] === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_UNRECOGNIZED_INTERACTION,
      "Cannot save unknown interaction: " + strInteractionId
    );
    return false;
  }
  return CMI5_SaveState(
    strInteractionId,
    CMI5_INTERACTIONS[strInteractionId],
    "application/json"
  );
}
function CMI5_GetInteractionType(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionType - strInteractionID = " + strInteractionID
  );
  var result;
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction type: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    return CMI5_INTERACTIONS[strInteractionID].type;
  }
  return "";
}
function CMI5_GetInteractionTimestamp(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionTimestamp - strInteractionID = " + strInteractionID
  );
  var result;
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction timestamp: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    return new Date(CMI5_INTERACTIONS[strInteractionID].timestamp);
  }
  return "";
}
function CMI5_GetInteractionCorrectResponses(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionCorrectResponses - strInteractionID = " +
      strInteractionID
  );
  var result,
    responses = [];
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction correct responses: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    responses =
      CMI5_INTERACTIONS[strInteractionID].correctResponses.split("[,]");
    if (
      CMI5_INTERACTIONS[strInteractionID].type ===
      CMI5_INTERACTION_TYPE_MATCHING
    ) {
      responses = CMI5_ProcessResponseArray(responses);
    }
  }
  return responses;
}
function CMI5_GetInteractionLearnerResponses(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionLearnerResponses - strInteractionID = " +
      strInteractionID
  );
  var result,
    responses = [];
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction learner responses: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    responses =
      CMI5_INTERACTIONS[strInteractionID].learnerResponses.split("[,]");
    if (
      CMI5_INTERACTIONS[strInteractionID].type ===
      CMI5_INTERACTION_TYPE_MATCHING
    ) {
      responses = CMI5_ProcessResponseArray(responses);
    }
  }
  return responses;
}
function CMI5_ProcessResponseArray(responses) {
  var i;
  for (i = 0; i < responses.length; i += 1) {
    responses[i] = CreateMatchingResponse(responses[i]);
  }
  return responses;
}
function CMI5_GetInteractionWeighting(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionWeighting - strInteractionID = " + strInteractionID
  );
  var result;
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction weighting: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    return CMI5_INTERACTIONS[strInteractionID].weighting;
  }
  return "";
}
function CMI5_GetInteractionResult(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionResult - strInteractionID = " + strInteractionID
  );
  var result;
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction result: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    return CMI5_INTERACTIONS[strInteractionID].result;
  }
  return "";
}
function CMI5_GetInteractionLatency(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionLatency - strInteractionID = " + strInteractionID
  );
  var result;
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction latency: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    return CMI5_INTERACTIONS[strInteractionID].latency;
  }
  return "";
}
function CMI5_GetInteractionDescription(strInteractionID) {
  WriteToDebug(
    "CMI5_GetInteractionDescription - strInteractionID = " + strInteractionID
  );
  var result;
  CMI5_ClearErrorInfo();
  result = CMI5_LoadInteraction(strInteractionID);
  if (!result) {
    WriteToDebug("Failed to load interaction: " + strInteractionID);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_LOAD_FAILED,
      "Cannot get interaction description: " + strInteractionID,
      "Failed to load interaction: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_INTERACTIONS[strInteractionID] !== "undefined") {
    return CMI5_INTERACTIONS[strInteractionID].description;
  }
  return "";
}
function CMI5_SetObjectiveScore(
  strObjectiveID,
  intScore,
  intMaxScore,
  intMinScore
) {
  WriteToDebug(
    "In CMI5_SetObjectiveScore, strObjectiveID=" +
      strObjectiveID +
      ", intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "SetObjectiveScore not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_SetObjectiveDescription(strObjectiveID, strObjectiveDescription) {
  WriteToDebug(
    "In CMI5_SetObjectiveDescription, strObjectiveDescription=" +
      strObjectiveDescription
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "SetObjectiveDescription not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  WriteToDebug(
    "In CMI5_SetObjectiveStatus strObjectiveID=" +
      strObjectiveID +
      ", Lesson_Status=" +
      Lesson_Status
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "SetObjectiveStatus not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_SetObjectiveProgressMeasure() {
  WriteToDebug("In CMI5_SetObjectiveProgressMeasure");
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "SetObjectiveProgressMeasure not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_GetObjectiveScore(strObjectiveID) {
  WriteToDebug("In CMI5_GetObjectiveScore, strObjectiveID=" + strObjectiveID);
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetObjectiveScore not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_GetObjectiveDescription(strObjectiveID) {
  WriteToDebug(
    "In CMI5_GetObjectiveDescription, strObjectiveID=" + strObjectiveID
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetObjectiveDescription not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_GetObjectiveStatus(strObjectiveID) {
  WriteToDebug("In CMI5_GetObjectiveStatus, strObjectiveID=" + strObjectiveID);
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetObjectiveStatus not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_GetObjectiveProgressMeasure() {
  WriteToDebug("CMI5_GetObjectiveProgressMeasure");
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetObjectiveProgressMeasure not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_SetFailed() {
  WriteToDebug("In CMI5_SetFailed");
  var masteryScore, auActivityId, tempSt, i, st;
  CMI5_ClearErrorInfo();
  CMI5_ResetBlnStatusWasSetIfAppropriate();
  if (cmi5.getLaunchMode() !== "Normal") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_NON_NORMAL_MODE,
      "Failed to SetFailed",
      "Launch mode (" + cmi5.getLaunchMode() + ") not a recording mode"
    );
    return false;
  }
  if (CMI5_COMMITTED_STATUS.success === true) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_ALREADY_COMMITTED,
      "Failed to SetFailed",
      "Success status already committed"
    );
    return false;
  }
  if (CMI5_PENDING_STATUS.success === false) {
    return true;
  }
  masteryScore = cmi5.getMasteryScore();
  if (
    CMI5_PENDING_STATUS.score !== null &&
    masteryScore !== null &&
    CMI5_PENDING_STATUS.score.scaled >= masteryScore
  ) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INVALID_STATUS_BASED_ON_SCORE,
      "Failed to SetFailed",
      "Pending score conflicts with failure"
    );
    return false;
  }
  if (CMI5_PENDING_STATUS.success === true) {
    auActivityId = cmi5.getActivity().id;
    for (i = 0; i < CMI5_STATEMENT_QUEUE.length; i += 1) {
      tempSt = CMI5_STATEMENT_QUEUE[i];
      if (
        tempSt.target.id === auActivityId &&
        tempSt.verb.id === CMI5_VERB_ID_PASSED
      ) {
        CMI5_STATEMENT_QUEUE.splice(i, i + 1);
      }
    }
  }
  CMI5_PENDING_STATUS.success = false;
  st = cmi5.failedStatement();
  if (masteryScore !== null) {
    st.context.extensions = st.context.extensions || {};
    st.context.extensions[CMI5_EXTENSION_MASTERY_SCORE] = masteryScore;
  }
  CMI5_SetDurationInStatement(st);
  CMI5_STATEMENT_QUEUE.push(st);
  return true;
}
function CMI5_SetPassed() {
  WriteToDebug("In CMI5_SetPassed");
  var masteryScore, auActivityId, tempSt, i, st;
  CMI5_ClearErrorInfo();
  CMI5_ResetBlnStatusWasSetIfAppropriate();
  if (cmi5.getLaunchMode() !== "Normal") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_NON_NORMAL_MODE,
      "Failed to SetPassed",
      "Launch mode (" + cmi5.getLaunchMode() + ") not a recording mode"
    );
    return false;
  }
  if (CMI5_COMMITTED_STATUS.success === true) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_ALREADY_COMMITTED,
      "Failed to SetPassed",
      "Success status already committed"
    );
    return false;
  }
  if (CMI5_PENDING_STATUS.success === true) {
    return true;
  }
  masteryScore = cmi5.getMasteryScore();
  if (
    CMI5_PENDING_STATUS.score !== null &&
    masteryScore !== null &&
    CMI5_PENDING_STATUS.score.scaled < masteryScore
  ) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INVALID_STATUS_BASED_ON_SCORE,
      "Failed to SetPassed",
      "Pending score conflicts with failure"
    );
    return false;
  }
  CMI5_PENDING_STATUS.success = true;
  st = cmi5.passedStatement();
  if (masteryScore !== null) {
    st.context.extensions = st.context.extensions || {};
    st.context.extensions[CMI5_EXTENSION_MASTERY_SCORE] = masteryScore;
  }
  CMI5_SetDurationInStatement(st);
  CMI5_STATEMENT_QUEUE.push(st);
  return true;
}
function CMI5_SetCompleted() {
  WriteToDebug("In CMI5_SetCompleted");
  var st;
  CMI5_ClearErrorInfo();
  if (cmi5.getLaunchMode() !== "Normal") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_NON_NORMAL_MODE,
      "Failed to SetCompleted",
      "Launch mode (" + cmi5.getLaunchMode() + ") not a recording mode"
    );
    return false;
  }
  if (CMI5_COMMITTED_STATUS.completion !== null) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_ALREADY_COMMITTED,
      "Failed to SetCompleted",
      "Completion status already committed"
    );
    return false;
  }
  if (CMI5_PENDING_STATUS.completion !== null) {
    return true;
  }
  CMI5_PENDING_STATUS.completion = true;
  st = cmi5.completedStatement();
  CMI5_STATEMENT_QUEUE.push(st);
  CMI5_SetDurationInStatement(st);
  return true;
}
function CMI5_ResetStatus() {
  WriteToDebug("In CMI5_ResetStatus");
  var auActivityId, i, tempSt;
  CMI5_ClearErrorInfo();
  if (cmi5.getLaunchMode() !== "Normal") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_NON_NORMAL_MODE,
      "Failed to ResetStatus",
      "Launch mode (" + cmi5.getLaunchMode() + ") not a recording mode"
    );
    return false;
  }
  if (
    CMI5_COMMITTED_STATUS.completion !== null ||
    CMI5_COMMITTED_STATUS.success === true
  ) {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_ALREADY_COMMITTED,
      "Failed to ResetStatus",
      "Success and/or completion status has already been committed"
    );
    return false;
  }
  CMI5_PENDING_STATUS.completion = null;
  CMI5_PENDING_STATUS.success = null;
  auActivityId = cmi5.getActivity().id;
  for (i = 0; i < CMI5_STATEMENT_QUEUE.length; i += 1) {
    tempSt = CMI5_STATEMENT_QUEUE[i];
    if (
      (tempSt.target.id =
        auActivityId &&
        (tempSt.verb.id === CMI5_VERB_ID_COMPLETED ||
          tempSt.verb.id === CMI5_VERB_ID_PASSED ||
          tempSt.verb.id === CMI5_VERB_ID_FAILED))
    ) {
      CMI5_STATEMENT_QUEUE.splice(i, i + 1);
    }
  }
  return true;
}
function CMI5_GetStatus() {
  WriteToDebug("In CMI5_GetStatus");
  var result,
    i,
    numAttempts = 0;
  CMI5_ClearErrorInfo();
  if (
    CMI5_COMMITTED_STATUS.success === true ||
    CMI5_PENDING_STATUS.success === true
  ) {
    result = LESSON_STATUS_PASSED;
  } else if (
    CMI5_COMMITTED_STATUS.success === false ||
    CMI5_PENDING_STATUS.success === false
  ) {
    result = LESSON_STATUS_FAILED;
  } else if (
    CMI5_COMMITTED_STATUS.completion === true ||
    CMI5_PENDING_STATUS.completion === true
  ) {
    result = LESSON_STATUS_COMPLETED;
  } else {
    for (i = 0; i < CMI5_COMMITTED_STATUS.launchModes.length; i += 1) {
      if (CMI5_COMMITTED_STATUS.launchModes[i] === "Normal") {
        numAttempts += 1;
      }
    }
    if (numAttempts === 0) {
      result = LESSON_STATUS_BROWSED;
    } else {
      if (CMI5_ENTRY_MODE === ENTRY_FIRST_TIME) {
        result = LESSON_STATUS_NOT_ATTEMPTED;
      } else {
        result = LESSON_STATUS_INCOMPLETE;
      }
    }
  }
  WriteToDebug("In CMI5_GetStatus - result = " + result);
  return result;
}
function CMI5_GetPassingScore() {
  WriteToDebug("In CMI5_GetPassingScore");
  var result;
  CMI5_ClearErrorInfo();
  result = cmi5.getMasteryScore();
  if (result === null) {
    return 0;
  }
  result = result * 100;
  return result;
}
function CMI5_DetectSSPSupport() {
  WriteToDebug("CMI5_DetectSSPSupport - implemented via state");
  ClearErrorInfo();
  return true;
}
function CMI5_CreateDataBucket(strBucketId, intMinSize, intMaxSize) {
  WriteToDebug("CMI5_CreateDataBucket - strBucketId = " + strBucketId);
  var result;
  ClearErrorInfo();
  result = CMI5_LoadBucket(strBucketId);
  if (!result) {
    WriteToDebug("Failed pre-existing bucket check, bucket can't be allocated");
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_SSP_BUCKET_LOAD_FAILED,
      "Failed to create bucket: " + strBucketId,
      "pre-existence check load failure: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_SSP_BUCKETS[strBucketId] !== "undefined") {
    WriteToDebug("Bucket already exists and can't be re-allocated.");
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_SSP_BUCKET_ALREADY_EXISTS,
      "Failed to create bucket: " + strBucketId,
      ""
    );
    return false;
  }
  CMI5_SSP_BUCKETS[strBucketId] = { allocatedSpace: intMaxSize, contents: "" };
  return CMI5_SaveBucket(strBucketId);
}
function CMI5_GetDataFromBucket(strBucketId) {
  WriteToDebug("CMI5_GetDataFromBucket - strBucketId = " + strBucketId);
  var result;
  ClearErrorInfo();
  result = CMI5_LoadBucket(strBucketId);
  if (!result) {
    WriteToDebug("Failed to load bucket: " + strBucketId);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_SSP_BUCKET_LOAD_FAILED,
      "Cannot get data from bucket: " + strBucketId,
      "Failed to load bucket: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_SSP_BUCKETS[strBucketId] === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_UNRECOGNIZED_SSP_BUCKET,
      "Cannot get data from bucket: " + strBucketId,
      "unknown after load"
    );
    return false;
  }
  return CMI5_SSP_BUCKETS[strBucketId].contents;
}
function CMI5_PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug("CMI5_PutDataInBucket - strBucketId = " + strBucketId);
  var result;
  ClearErrorInfo();
  result = CMI5_LoadBucket(strBucketId);
  if (!result) {
    WriteToDebug("Failed to load bucket: " + strBucketId);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_SSP_BUCKET_LOAD_FAILED,
      "Cannot put data into bucket: " + strBucketId,
      "Failed to load bucket: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_SSP_BUCKETS[strBucketId] === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_UNRECOGNIZED_SSP_BUCKET,
      "Cannot put data into bucket: " + strBucketId,
      "unknown after load"
    );
    return false;
  }
  if (blnAppendToEnd) {
    CMI5_SSP_BUCKETS[strBucketId].contents =
      CMI5_SSP_BUCKETS[strBucketId].contents + strData;
  } else {
    CMI5_SSP_BUCKETS[strBucketId].contents = strData;
  }
  return CMI5_SaveBucket(strBucketId);
}
function CMI5_GetBucketInfo(strBucketId) {
  WriteToDebug("CMI5_GetBucketInfo - strBucketId = " + strBucketId);
  var result;
  ClearErrorInfo();
  result = CMI5_LoadBucket(strBucketId);
  if (!result) {
    WriteToDebug("Failed to load bucket: " + strBucketId);
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_SSP_BUCKET_LOAD_FAILED,
      "Cannot get info for bucket: " + strBucketId,
      "Failed to load bucket: " +
        strCMI5ErrorString +
        " (" +
        strCMI5ErrorDiagnostic +
        ")"
    );
    return false;
  }
  if (typeof CMI5_SSP_BUCKETS[strBucketId] === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_UNRECOGNIZED_SSP_BUCKET,
      "Cannot get info for bucket: " + strBucketId,
      "unknown after load"
    );
    return false;
  }
  return new SSPBucketSize(
    CMI5_SSP_BUCKETS[strBucketId].allocatedSpace,
    CMI5_SSP_BUCKETS[strBucketId].contents.length
  );
}
function CMI5_LoadBucket(strBucketId) {
  WriteToDebug("CMI5_LoadBucket - strBucketId = " + strBucketId);
  var result;
  if (typeof CMI5_SSP_BUCKETS[strBucketId] !== "undefined") {
    WriteToDebug("    already locally cached, returning");
    return true;
  }
  result = CMI5_RetrieveState(CMI5_STATE_SSP_BUCKET_PREFIX + "-" + strBucketId);
  if (intCMI5Error) {
    WriteToDebug(
      "    failed to retrieve state for possible existing bucket: " +
        strCMI5ErrorString
    );
    return false;
  }
  if (result !== "" && typeof result.allocatedSpace === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_INTERACTION_INVALID_JSON,
      "Invalid JSON for bucket in State",
      "result= " + result
    );
    return false;
  }
  if (result === "") {
    return true;
  }
  CMI5_SSP_BUCKETS[strBucketId] = result;
  WriteToDebug("    cached bucket locally");
  return true;
}
function CMI5_SaveBucket(strBucketId) {
  WriteToDebug("CMI5_SaveBucket - strBucketId = " + strBucketId);
  if (typeof CMI5_SSP_BUCKETS[strBucketId] === "undefined") {
    CMI5_SetErrorInfoManually(
      CMI5_ERROR_UNRECOGNIZED_SSP_BUCKET,
      "Cannot save unknown bucket: " + strBucketId
    );
    return false;
  }
  return CMI5_SaveState(
    CMI5_STATE_SSP_BUCKET_PREFIX + "-" + strBucketId,
    CMI5_SSP_BUCKETS[strBucketId],
    "application/json"
  );
}
function CMI5_SetDurationInStatement(st) {
  var duration;
  if (CMI5_SESSION_DURATION !== null) {
    duration = CMI5_SESSION_DURATION;
  } else {
    duration = GetSessionAccumulatedTime();
  }
  st.result = st.result || new TinCan.Result();
  st.result.duration =
    TinCan.Utils.convertMillisecondsToISO8601Duration(duration);
  return;
}
function CMI5_CreateValidIdentifier(str) {
  if (str === undefined || str === "" || str === null) {
    WriteToDebug(
      "WARNING - returning invalid identifier, invalid argument provided: " +
        str
    );
    return "";
  }
  URI.iri();
  var uri = new URI(str),
    encodeIRIComponent = URI.encode,
    id;
  if (!uri.is("absolute")) {
    uri = new URI(cmi5.getActivity().id);
    if (uri.fragment() === "") {
      uri.hash(encodeIRIComponent(str));
    } else {
      uri.hash(uri.fragment() + "-" + encodeIRIComponent(str));
    }
  }
  uri.iri();
  id = uri.toString();
  URI.unicode();
  return id;
}
function CMI5_GetComments() {
  WriteToDebug("In CMI5_GetComments");
  return CMI5_RetrieveState(CMI5_STATE_COMMENTS);
}
function CMI5_WriteComment(strComment) {
  WriteToDebug("In CMI5_WriteComment - comment: " + strComment);
  return CMI5_SaveState(CMI5_STATE_COMMENTS, strComment, "text/plain");
}
function CMI5_GetLMSComments() {
  WriteToDebug("In CMI5_GetLMSComments - cmi5 does not support LMS comments");
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetLMSComments not implemented in cmi5",
    ""
  );
  return "";
}
function CMI5_SetNavigationRequest(strNavRequest) {
  WriteToDebug(
    "CMI5_GetNavigationRequest - cmi5 does not support navigation requests, returning false"
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "SetNavigationRequest not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_GetNavigationRequest() {
  WriteToDebug(
    "CMI5_GetNavigationRequest - cmi5 does not support navigation requests, returning false"
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetNavigationRequest not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_GetProgressMeasure() {
  WriteToDebug(
    "CMI5_GetProgressMeasure - cmi5 does not support progress_measure, returning false"
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "GetProgressMeasure not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_SetProgressMeasure() {
  WriteToDebug(
    "CMI5_SetProgressMeasure - cmi5 does not support progress_measure, returning false"
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "SetProgressMeasure not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_DisplayMessageOnTimeout() {
  WriteToDebug(
    "In CMI5_DisplayMessageOnTimeout - cmi5 does not support MessageOnTimeout"
  );
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "DisplayMessageOnTimeout not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_ExitOnTimeout() {
  WriteToDebug("In CMI5_ExitOnTimeout - cmi5 does not support ExitOnTimeout");
  ClearErrorInfo();
  CMI5_SetErrorInfoManually(
    CMI5_ERROR_NOT_IMPLEMENTED,
    "ExitOnTimeout not implemented in cmi5",
    ""
  );
  return false;
}
function CMI5_ResetBlnStatusWasSetIfAppropriate() {
  var isAlreadyComplete =
    CMI5_PENDING_STATUS.completion || CMI5_COMMITTED_STATUS.completion;
  if (!isAlreadyComplete) {
    WriteToDebug("Overriding blnStatusWasSet to false.");
    blnStatusWasSet = false;
  }
}
function CMI5_ClearErrorInfo() {
  WriteToDebug("In CMI5_ClearErrorInfo");
  intCMI5Error = CMI5_NO_ERROR;
  strCMI5ErrorString = "";
  strCMI5ErrorDiagnostic = "";
}
function CMI5_SetErrorInfoManually(intNum, strString, strDiagnostic) {
  WriteToDebug("In CMI5_SetErrorInfoManually");
  WriteToDebug("ERROR-Num=" + intNum);
  WriteToDebug("      String=" + strString);
  WriteToDebug("      Diag=" + strDiagnostic);
  intCMI5Error = intNum;
  strCMI5ErrorString = strString;
  strCMI5ErrorDiagnostic = strDiagnostic;
}
function CMI5_GetLastError() {
  WriteToDebug("In CMI5_GetLastError");
  if (intCMI5Error === CMI5_NO_ERROR) {
    WriteToDebug("Returning No Error");
    return NO_ERROR;
  }
  WriteToDebug("Returning " + intCMI5Error);
  return intCMI5Error;
}
function CMI5_GetLastErrorDesc() {
  WriteToDebug(
    "In CMI5_GetLastErrorDesc, " +
      strCMI5ErrorString +
      "\n" +
      strCMI5ErrorDiagnostic
  );
  return strCMI5ErrorString + "\n" + strCMI5ErrorDiagnostic;
}
function LMSStandardAPI(strStandard) {
  var interfaceMethods = [
      "Initialize",
      "Finish",
      "CommitData",
      "GetStudentID",
      "GetStudentName",
      "GetBookmark",
      "SetBookmark",
      "GetDataChunk",
      "SetDataChunk",
      "GetLaunchData",
      "GetComments",
      "WriteComment",
      "GetLMSComments",
      "GetAudioPlayPreference",
      "GetAudioVolumePreference",
      "SetAudioPreference",
      "SetLanguagePreference",
      "GetLanguagePreference",
      "SetSpeedPreference",
      "GetSpeedPreference",
      "SetTextPreference",
      "GetTextPreference",
      "GetPreviouslyAccumulatedTime",
      "SaveTime",
      "GetMaxTimeAllowed",
      "DisplayMessageOnTimeout",
      "ExitOnTimeout",
      "GetPassingScore",
      "SetScore",
      "GetScore",
      "GetScaledScore",
      "RecordTrueFalseInteraction",
      "RecordMultipleChoiceInteraction",
      "RecordFillInInteraction",
      "RecordMatchingInteraction",
      "RecordPerformanceInteraction",
      "RecordSequencingInteraction",
      "RecordLikertInteraction",
      "RecordNumericInteraction",
      "GetEntryMode",
      "GetLessonMode",
      "GetTakingForCredit",
      "SetObjectiveScore",
      "SetObjectiveStatus",
      "GetObjectiveScore",
      "GetObjectiveStatus",
      "SetObjectiveDescription",
      "GetObjectiveDescription",
      "SetFailed",
      "SetPassed",
      "SetCompleted",
      "ResetStatus",
      "GetStatus",
      "GetLastError",
      "GetLastErrorDesc",
      "GetInteractionType",
      "GetInteractionTimestamp",
      "GetInteractionCorrectResponses",
      "GetInteractionWeighting",
      "GetInteractionLearnerResponses",
      "GetInteractionResult",
      "GetInteractionLatency",
      "GetInteractionDescription",
      "CreateDataBucket",
      "GetDataFromBucket",
      "PutDataInBucket",
      "DetectSSPSupport",
      "GetBucketInfo",
      "GetProgressMeasure",
      "SetProgressMeasure",
      "SetPointBasedScore",
      "SetNavigationRequest",
      "GetNavigationRequest",
      "SetObjectiveProgressMeasure",
      "GetObjectiveProgressMeasure",
      "CreateValidIdentifier",
      "ConcedeControl",
    ],
    i;
  WriteToDebug("In LMSStandardAPI strStandard=" + strStandard);
  if (strStandard == "") {
    WriteToDebug("No standard specified, using NONE");
    strStandard = "NONE";
  }
  this.Standard = strStandard;
  for (i = 0; i < interfaceMethods.length; i += 1) {
    if (
      typeof window[strStandard + "_" + interfaceMethods[i]] !== "undefined"
    ) {
      this[interfaceMethods[i]] =
        window[strStandard + "_" + interfaceMethods[i]];
    } else {
      WriteToDebug(
        "In LMSStandardAPI missing interface method=" + interfaceMethods[i]
      );
    }
  }
}
var blnCalledFinish = false;
var blnStandAlone = false;
var blnLoaded = false;
var blnReachedEnd = false;
var blnStatusWasSet = false;
var blnLmsPresent = false;
var blnUnloading = false;
var dtmStart = null;
var dtmEnd = null;
var intAccumulatedMS = 0;
var blnOverrodeTime = false;
var intTimeOverrideMS = null;
var aryDebug = new Array();
var strDebug = "";
var winDebug;
var intError = NO_ERROR;
var strErrorDesc = "";
var objLMS = null;
function Start() {
  var strStandAlone;
  var strShowInteractiveDebug;
  var objTempAPI = null;
  var aiccUrl = "";
  var endpoint = "";
  var cmi5FetchUrl = "";
  WriteToDebug("<h1>SCORM Driver starting up</h1>");
  WriteToDebug("----------------------------------------");
  WriteToDebug("----------------------------------------");
  WriteToDebug(
    "In Start - Version: " +
      VERSION +
      "  Last Modified=" +
      window.document.lastModified
  );
  WriteToDebug(
    "Browser Info (" + navigator.appName + " " + navigator.appVersion + ")"
  );
  WriteToDebug("URL: " + window.document.location.href);
  WriteToDebug("----------------------------------------");
  WriteToDebug("----------------------------------------");
  ClearErrorInfo();
  strStandAlone = GetQueryStringValue("StandAlone", window.location.search);
  strShowInteractiveDebug = GetQueryStringValue(
    "ShowDebug",
    window.location.search
  );
  WriteToDebug(
    "strStandAlone=" +
      strStandAlone +
      "  strShowInteractiveDebug=" +
      strShowInteractiveDebug
  );
  if (ConvertStringToBoolean(strStandAlone)) {
    WriteToDebug("Entering Stand Alone Mode");
    blnStandAlone = true;
  }
  if (blnStandAlone) {
    WriteToDebug("Using NONE Standard");
    objLMS = new LMSStandardAPI("NONE");
  } else {
    WriteToDebug("Standard From Configuration File - " + strLMSStandard);
    if (strLMSStandard.toUpperCase() == "AUTO") {
      WriteToDebug("Searching for recognized querystring parameters");
      aiccUrl = GetQueryStringValue("AICC_URL", document.location.search);
      endpoint = GetQueryStringValue("endpoint", document.location.search);
      cmi5FetchUrl = GetQueryStringValue("fetch", document.location.search);
      if (aiccUrl != null && aiccUrl != "") {
        WriteToDebug("Found AICC querystring parameters, using AICC");
        objLMS = new LMSStandardAPI("AICC");
        blnLmsPresent = true;
      } else if (endpoint != null && endpoint != "") {
        WriteToDebug(
          "Found endpoint querystring parameter - checking cmi5 or Tin Can"
        );
        if (cmi5FetchUrl != null && cmi5FetchUrl != "") {
          WriteToDebug("Found fetch querystring parameter, using cmi5");
          objLMS = new LMSStandardAPI("CMI5");
          blnLmsPresent = true;
        } else {
          WriteToDebug(
            "Did not find fetch querystring parameter, using Tin Can"
          );
          objLMS = new LMSStandardAPI("TCAPI");
          blnLmsPresent = true;
          strLMSStandard = "TCAPI";
        }
      } else {
        WriteToDebug("Auto-detecting standard - Searching for SCORM 2004 API");
        try {
          objTempAPI = SCORM2004_GrabAPI();
        } catch (e) {
          WriteToDebug("Error grabbing 2004 API-" + e.name + ":" + e.message);
        }
        if (!(typeof objTempAPI == "undefined" || objTempAPI == null)) {
          WriteToDebug("Found SCORM 2004 API, using SCORM 2004");
          objLMS = new LMSStandardAPI("SCORM2004");
          blnLmsPresent = true;
        } else {
          WriteToDebug("Searching for SCORM 1.2 API");
          try {
            objTempAPI = SCORM_GrabAPI();
          } catch (e) {
            WriteToDebug("Error grabbing 1.2 API-" + e.name + ":" + e.message);
          }
          if (!(typeof objTempAPI == "undefined" || objTempAPI == null)) {
            WriteToDebug("Found SCORM API, using SCORM");
            objLMS = new LMSStandardAPI("SCORM");
            blnLmsPresent = true;
          } else {
            if (ALLOW_NONE_STANDARD === true) {
              WriteToDebug(
                "Could not determine standard, defaulting to Stand Alone"
              );
              objLMS = new LMSStandardAPI("NONE");
            } else {
              WriteToDebug(
                "Could not determine standard, Stand Alone is disabled in configuration"
              );
              DisplayError(
                "Could not determine standard. SCORM, AICC, Tin Can, and CMI5 APIs could not be found"
              );
              return;
            }
          }
        }
      }
    } else {
      WriteToDebug(
        "Using Standard From Configuration File - " + strLMSStandard
      );
      objLMS = new LMSStandardAPI(strLMSStandard);
      blnLmsPresent = true;
    }
  }
  if (
    ConvertStringToBoolean(strShowInteractiveDebug) ||
    (!(typeof SHOW_DEBUG_ON_LAUNCH == "undefined") &&
      SHOW_DEBUG_ON_LAUNCH === true)
  ) {
    WriteToDebug("Showing Interactive Debug Windows");
    ShowDebugWindow();
  }
  WriteToDebug("Calling Standard Initialize");
  if (strLMSStandard.toUpperCase() == "TCAPI") {
    loadScript("../tc-config.js", objLMS.Initialize);
  } else {
    objLMS.Initialize();
  }
  TouchCloud();
  return;
}
function InitializeExecuted(blnSuccess, strErrorMessage) {
  WriteToDebug(
    "In InitializeExecuted, blnSuccess=" +
      blnSuccess +
      ", strErrorMessage=" +
      strErrorMessage
  );
  if (!blnSuccess) {
    WriteToDebug("ERROR - LMS Initialize Failed");
    if (strErrorMessage == "") {
      strErrorMessage = "An Error Has Occurred";
    }
    blnLmsPresent = false;
    DisplayError(strErrorMessage);
    return;
  }
  if (objLMS.Standard == "AICC") {
    AICC_InitializeExecuted();
  }
  blnLoaded = true;
  dtmStart = new Date();
  LoadContent();
  return;
}
function ExecFinish(ExitType) {
  WriteToDebug("In ExecFinish, ExiType=" + ExitType);
  ClearErrorInfo();
  if (blnLoaded && !blnCalledFinish) {
    WriteToDebug("Haven't called finish before, finishing");
    blnCalledFinish = true;
    if (blnReachedEnd && !EXIT_SUSPEND_IF_COMPLETED) {
      WriteToDebug("Reached End, overiding exit type to FINISH");
      ExitType = EXIT_TYPE_FINISH;
    }
    if (
      EXIT_NORMAL_IF_PASSED == true &&
      objLMS.GetStatus() == LESSON_STATUS_PASSED
    ) {
      WriteToDebug(
        "Passed status and config value set, overiding exit type to FINISH"
      );
      ExitType = EXIT_TYPE_FINISH;
    }
    if (!blnOverrodeTime) {
      WriteToDebug("Did not override time");
      dtmEnd = new Date();
      AccumulateTime();
      objLMS.SaveTime(intAccumulatedMS);
    }
    blnLoaded = false;
    WriteToDebug("Calling LMS Finish");
    return objLMS.Finish(ExitType, blnStatusWasSet);
  }
  return true;
}
function IsLoaded() {
  WriteToDebug("In IsLoaded, returning -" + blnLoaded);
  return blnLoaded;
}
function WriteToDebug(strInfo) {
  if (blnDebug) {
    var dtm = new Date();
    var strLine;
    strLine = aryDebug.length + ":" + dtm.toString() + " - " + strInfo;
    aryDebug[aryDebug.length] = strLine;
    if (winDebug && !winDebug.closed) {
      winDebug.document.body.appendChild(
        winDebug.document.createTextNode(strLine)
      );
      winDebug.document.body.appendChild(winDebug.document.createElement("br"));
    }
  }
  return;
}
function ShowDebugWindow() {
  var renderLog = function () {
    var i,
      len = aryDebug.length;
    winDebug.document.body.innerHTML = "";
    for (i = 0; i < len; i += 1) {
      winDebug.document.body.appendChild(
        winDebug.document.createTextNode(aryDebug[i])
      );
      winDebug.document.body.appendChild(winDebug.document.createElement("br"));
    }
  };
  if (winDebug && !winDebug.closed) {
    winDebug.close();
  }
  winDebug = window.open(
    "blank.html",
    "Debug",
    "width=600,height=300,resizable,scrollbars"
  );
  if (winDebug === null) {
    alert("Debug window could not be opened, popup blocker in place?");
  } else {
    if (winDebug.addEventListener || winDebug.attachEvent) {
      winDebug[winDebug.addEventListener ? "addEventListener" : "attachEvent"](
        (winDebug.attachEvent ? "on" : "") + "load",
        renderLog,
        false
      );
    }
    renderLog();
    winDebug.document.close();
    winDebug.focus();
  }
  return;
}
function DisplayError(strMessage) {
  var blnShowDebug;
  WriteToDebug("In DisplayError, strMessage=" + strMessage);
  blnShowDebug = confirm(
    "An error has occurred:\n\n" +
      strMessage +
      "\n\nPress 'OK' to view debug information to send to technical support."
  );
  if (blnShowDebug) {
    ShowDebugWindow();
  }
}
function GetLastError() {
  WriteToDebug("In GetLastError, intError=" + intError);
  if (intError != NO_ERROR) {
    WriteToDebug("Returning API Error");
    return intError;
  } else if (IsLoaded() && objLMS.GetLastError() != NO_ERROR) {
    WriteToDebug("Returning LMS Error");
    return ERROR_LMS;
  }
  WriteToDebug("Returning No Error");
  return NO_ERROR;
}
function GetLastLMSErrorCode() {
  WriteToDebug("In GetLastLMSErrorCode, intError=" + intError);
  var LMSError = objLMS.GetLastError();
  if (IsLoaded() && LMSError != NO_ERROR) {
    WriteToDebug("Returning LMS Error: " + LMSError);
    return LMSError;
  }
  WriteToDebug("Returning No Error");
  return NO_ERROR;
}
function GetLastErrorDesc() {
  WriteToDebug("In GetLastErrorDesc");
  if (intError != NO_ERROR) {
    WriteToDebug("Returning API Error - " + strErrorDesc);
    return strErrorDesc;
  } else if (IsLoaded() && objLMS.GetLastError() != NO_ERROR) {
    WriteToDebug("Returning LMS Error");
    return objLMS.GetLastErrorDesc();
  }
  WriteToDebug("Returning No Error");
  return "";
}
function SetErrorInfo(intErrorNumToSet, strErrorDescToSet) {
  WriteToDebug(
    "In SetErrorInfo - Num=" + intErrorNumToSet + " Desc=" + strErrorDescToSet
  );
  intError = intErrorNumToSet;
  strErrorDesc = strErrorDescToSet;
}
function ClearErrorInfo() {
  WriteToDebug("In ClearErrorInfo");
  var intError = NO_ERROR;
  var strErrorDesc = "";
}
function CommitData() {
  WriteToDebug("In CommitData");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (!blnOverrodeTime) {
    WriteToDebug("Did not override time, saving incremental time");
    dtmEnd = new Date();
    AccumulateTime();
    dtmStart = new Date();
    objLMS.SaveTime(intAccumulatedMS);
  }
  return objLMS.CommitData();
}
function Suspend() {
  WriteToDebug("In Suspend");
  ClearErrorInfo();
  return ExecFinish(EXIT_TYPE_SUSPEND);
}
function Finish() {
  WriteToDebug("In Finish");
  ClearErrorInfo();
  return ExecFinish(EXIT_TYPE_FINISH);
}
function TimeOut() {
  WriteToDebug("In TimeOut");
  ClearErrorInfo();
  return ExecFinish(EXIT_TYPE_TIMEOUT);
}
function Unload() {
  WriteToDebug("In Unload");
  ClearErrorInfo();
  blnUnloading = true;
  return ExecFinish(DEFAULT_EXIT_TYPE);
}
function SetReachedEnd() {
  WriteToDebug("In SetReachedEnd");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (blnStatusWasSet == false) {
    objLMS.SetCompleted();
  }
  blnReachedEnd = true;
  return true;
}
function ConcedeControl() {
  WriteToDebug("Conceding control with type: " + EXIT_BEHAVIOR);
  ClearErrorInfo();
  if (typeof objLMS.ConcedeControl !== "undefined") {
    Suspend();
    return objLMS.ConcedeControl();
  }
  var contentRoot = null;
  var urlBase = null;
  switch (EXIT_BEHAVIOR) {
    case "SCORM_RECOMMENDED":
      contentRoot = SearchParentsForContentRoot();
      if (contentRoot == window.top) {
        Suspend();
        contentRoot.window.close();
      } else {
        Suspend();
        if (contentRoot != null) {
          if (IsAbsoluteUrl(EXIT_TARGET)) {
            contentRoot.scormdriver_content.location.href = EXIT_TARGET;
          } else {
            urlBase = GetContentRootUrlBase(contentRoot);
            contentRoot.scormdriver_content.location.href =
              urlBase + EXIT_TARGET;
          }
        }
      }
      break;
    case "ALWAYS_CLOSE":
      Suspend();
      window.close();
      break;
    case "ALWAYS_CLOSE_TOP":
      Suspend();
      window.top.close();
      break;
    case "ALWAYS_CLOSE_PARENT":
      Suspend();
      window.parent.close();
      break;
    case "NOTHING":
      Suspend();
      break;
    case "REDIR_CONTENT_FRAME":
      Suspend();
      contentRoot = SearchParentsForContentRoot();
      if (contentRoot != null) {
        if (IsAbsoluteUrl(EXIT_TARGET)) {
          contentRoot.scormdriver_content.location.href = EXIT_TARGET;
        } else {
          urlBase = GetContentRootUrlBase(contentRoot);
          contentRoot.scormdriver_content.location.href = urlBase + EXIT_TARGET;
        }
      }
      break;
  }
  return true;
}
function GetContentRootUrlBase(contentRoot) {
  var urlParts = contentRoot.location.href.split("?")[0].split("/");
  delete urlParts[urlParts.length - 1];
  contentRoot = urlParts.join("/");
  return contentRoot;
}
function SearchParentsForContentRoot() {
  var contentRoot = null;
  var wnd = window;
  var i = 0;
  if (wnd.scormdriver_content) {
    contentRoot = wnd;
    return contentRoot;
  }
  while (contentRoot == null && wnd != window.top && i++ < 100) {
    if (wnd.scormdriver_content) {
      contentRoot = wnd;
      return contentRoot;
    } else {
      wnd = wnd.parent;
    }
  }
  WriteToDebug("Unable to locate content root");
  return null;
}
function GetStudentID() {
  WriteToDebug("In GetStudentID");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetStudentID();
}
function GetStudentName() {
  WriteToDebug("In GetStudentName");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetStudentName();
}
function GetBookmark() {
  WriteToDebug("In GetBookmark");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetBookmark();
}
function SetBookmark(strBookmark, strDesc) {
  WriteToDebug(
    "In SetBookmark - strBookmark=" + strBookmark + ", strDesc=" + strDesc
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.SetBookmark(strBookmark, strDesc);
}
function GetDataChunk() {
  WriteToDebug("In GetDataChunk");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetDataChunk();
}
function SetDataChunk(strData) {
  WriteToDebug("In SetDataChunk strData=" + strData);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.SetDataChunk(strData);
}
function GetLaunchData() {
  WriteToDebug("In GetLaunchData");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetLaunchData();
}
function GetComments() {
  var strCommentString;
  var aryComments;
  var i;
  WriteToDebug("In GetComments");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return null;
  }
  strCommentString = objLMS.GetComments();
  WriteToDebug("strCommentString=" + strCommentString);
  strCommentString = new String(strCommentString);
  if (strCommentString != "") {
    aryComments = strCommentString.split(" | ");
    for (i = 0; i < aryComments.length; i++) {
      WriteToDebug("Returning Comment #" + i);
      aryComments[i] = new String(aryComments[i]);
      aryComments[i] = aryComments[i].replace(/\|\|/g, "|");
      WriteToDebug("Comment #" + i + "=" + aryComments[i]);
    }
  } else {
    aryComments = new Array(0);
  }
  return aryComments;
}
function WriteComment(strComment) {
  var strExistingCommentString;
  WriteToDebug("In WriteComment strComment=" + strComment);
  ClearErrorInfo();
  strComment = new String(strComment);
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strComment = strComment.replace(/\|/g, "||");
  strExistingCommentString = objLMS.GetComments();
  if (
    strExistingCommentString != "" &&
    strExistingCommentString != "undefined"
  ) {
    strComment = strExistingCommentString + " | " + strComment;
  }
  return objLMS.WriteComment(strComment);
}
function GetLMSComments() {
  WriteToDebug("In GetLMSComments");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetLMSComments();
}
function GetAudioPlayPreference() {
  WriteToDebug("In GetAudioPlayPreference");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return PREFERENCE_DEFAULT;
  }
  return objLMS.GetAudioPlayPreference();
}
function GetAudioVolumePreference() {
  WriteToDebug("GetAudioVolumePreference");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return 100;
  }
  return objLMS.GetAudioVolumePreference();
}
function SetAudioPreference(PlayPreference, intPercentOfMaxVolume) {
  WriteToDebug(
    "In SetAudioPreference PlayPreference=" +
      PlayPreference +
      " intPercentOfMaxVolume=" +
      intPercentOfMaxVolume
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (PlayPreference != PREFERENCE_OFF && PlayPreference != PREFERENCE_ON) {
    WriteToDebug("Error Invalid PlayPreference");
    SetErrorInfo(
      ERROR_INVALID_PREFERENCE,
      "Invalid PlayPreference passed to SetAudioPreference, PlayPreference=" +
        PlayPreference
    );
    return false;
  }
  if (!ValidInteger(intPercentOfMaxVolume)) {
    WriteToDebug("Error Invalid PercentOfMaxVolume - not an integer");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid PercentOfMaxVolume passed to SetAudioPreference (not an integer), intPercentOfMaxVolume=" +
        intPercentOfMaxVolume
    );
    return false;
  }
  intPercentOfMaxVolume = parseInt(intPercentOfMaxVolume, 10);
  if (intPercentOfMaxVolume < 1 || intPercentOfMaxVolume > 100) {
    WriteToDebug("Error Invalid PercentOfMaxVolume - out of range");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid PercentOfMaxVolume passed to SetAudioPreference (must be between 1 and 100), intPercentOfMaxVolume=" +
        intPercentOfMaxVolume
    );
    return false;
  }
  WriteToDebug("Calling to LMS");
  return objLMS.SetAudioPreference(PlayPreference, intPercentOfMaxVolume);
}
function GetLanguagePreference() {
  WriteToDebug("In GetLanguagePreference");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return "";
  }
  return objLMS.GetLanguagePreference();
}
function SetLanguagePreference(strLanguage) {
  WriteToDebug("In SetLanguagePreference strLanguage=" + strLanguage);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.SetLanguagePreference(strLanguage);
}
function GetSpeedPreference() {
  WriteToDebug("In GetSpeedPreference");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return 100;
  }
  return objLMS.GetSpeedPreference();
}
function SetSpeedPreference(intPercentOfMax) {
  WriteToDebug("In SetSpeedPreference intPercentOfMax=" + intPercentOfMax);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (!ValidInteger(intPercentOfMax)) {
    WriteToDebug("ERROR Invalid Percent of MaxSpeed, not an integer");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid PercentOfMaxSpeed passed to SetSpeedPreference (not an integer), intPercentOfMax=" +
        intPercentOfMax
    );
    return false;
  }
  intPercentOfMax = parseInt(intPercentOfMax, 10);
  if (intPercentOfMax < 0 || intPercentOfMax > 100) {
    WriteToDebug("ERROR Invalid Percent of MaxSpeed, out of range");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid PercentOfMaxSpeed passed to SetSpeedPreference (must be between 1 and 100), intPercentOfMax=" +
        intPercentOfMax
    );
    return false;
  }
  WriteToDebug("Calling to LMS");
  return objLMS.SetSpeedPreference(intPercentOfMax);
}
function GetTextPreference() {
  WriteToDebug("In GetTextPreference");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetTextPreference();
}
function SetTextPreference(intPreference) {
  WriteToDebug("In SetTextPreference intPreference=" + intPreference);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (
    intPreference != PREFERENCE_DEFAULT &&
    intPreference != PREFERENCE_OFF &&
    intPreference != PREFERENCE_ON
  ) {
    WriteToDebug("Error - Invalid Preference");
    SetErrorInfo(
      ERROR_INVALID_PREFERENCE,
      "Invalid Preference passed to SetTextPreference, intPreference=" +
        intPreference
    );
    return false;
  }
  return objLMS.SetTextPreference(intPreference);
}
function GetPreviouslyAccumulatedTime() {
  WriteToDebug("In GetPreviouslyAccumulatedTime");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return 0;
  }
  return objLMS.GetPreviouslyAccumulatedTime();
}
function AccumulateTime() {
  WriteToDebug(
    "In AccumulateTime dtmStart=" +
      dtmStart +
      " dtmEnd=" +
      dtmEnd +
      " intAccumulatedMS=" +
      intAccumulatedMS
  );
  if (dtmEnd != null && dtmStart != null) {
    WriteToDebug("Accumulating Time");
    intAccumulatedMS += dtmEnd.getTime() - dtmStart.getTime();
    WriteToDebug("intAccumulatedMS=" + intAccumulatedMS);
  }
}
function GetSessionAccumulatedTime() {
  WriteToDebug("In GetSessionAccumulatedTime");
  ClearErrorInfo();
  WriteToDebug("Setting dtmEnd to now");
  dtmEnd = new Date();
  WriteToDebug("Accumulating Time");
  AccumulateTime();
  if (dtmStart != null) {
    WriteToDebug("Resetting dtmStart");
    dtmStart = new Date();
  }
  WriteToDebug("Setting dtmEnd to null");
  dtmEnd = null;
  WriteToDebug("Returning " + intAccumulatedMS);
  return intAccumulatedMS;
}
function SetSessionTime(intMilliseconds) {
  WriteToDebug("In SetSessionTime");
  ClearErrorInfo();
  if (!ValidInteger(intMilliseconds)) {
    WriteToDebug("ERROR parameter is not an integer");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid intMilliseconds passed to SetSessionTime (not an integer), intMilliseconds=" +
        intMilliseconds
    );
    return false;
  }
  intMilliseconds = parseInt(intMilliseconds, 10);
  if (intMilliseconds < 0) {
    WriteToDebug("Error, parameter is less than 0");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid intMilliseconds passed to SetSessionTime (must be greater than 0), intMilliseconds=" +
        intMilliseconds
    );
    return false;
  }
  blnOverrodeTime = true;
  intTimeOverrideMS = intMilliseconds;
  objLMS.SaveTime(intTimeOverrideMS);
  return true;
}
function PauseTimeTracking() {
  WriteToDebug("In PauseTimeTracking");
  ClearErrorInfo();
  WriteToDebug("Setting dtmEnd to now");
  dtmEnd = new Date();
  WriteToDebug("Accumulating Time");
  AccumulateTime();
  WriteToDebug("Setting Start and End times to null");
  dtmStart = null;
  dtmEnd = null;
  return true;
}
function ResumeTimeTracking() {
  WriteToDebug("In ResumeTimeTracking");
  ClearErrorInfo();
  WriteToDebug("Setting dtmStart to now");
  dtmStart = new Date();
  return true;
}
function GetMaxTimeAllowed() {
  WriteToDebug("In GetMaxTimeAllowed");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return MAX_CMI_TIME;
  }
  return objLMS.GetMaxTimeAllowed();
}
function DisplayMessageOnTimeout() {
  WriteToDebug("In DisplayMessageOnTimeOut");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.DisplayMessageOnTimeout();
}
function ExitOnTimeout() {
  WriteToDebug("In ExitOnTimeOut");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.ExitOnTimeout();
}
function GetPassingScore() {
  WriteToDebug("In GetPassingScore");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return 0;
  }
  return objLMS.GetPassingScore();
}
function GetScore() {
  WriteToDebug("In GetScore");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return 0;
  }
  return objLMS.GetScore();
}
function GetScaledScore() {
  WriteToDebug("In GetScaledScore");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return 0;
  }
  return objLMS.GetScaledScore();
}
function SetScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "In SetScore, intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (!IsValidDecimal(intScore)) {
    WriteToDebug("ERROR - intScore not a valid decimal");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Score passed to SetScore (not a valid decimal), intScore=" +
        intScore
    );
    return false;
  }
  if (!IsValidDecimal(intMaxScore)) {
    WriteToDebug("ERROR - intMaxScore not a valid decimal");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Max Score passed to SetScore (not a valid decimal), intMaxScore=" +
        intMaxScore
    );
    return false;
  }
  if (!IsValidDecimal(intMinScore)) {
    WriteToDebug("ERROR - intMinScore not a valid decimal");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Min Score passed to SetScore (not a valid decimal), intMinScore=" +
        intMinScore
    );
    return false;
  }
  WriteToDebug("Converting SCORES to floats");
  intScore = parseFloat(intScore);
  intMaxScore = parseFloat(intMaxScore);
  intMinScore = parseFloat(intMinScore);
  if (strLMSStandard == "SCORM") {
    WriteToDebug("DEBUG - SCORM 1.2 so checking max score length");
    if (intScore < 0 || intScore > 100) {
      WriteToDebug("ERROR - intScore out of range");
      SetErrorInfo(
        ERROR_INVALID_NUMBER,
        "Invalid Score passed to SetScore (must be between 0-100), intScore=" +
          intScore
      );
      return false;
    }
    if (intMaxScore < 0 || intMaxScore > 100) {
      WriteToDebug("ERROR - intMaxScore out of range");
      SetErrorInfo(
        ERROR_INVALID_NUMBER,
        "Invalid Max Score passed to SetScore (must be between 0-100), intMaxScore=" +
          intMaxScore
      );
      return false;
    }
    if (intMinScore < 0 || intMinScore > 100) {
      WriteToDebug("ERROR - intMinScore out of range");
      SetErrorInfo(
        ERROR_INVALID_NUMBER,
        "Invalid Min Score passed to SetScore (must be between 0-100), intMinScore=" +
          intMinScore
      );
      return false;
    }
  }
  if (SCORE_CAN_ONLY_IMPROVE === true) {
    var previousScore = GetScore();
    if (
      previousScore != null &&
      previousScore != "" &&
      previousScore > intScore
    ) {
      WriteToDebug(
        "Previous score was greater than new score, configuration only allows scores to improve, returning."
      );
      return true;
    }
  }
  WriteToDebug("Calling to LMS");
  return objLMS.SetScore(intScore, intMaxScore, intMinScore);
}
function SetPointBasedScore(intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "In SetPointBasedScore, intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (!IsValidDecimal(intScore)) {
    WriteToDebug("ERROR - intScore not a valid decimal");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Score passed to SetScore (not a valid decimal), intScore=" +
        intScore
    );
    return false;
  }
  if (!IsValidDecimal(intMaxScore)) {
    WriteToDebug("ERROR - intMaxScore not a valid decimal");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Max Score passed to SetScore (not a valid decimal), intMaxScore=" +
        intMaxScore
    );
    return false;
  }
  if (!IsValidDecimal(intMinScore)) {
    WriteToDebug("ERROR - intMinScore not a valid decimal");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Min Score passed to SetScore (not a valid decimal), intMinScore=" +
        intMinScore
    );
    return false;
  }
  WriteToDebug("Converting SCORES to floats");
  intScore = parseFloat(intScore);
  intMaxScore = parseFloat(intMaxScore);
  intMinScore = parseFloat(intMinScore);
  if (strLMSStandard == "SCORM") {
    if (intScore < 0 || intScore > 100) {
      WriteToDebug("ERROR - intScore out of range");
      SetErrorInfo(
        ERROR_INVALID_NUMBER,
        "Invalid Score passed to SetScore (must be between 0-100), intScore=" +
          intScore
      );
      return false;
    }
    if (intMaxScore < 0 || intMaxScore > 100) {
      WriteToDebug("ERROR - intMaxScore out of range");
      SetErrorInfo(
        ERROR_INVALID_NUMBER,
        "Invalid Max Score passed to SetScore (must be between 0-100), intMaxScore=" +
          intMaxScore
      );
      return false;
    }
    if (intMinScore < 0 || intMinScore > 100) {
      WriteToDebug("ERROR - intMinScore out of range");
      SetErrorInfo(
        ERROR_INVALID_NUMBER,
        "Invalid Min Score passed to SetScore (must be between 0-100), intMinScore=" +
          intMinScore
      );
      return false;
    }
  }
  if (SCORE_CAN_ONLY_IMPROVE === true) {
    var previousScore = GetScore();
    if (
      previousScore != null &&
      previousScore != "" &&
      previousScore > intScore
    ) {
      WriteToDebug(
        "Previous score was greater than new score, configuration only allows scores to improve, returning."
      );
      return true;
    }
  }
  WriteToDebug("Calling to LMS");
  return objLMS.SetPointBasedScore(intScore, intMaxScore, intMinScore);
}
function CreateResponseIdentifier(strShort, strLong) {
  if (strShort.replace(" ", "") == "") {
    WriteToDebug("Short Identifier is empty");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid short identifier, strShort=" + strShort
    );
    return false;
  }
  if (strShort.length != 1) {
    WriteToDebug("ERROR - Short Identifier  not 1 character");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid short identifier, strShort=" + strShort
    );
    return false;
  }
  if (!IsAlphaNumeric(strShort)) {
    WriteToDebug("ERROR - Short Identifier  not alpha numeric");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid short identifier, strShort=" + strShort
    );
    return false;
  }
  strShort = strShort.toLowerCase();
  strLong = CreateValidIdentifier(strLong);
  return new ResponseIdentifier(strShort, strLong);
}
function ResponseIdentifier(strShort, strLong) {
  this.Short = new String(strShort);
  this.Long = new String(strLong);
  this.toString = function () {
    return "[Response Identifier " + this.Short + ", " + this.Long + "]";
  };
}
function MatchingResponse(source, target) {
  if (source.constructor == String) {
    source = CreateResponseIdentifier(source, source);
  }
  if (target.constructor == String) {
    target = CreateResponseIdentifier(target, target);
  }
  this.Source = source;
  this.Target = target;
  this.toString = function () {
    return "[Matching Response " + this.Source + ", " + this.Target + "]";
  };
}
function CreateMatchingResponse(pattern) {
  var aryPairs = new Array();
  var aryEachPair = new Array();
  pattern = new String(pattern);
  aryPairs = pattern.split("[,]");
  for (var i = 0; i < aryPairs.length; i++) {
    var thisPair = new String(aryPairs[i]);
    aryEachPair = thisPair.split("[.]");
    WriteToDebug(
      "Matching Response [" +
        i +
        "]  source: " +
        aryEachPair[0] +
        "  target: " +
        aryEachPair[1]
    );
    aryPairs[i] = new MatchingResponse(aryEachPair[0], aryEachPair[1]);
  }
  WriteToDebug("pattern: " + pattern + " becomes " + aryPairs[0]);
  if (aryPairs.length == 0) return aryPairs[0];
  else return aryPairs;
}
function CreateValidIdentifier(str) {
  return objLMS.CreateValidIdentifier(str);
}
function CreateUriIdentifier(str, iri) {
  if (str === undefined || str === null || str === "") {
    return "";
  }
  str = Trim(str);
  var uri = new URI(str);
  if (!uri.is("absolute")) {
    str = URI_IDENTIFIER_PREFIX + encodeURIComponent(str);
    uri = new URI(str);
  }
  uri.normalize();
  if (iri) {
    uri.iri();
  }
  return uri.toString();
}
function CreateValidIdentifierLegacy(str) {
  if (str != null || str != "") {
    str = new String(str);
    str = Trim(str);
    if (str.toLowerCase().indexOf("urn:") == 0) {
      str = str.substr(4);
    }
    str = str.replace(/[^\w\-\(\)\+\.\:\=\@\;\$\_\!\*\'\%]/g, "_");
    return str;
  }
  return "";
}
function Trim(str) {
  str = str + "";
  str = str.replace(/^\s*/, "");
  str = str.replace(/\s*$/, "");
  return str;
}
function RecordTrueFalseInteraction(
  strID,
  blnResponse,
  blnCorrect,
  blnCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordTrueFalseInteraction strID=" +
      strID +
      ", blnResponse=" +
      blnResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", blnCorrectResponse=" +
      blnCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (
    (blnResponse != true && blnResponse != false && blnResponse !== null) ||
    (blnResponse === null && !ALLOW_INTERACTION_NULL_LEARNER_RESPONSE)
  ) {
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The Response parameter must be a valid boolean value."
    );
    return false;
  }
  if (
    blnCorrectResponse != null &&
    blnCorrectResponse != true &&
    blnCorrectResponse != false
  ) {
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The Correct Response parameter must be a valid boolean value or null."
    );
    return false;
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordTrueFalseInteraction(
    strID,
    blnResponse,
    blnCorrect,
    blnCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordMultipleChoiceInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordMultipleChoiceInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strID = new String(strID);
  var aryResponse;
  var aryCorrectResponse;
  if (response === null) {
    if (!ALLOW_INTERACTION_NULL_LEARNER_RESPONSE) {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format (null response not allowed)"
      );
      return false;
    }
    aryResponse = null;
  } else if (response.constructor == String) {
    aryResponse = new Array();
    var responseIdentifier = CreateResponseIdentifier(response, response);
    if (responseIdentifier == false) {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format"
      );
      return false;
    }
    aryResponse[0] = responseIdentifier;
  } else if (response.constructor == ResponseIdentifier) {
    aryResponse = new Array();
    aryResponse[0] = response;
  } else if (
    response.constructor == Array ||
    response.constructor.toString().search("Array") > 0
  ) {
    aryResponse = response;
  } else if (
    window.console &&
    response.constructor.toString() == "(Internal Function)" &&
    response.length > 0
  ) {
    aryResponse = response;
  } else {
    if (window.console) {
      window.console.log(
        "ERROR_INVALID_INTERACTION_RESPONSE :: The response is not in the correct format."
      );
    }
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The response is not in the correct format"
    );
    return false;
  }
  if (
    correctResponse != null &&
    correctResponse != undefined &&
    correctResponse != ""
  ) {
    if (correctResponse.constructor == String) {
      aryCorrectResponse = new Array();
      responseIdentifier = CreateResponseIdentifier(
        correctResponse,
        correctResponse
      );
      if (responseIdentifier == false) {
        SetErrorInfo(
          ERROR_INVALID_INTERACTION_RESPONSE,
          "The correct response is not in the correct format"
        );
        return false;
      }
      aryCorrectResponse[0] = responseIdentifier;
    } else if (correctResponse.constructor == ResponseIdentifier) {
      aryCorrectResponse = new Array();
      aryCorrectResponse[0] = correctResponse;
    } else if (
      correctResponse.constructor == Array ||
      correctResponse.constructor.toString().search("Array") > 0
    ) {
      aryCorrectResponse = correctResponse;
    } else if (
      window.console &&
      correctResponse.constructor.toString() == "(Internal Function)" &&
      correctResponse.length > 0
    ) {
      aryCorrectResponse = correctResponse;
    } else {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The correct response is not in the correct format"
      );
      return false;
    }
  } else {
    aryCorrectResponse = new Array();
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordMultipleChoiceInteraction(
    strID,
    aryResponse,
    blnCorrect,
    aryCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordFillInInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordFillInInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordFillInInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordMatchingInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordMatchingInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  var aryResponse;
  var aryCorrectResponse;
  if (response === null) {
    if (!ALLOW_INTERACTION_NULL_LEARNER_RESPONSE) {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format (null response not allowed)"
      );
      return false;
    }
    aryResponse = null;
  } else if (response.constructor == MatchingResponse) {
    aryResponse = new Array();
    aryResponse[0] = response;
  } else if (
    response.constructor == Array ||
    response.constructor.toString().search("Array") > 0
  ) {
    aryResponse = response;
  } else if (
    window.console &&
    response.constructor.toString() == "(Internal Function)" &&
    response.length > 0
  ) {
    aryResponse = response;
  } else {
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The response is not in the correct format"
    );
    return false;
  }
  if (correctResponse != null && correctResponse != undefined) {
    if (correctResponse.constructor == MatchingResponse) {
      aryCorrectResponse = new Array();
      aryCorrectResponse[0] = correctResponse;
    } else if (
      correctResponse.constructor == Array ||
      correctResponse.constructor.toString().search("Array") > 0
    ) {
      aryCorrectResponse = correctResponse;
    } else if (
      window.console &&
      correctResponse.constructor.toString() == "(Internal Function)" &&
      correctResponse.length > 0
    ) {
      aryCorrectResponse = correctResponse;
    } else {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format"
      );
      return false;
    }
  } else {
    aryCorrectResponse = new Array();
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordMatchingInteraction(
    strID,
    aryResponse,
    blnCorrect,
    aryCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordPerformanceInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordPerformanceInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordPerformanceInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordSequencingInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordSequencingInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  var aryResponse;
  var aryCorrectResponse;
  if (response === null) {
    if (!ALLOW_INTERACTION_NULL_LEARNER_RESPONSE) {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format (null response not allowed)"
      );
      return false;
    }
    aryResponse = null;
  } else if (response.constructor == String) {
    aryResponse = new Array();
    var responseIdentifier = CreateResponseIdentifier(response, response);
    if (responseIdentifier == false) {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format"
      );
      return false;
    }
    aryResponse[0] = responseIdentifier;
  } else if (response.constructor == ResponseIdentifier) {
    aryResponse = new Array();
    aryResponse[0] = response;
  } else if (
    response.constructor == Array ||
    response.constructor.toString().search("Array") > 0
  ) {
    aryResponse = response;
  } else if (
    window.console &&
    response.constructor.toString() == "(Internal Function)" &&
    response.length > 0
  ) {
    aryResponse = response;
  } else {
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The response is not in the correct format"
    );
    return false;
  }
  if (
    correctResponse != null &&
    correctResponse != undefined &&
    correctResponse != ""
  ) {
    if (correctResponse.constructor == String) {
      aryCorrectResponse = new Array();
      responseIdentifier = CreateResponseIdentifier(
        correctResponse,
        correctResponse
      );
      if (responseIdentifier == false) {
        SetErrorInfo(
          ERROR_INVALID_INTERACTION_RESPONSE,
          "The correct response is not in the correct format"
        );
        return false;
      }
      aryCorrectResponse[0] = responseIdentifier;
    } else if (correctResponse.constructor == ResponseIdentifier) {
      aryCorrectResponse = new Array();
      aryCorrectResponse[0] = correctResponse;
    } else if (
      correctResponse.constructor == Array ||
      correctResponse.constructor.toString().search("Array") > 0
    ) {
      aryCorrectResponse = correctResponse;
    } else if (
      window.console &&
      correctResponse.constructor.toString() == "(Internal Function)" &&
      correctResponse.length > 0
    ) {
      aryCorrectResponse = correctResponse;
    } else {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The correct response is not in the correct format"
      );
      return false;
    }
  } else {
    aryCorrectResponse = new Array();
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordSequencingInteraction(
    strID,
    aryResponse,
    blnCorrect,
    aryCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordLikertInteraction(
  strID,
  response,
  blnCorrect,
  correctResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordLikertInteraction strID=" +
      strID +
      ", response=" +
      response +
      ", blnCorrect=" +
      blnCorrect +
      ", correctResponse=" +
      correctResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  var riResponse;
  var riCorrectResponse;
  if (response === null) {
    if (!ALLOW_INTERACTION_NULL_LEARNER_RESPONSE) {
      SetErrorInfo(
        ERROR_INVALID_INTERACTION_RESPONSE,
        "The response is not in the correct format (null response not allowed)"
      );
      return false;
    }
    riResponse = null;
  } else if (response.constructor == String) {
    riResponse = CreateResponseIdentifier(response, response);
  } else if (response.constructor == ResponseIdentifier) {
    riResponse = response;
  } else {
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The response is not in the correct format"
    );
    return false;
  }
  if (correctResponse == null || correctResponse == undefined) {
    riCorrectResponse = null;
  } else if (correctResponse.constructor == ResponseIdentifier) {
    riCorrectResponse = correctResponse;
  } else if (correctResponse.constructor == String) {
    riCorrectResponse = CreateResponseIdentifier(
      correctResponse,
      correctResponse
    );
  } else {
    SetErrorInfo(
      ERROR_INVALID_INTERACTION_RESPONSE,
      "The response is not in the correct format"
    );
    return false;
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordLikertInteraction(
    strID,
    riResponse,
    blnCorrect,
    riCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function RecordNumericInteraction(
  strID,
  strResponse,
  blnCorrect,
  strCorrectResponse,
  strDescription,
  intWeighting,
  intLatency,
  strLearningObjectiveID
) {
  strID = CreateValidIdentifier(strID);
  strLearningObjectiveID = CreateValidIdentifier(strLearningObjectiveID);
  WriteToDebug(
    "In RecordNumericInteraction strID=" +
      strID +
      ", strResponse=" +
      strResponse +
      ", blnCorrect=" +
      blnCorrect +
      ", strCorrectResponse=" +
      strCorrectResponse +
      ", strDescription=" +
      strDescription +
      ", intWeighting=" +
      intWeighting +
      ", intLatency=" +
      intLatency +
      ", strLearningObjectiveID=" +
      strLearningObjectiveID
  );
  if (
    !(typeof DO_NOT_REPORT_INTERACTIONS == "undefined") &&
    DO_NOT_REPORT_INTERACTIONS === true
  ) {
    WriteToDebug(
      "Configuration specifies interactions should not be reported, exiting."
    );
    return true;
  }
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  if (
    (strResponse === null && !ALLOW_INTERACTION_NULL_LEARNER_RESPONSE) ||
    (strResponse !== null && !IsValidDecimal(strResponse))
  ) {
    WriteToDebug("ERROR - Invalid Response, not a valid decmial");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Response passed to RecordNumericInteraction (not a valid decimal), strResponse=" +
        strResponse
    );
    return false;
  }
  var dtmTime = new Date();
  WriteToDebug("Calling to LMS");
  return objLMS.RecordNumericInteraction(
    strID,
    strResponse,
    blnCorrect,
    strCorrectResponse,
    strDescription,
    intWeighting,
    intLatency,
    strLearningObjectiveID,
    dtmTime
  );
}
function GetStatus() {
  WriteToDebug("In GetStatus");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return LESSON_STATUS_INCOMPLETE;
  }
  return objLMS.GetStatus();
}
function ResetStatus() {
  WriteToDebug("In ResetStatus");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  WriteToDebug("Setting blnStatusWasSet to false");
  blnStatusWasSet = false;
  return objLMS.ResetStatus();
}
function GetProgressMeasure() {
  WriteToDebug("In GetProgressMeasure");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return LESSON_STATUS_INCOMPLETE;
  }
  return objLMS.GetProgressMeasure();
}
function SetProgressMeasure(numMeasure) {
  WriteToDebug("In SetProgressMeasure, passing in: " + numMeasure);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return LESSON_STATUS_INCOMPLETE;
  }
  return objLMS.SetProgressMeasure(numMeasure);
}
function SetPassed() {
  WriteToDebug("In SetPassed");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  WriteToDebug("Setting blnStatusWasSet to true");
  blnStatusWasSet = true;
  return objLMS.SetPassed();
}
function SetFailed() {
  WriteToDebug("In SetFailed");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  WriteToDebug("Setting blnStatusWasSet to true");
  blnStatusWasSet = true;
  return objLMS.SetFailed();
}
function GetEntryMode() {
  WriteToDebug("In GetEntryMode");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return ENTRY_FIRST_TIME;
  }
  return objLMS.GetEntryMode();
}
function GetLessonMode() {
  WriteToDebug("In GetLessonMode");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return MODE_NORMAL;
  }
  return objLMS.GetLessonMode();
}
function GetTakingForCredit() {
  WriteToDebug("In GetTakingForCredit");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetTakingForCredit();
}
function SetObjectiveScore(strObjectiveID, intScore, intMaxScore, intMinScore) {
  WriteToDebug(
    "In SetObjectiveScore, intObjectiveID=" +
      strObjectiveID +
      ", intScore=" +
      intScore +
      ", intMaxScore=" +
      intMaxScore +
      ", intMinScore=" +
      intMinScore
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strObjectiveID = new String(strObjectiveID);
  if (strObjectiveID.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid ObjectiveID, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid ObjectiveID passed to SetObjectiveScore (must have a value), strObjectiveID=" +
        strObjectiveID
    );
    return false;
  }
  if (!IsValidDecimal(intScore)) {
    WriteToDebug("ERROR - Invalid Score, not a valid decmial");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Score passed to SetObjectiveScore (not a valid decimal), intScore=" +
        intScore
    );
    return false;
  }
  if (!IsValidDecimal(intMaxScore)) {
    WriteToDebug("ERROR - Invalid Max Score, not a valid decmial");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Max Score passed to SetObjectiveScore (not a valid decimal), intMaxScore=" +
        intMaxScore
    );
    return false;
  }
  if (!IsValidDecimal(intMinScore)) {
    WriteToDebug("ERROR - Invalid Min Score, not a valid decmial");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Min Score passed to SetObjectiveScore (not a valid decimal), intMinScore=" +
        intMinScore
    );
    return false;
  }
  WriteToDebug("Converting Scores to floats");
  intScore = parseFloat(intScore);
  intMaxScore = parseFloat(intMaxScore);
  intMinScore = parseFloat(intMinScore);
  if (intScore < 0 || intScore > 100) {
    WriteToDebug("ERROR - Invalid Score, out of range");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Score passed to SetObjectiveScore (must be between 0-100), intScore=" +
        intScore
    );
    return false;
  }
  if (intMaxScore < 0 || intMaxScore > 100) {
    WriteToDebug("ERROR - Invalid Max Score, out of range");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Max Score passed to SetObjectiveScore (must be between 0-100), intMaxScore=" +
        intMaxScore
    );
    return false;
  }
  if (intMinScore < 0 || intMinScore > 100) {
    WriteToDebug("ERROR - Invalid Min Score, out of range");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Min Score passed to SetObjectiveScore (must be between 0-100), intMinScore=" +
        intMinScore
    );
    return false;
  }
  WriteToDebug("Calling To LMS");
  return objLMS.SetObjectiveScore(
    strObjectiveID,
    intScore,
    intMaxScore,
    intMinScore
  );
}
function SetObjectiveStatus(strObjectiveID, Lesson_Status) {
  WriteToDebug(
    "In SetObjectiveStatus strObjectiveID=" +
      strObjectiveID +
      ", Lesson_Status=" +
      Lesson_Status
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strObjectiveID = new String(strObjectiveID);
  if (strObjectiveID.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid ObjectiveID, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid ObjectiveID passed to SetObjectiveStatus (must have a value), strObjectiveID=" +
        strObjectiveID
    );
    return false;
  }
  if (
    Lesson_Status != LESSON_STATUS_PASSED &&
    Lesson_Status != LESSON_STATUS_COMPLETED &&
    Lesson_Status != LESSON_STATUS_FAILED &&
    Lesson_Status != LESSON_STATUS_INCOMPLETE &&
    Lesson_Status != LESSON_STATUS_BROWSED &&
    Lesson_Status != LESSON_STATUS_NOT_ATTEMPTED
  ) {
    WriteToDebug("ERROR - Invalid Status");
    SetErrorInfo(
      ERROR_INVALID_STATUS,
      "Invalid status passed to SetObjectiveStatus, Lesson_Status=" +
        Lesson_Status
    );
    return false;
  }
  WriteToDebug("Calling To LMS");
  return objLMS.SetObjectiveStatus(strObjectiveID, Lesson_Status);
}
function GetObjectiveStatus(strObjectiveID) {
  WriteToDebug("In GetObjectiveStatus, strObjectiveID=" + strObjectiveID);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetObjectiveStatus(strObjectiveID);
}
function SetObjectiveDescription(strObjectiveID, strObjectiveDescription) {
  WriteToDebug(
    "In SetObjectiveDescription strObjectiveID=" +
      strObjectiveID +
      ", strObjectiveDescription=" +
      strObjectiveDescription
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strObjectiveID = new String(strObjectiveID);
  if (strObjectiveID.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid ObjectiveID, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid ObjectiveID passed to SetObjectiveStatus (must have a value), strObjectiveID=" +
        strObjectiveID
    );
    return false;
  }
  WriteToDebug("Calling To LMS");
  return objLMS.SetObjectiveDescription(
    strObjectiveID,
    strObjectiveDescription
  );
}
function GetObjectiveDescription(strObjectiveID) {
  WriteToDebug("In GetObjectiveDescription, strObjectiveID=" + strObjectiveID);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetObjectiveDescription(strObjectiveID);
}
function GetObjectiveScore(strObjectiveID) {
  WriteToDebug("In GetObjectiveScore, strObjectiveID=" + strObjectiveID);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetObjectiveScore(strObjectiveID);
}
function IsLmsPresent() {
  return blnLmsPresent;
}
function SetObjectiveProgressMeasure(
  strObjectiveID,
  strObjectiveProgressMeasure
) {
  WriteToDebug(
    "In SetObjectiveProgressMeasure strObjectiveID=" +
      strObjectiveID +
      ", strObjectiveProgressMeasure=" +
      strObjectiveProgressMeasure
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strObjectiveID = new String(strObjectiveID);
  if (strObjectiveID.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid ObjectiveID, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid ObjectiveID passed to SetObjectiveProgressMeasure (must have a value), strObjectiveID=" +
        strObjectiveID
    );
    return false;
  }
  WriteToDebug("Calling To LMS");
  return objLMS.SetObjectiveProgressMeasure(
    strObjectiveID,
    strObjectiveProgressMeasure
  );
}
function GetObjectiveProgressMeasure(strObjectiveID) {
  WriteToDebug(
    "In GetObjectiveProgressMeasure, strObjectiveID=" + strObjectiveID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetObjectiveProgressMeasure(strObjectiveID);
}
function SetNavigationRequest(strNavRequest) {
  WriteToDebug("In SetNavigationRequest");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.SetNavigationRequest(strNavRequest);
}
function GetNavigationRequest() {
  WriteToDebug("In GetNavigationRequest");
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetNavigationRequest();
}
function GetInteractionType(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug("In GetInteractionType, strInteractionID=" + strInteractionID);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionType(strInteractionID);
}
function GetInteractionTimestamp(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug(
    "In GetInteractionTimestamp, strInteractionID=" + strInteractionID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionTimestamp(strInteractionID);
}
function GetInteractionCorrectResponses(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug(
    "In GetInteractionCorrectResponses, strInteractionID=" + strInteractionID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionCorrectResponses(strInteractionID);
}
function GetInteractionWeighting(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug(
    "In GetInteractionWeighting, strInteractionID=" + strInteractionID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionWeighting(strInteractionID);
}
function GetInteractionLearnerResponses(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug(
    "In GetInteractionLearnerResponses, strInteractionID=" + strInteractionID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionLearnerResponses(strInteractionID);
}
function GetInteractionResult(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug("In GetInteractionResult, strInteractionID=" + strInteractionID);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionResult(strInteractionID);
}
function GetInteractionLatency(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug(
    "In GetInteractionLatency, strInteractionID=" + strInteractionID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionLatency(strInteractionID);
}
function GetInteractionDescription(strInteractionID) {
  strInteractionID = CreateValidIdentifier(strInteractionID);
  WriteToDebug(
    "In GetInteractionDescription, strInteractionID=" + strInteractionID
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  return objLMS.GetInteractionDescription(strInteractionID);
}
function CreateDataBucket(strBucketId, intMinSize, intMaxSize) {
  WriteToDebug(
    "In CreateDataBucket, strBucketId=" +
      strBucketId +
      ", intMinSize=" +
      intMinSize +
      ", intMaxSize=" +
      intMaxSize
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strBucketId = new String(strBucketId);
  if (strBucketId.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid BucketId, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid strBucketId passed to CreateDataBucket (must have a value), strBucketId=" +
        strBucketId
    );
    return false;
  }
  if (!ValidInteger(intMinSize)) {
    WriteToDebug("ERROR Invalid Min Size, not an integer");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid intMinSize passed to CreateDataBucket (not an integer), intMinSize=" +
        intMinSize
    );
    return false;
  }
  if (!ValidInteger(intMaxSize)) {
    WriteToDebug("ERROR Invalid Max Size, not an integer");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid intMaxSize passed to CreateDataBucket (not an integer), intMaxSize=" +
        intMaxSize
    );
    return false;
  }
  intMinSize = parseInt(intMinSize, 10);
  intMaxSize = parseInt(intMaxSize, 10);
  if (intMinSize < 0) {
    WriteToDebug("ERROR Invalid Min Size, must be greater than or equal to 0");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Min Size passed to CreateDataBucket (must be greater than or equal to 0), intMinSize=" +
        intMinSize
    );
    return false;
  }
  if (intMaxSize <= 0) {
    WriteToDebug("ERROR Invalid Max Size, must be greater than 0");
    SetErrorInfo(
      ERROR_INVALID_NUMBER,
      "Invalid Max Size passed to CreateDataBucket (must be greater than 0), intMaxSize=" +
        intMaxSize
    );
    return false;
  }
  intMinSize = intMinSize * 2;
  intMaxSize = intMaxSize * 2;
  return objLMS.CreateDataBucket(strBucketId, intMinSize, intMaxSize);
}
function GetDataFromBucket(strBucketId) {
  WriteToDebug("In GetDataFromBucket, strBucketId=" + strBucketId);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strBucketId = new String(strBucketId);
  if (strBucketId.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid BucketId, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid strBucketId passed to GetDataFromBucket (must have a value), strBucketId=" +
        strBucketId
    );
    return false;
  }
  return objLMS.GetDataFromBucket(strBucketId);
}
function PutDataInBucket(strBucketId, strData, blnAppendToEnd) {
  WriteToDebug(
    "In PutDataInBucket, strBucketId=" +
      strBucketId +
      ", blnAppendToEnd=" +
      blnAppendToEnd +
      ", strData=" +
      strData
  );
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strBucketId = new String(strBucketId);
  if (strBucketId.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid BucketId, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid strBucketId passed to PutDataInBucket (must have a value), strBucketId=" +
        strBucketId
    );
    return false;
  }
  if (blnAppendToEnd != true) {
    WriteToDebug(
      "blnAppendToEnd was not explicitly true so setting it to false, blnAppendToEnd=" +
        blnAppendToEnd
    );
    blnAppendToEnd = false;
  }
  return objLMS.PutDataInBucket(strBucketId, strData, blnAppendToEnd);
}
function DetectSSPSupport() {
  return objLMS.DetectSSPSupport();
}
function GetBucketInfo(strBucketId) {
  WriteToDebug("In GetBucketInfo, strBucketId=" + strBucketId);
  ClearErrorInfo();
  if (!IsLoaded()) {
    SetErrorInfo(
      ERROR_NOT_LOADED,
      "Cannot make calls to the LMS before calling Start"
    );
    return false;
  }
  strBucketId = new String(strBucketId);
  if (strBucketId.replace(" ", "") == "") {
    WriteToDebug("ERROR - Invalid BucketId, empty string");
    SetErrorInfo(
      ERROR_INVALID_ID,
      "Invalid strBucketId passed to GetBucketInfo (must have a value), strBucketId=" +
        strBucketId
    );
    return false;
  }
  var bucketInfo = objLMS.GetBucketInfo(strBucketId);
  bucketInfo.TotalSpace = bucketInfo.TotalSpace / 2;
  bucketInfo.UsedSpace = bucketInfo.UsedSpace / 2;
  WriteToDebug("GetBucketInfo returning " + bucketInfo);
  return bucketInfo;
}
function SSPBucketSize(totalSpace, usedSpace) {
  this.TotalSpace = totalSpace;
  this.UsedSpace = usedSpace;
  this.toString = function () {
    return "[SSPBucketSize " + this.TotalSpace + ", " + this.UsedSpace + "]";
  };
}
