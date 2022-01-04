// File for functions used in receiving raw inputs from form and converting into data 
// ready for POST to server
// to use in Add Task and Edit Task
import { TaskValidationProps } from "./Validation" // input format from form
import { TIME_PICKER_FORMAT, 
    DATE_PICKER_FORMAT, 
    generate12AMDateFromDateStr,
dateTimeInputsToDate } from "./taskValidationCommon"
import { TaskPostObject } from "../../api/APIService"


// assumptions:
// title, desc, date, time. TRIM ALL FORM INPUTS BEFORE POSTING
    // title: non-empty
    // desc: may or may not be empty
    // date: empty | valid according to DATE_PICKER_FORMAT
    // time empty | valid according to TIME_PICKER_FORMAT


// for operations on all inputs e.g trim. return object with same structure
function convertAll(obj: TaskValidationProps):TaskValidationProps {
    let newObj:any = {};

    function convertOne(data:string) {
        return data.trim();
    }

    for (const [key,val] of Object.entries(obj)) {
        const newVal = convertOne(val);
        newObj[key] = newVal;
    }

    return newObj;
}

// Individual run AFTER TRIM
// for now return title as is
function convertTitle(title: string):string {
    return title;
}

// if description is empty return null so it is not set at all in backend
// change to empty if null POST doesn't work
function convertDescription(description:string):string | null {
    return description ? description : null;
}

// convert date and timeinto due_date ISO string OR null !important
// if date empty, time must be empty (according to Validation.ts) so use null
// if date not empty:
    // time empty: set time of date to 12am using parse 
    // time not empty: parse string as normal using date and time
function convertToDueDate(dateStr:string, timeStr:string):string | null {
    let dueDate = null;

    if (dateStr) {
        if (!timeStr) {
            dueDate = generate12AMDateFromDateStr(dateStr);
        } else {
            dueDate = dateTimeInputsToDate(dateStr, timeStr);
        }

        dueDate = dueDate.toISOString(); // !important
    }

    return dueDate;
}

// function that takes task form obj, converts to object ready for posting to server
export function convertTaskFormToPostObject(obj: TaskValidationProps):TaskPostObject {
    obj = convertAll(obj);

    return {
        name: convertTitle(obj.title),
        description: convertDescription(obj.description),
        due_date: convertToDueDate(obj.date, obj.time)
    };
}
