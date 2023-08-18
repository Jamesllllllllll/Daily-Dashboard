import React, { useState } from 'react';
//import './App.css';
import NewTask from './NewTask';
import TaskList from './TaskList';
import FullTaskDisplay from './FullTaskDisplay';
import StyledCard from '../../components/LayoutComponents/FeatureCard';
import Box from '@mui/material/Box';

function ToDoList() {
  const [newTask, setNewTask] = useState({});
  const [allTasks, setAllTasks] = useState([]);
  const [stepTitle, setStepTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState('');
  const [count, setCount] = useState(0);

  const handleTaskTitleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask(() => ({
      id: Date.now(),
      [name]: value,
      taskSteps: [],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.taskTitle) {
      return;
    }

    setAllTasks((prev) => [...prev, newTask]);
    setNewTask({});
    setSteps([]);
  };

  const handleFullTaskDisplay = (event) => {
    setIndex(event.target.attributes.listid.value);
  };

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
                    stepTitle={stepTitle}
                    setStepTitle={setStepTitle}
                    steps={steps}
                    setSteps={setSteps}
                    handleTaskTitleChange={handleTaskTitleChange}
                    handleSubmit={handleSubmit}
                    count={count}
                    setCount={setCount}
                  />  
                <TaskList
                  setIndex={setIndex}
                  allTasks={allTasks}
                  handleFullTaskDisplay={handleFullTaskDisplay}
                  count={count}
                  setCount={setCount}
                />
              </>
            )}
            {index ? (
              <FullTaskDisplay
                index={index}
                setIndex={setIndex}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                count={count}
                setCount={setCount}
              />
            ) : null}
          </>
        }
      />
    </Box>
  );
}

export default ToDoList;
