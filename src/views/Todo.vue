<template>
  <div class="todo">

    <list-tasks
      v-if="$store.state.tasks.length"
    />

    <no-tasks
      v-else
    />

    <button-done-sorting
      v-if="$store.state.sorting"
    />

  </div>
</template>

<script>
// import ListTasks from '@/components/todo/ListTasks.vue'
//  import store from '../store'

  export default {
    name: 'Todo',
    components: {
      'list-tasks': require('@/components/todo/ListTasks.vue').default,
      'no-tasks': require('@/components/todo/NoTasks.vue').default,
      'button-done-sorting': require('@/components/todo/ButtonDoneSorting.vue').default,
    },
  }
</script>
