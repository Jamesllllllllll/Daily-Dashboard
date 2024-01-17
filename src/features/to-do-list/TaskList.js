import { List, ListItem, Paper, Typography, Button, styled, Stack, Divider } from "@mui/material";
import React from "react";

const TaskListItem = styled(Paper)(({ theme }) => ({
   padding: "10px",
   maxWidth: '335px',
   overflow: 'auto',
   height: 'fit-content',
   alignSelf: 'center',
   '&:hover': {
       cursor: 'pointer'  
   }
}));

export const PermDeleteButton = styled(Button)(({ theme }) => ({
    height: 'fit-content', 
    alignSelf: 'center',  
    minWidth: '0px', 
    color: 'red',
    border: 'none',
    marginRight: '2px',
    paddingLeft: '10px',
    opacity: '.7',
    '&:hover': {
        marginRight: '1px',
        borderColor: 'red',
        paddingLeft: '9px',
        opacity: '1'
    }
}));

function TaskList({ allTasks, handleTaskDelete, handleFullTaskDisplay, completedStepCounter }) {

    return (
        <>
            {allTasks.length < 1 ? null : 
                <Typography 
                    variant="h6" 
                    component="h4" 
                    sx={{ marginTop: '20px', textDecoration: 'underline', textAlign: 'center' }}
                >To-Do List</Typography>
            }
            <List 
                sx= {{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                {allTasks.map((taskObj, index) => (
                    <ListItem key={taskObj.taskTitle + index} listid={index} sx={{ }}>
                        <Stack 
                            direction="row" 
                            spacing={2}
                            divider={<Divider orientation="vertical" flexItem />}
                            listid={index} 
                            sx={{ display: "flex", }} 
                        >
                            <PermDeleteButton 
                                    variant="outlined" 
                                    size="small"
                                    listid={index} 
                                    onClick={handleTaskDelete}
                                    sx={{ 
                                        height: 'fit-content', 
                                        alignSelf: 'center',  
                                        minWidth: '0px' }}
                            >X</PermDeleteButton>
                            <TaskListItem 
                                elevation={2} 
                                listid={index} 
                                onClick={handleFullTaskDisplay}
                                sx={{ backgroundColor: completedStepCounter(taskObj.taskSteps) === taskObj.taskSteps.length ? 'rgba(0, 255, 0, .25)' : '#fff' }}
                            >
                                <Typography 
                                    variant="body1"
                                    listid={index} 
                                    onClick={handleFullTaskDisplay}
                                >{taskObj.taskTitle}</Typography>
                            </TaskListItem>
                            <TaskListItem 
                                elevation={2} 
                                listid={index} 
                                onClick={handleFullTaskDisplay} 
                                sx={{ backgroundColor: completedStepCounter(taskObj.taskSteps) === taskObj.taskSteps.length ? 'rgba(0, 255, 0, .25)' : '#fff' }}
                            >
                                <Typography 
                                    variant="body1"
                                    listid={index} 
                                    onClick={handleFullTaskDisplay}
                                >{`Completed ${completedStepCounter(taskObj.taskSteps)} of ${taskObj.taskSteps.length} steps.`}</Typography>
                            </TaskListItem>
                            
                        </Stack> 
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default TaskList;
