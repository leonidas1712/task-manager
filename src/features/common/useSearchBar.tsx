import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

// value is the string text to display in the field
type props = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}
function SearchBar(props: { handleSearchValue: Function }) {
    return (
        <TextField 
                    variant="standard" 
                    onChange={(e) => props.handleSearchValue(e.target.value)}
                    placeholder="Search for a task"
                    // MUI search icon and text field look nicer
                    InputProps = {{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    sx = {{
                        marginLeft:"2rem"
                    }}
                />
    )
}

function useSearchBar() {
    const [value, setValue] = useState("");

    return {
        value,
        setValue,
        SearchBar
    };
}

export default useSearchBar;