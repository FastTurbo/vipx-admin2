import request from '@/utils/request';

export async function fetchForHelpData() {
  return request('/api/fetch_forhelp_data');
}

export async function fetchProblemClassesData() {
  return request('/api/fetch_problem_classes_data');
}

export async function fetchStudentForProblemTypeData() {
  return request('/api/fetch_type_student_forProblems_data');
}

