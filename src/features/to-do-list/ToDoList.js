import React, { useState, useEffect } from 'react';
//import './App.css';
import NewTask from './NewTask';
import TaskList from './TaskList';
import FullTaskDisplay from './FullTaskDisplay';
import StyledCard from '../../components/LayoutComponents/FeatureCard';
import Box from '@mui/material/Box';

function ToDoList() {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const [newTask, setNewTask] = useState({});

  const handleTaskTitleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask(() => ({
      id: Date.now(),
      [name]: value,
      taskSteps: [{
        id: 1,
        title: value,
        complete: false
      }],
    }));
  };

  const [stepTitle, setStepTitle] = useState('');
  const [steps, setSteps] = useState([]);

  const handleStepTitleChange = ({ target }) => {
    setStepTitle(target.value);
    console.log(stepTitle);
  }

  const handleStepAdd = (event) => {
    event.preventDefault();
    
    if (steps.length < 1 && stepTitle && newTask.taskSteps[0].title === newTask.taskTitle) {
        setSteps([{
            id: 1,
            title: stepTitle,
            complete: false
        }]);
    } else if (steps.length >= 1 && stepTitle) {
        setSteps((prev) => ([...prev, {
            id: steps.length + 1,
            title: stepTitle,
            complete: false
        }]));
    }
    setNewTask((prev) => ({
        id: prev.id,
        taskTitle: prev.taskTitle,
        taskSteps: steps,
      })
    );
    setStepTitle("");
  }

  const handleStepRemove = (event) => {
    event.preventDefault();
    let stepIndex = event.target.attributes.listid.value;
    setSteps((prev) => {
        prev.splice(stepIndex, 1);
        return [...prev];
    });
    console.log(event.target.attributes.listid.value);
    console.log(steps);
  }

  useEffect(() => {
    setNewTask((prev) => ({
        id: prev.id,
        taskTitle: prev.taskTitle,
        taskSteps: steps,
      })
    );
  },[steps]);

  const [allTasks, setAllTasks] = useState([]);
  
  const handleTaskSubmit = (event) => {
    event.preventDefault();
    if (!newTask.taskTitle) {
      return;
    }

    setAllTasks((prev) => [...prev, newTask]);
    setNewTask({});
    setSteps([]);
    setStepTitle('');
  };

  const handleTaskDelete = (event) => {
    event.preventDefault();
    let taskIndexToRemove = event.target.attributes.listid.value;
    let updateAllTasks = [...allTasks];
    updateAllTasks.splice(taskIndexToRemove, 1);
    setAllTasks(updateAllTasks);
  }

  const completedStepCounter = (stepsArr) => {
    let counter = 0;
    for (const step of stepsArr) {
        if (step.complete !== false) {
            counter++;
        }
    }
    return counter;
  }

  const [index, setIndex] = useState('');

  const handleFullTaskDisplay = ({ target }) => {
    setIndex(target.attributes.listid.value);
  };

  const handleTaskTitleEdit = ({ target }) => {
    let updateAllTasks = [...allTasks];
    updateAllTasks[index].taskTitle = target.value;
    setAllTasks(updateAllTasks);
  }

  const handleCheck = ({ target }) => {
    let stepIndex = target.parentNode.attributes.stepindex.value;
    let updateAllTasks = [...allTasks];
    updateAllTasks[index].taskSteps[stepIndex].complete = !updateAllTasks[index].taskSteps[stepIndex].complete;  
    setAllTasks(updateAllTasks);
  }

  const handleSubmittedStepDelete = (event) => {
    event.preventDefault();
    let stepIndex = event.target.attributes.stepindex.value;
    let updateAllTasks = [...allTasks];
    if (updateAllTasks[index].taskSteps[stepIndex].removed === true) {
      updateAllTasks[index].taskSteps[stepIndex].removed = false;
      event.target.parentNode.childNodes[0].disabled = false;
      event.target.parentNode.childNodes[1].disabled = false;
      //console.log(event);
    } else {
      updateAllTasks[index].taskSteps[stepIndex].removed = true;
      event.target.parentNode.childNodes[0].disabled = true;
      event.target.parentNode.childNodes[1].disabled = true;
      //console.log(event);
    }
    console.log(event.target.parentNode.childNodes);
    setAllTasks(updateAllTasks);
  }

  const [submittedTaskNewStep, setSubmittedTaskNewStep] = useState('');
  const [submittedTaskStepFocus, setSubmittedTaskStepFocus] = useState(false);

  const handleSubmittedTaskNewStepChange = ({ target }) => {
    setSubmittedTaskNewStep(target.value);
  }

  const handleSubmittedTaskNewStepAdd = (event) => {
    event.preventDefault();
    let updateAllTasks = [...allTasks];
    if (submittedTaskNewStep) {
      updateAllTasks[index].taskSteps.push({
        id: updateAllTasks[index].taskSteps.length + 1,
        title: submittedTaskNewStep,
        complete: false});
    }
      setAllTasks(updateAllTasks);
      setSubmittedTaskNewStep('');
      //console.log(allTasks.taskSteps);
  }

  const handleListClose = (event) => {
    event.preventDefault();
    let updateAllTasks = [...allTasks];
    let updateTaskSteps = updateAllTasks[index].taskSteps.filter(obj => !obj.removed);
    updateAllTasks[index].taskSteps = updateTaskSteps;
    setAllTasks(updateAllTasks);
    setIndex('');  
    setSubmittedTaskStepFocus(false);
  }

  return (
    <Box className="cardContainer">
      <h2 className="cardTitle">To-Dos</h2>
      <StyledCard
        content={
          <>
            {index ? null : (
              <>
                <NewTask
                    newTask={newTask}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    stepTitle={stepTitle}
                    steps={steps}
                    setSteps={setSteps}
                    handleTaskTitleChange={handleTaskTitleChange}
                    handleStepTitleChange={handleStepTitleChange}
                    handleStepAdd={handleStepAdd}
                    handleStepRemove={handleStepRemove}
                    handleTaskSubmit={handleTaskSubmit}
                />  
                <TaskList
                  allTasks={allTasks}
                  handleTaskDelete={handleTaskDelete}
                  handleFullTaskDisplay={handleFullTaskDisplay}
                  completedStepCounter={completedStepCounter}
                />
              </>
            )}
            {index ? (
              <FullTaskDisplay
                index={index}
                submittedTaskStepFocus={submittedTaskStepFocus}
                setSubmittedTaskStepFocus={setSubmittedTaskStepFocus}
                focused={focused}
                onFocus={onFocus}
                onBlur={onBlur}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                handleTaskTitleEdit={handleTaskTitleEdit}
                handleCheck={handleCheck}
                handleSubmittedStepDelete={handleSubmittedStepDelete}
                submittedTaskNewStep={submittedTaskNewStep}
                handleSubmittedTaskNewStepChange={handleSubmittedTaskNewStepChange}
                handleSubmittedTaskNewStepAdd={handleSubmittedTaskNewStepAdd}
                handleListClose={handleListClose}
              />
            ) : null}
          </>
        }
      />
    </Box>
  );
}

export default ToDoList;
