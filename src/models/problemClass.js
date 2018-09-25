import { fetchProblemClassesData } from '@/services/api1';

export default {
  namespace: 'problemClass',

  state: {
    list: {},
    error:'',
    days:1
  },

  effects: {
    *fetch(_, { call, put }) {
      
      const response = yield call(fetchProblemClassesData, _.params);
      const error_code = (response && response.error_code) || 0
      if (error_code === 1) {
        yield put({
          type: 'error',
          payload: response.error_msg,
        });
      } else {
        yield put({
          type: 'save',
          payload: response,
        });
      }
      
    },
    
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        error: '',
        list:action.payload,
      };
    },
     error(state, action) {
       return {
         ...state,
         list: [],
         error: action.payload
       };
     },
    daysChange(state, { payload: days }) {
      return {
        ...state,
        error:'',
        days: days,
      }
    }
  },
};
