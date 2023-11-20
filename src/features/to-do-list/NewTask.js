import { TextField, Button, List, ListItem, styled, Container, Box } from "@mui/material";
import { PermDeleteButton } from "./TaskList";
import React, { useState } from "react";

const NewTaskButton = styled(Button)(({ theme }) => ({
    marginLeft: '5px',
 }));

function NewTask({ newTask, onFocus, onBlur, stepTitle, steps, setSteps, handleTaskTitleChange, handleStepTitleChange, handleStepAdd, handleStepRemove, handleTaskSubmit }) {

    //console.log(steps);
    //console.log(newTask);
   
    return (
        <form onSubmit={handleTaskSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <TextField
                    variant="outlined"
                    label="Enter new Task Title"
                    name="taskTitle"
                    value={newTask.taskTitle || ""}
                    onChange={handleTaskTitleChange} 
                />
                
                {newTask.taskTitle && (
                <>
                    <List 
                        sx={{ 
                            display: "flex", 
                            flexDirection: 'column', 
                            alignItems: 'flex-start', 
                            marginBottom: '1rem',
                        }}
                    >
                        {steps.map((step, index) => {

                            const handleStepChange = ({ target }) => {
                                const updateArr = [...steps];
                                updateArr[index].title = target.value;
                                setSteps(updateArr);
                            }

                            return (
                                <ListItem key={step + index} sx={{ width: 'fit-content' }}>
                                    <TextField 
                                        type="text"
                                        size="small"
                                        variant="outlined"
                                        value={steps[index].title}
                                        onChange={handleStepChange}
                                        //onFocus={onFocus}
                                        //onBlur={onBlur} 
                                    />
                                    <PermDeleteButton 
                                        variant="outlined" 
                                        size="small" 
                                        listid={index} 
                                        onClick={handleStepRemove}
                                        sx={{ marginLeft: '5px' }}    
                                    >X</PermDeleteButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Container sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField 
                            type="text"
                            size="small"
                            label="Enter new Task Step"
                            variant="standard"
                            value={stepTitle}
                            onChange={handleStepTitleChange}
                        />
                        <NewTaskButton 
                            variant="outlined" 
                            size="small" 
                            onClick={handleStepAdd}
                        >Add Step</NewTaskButton>
                        <NewTaskButton 
                            variant="outlined" 
                            size="small" 
                            type="submit"
                        >Save Task</NewTaskButton>
                    </Container>
                </>)}
            </Box>
        </form>
    )
}

export default NewTask;
