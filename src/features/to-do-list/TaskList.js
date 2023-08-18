import { List, ListItem, Paper, Typography, Button, styled, Stack, Divider } from "@mui/material";
import React from "react";

const TaskListItem = styled(Paper)(({ theme }) => ({
   padding: "10px",
}));

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
            <Typography 
                variant="h6" 
                component="h4" 
                sx={{ marginTop: '20px', textDecoration: 'underline',}}
            >To-Do List</Typography>
            <List 
                sx= {{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                {props.allTasks.map((taskObj, index) => (
                    <ListItem key={taskObj.taskTitle + index} listid={index} sx={{ width: "fit-content" }}>
                        <Stack 
                            direction="row" 
                            spacing={2}
                            divider={<Divider orientation="vertical" flexItem />}
                            listid={index} 
                            sx={{ display: "flex", }} 
                        >
                            <TaskListItem elevation={2} listid={index} onClick={props.handleFullTaskDisplay}>
                                <Typography 
                                    variant="body1"
                                    listid={index} 
                                    onClick={props.handleFullTaskDisplay}
                                >{taskObj.taskTitle}</Typography>
                            </TaskListItem>
                            <TaskListItem elevation={2} listid={index} onClick={props.handleFullTaskDisplay}>
                                <Typography 
                                    variant="body1"
                                    listid={index} 
                                    onClick={props.handleFullTaskDisplay}
                                >{`Completed ${completedStepCounter(taskObj.taskSteps)} of ${taskObj.taskSteps.length} steps.`}</Typography>
                            </TaskListItem>
                            <Button 
                                    variant="outlined" 
                                    size="small"
                                    listid={index} 
                                    onClick={handleTaskDelete}
                                    sx={{ height: 'fit-content', alignSelf: 'center' }}
                            >Remove</Button>
                        </Stack> 
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default TaskList;