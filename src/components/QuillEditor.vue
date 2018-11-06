<template>
  <vue-editor v-model="localText" />
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

  data() {
    return {
      localText: ''
    };
  },

  watch: {
    localText: 'updateText'
  },

  created() {
    this.localText = this.text;
  },

  methods: {
    updateText() {
      this.$emit('input', this.localText);
    }
  }
};
</script>
