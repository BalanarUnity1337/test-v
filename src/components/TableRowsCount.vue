<template>
  <div class="ml-3">
    <select
      v-bind:value="count"
      class="form-control mb-2"
      v-on:change="updateCount($event.target.value)">
      <option
        v-for="(rowsCount, index) in rowsCountList"
        v-bind:key="index"
        v-bind:value="rowsCount.value" >{{ rowsCount.text }}</option>
    </select>

    <span>Выбрано элементов на страницу: {{ count }}</span>
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
      rowsCountList: [
        { text: 2, value: 2 },
        { text: 5, value: 5 },
        { text: 10, value: 10 },
        { text: 20, value: 20 }
      ]
    };
  },

  methods: {
    updateCount(value) {
      this.$emit('input', Number(value));
    }
  }
};
</script>
