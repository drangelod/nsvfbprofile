import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'
import ProfileService from '../services/ProfileService'
Vue.use(Vuex);
const state = {
  isLoggedIn:null,
  profile:null,
}
const getters = {
  isLoggedIn: state =>{
    return state.isLoggedIn
  },
  profile: state =>{
    return state.profile
  },
}
const mutations = {
  setIsLoggedIn: (state, value) => {
    state.isLoggedIn = value;
  },
  setProfile: (state, profile) => {
    state.profile = profile;
  },
  setProfilePicture: (state, profilepicture) => {
    state.profile.profile_pic = profilepicture;
  },
}
const actions = {
  fetchProfile() {
    ProfileService.getProfile()
  },
}
const storeConf = {
  state,
  getters,
  mutations,
  actions
}
export default new Vuex.Store(storeConf)
