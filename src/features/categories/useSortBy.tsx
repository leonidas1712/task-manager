// Attempt to make sort by button re-usable
import React, { useState } from 'react';
import { OPTION_NAMES, DEFAULT_OPTION } from "../tasks/taskSorter";
import { DropdownButton, Dropdown } from 'react-bootstrap';

function useSortBy() {
    const [sortOption, setSortOption] = useState(DEFAULT_OPTION || "Error");

    const dropDownOptions = () => {
        return OPTION_NAMES.map((name) => {
            return <Dropdown.Item key={name} eventKey={name}>{name}</Dropdown.Item>
        });
    }

    const optionSelectFn = (val:string | null) => {
        if (!val) {
            setSortOption(DEFAULT_OPTION || "Error");
            return;
        }

        setSortOption(val);
    }

    // marginleft: auto pushes completely to right in flexbox 
    const SortByButton = () =>
        (<DropdownButton 
            style={{marginLeft: "auto"}} 
            variant="info" 
            title={`Sort by: ${sortOption}`} 
            onSelect={optionSelectFn}
        >                   
            { dropDownOptions() }
        </DropdownButton>);

    
    return {
        sortOption,
        SortByButton
    }
}

export default useSortBy;