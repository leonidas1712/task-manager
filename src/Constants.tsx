import { CreatedAt } from "./Types";
import { format } from 'date-fns';
import React from 'react';


export const sidebarWidth = "15rem";
export const BASE_URL = "categories"

export enum Loading {
    IDLE = "idle",
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

// earliest created comes first - default sort comparer for keeping in Redux store
// JS allows date subtraction but typescript needs numeric values
export const sortComparer = (fst:CreatedAt, snd:CreatedAt) => {
    return new Date(fst.created_at).getTime() - new Date(snd.created_at).getTime()
};

// convert datetime string from DB to formatted display string for use in TaskCard
// assumes dateStr is a date ISO string e.g '2022-01-04T15:11:34.056Z'
export const DueDateStr = (props: {dateStr: string}) => {
    const FORMAT_DATE = "d MMM R";
    const FORMAT_TIME = "h:mmaaa";
    const dateObj = new Date(props.dateStr);
    
    return (
        <>
            due <b>{format(dateObj, FORMAT_DATE)}</b> at <b>{format(dateObj, FORMAT_TIME)}</b>
        </>
    );
}

