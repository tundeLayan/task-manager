import React, { useState } from 'react';
import { showToast } from '../utils/Toast';
import { generateDate } from '../utils';

type OmitId = Omit<Task, 'id'>;
function AddTask({ addNewTask }: { addNewTask: (task: OmitId) => void }) {
  //state for adding new task
  const taskObj = {
    title: '',
    description: '',
    dueDate: '',
    isComplete: false,
    hasReminder: false,
    editMode: false,
  };
  const [task, setTask] = useState<OmitId>(taskObj);

  const { title } = task;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetInputs = () => {
    setTask(taskObj);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //todo: validate that task with same name does not exist

    //TODO: Logic to show error toast
    if (!task.title) {
      showToast('Field cannot be empty', 'info');
      return;
    }
    task.dueDate = generateDate();
    addNewTask(task);
    resetInputs();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-[2px]">
      <label htmlFor="title" className="text-2xl flex-[6]">
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          autoComplete="off"
          onChange={handleInputChange}
          className="w-full"
          placeholder="Add Task"
        />
      </label>
      <button
        className="flex-[1] border border-solid border-[#424242] w-fit rounded-lg p-2 text-[#fff] hover:bg-tertiary2"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
