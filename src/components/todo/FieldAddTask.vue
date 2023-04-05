<template>
    <v-text-field
        v-model.trim="newTaskTitle"
        @keyup.enter="addTask"
        class="field-add-task pa-3 mx-4"
        outlined
        placeholder="Add Task"
        hide-details
        clearable
    >
      <template v-slot:append>
        <v-icon
          @click="addTask"
          :disabled="invalidNewTaskTitle"
        >mdi-plus</v-icon>
      </template>
    </v-text-field>
</template>

<script>
export default {
    data() {
      return {
        newTaskTitle: '',
      }
    },
    computed: {
      invalidNewTaskTitle() {
        return !this.newTaskTitle.trim()
      }
    },
    methods: {
      addTask() {
        if (!this.invalidNewTaskTitle) {
          // this.$store.commit('addTask',this.newTaskTitle)
          this.$store.dispatch('addTask',this.newTaskTitle)
          this.newTaskTitle = ''
        }
      },
    }
}
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(31,94,129,0.8)
</style>