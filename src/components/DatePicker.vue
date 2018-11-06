<template>
  <input
    ref="datepicker"
    v-bind:value="birthday"
    class="form-control"
    type="text"
    placeholder="День рождения">
</template>

<script>
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';

export default {
  name: 'DatePicker',

  model: {
    prop: 'birthday'
  },

  props: {
    birthday: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      fp: null
    };
  },

  mounted() {
    this.fp = flatpickr(this.$refs.datepicker, {
      dateFormat: 'd.m.Y',
      locale: Russian,
      onChange: (selectedDates, dateStr) => {
        this.$emit('input', dateStr);
      }
    });
  },

  beforeDestroy() {
    this.fp.destroy();
  }
};
</script>
