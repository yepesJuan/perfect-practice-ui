import axios from 'axios';

export interface Question {
  _id?: string;
  fnName: string;
  title: string;
  description: string;
  initialCode: string;
  week: number;
  day: number;
}

export interface QuestionResponse {
  _id?: string;
  code: string;
  questionId: string;
  uid: string;
  testedCases: {
    status: 'passed' | 'failed';
    inputs: any[];
    expected: any;
    actual: any;
    error?: string;
  }[];
}

export const getQuestions = async (jwt: string) => {
  const ret = await axios.get('http://localhost:5000/questions', {
    headers: { Authorization: jwt },
  });

  return ret.data as Question[];
};

export const getQuestion = async (jwt: string, questionId: string) => {
  const ret = await axios.get(`http://localhost:5000/questions/${questionId}`, {
    headers: { Authorization: jwt },
  });

  return ret.data as Question;
};

export const submitQuestion = async (
  jwt: string,
  questionId: string,
  code: string
) => {
  const ret = await axios.post(
    `http://localhost:5000/questions/${questionId}/submit`,
    { code },
    {
      headers: { Authorization: jwt },
    }
  );
  return ret.data as QuestionResponse;
};
