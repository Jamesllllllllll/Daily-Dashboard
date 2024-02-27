import { TextField, Button, List, ListItem, Checkbox, FormControlLabel, Container } from "@mui/material";
import React from "react";
import { produce } from 'immer';

function FullTaskDisplay ({ index, allTasks, dispatch, updateTasks, handleTaskTitleEdit, handleCheck, handleSubmittedStepDeleteToggle, submittedTaskNewStep, handleSubmittedTaskNewStepChange, handleSubmittedTaskNewStepAdd, handleListClose }) {

  return (
    <form onSubmit={handleListClose} data-test="todo-submitted-task-full-display">
        <TextField
          label="Task Title"
          name="Task Title"
          defaultValue={allTasks[index].taskTitle}
          onChange={handleTaskTitleEdit}
          data-test="todo-submitted-task-title"
        />
        <Button 
          variant="outlined" 
          size="small" 
          type="submit"
          sx={{ marginLeft: '5px' }}
          data-test="todo-submitted-task-save-btn"  
        >Save</Button>
        <List data-test="todo-submitted-task-step-list">
          {allTasks[index].taskSteps.map((step, stepIndex) => {

            const handleStepTitleEdit = (event) => {
              let updateAllTasks = produce(allTasks, draft => {
                draft[index].taskSteps[stepIndex].title = event.target.value;
              });
              dispatch(updateTasks(updateAllTasks));
            }

            
            return (
                <ListItem key={step + stepIndex}>
                  <TextField 
                    type="text"
                    disabled={step.removed} 
                    size="small" 
                    defaultValue={allTasks[index].taskSteps[stepIndex].title} 
                    onChange={handleStepTitleEdit}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        disabled={step.removed}
                        stepindex={stepIndex} 
                        type="checkbox" 
                        onClick={handleCheck} 
                        checked={step.complete}
                        sx={{ padding: '0px' }}
                      />
                    }
                    label="Completed?"
                    sx={{ margin: '0px 15px 0px 0px' }}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    stepindex={stepIndex} 
                    listid={index} 
                    onClick={handleSubmittedStepDeleteToggle}
                  >{step.removed === true ? 'Re-add' : 'Remove'}</Button>
                </ListItem>
            )})
          }
        </List>
        <Container>
            <TextField 
              type="text"
              label="Add steps"
              variant="standard"
              size="small"
              taskindex={index}
              newstepindex={allTasks[index].taskSteps.length}
              value={submittedTaskNewStep}
              onChange={handleSubmittedTaskNewStepChange}
              data-test="todo-submitted-task-new-step-input"
            />
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleSubmittedTaskNewStepAdd} 
              listid={index}
              sx={{ marginLeft: '5px' }}
              data-test="todo-submitted-task-new-step-submit-btn" 
            >Add Step</Button>
        </Container>  
    </form>
  )
}

export default FullTaskDisplay;