import { TextField, Button, List, ListItem, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";

function FullTaskDisplay (props) {
    const [submittedTaskNewStep, setSubmittedTaskNewStep] = useState('');

    const handleTaskTitleEdit = (event) => {
        props.allTasks[props.index].taskTitle = event.target.value;
    }

    const handleCheck = (event) => {
        let stepIndex = event.target.parentNode.attributes.stepindex.value;
        props.allTasks[props.index].taskSteps[stepIndex].complete = !props.allTasks[props.index].taskSteps[stepIndex].complete;
    }

    const handleSubmittedStepDelete = (event) => {
        event.preventDefault();
        let stepIndex = event.target.attributes.stepindex.value;
        if (props.allTasks[props.index].taskSteps[stepIndex].removed === true) {
            props.allTasks[props.index].taskSteps[stepIndex].removed = false;
            event.target.parentNode.childNodes[0].disabled = false;
            event.target.parentNode.childNodes[1].disabled = false;
            console.log(event);
        } else {
            props.allTasks[props.index].taskSteps[stepIndex].removed = true;
            event.target.parentNode.childNodes[0].disabled = true;
            event.target.parentNode.childNodes[1].disabled = true;
            console.log(event);
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
            <TextField
                  label="Task Title"
                  defaultValue={props.allTasks[props.index].taskTitle}
                  onChange={handleTaskTitleEdit}
            />
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleListClose}
              sx={{ marginLeft: '5px' }}  
            >Close</Button>
            <List>
              {props.allTasks[props.index].taskSteps.map((step, stepIndex) => {
  
                const handleStepTitleEdit = (event) => {
                  step.stepTitle = event.target.value;
                  console.log(step);
                }
                
                return (
                    <ListItem key={step.stepTitle + stepIndex}>
                      <TextField 
                        disabled={step.removed} 
                        size="small" 
                        defaultValue={step.stepTitle} 
                        onChange={handleStepTitleEdit}
                      />
                      <FormControlLabel
                        control={<Checkbox 
                            disabled={step.removed}
                            stepindex={stepIndex} 
                            type="checkbox" 
                            onClick={handleCheck} 
                            defaultChecked={step.complete}
                            sx={{ padding: '0px' }}/>
                          }
                        label="Completed?"
                        sx={{ margin: '0px 15px 0px 0px' }}
                      />
                      <Button 
                        variant="outlined" 
                        size="small"
                        stepindex={stepIndex} 
                        listid={props.index} 
                        onClick={handleSubmittedStepDelete}
                      >{step.removed === true ? 'Re-add' : 'Remove'}</Button>
                    </ListItem>
                )})
              }
              <ListItem>
                <TextField 
                  type="text"
                  label="Add steps"
                  variant="standard"
                  size="small"
                  //placeholder="Add Step"
                  taskindex={props.index}
                  newstepindex={props.allTasks[props.index].taskSteps.length}
                  value={submittedTaskNewStep}
                  onChange={handleSubmittedTaskNewStepChange}
                />
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleSubmittedTaskNewStepAdd} 
                  listid={props.index}
                  sx={{ marginLeft: '5px' }} 
                >Add Step</Button>
              </ListItem>
            </List>
          </form>
        </div>
    )
}

export default FullTaskDisplay;