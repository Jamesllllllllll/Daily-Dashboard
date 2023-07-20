import React, { useState } from "react";

function FullTaskDisplay (props) {
    const [submittedTaskNewStep, setSubmittedTaskNewStep] = useState('');

    const handleTaskTitleEdit = (event) => {
        props.allTasks[props.index].taskTitle = event.target.value;
    }

    const handleCheck = (event) => {
        let stepIndex = event.target.attributes.stepindex.value;
        props.allTasks[props.index].taskSteps[stepIndex].complete = !props.allTasks[props.index].taskSteps[stepIndex].complete;
    }

    const handleSubmittedStepDelete = (event) => {
        event.preventDefault();
        let stepIndex = event.target.attributes.stepindex.value;
        if (props.allTasks[props.index].taskSteps[stepIndex].removed === true) {
            props.allTasks[props.index].taskSteps[stepIndex].removed = false;
            event.target.parentNode.childNodes[0].disabled = false;
            event.target.parentNode.childNodes[1].disabled = false;
        } else {
            props.allTasks[props.index].taskSteps[stepIndex].removed = true;
            event.target.parentNode.childNodes[0].disabled = true;
            event.target.parentNode.childNodes[1].disabled = true;
        }
        props.setCount(props.count + 1);
    }

    const handleSubmittedTaskNewStepChange = (event) => {
        setSubmittedTaskNewStep(event.target.value);
    }

    const handleSubmittedTaskNewStepAdd = (event) => {
        event.preventDefault();

        if (submittedTaskNewStep) {
          props.allTasks[props.index].taskSteps.push({
            id: props.allTasks[props.index].taskSteps.length + 1,
            stepTitle: submittedTaskNewStep,
            complete: false});
        }

        setSubmittedTaskNewStep('');
        console.log(props.allTasks.taskSteps);
    }

    const handleListClose = (event) => {
        event.preventDefault();
        let newTaskSteps = props.allTasks[props.index].taskSteps.filter(obj => !obj.removed);
        props.allTasks[props.index].taskSteps = newTaskSteps;
        props.setIndex('');
    }
    
    return (
        <div>
          <form>
            <input
                  defaultValue={props.allTasks[props.index].taskTitle}
                  onChange={handleTaskTitleEdit}
            />
            <button onClick={handleListClose}>Close</button>
            <ul>
              {props.allTasks[props.index].taskSteps.map((step, stepIndex) => {
  
                const handleStepTitleEdit = (event) => {
                  step.stepTitle = event.target.value;
                  console.log(step);
                }
                
                return (
                    <li key={step.stepTitle + stepIndex}>
                      <input defaultValue={step.stepTitle} onChange={handleStepTitleEdit}/>
                      <input stepindex={stepIndex} type="checkbox" onClick={handleCheck} defaultChecked={step.complete}/>
                      <button stepindex={stepIndex} listid={props.index} onClick={handleSubmittedStepDelete}>{step.removed === true ? 'Re-add' : 'Remove'}</button>
                    </li>
                )})
              }
              <li>
                <input 
                        type="text"
                        placeholder="Add Step"
                        taskindex={props.index}
                        newstepindex={props.allTasks[props.index].taskSteps.length}
                        value={submittedTaskNewStep}
                        onChange={handleSubmittedTaskNewStepChange}
                    />
                <button onClick={handleSubmittedTaskNewStepAdd} listid={props.index}>Add Step</button>
              </li>
            </ul>
          </form>
        </div>
    )
}

export default FullTaskDisplay;