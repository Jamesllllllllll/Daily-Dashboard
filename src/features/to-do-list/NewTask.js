import React, { useState } from "react";

function NewTask(props) {
    const stepsObjArr = [];
    const [focused, setFocused] = useState(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const handleStepTitle = (event) => {
        props.setStepTitle(event.target.value);
    }

    const handleAdd = (event) => {
        event.preventDefault();
        if (props.steps.length === 0 && props.stepTitle) {
            props.setSteps([props.stepTitle]);
        } else if (props.stepTitle) {
            props.setSteps(prev => [...prev, props.stepTitle]);
        } 
        props.setStepTitle("");
    }

    if (props.steps.length !== 0) {
        props.steps.forEach((step, index) => {
            stepsObjArr.push({
                id: index + 1,
                stepTitle: step,
                complete: false
            })});
    } else {
        stepsObjArr.push({
            id: 1,
            stepTitle: props.newTask.taskTitle,
            complete: false
        })
    }

    props.newTask.taskSteps = stepsObjArr;

    //const handleSubmittedStepsChange = (event) => {}
    const handleStepAddorRemove = (event) => {
        event.preventDefault();
        let stepIndex = event.target.attributes.listid.value;
        props.steps.splice(stepIndex, 1);
        props.setCount(props.count + 1);
        //props.setSteps(newSteps);
    }
    
    return (
        <form onSubmit={props.handleSubmit}>
            <input
                name="taskTitle"
                placeholder="New Task"
                value={props.newTask.taskTitle || ""}
                onChange={props.handleTaskTitleChange}
            />
            {!props.newTask.taskTitle ? null: (
            <>
                <ul>
                    {props.steps.map((step, index) => {

                        const handleStepChange = (event) => {
                            props.steps[index] = event.target.value;
                            //props.setCount(props.count + 1);
                        }
                        
                        return (
                            <li key={step + index}>
                                <input 
                                    type="text"
                                    defaultValue={props.steps[index]}
                                    onChange={handleStepChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                />
                                <button listid={index} onClick={handleStepAddorRemove}>Remove</button>
                            </li>
                    )})}
                </ul>
                <input 
                    type="text"
                    placeholder="Add Step"
                    value={props.stepTitle}
                    onChange={handleStepTitle}
                />
                <button onClick={handleAdd}>Add Step</button>
                <input type="submit" value="Save Task"/>
            </>)}
        </form>
    )
}

export default NewTask;
