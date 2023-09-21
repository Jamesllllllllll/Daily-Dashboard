import { TextField, Button, List, ListItem, Checkbox, FormControlLabel, Container } from "@mui/material";
import React from "react";

function FullTaskDisplay ({ index, submittedTaskStepFocus, setSubmittedTaskStepFocus, focused, onFocus, onBlur, allTasks, setAllTasks, handleTaskTitleEdit, handleCheck, handleSubmittedStepDelete, submittedTaskNewStep, handleSubmittedTaskNewStepChange, handleSubmittedTaskNewStepAdd, handleListClose }) {

  return (
    <div>
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
              let updateAllTasks = [...allTasks];
              updateAllTasks[index].taskSteps[stepIndex].title = event.target.value;
              setAllTasks(updateAllTasks);
              console.log(event);
              console.log(step.title + stepIndex);
            }

            
            return (
                <ListItem key={step.title + stepIndex}>
                  <TextField 
                    type="text"
                    disabled={step.removed} 
                    size="small" 
                    value={allTasks[index].taskSteps[stepIndex].title} 
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
                        defaultChecked={step.complete}
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
                    onClick={handleSubmittedStepDelete}
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
    </div>
  )
}

export default FullTaskDisplay;