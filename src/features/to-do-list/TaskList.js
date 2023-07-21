import React from "react";

function TaskList(props) {
    const completedStepCounter = (stepsArr) => {
        let counter = 0;
        for (const step of stepsArr) {
            if (step.complete !== false) {
                counter++;
            }
        }
        return counter;
    }

    const handleTaskDelete = (event) => {
        event.preventDefault();
        let taskIndexToRemove = event.target.attributes.listid.value;
        props.allTasks.splice(taskIndexToRemove, 1);
        props.setCount(props.count + 1);
    }

    return (
        <>
            <h4>To-Do List</h4>
            <ul>
                {props.allTasks.map((taskObj, index) => (
                    <li key={taskObj.taskTitle + index} listid={index}>
                        <ul listid={index}>
                            <li listid={index} onClick={props.handleFullTaskDisplay}>
                                <p listid={index} onClick={props.handleFullTaskDisplay}>{taskObj.taskTitle}</p>
                            </li>
                            <li listid={index} onClick={props.handleFullTaskDisplay}>
                                {`Completed ${completedStepCounter(taskObj.taskSteps)} of ${taskObj.taskSteps.length} steps.`}
                            </li>
                            <li>
                                <button listid={index} onClick={handleTaskDelete}>Remove</button>
                            </li>
                        </ul> 
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TaskList;