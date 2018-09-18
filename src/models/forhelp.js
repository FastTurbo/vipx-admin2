import { fetchForHelpData, fetchStudentForProblemTypeData } from '@/services/api1';
import moment from 'moment'

export default {
  namespace: 'forhelp',

  state: {
    list: [],
    studentForhelp:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      const params = _.params
      const response = yield call(fetchForHelpData, params);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchStudentForProblem(_, { call, put }) {
      
      const response = yield call(fetchStudentForProblemTypeData);
      
      yield put({
        type: 'getStudent',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    getStudent(state, action) {
      return {
        ...state,
        studentForhelp: action.payload,
      };
    },
  },
};
