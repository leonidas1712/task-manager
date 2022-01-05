//import { useAppSelector } from '../../app/hooks';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Task } from '../../Types';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from '@mui/material';
import { deleteTask } from './tasksSlice';
import { useAppDispatch } from '../../app/hooks';
import { format } from 'date-fns';
import { DueDateStr } from '../../Constants';
import EditTaskButton from './EditTaskButton';
import './TaskCard.css'
import styled from '@emotion/styled';

const WithHover = styled.div`
    & {
        transition: all 2s;
    }

    &:hover {
        background-color:red !important;
    }
`;



type DescProps = {
    desc: string
}

type DueDateProps = {
    dueDate: string
}

function Description({ desc }: DescProps) {
    return ( 
        <Card.Text>
            { desc }
        </Card.Text>
    );
};

function EmptyDescription() {
    return <Card.Text className="text-muted m-0">No description</Card.Text>
};

function DisplayDescription({ desc }:DescProps) {
    return desc ? < Description desc={desc}/> : <EmptyDescription/>
}

function DueDate(props: DueDateProps) {
    const { dueDate } = props;
    return (
        <Card.Text>
            <DueDateStr dateStr={dueDate}/>
        </Card.Text>
    );
}

function DisplayDueDate({ dueDate }: DueDateProps) {
    return dueDate ? <DueDate dueDate={dueDate} /> : <p className="text-muted">No due date</p>;
}

// TODO: add MUI spinner in place of or next to checkbox when await dispatch
type TaskCardProps = { task:Task }
function TaskCard({ task }:TaskCardProps) {
    const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const checkboxDelete = async () => {
        setButtonsDisabled(true);
        await dispatch(deleteTask(task.id));
    }

    return (
        <div>
            <Card className= "mb-3 p-1 border border-dark hover-effect">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Card.Title className="d-flex align-items-center"> 
                                
                                <Tooltip title="Complete task" placement="top-start">
                                    {/* Checkbox default creates extra unecc. space, set w,h to 0 to take it out */}
                                    <Checkbox onClick={checkboxDelete} disabled={buttonsDisabled}
                                    sx={{width:0, height:0, marginRight: "0.7rem"}}
                                    />
                                </Tooltip>
                                <span> {task.name} </span>
                            </Card.Title>

                            <DisplayDescription desc={task.description}/>
                        </Col>

                        <Col md={6} className="d-flex align-items-start flex-column justify-content-center">
                            <DisplayDueDate dueDate={task.due_date}/>
                            <EditTaskButton disabled={buttonsDisabled} task={task}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard;