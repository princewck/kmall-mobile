import Vue from 'Vue';
import Vuex from 'Vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    // cart,
    // products
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});