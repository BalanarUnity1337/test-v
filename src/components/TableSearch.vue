<template>
  <div class="form-group mr-3">
    <label for="last-name-filter">Поиск по фамилии</label>
    <input
      id="last-name-filter"
      v-model="localFilterValue"
      class="form-control"
      type="text"
      placeholder="Введите фамилию">
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

  data: () => ({
    localFilterValue: ''
  }),

  watch: {
    localFilterValue: 'updateFilterValue'
  },

  created: function() {
    this.localFilterValue = this.filterValue;
  },

  methods: {
    updateFilterValue: function() {
      this.$emit('input', this.localFilterValue);
    }
  }
};
</script>
