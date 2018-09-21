import { fetchForHelpData, fetchStudentForProblemTypeData } from '@/services/api1';
import moment from 'moment'

export default {
  namespace: 'forhelp',

  state: {
    list: [],
    error:'',
    studentForhelp:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      const params = _.params
      const response = yield call(fetchForHelpData, params);
      const error_code = (response && response.error_code) || 0
      if(error_code === 1){
        yield put({
          type: 'error',
          payload: response.error_msg,
        });   
      }else{
          yield put({
            type: 'save',
            payload: response,
          });
      }
      
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
        error: '',
        list: action.payload,
      };
    },
    error(state, action){
      return {
        ...state,
        list:[],
        error: action.payload
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
