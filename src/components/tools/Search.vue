<template>
    <v-text-field
        :value="$store.state.search"
        @input="$store.commit('setSearch', $event.trim())"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        :disabled="$store.state.sorting"
        class="expanding-search mt-1"
        :class="{ 'closed': searchClosed && !$store.state.search, 'invalid-regex': isInvalidInputRegEx }"
        placeholder="RegEx Search"
        prepend-inner-icon="mdi-magnify"
        filled
        dense
        clearable
    ></v-text-field>
</template>

<script>
export default {
    data() {
        return {
            searchClosed: true,
        }
    },
    computed: {
        isInvalidInputRegEx() {
            if ( !this.$store.state.search?.length ) {
                return false
            }
            try {
                new RegExp(this.$store.state.search)
                return false
            } catch (err) {
                return true
            }
        },
    }
}
</script>

<style lang="sass">
    .expanding-search
        transition: max-width 0.2s
        .v-input__slot
            cursor: pointer !important
            &:before, &:after
                border-color: transparent !important
        &.closed
            max-width: 45px
            .v-input__slot
                background: transparent !important
        &.invalid-regex
            background: rgba(255,0,0,0.3)
</style>