import request from '@/utils/request';
import { stringify } from 'qs'

export async function fetchForHelpData(params) {
  return request(`/api/fetch_forhelp_data?${stringify(params)}`);
}

export async function fetchProblemClassesData(params) {
  return request(`/api/fetch_problem_classes_data?${stringify(params)}`);
}

export async function fetchStudentForProblemTypeData() {
  return request('/api/fetch_type_student_forProblems_data');
}

