import React from 'react';

import Lottie from 'react-lottie';

import { NoData } from '../lotties/lottyFiles';

const EditTask = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-2xl h-full">
        <Lottie options={NoData} height={250} width={300} />
        <h2>No task Selected</h2>
      </div>
    </>
  );
};

export default EditTask;
