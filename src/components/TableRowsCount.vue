<template>
  <div class="ml-3">
    <select
      v-bind:value="count"
      class="form-control mb-2"
      v-on:change="updateCount($event.target.value)">
      <option
        v-for="rowsCount in rowsCountList"
        v-bind:key="rowsCount"
        v-bind:value="rowsCount" >{{ rowsCount }}</option>
    </select>

    <span>Показывать элементов на странице: {{ count }}</span>
  </div>
</template>

<script>
export default {
  name: 'TableRowsCount',

  model: {
    prop: 'count'
  },

  props: {
    count: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      rowsCountList: [2, 5, 10, 20]
    };
  },

  methods: {
    updateCount(value) {
      this.$emit('input', Number(value));
    }
  }
};
</script>
