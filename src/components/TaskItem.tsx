import React, { memo } from 'react';

import { motion } from 'framer-motion';

interface functionProps {
  toggle: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => void;
  deleteTask: (id: string) => void;
  selectTask: (id: string) => void;
}
type TaskItemProps = Omit<Task, 'editMode'> & functionProps;

function TaskItem(props: TaskItemProps) {
  const { title, isComplete, toggle, id, selectTask } = props;
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 900, damping: 40 },
  };
  return (
    <motion.div
      {...animations}
      layout
      className={`border text border-solid border-[#424242] rounded-lg my-2 bg-tertiary2 hover:bg-tertiary cursor-pointer py-2`}
      onClick={() => selectTask(id)}
    >
      <div className="text-left">
        <div
          className="radio flex px-2 w-fit"
          data-test-id="isComplete"
          onClick={e => {
            e.stopPropagation();
            toggle(e, id);
          }}
        >
          <input
            id={`${id}`}
            type="radio"
            name={`${title}`}
            checked={isComplete}
            onChange={e => {
              e.stopPropagation();
              toggle(e, id);
            }}
          />
          <label htmlFor={`${id}`} className="">
            <h3
              className={`text-xl text-left ml-4 inline-block ${
                isComplete && 'line-through'
              }`}
            >
              {title}
            </h3>
          </label>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(TaskItem);
