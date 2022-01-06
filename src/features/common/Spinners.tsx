import React from 'react';
import { Spinner } from 'react-bootstrap';

export function StandardSpin() {
    return (
        <div>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

