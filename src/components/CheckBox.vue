<template>
  <div class="ios-checkbox-wrapper">
    <input
      v-bind:id="id"
      v-bind:checked="value"
      type="checkbox"
      class="ios-checkbox"
      v-on:change="updateCheckbox($event.target.checked)">
    <label v-bind:for="id"><i class="ios-checkbox-item ios-contrast"></i></label>
  </div>
</template>

<script>
import '@/assets/ios-checkbox.css';

export default {
  name: 'CheckBox',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      id: null
    };
  },

  mounted() {
    this.id = `checkbox_${this._uid}`;
  },

  methods: {
    updateCheckbox(value) {
      this.$emit('input', value);
    }
  }
};
</script>
