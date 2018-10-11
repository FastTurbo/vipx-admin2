import { fetchProblemClassesData } from '@/services/api1';

export default {
  namespace: 'loop',

  state: {
  },

  effects: {
    *fetch(_, { call, put }) {
      
      const response = yield call(fetchProblemClassesData, _.params);
      const error_code = (response && response.error_code) || 0
      if (error_code === 1) {
       
      } else {
       
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
    }
  },
};
