<template>
    <div>
        <v-list-item
            @click="$store.dispatch('doneTask',task.id)"
            :class="{ 'blue lighten-5' : task.done }"
            :ripple="false"
        >
        <template v-slot:default>
<!--
            <v-list-item-action>
                <v-checkbox
                    :input-value="task.done"
                    color="primary"
                ></v-checkbox>
            </v-list-item-action>
-->
            <ba-na-na v-if="!task.done" :size="iconSize" />
            <banana-poo v-else :size="iconSize" />

            <v-list-item-content class="ml-2">
                <v-list-item-title
                    :class="{ 'text-decoration-line-through' : task.done }"
                >
                    {{ task.title }}
                </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action v-if="task.dueDate">
                <v-list-item-action-text>
                    <v-icon small>mdi-calendar</v-icon>
                    {{ task.dueDate | niceDate }}
                </v-list-item-action-text>
            </v-list-item-action>

            <v-list-item-action>
                <task-menu :task="task" />
            </v-list-item-action>

            <v-list-item-action
                v-if="$store.state.sorting"
                class="ml-0"
            >
                <v-btn
                    color="primary"
                    class="handle"
                    icon
                >
                    <v-icon>mdi-drag-horizontal-variant</v-icon>
                </v-btn>
            </v-list-item-action>
        </template>
    </v-list-item>

    <v-divider></v-divider>

    </div>
</template>

<script>
import { format, add } from 'date-fns'

export default {
    components: {
        'task-menu' : require('@/components/todo/TaskMenu.vue').default,
        'ba-na-na' : require('@/components/tools/BaNaNa.vue').default,
        'banana-poo' : require('@/components/tools/BananaPoo.vue').default,
    },
    props: ['task'],
    data() {
        return {
            iconSize: 32,
        }
    },
    filters: {
        niceDate(value) {
//            return format(new Date(value), 'MMM d')
            // no idea why, but it's always displaying the day BEFORE the value date, so I'm adding 1 day to it, pre-display
            return format(add(new Date(value),{days:1}), 'MMM d')
        }
    },
}
</script>

<style lang="sass">
    .chosen
        background-color: rgba(0,1,0,0.1) !important
        box-shadow: 0px 0px 10px rgba(0,0,0,1) !important
    .drag
        background-color: rgba(1,0,0,0.1) !important
        box-shadow: 0px 0px 10px rgba(0,0,0,1) !important
    .ghost
        opacity: 0 !important
</style>