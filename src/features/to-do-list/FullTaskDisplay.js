import { TextField, Button, List, ListItem, Checkbox, FormControlLabel, Container } from "@mui/material";
import React from "react";
import { produce } from 'immer';

function FullTaskDisplay ({ index, submittedTaskStepFocus, setSubmittedTaskStepFocus, focused, onFocus, onBlur, allTasks, dispatch, updateTasks, handleTaskTitleEdit, handleCheck, handleSubmittedStepDeleteToggle, submittedTaskNewStep, handleSubmittedTaskNewStepChange, handleSubmittedTaskNewStepAdd, handleListClose }) {

  return (
    <form onSubmit={handleListClose}>
        <TextField
          label="Task Title"
          name="Task Title"
          defaultValue={allTasks[index].taskTitle}
          onChange={handleTaskTitleEdit}
        />
        <Button 
          variant="outlined" 
          size="small" 
          type="submit"
          sx={{ marginLeft: '5px' }}  
        >Save</Button>
        <List>
          {allTasks[index].taskSteps.map((step, stepIndex) => {

            const handleStepTitleEdit = (event) => {
              let updateAllTasks = produce(allTasks, draft => {
                draft[index].taskSteps[stepIndex].title = event.target.value;
              });
              dispatch(updateTasks(updateAllTasks));
              //console.log(allTasks);
              //console.log(step.title + stepIndex);
            }

            
            return (
                <ListItem key={step + stepIndex}>
                  <TextField 
                    type="text"
                    disabled={step.removed} 
                    size="small" 
                    defaultValue={allTasks[index].taskSteps[stepIndex].title} 
                    onChange={handleStepTitleEdit}
                    onFocus={onFocus}
                    onBlur={onBlur} 
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
              //placeholder="Add Step"
              taskindex={index}
              newstepindex={allTasks[index].taskSteps.length}
              value={submittedTaskNewStep}
              onChange={handleSubmittedTaskNewStepChange}
            />
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleSubmittedTaskNewStepAdd} 
              listid={index}
              sx={{ marginLeft: '5px' }} 
            >Add Step</Button>
        </Container>  
    </form>
  )
}

export default FullTaskDisplay;