//import { useAppSelector } from '../../app/hooks';
import { Task } from '../../Types';
//import { errorTask, selectTaskById } from './tasksSlice';



type TaskCardProps = { task:Task }
function TaskCard({ task }:TaskCardProps) {
    return (
        <div>
            {task.name}
        </div>
    )
}

export default TaskCard;