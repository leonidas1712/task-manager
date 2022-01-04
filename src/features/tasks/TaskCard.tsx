//import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { Card, ToggleButton, FormCheck} from 'react-bootstrap';
import { Task } from '../../Types';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from '@mui/material';
import { deleteTask } from './tasksSlice';
import { useAppDispatch } from '../../app/hooks';



//import { errorTask, selectTaskById } from './tasksSlice';


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
                    <Card.Text>{task.description || "Some desc"} </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard;