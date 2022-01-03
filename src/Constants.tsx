import { CreatedAt } from "./Types";

export const sidebarWidth = "15rem";

// earliest created comes first - default sort comparer for keeping in Redux store
// JS allows date subtraction but typescript needs numeric values
export const sortComparer = (fst:CreatedAt, snd:CreatedAt) => {
    return new Date(fst.created_at).getTime() - new Date(snd.created_at).getTime()
};

