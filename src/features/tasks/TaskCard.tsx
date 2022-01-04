//import { useAppSelector } from '../../app/hooks';
import { Card } from 'react-bootstrap';
import { Task } from '../../Types';
//import { errorTask, selectTaskById } from './tasksSlice';


type TaskCardProps = { task:Task }
function TaskCard({ task }:TaskCardProps) {
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title> {task.name} </Card.Title>
                    <Card.Text>{task.description || "Some desc"} </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard;