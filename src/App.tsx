import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence } from 'framer-motion';

import './App.css';
import { EditTask, AddTask, TaskItem, EmptyTask } from './components';
import { showToast } from './utils/Toast';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: 'test data 1',
      description: 'default Description',
      dueDate: '2023-09-01T18:08',
      isComplete: true,
      hasReminder: false,
      id: uuidv4(),
      editMode: false,
    },
    {
      title: 'test data 2',
      description: 'default Description 2',
      dueDate: '2023-09-01T18:08',
      isComplete: true,
      hasReminder: false,
      id: uuidv4(),
      editMode: false,
    },
    {
      title: 'test data 3',
      description: 'default Description 3',
      dueDate: '2023-09-01T18:08',
      isComplete: false,
      hasReminder: false,
      id: uuidv4(),
      editMode: false,
    },
    {
      title: 'test data 4',
      description: 'default Description 4',
      dueDate: '2023-09-01T18:08',
      isComplete: false,
      hasReminder: false,
      id: uuidv4(),
      editMode: false,
    },
    {
      title: 'test data 5',
      description: 'default Description 5',
      dueDate: '2023-09-01T18:08',
      isComplete: false,
      hasReminder: false,
      id: uuidv4(),
      editMode: false,
    },
    {
      title: 'test data 7',
      description: 'default Description 6 ',
      dueDate: '2023-09-01T18:08',
      isComplete: false,
      hasReminder: false,
      id: uuidv4(),
      editMode: false,
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const selectTask = (id: string) => {
    const task = tasks.find(obj => obj.id === id);
    if (task) setSelectedTask(task);
  };

  //
  const addNewTask = (newTask: Omit<Task, 'id'>) => {
    const { title, description, dueDate, isComplete, hasReminder, editMode } =
      newTask;
    const task: Task = {
      title,
      description,
      dueDate,
      id: uuidv4(),
      isComplete,
      hasReminder,
      editMode,
    };
    setTasks(prev => [task, ...prev]);
    showToast('New Task Added', 'success');
  };

  const updateTaskDetails = (newTask: Task) => {
    setTasks(prev =>
      prev.map(item =>
        item.id === newTask.id
          ? { ...newTask, editMode: !item.editMode }
          : item,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    showToast('Task deleted', 'error');
    setSelectedTask(null);
  };

  /**
   * @description - toggles task's status between complete and incomplete or "has Reminder" and "has no reminder"
   */
  const toggle = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const dataId = e.currentTarget.dataset.testId;

    if (!dataId) return;

    if (dataId === 'isComplete') {
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, isComplete: !task.isComplete } : task,
        ),
      );
    } else if (dataId === 'hasReminder') {
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, hasReminder: !task.hasReminder } : task,
        ),
      );
    } else if (dataId === 'edit') {
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, editMode: !task.editMode } : task,
        ),
      );
    }
  };

  return (
    <div className=" min-h-screen flex flex-col text-center bg-accent mx-auto justify-center">
      <div className=" max-w-screen-2xl overflow-auto w-4/5 mx-auto flex gap-6 h-[100%]">
        <div className="w-1/2">
          {/* left section */}
          <section className="p-4 border border-solid border-[#424242] rounded-lg h-full min-h-[700px] flex flex-col">
            <h4 className="text-left ml-3 text-xl text-title">Not Completed</h4>
            <div className="flex-[8] max-h-[80%]">
              {tasks
                .filter(task => !task.isComplete)
                .map(task => {
                  const {
                    id,
                    title,
                    description,
                    dueDate,
                    isComplete,
                    hasReminder,
                  } = task;
                  return (
                    <TaskItem
                      key={id}
                      {...{
                        toggle,
                        deleteTask,
                        title,
                        description,
                        dueDate,
                        isComplete,
                        hasReminder,
                        id,
                        selectTask,
                      }}
                    />
                  );
                })}
            </div>
            <h4 className="text-left ml-3 text-xl text-title">Completed</h4>
            <div className="flex-[8] max-h-[80%]">
              <AnimatePresence>
                {tasks
                  .filter(task => task.isComplete)
                  .map(task => {
                    const {
                      id,
                      title,
                      description,
                      dueDate,
                      isComplete,
                      hasReminder,
                    } = task;
                    return (
                      <TaskItem
                        key={id}
                        {...{
                          toggle,
                          deleteTask,
                          title,
                          description,
                          dueDate,
                          isComplete,
                          hasReminder,
                          id,
                          selectTask,
                        }}
                      />
                    );
                  })}
              </AnimatePresence>
            </div>
            <div className="flex-[1] bg-tertiary p-2">
              <AddTask {...{ addNewTask }} />
            </div>
          </section>
        </div>
        <div className="w-1/2 ">
          {/* right section */}
          <section className=" text-left p-4 rounded-lg border border-solid h-full bg-accent border-[#424242]">
            {selectedTask ? (
              <>
                <EditTask
                  key={selectedTask.id}
                  title={selectedTask.title}
                  description={selectedTask.description}
                  dueDate={selectedTask.dueDate}
                  id={selectedTask.id}
                  isComplete={selectedTask.isComplete}
                  hasReminder={selectedTask.hasReminder}
                  editMode={selectedTask.editMode}
                  {...{ updateTaskDetails, toggle, deleteTask }}
                />
              </>
            ) : (
              <EmptyTask />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
