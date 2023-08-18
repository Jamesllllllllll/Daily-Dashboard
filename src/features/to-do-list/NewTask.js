import { TextField, Button, List, ListItem, styled, Container, Box } from "@mui/material";
import { PermDeleteButton } from "./TaskList";
import React, { useState } from "react";

const NewTaskButton = styled(Button)(({ theme }) => ({
    marginLeft: '5px',
 }));

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

    const handleStepAddorRemove = (event) => {
        event.preventDefault();
        let stepIndex = event.target.attributes.listid.value;
        props.steps.splice(stepIndex, 1);
        props.setCount(props.count + 1); 
    }
   
    return (
        <form onSubmit={props.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <TextField
                    variant="outlined"
                    label="Enter new Task Title"
                    name="taskTitle"
                    value={props.newTask.taskTitle || ""}
                    onChange={props.handleTaskTitleChange} 
                />
                
                {!props.newTask.taskTitle ? null: (
                <>
                    <List 
                        sx={{ 
                            display: "flex", 
                            flexDirection: 'column', 
                            alignItems: 'flex-start', 
                            marginBottom: '1rem',
                        }}
                    >
                        {props.steps.map((step, index) => {

                            const handleStepChange = (event) => {
                            props.steps[index] = event.target.value;
                            }

                            return (
                                <ListItem key={step + index} sx={{ width: 'fit-content' }}>
                                    <TextField 
                                        type="text"
                                        size="small"
                                        variant="outlined"
                                        defaultValue={props.steps[index]}
                                        onChange={handleStepChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur} 
                                    />
                                    <PermDeleteButton 
                                        variant="outlined" 
                                        size="small" 
                                        listid={index} 
                                        onClick={handleStepAddorRemove}
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
                            value={props.stepTitle}
                            onChange={handleStepTitle}
                        />
                        <NewTaskButton 
                            variant="outlined" 
                            size="small" 
                            onClick={handleAdd}
                        >Add Step</NewTaskButton>
                        <NewTaskButton variant="outlined" size="small" type="submit">Save Task</NewTaskButton>
                    </Container>
                </>)}
            </Box>
        </form>
    )
}

export default NewTask;
