// import React, { useState } from 'react';
import { logger } from '../utils/logger';
import { peopleService } from '../services/peopleService';
import { Person } from '../types';

const usePeople = () => {

  const findPeople = async (name: string): Promise<Array<Person>> => {
    if(name.length<1) {
      return [];
    }
    try {
      const peopleData = await peopleService.findPeople(name);
      return peopleData;
    } catch (error) {
      logger.logError(error);
      return [];
    }
  };

  return findPeople;
};

export default usePeople;
