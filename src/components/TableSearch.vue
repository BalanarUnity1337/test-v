<template>
  <div class="form-group mr-3">
    <label for="last-name-filter">Поиск по фамилии</label>
    <input
      id="last-name-filter"
      v-bind:value="filterValue"
      class="form-control"
      type="text"
      placeholder="Введите фамилию"
      v-on:input="updateFilterValue($event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'TableSearch',

  model: {
    prop: 'filterValue'
  },

  props: {
    filterValue: {
      type: String,
      required: true
    }
  },

  methods: {
    updateFilterValue(value) {
      this.$emit('input', value);
    }
  }
};
</script>
