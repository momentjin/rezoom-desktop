import * as api from '../api'

const actions = {
  FETCH_COVERLETTERS({ commit }) {
      return api.coverletter.fetch()
      .then(data => commit('SET_COVERLETTERS', data.coverletters));
  },
  FETCH_COVERLETTER({ commit }, id) {
    return api.coverletter.fetch(id)
      .then(data => commit('SET_COVERLETTER', data));
  }
}

export default actions;