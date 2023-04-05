import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

const db = new Localbase('db')
db.config.debug = false // leave it on if debugging
const coll = 'tasks'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      appTitle: process.env.VUE_APP_TITLE,
      search: null,
      tasks: [
        // {
        //   id: 1,
        //   title: 'Wake up',
        //   done: false,
        //   dueDate: '2023-04-16',
        // },
      ],
      snackbar: {
        show: false,
        text: '',
      },
      sorting: false,
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      try {
        let re = new RegExp(state.search, 'i')
        return state.tasks.filter( task => task.title.match(re) )
      } catch (err) {
        return state.tasks;
      }
    },
  },
  mutations: {
    setSearch(state,payload) {
      state.search = payload
    },
    addTask(state,payload) { // payload is newTaskTitle
      state.tasks.push( payload )
    },
    doneTask(state,payload) { // payload is id
      const task = state.tasks.filter(task => task.id === payload)[0]
      task.done = !task.done
    },
    deleteTask(state,payload) { // payload is id
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },
    updateTaskTitle(state,payload) {
      state.tasks.filter(task => task.id === payload.id)[0].title = payload.title
    },
    updateTaskDueDate(state,payload) {
      state.tasks.filter(task => task.id === payload.id)[0].dueDate = payload.dueDate
    },
    setTasks(state,payload) {
      state.tasks = payload
    },
    showSnackbar(state,payload) { // payload is snackbar text
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout( () => {
        state.snackbar.text = payload
        state.snackbar.show = true
      }, timeout)
    },
    hideSnackBar(state) {
      state.snackbar.text = ''
      state.snackbar.show = false
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask(context,payload) { // can be done like this:   addTask({ commit })   ... commit('mutation',payload)
      const newTask = {
        id: Date.now(),
        title: payload,
        done: false,
        dueDate: null
      }
      db.collection(coll).add(newTask).then(() => {
        context.commit('addTask',newTask)
        context.commit('showSnackbar',"Task added!")
      })
    },
    doneTask(context,payload) {
      const task = context.state.tasks.filter(task => task.id === payload)[0]
      db.collection(coll).doc({ id: payload }).update({
        done: !task.done
      }).then( () => {
        context.commit('doneTask',payload)
      })
    },
    deleteTask(context,payload) {
      db.collection(coll).doc({ id: payload }).delete().then( () => {
        context.commit('deleteTask',payload)
        context.commit('showSnackbar',"Task deleted!")
      })
    },
    updateTaskTitle(context,payload) {
      db.collection(coll).doc({ id: payload.id }).update({
        title: payload.title
      }).then( () => {
        context.commit('updateTaskTitle',payload)
        context.commit('showSnackbar',"Task updated!")
      })
    },
    updateTaskDueDate(context,payload) {
      db.collection(coll).doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then( () => {
        context.commit('updateTaskDueDate',payload)
        context.commit('showSnackbar',"Due date updated!")
      })
    },
    setTasks(context,payload) {
      db.collection(coll).set(payload)//.then( () => {
        context.commit('setTasks',payload)
      //})
      // The .then block was removed to eliminate a bit of a UI lurch 
    },
    getTasks(context,payload) {
      db.collection(coll).get().then( tasks => {
        context.commit('setTasks',tasks)
      })
    },
  },
  // modules: {
  // }
})
