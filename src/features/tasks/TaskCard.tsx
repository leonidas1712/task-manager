//import { useAppSelector } from '../../app/hooks';
import { Card, ToggleButton, FormCheck} from 'react-bootstrap';
import { Task } from '../../Types';
//import { errorTask, selectTaskById } from './tasksSlice';


type TaskCardProps = { task:Task }
function TaskCard({ task }:TaskCardProps) {
    return (
        <div>
            <Card className= "mb-3 border border-secondary shadow-sm">
                <Card.Body>
                    <Card.Title className="d-flex align-items-center"> 
                        <FormCheck></FormCheck>
                        <span> {task.name} </span>
                    </Card.Title>
                    <Card.Text>{task.description || "Some desc"} </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard;