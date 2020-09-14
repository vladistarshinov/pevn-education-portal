<template>
    <div class="pagination">
        <div class="pagination__element"
            v-for="(page, i) in pages" :key="i"
            @click.prevent="pageSelect(page)"
        >
            {{page}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pages: {
                type: Number,
                required: true
            },
            pageSelect: {
                type: Function,
                required: true
            }
        }
    }
</script>
