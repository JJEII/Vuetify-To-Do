<template>
    <v-dialog
        :value="true"
        :return-value.sync="date"
        persistent
        width="290px"
    >
        <v-date-picker
            v-model="date"
            scrollable
        >
            <v-spacer></v-spacer>
            <v-btn
                @click="$emit('close')"
                text
                color="primary"
            >
                Cancel
            </v-btn>
            <v-btn
                @click="saveDueDate"
                text
                color="primary"
            >
                OK
            </v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
export default {
    props: ['task'],
    emits: ['close'],
    data() {
        return {
            date: null,
        }
    },
    methods: {
        saveDueDate() {
            this.$store.dispatch('updateTaskDueDate',{
                id: this.task.id,
                dueDate: this.date,
            })
            this.$emit('close')
        },
    },
    mounted() {
        if (this.task.dueDate) {
            this.date = this.task.dueDate
        }
    },
}
</script>

<style>

</style>