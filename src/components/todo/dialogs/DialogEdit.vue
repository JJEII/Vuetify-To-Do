<template>
    <v-dialog
      :value="true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Edit task
        </v-card-title>
        <v-card-text>
          Edit the title of this task:
          <v-text-field
            @keyup.enter="saveTask"
            v-model.trim="taskTitle"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="saveTask"
            :disabled="taskTitleInvalid"
            color="red darken-1"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['task'],
    data() {
      return {
        taskTitle: '',
      }
    },
    computed: {
      taskTitleInvalid() {
        return !this.taskTitle.trim() || this.taskTitle.trim() === this.task.title
      },
    },
    methods: {
      saveTask() {
        if (!this.taskTitleInvalid) {
          this.$store.dispatch('updateTaskTitle',{
            id: this.task.id,
            title: this.taskTitle
          })
          this.$emit('close')
          this.$vuetify.goTo(0, { duration: 0 }) // scroll to top of page
        }
      },
    },
    mounted() {
      this.taskTitle = this.task.title
    }
}
</script>
