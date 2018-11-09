<template>
  <vue-editor
    v-bind:value="text"
    v-on:input="updateText" />
</template>

<script>
import { VueEditor } from 'vue2-editor';
import '@/assets/vue2-editor.css';

export default {
  name: 'QuillEditor',

  components: {
    'vue-editor': VueEditor
  },

  model: {
    prop: 'text'
  },

  props: {
    text: {
      type: String,
      required: true
    }
  },

  methods: {
    updateText(text) {
      this.$emit('input', text);
    }
  }
};
</script>
