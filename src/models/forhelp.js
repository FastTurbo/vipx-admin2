import { fetchForHelpData, fetchStudentForProblemTypeData } from '@/services/api1';

export default {
  namespace: 'forhelp',

  state: {
    list: [],
    studentForhelp:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      
      const response = yield call(fetchForHelpData);
      
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSFBT(_, { call, put }) {
      
      const response = yield call(fetchStudentForProblemTypeData);
      
      yield put({
        type: 'sfbt',
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
    sfbt(state, action) {
      return {
        ...state,
        studentForhelp: action.payload,
      };
    },
  },
};
