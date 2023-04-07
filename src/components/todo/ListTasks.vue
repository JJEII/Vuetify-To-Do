<template>
    <v-list
      class="py-0 ma-0"
      flat
    >
        <draggable
            :list="tasks"
            handle=".handle"
            drag-class="drag"
            chosen-class="chosen"
            ghost-class="ghost"
            tag="ul"
        >
            <todo-task
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </draggable>
    </v-list>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        'todo-task' : require('@/components/todo/Task.vue').default,
        draggable,
    },
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.dispatch('setTasks',value)
            }
        }
    }
}
</script>
