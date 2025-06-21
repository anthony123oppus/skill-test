import { studentFormInitialState } from '../reducer/student-form-reducer';
import { GetStudentDetailProps } from '../types';
import {useGetStudentDetailQuery } from '../api/student-api';

const initialState: GetStudentDetailProps = { ...studentFormInitialState, id: 0, reporterName: '' };
export const useGetStudentDetail = (id: string | undefined) => {

  const { data: studentDetails = initialState } = useGetStudentDetailQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  return studentDetails;
};
