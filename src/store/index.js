import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    currentUser: null,
    stayloggedIn: false,
    users: [],
    projects: [],

  },
  getters: {
    GET_USERS : (state) => { return state.users},
    GET_CURRENTUSER : (state) => { return state.currentUser},
    GET_LOGGEDIN : (state) => { return state.stayloggedIn},
    GET_PROJECTS : (state) => { return state.projects},
  },
  mutations: {
    LOGOUT(state,payload){
      state.currentUser = null
      state.stayloggedIn = false
    },
    REGISTER_USER(state,payload){
      //ukoliko korisnika nema u bazi, ubaciti
      state.users.push(payload)
    },
    UPDATE_CURRENTUSER(state,payload){
      //prepoznavanje korisnika
      state.currentUser = payload;
    },
    UPDATE_STAYLOGGED(state,payload){
      state.stayloggedIn = payload
    },
    UPDATE_LASTACTIVITY(state,payload){
      state.users[state.users.findIndex( x => x.username === payload.user)].lastActivity.name = payload.name
      state.users[state.users.findIndex( x => x.username === payload.user)].lastActivity.date = payload.date
      state.users[state.users.findIndex( x => x.username === payload.user)].lastActivity.logo = payload.logo
      //zadnja aktivnost projekta
    },
    CREATE_PROJECT(state,payload){
      state.projects.push(payload)
    },
    INSERT_COMMIT(state,payload){
      let position = payload.position;
      delete payload.position
      state.projects[position].tree.push(payload)
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].activeProjects += payload.projects
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].dayCommits += payload.day
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].nightCommits += payload.night
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].mon += payload.mon
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].tue += payload.tue
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].wed += payload.wed
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].thu += payload.thu
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].fri += payload.fri
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].sat += payload.sat
      state.users[state.users.findIndex( x => x.username === payload.user)].stats[0].sun += payload.sun
    },
    SEND_MESSAGE(state,payload){
      let reciever = payload.to
      delete payload.to
      state.users[state.users.findIndex(x => x.username === reciever)].inbox.push(payload)
    },
    DELETE_MESSAGE(state,payload){
      let position = payload.position;
      delete payload.position
      let x = state.users[position].inbox.indexOf(payload.item);
      state.users[position].inbox.splice(x,1)
    },
    READ_MESSAGE(state,payload){
      let position = payload.position;
      delete payload.position
      let message = state.users[position].inbox.indexOf(payload.item);
      state.users[position].inbox[message].new = 0;
    },
    INSERT_TECH(state,payload){
      let position = payload.position;
      delete payload.position
      state.users[position].tech.push(payload.item)
      state.users[position].stats[0].newTech +=1
    },
    DELETE_LAST_TECH(state,payload){
      let position = payload.position;
      delete payload.position
      state.users[position].tech.pop()
      state.users[position].stats[0].newTech -=1
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin],
})
