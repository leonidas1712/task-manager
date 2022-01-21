// for functions/constants common to dealing with dates
import { format, parse } from 'date-fns';
import React from 'react';

// these formats are generated by default date and time picker from bootstrap/normal form-control
export const DATE_PICKER_FORMAT = "yyyy-MM-dd"; //e.g 2022-01-05
export const TIME_PICKER_FORMAT = "HH:mm" // e.g 21:06
const DEFAULT_TIME = "00:00"
const FORMAT_DATE = "d MMM R"; // 30 Jan 2022
const FORMAT_TIME = "h:mmaaa"; // 6:30pm/am

// parse(inputStr, formatStr, referenceDate to fill in missing parts)
// assume both non-empty: this is for case date, time both provided
// input: date,time according to formats, output: JS Date Obj corresponding to this datetime
export const dateTimeInputsToDate =(date: string, time: string): Date => {
    const sep = "";
    return parse(`${date + sep + time}`,
     `${DATE_PICKER_FORMAT + sep + TIME_PICKER_FORMAT}`,
      new Date()
    )
};

// input: dateStr following DATE_PICKER_FORMAT
// output: Date object with that date and time set to 12am (stand in for "default time")
export const generate12AMDateFromDateStr = (dateStr:string):Date => {
   return dateTimeInputsToDate(dateStr, DEFAULT_TIME);
}

// input: date ISO string 
// output: dateStr according to DATE_PICKER_FORMAT
export const dateISOToDateStr = (dateISO:string):string => {
    return format(new Date(dateISO), DATE_PICKER_FORMAT);
}

// input: dateISO string
// output: timeStr according to TIME_PICKER_FORMAT
export const dateISOToTimeStr = (dateISO:string):string => {
  return format(new Date(dateISO), TIME_PICKER_FORMAT);
}

// input: date ISO string
// output: date display string according to FORMAT_DATE
export const dateISOToDateDisplay = (dateISO: string):string => {
    return format(new Date(dateISO), FORMAT_DATE);
}


// input: date ISO string
// output: time display string according to FORMAT_TIME
export const dateISOToTimeDisplay = (dateISO: string):string => {
    return format(new Date(dateISO), FORMAT_TIME);
}

// convert datetime string from DB to formatted display string for use in TaskCard
// assumes dateStr is a date ISO string e.g '2022-01-04T15:11:34.056Z'
export const DueDateStr = ({ dateStr }: { dateStr: string }) => {
  return (
      <>
          due <b>{dateISOToDateDisplay(dateStr)}</b> at <b>{dateISOToTimeDisplay(dateStr)}</b>
      </>
  );
}