<template>
    <div>
        <v-menu
        bottom
        left
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="handleClick(i)"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
        
        <dialog-edit
            v-if="dialogs.edit"
            @close="dialogs.edit = false"
            :task="task"
        />
        <dialog-due-date
            v-if="dialogs.dueDate"
            @close="dialogs.dueDate = false"
            :task="task"
        />
        <dialog-delete
            v-if="dialogs.delete"
            @close="dialogs.delete = false"
            :task="task"
        />
    </div>
</template>

<script>
// import DialogDelete from '@/components/todo/dialogs/DialogDelete.vue'

export default {
    components: {
      'dialog-edit' : require('@/components/todo/dialogs/DialogEdit.vue').default,
      'dialog-due-date' : require('@/components/todo/dialogs/DialogDueDate.vue').default,
      'dialog-delete' : require('@/components/todo/dialogs/DialogDelete.vue').default,
    },
    props: ['task'],
    data: () => ({
      dialogs: {
        edit: false,
        dueDate: false,
        delete: false,
      },
      items: [
        {
            title: 'Edit',
            icon: 'mdi-pencil',
            click() {
                this.dialogs.edit = true
            }
        },
        {
            title: 'Due Date',
            icon: 'mdi-calendar',
            click() {
                this.dialogs.dueDate = true
            }
        },
        {
            title: 'Delete',
            icon: 'mdi-delete',
            click() {
                this.dialogs.delete = true
            }
        },
        {
            title: 'Re-order',
            icon: 'mdi-drag-horizontal-variant',
            click() {
                if (!this.$store.state.search) {
                    this.$store.commit('toggleSorting')
                } else {
                    this.$store.commit('showSnackbar', 'How DARE you try to re-order while searching!')
                }
            }
        },
      ],
    }),
    methods: {
        handleClick(index) {
            this.items[index].click.call(this)
            // console.log( index, this.items[index].click.call(this) )
        }
    }
}
</script>

<style>

</style>