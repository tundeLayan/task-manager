import React, { memo, useState } from 'react';

import {
  AiFillBell,
  AiOutlineCheckCircle,
  AiTwotoneDelete,
} from 'react-icons/ai';

interface IProps {
  updateTaskDetails: (newTask: Task) => void;
  toggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
  deleteTask: (id: string) => void;
}

const EditTask = (props: Task & IProps) => {
  const {
    title,
    description,
    dueDate,
    updateTaskDetails,
    isComplete,
    hasReminder,
    id,
    editMode,
    toggle,
    deleteTask,
  } = props;
  const [task, setTask] = useState({
    title,
    description,
    dueDate,
    isComplete,
    hasReminder,
    editMode,
    id,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTaskDetails(task);
  };

  return (
    <>
      <div className="text-left flex gap-2 mb-5">
        <div
          className="cursor-pointer border border-solid border-[#424242] rounded-lg w-fit p-2 hover:bg-tertiary2"
          data-test-id="isComplete"
          onClick={e => toggle(e, id)}
        >
          {isComplete ? (
            <AiOutlineCheckCircle className="text-primary" />
          ) : (
            <AiOutlineCheckCircle />
          )}
        </div>
        <div
          data-test-id="hasReminder"
          className="cursor-pointer border border-solid border-[#424242] rounded-lg w-fit p-2 hover:bg-tertiary2 flex items-center"
        >
          <AiFillBell />
        </div>
        <div className="cursor-pointer border border-solid border-[#424242] rounded-lg w-fit p-2 hover:bg-tertiary2 flex items-center">
          <AiTwotoneDelete
            className={'inline-block'}
            onClick={() => deleteTask(id)}
          />
        </div>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-2xl">
          <h3 className="text-lg text-title">Title</h3>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label htmlFor="description" className="text-2xl">
          <h3 className="text-lg text-title">Description</h3>
          <textarea
            id="description"
            name="description"
            value={task.description}
            autoComplete="off"
            onChange={handleTextAreaChange}
          />
        </label>
        <br />
        <div>
          <h3 className="text-lg text-title">Date</h3>
          <input
            id="dueDate"
            name="dueDate"
            type="datetime-local"
            value={task.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="border border-solid border-[#424242] w-fit rounded-lg p-2"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default memo(EditTask);
