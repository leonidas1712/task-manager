//import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { Card, ToggleButton, FormCheck} from 'react-bootstrap';
import { Task } from '../../Types';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from '@mui/material';
import { deleteTask } from './tasksSlice';
import { useAppDispatch } from '../../app/hooks';

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
            { dueDate }
        </Card.Text>
    );
}

// TODO: add MUI spinner in place of or next to checkbox when await dispatch
type TaskCardProps = { task:Task }
function TaskCard({ task }:TaskCardProps) {
    const [checkboxDisabled, setCheckboxDisabled] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const checkboxDelete = async () => {
        setCheckboxDisabled(true);
        await dispatch(deleteTask(task.id));
        console.log("Task deleted")
    }

    return (
        <div>
            <Card className= "mb-3 border border-secondary shadow-sm">
                <Card.Body>
                    <Card.Title className="d-flex align-items-center"> 
                        <span> {task.name} </span>
                        <Tooltip title="Complete task" placement="right-start">
                            <Checkbox onClick={checkboxDelete} disabled={checkboxDisabled}/>
                        </Tooltip>
                    </Card.Title>
                    <DisplayDescription desc={task.description}/>
                    {!task.due_date || <DueDate dueDate={task.due_date} /> }
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard;