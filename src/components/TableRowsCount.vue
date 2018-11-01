<template>
  <div class="ml-3">
    <input
      v-model.number="localCount"
      class="form-control mb-2"
      type="number"
      min="1">

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

  data: () => ({
    localCount: null
  }),

  watch: {
    localCount: 'updateCount'
  },

  created: function() {
    this.localCount = this.count;
  },

  methods: {
    updateCount: function() {
      this.$emit('input', this.localCount);
    }
  }
};
</script>
