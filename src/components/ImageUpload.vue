<template>
  <!-- <div class="form-group">
    <input type="file">

    <button
      class="btn btn-light"
      type="button"></button>
  </div> -->
  <div class="row ml-3 mr-3">
    <img
      v-bind:src="imageSrc"
      class="img-thumbnail rounded"
      alt=""
      width="160"
      height="160">
    <div
      id="dropzone"
      class="dropzone col-lg-8  ml-3">
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone';
import 'dropzone/dist/basic.css';
import 'dropzone/dist/dropzone.css';

Dropzone.autoDiscover = false;

export default {
  name: 'PhotoUpload',

  model: {
    prop: 'imageSrc'
  },

  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dropzone: null
    };
  },

  mounted() {
    var self = this;

    this.dropzone = new Dropzone('#dropzone', {
      url: 'https://api.imgur.com/3/image',
      paramName: 'image',
      maxFiles: 1,
      maxFilesize: 2,
      addRemoveLinks: true,
      acceptedFiles: 'image/*',
      autoProcessQueue: true,
      method: 'post',
      headers: {
        Authorization: 'Client-ID ececbec3122457d',
        'Cache-Control': null,
        'X-Requested-With': null
      },
      dictDefaultMessage:
        'Перенесите изображение для загрузки или нажмите, чтобы выбрать файл вручную',
      init: function() {
        this.on('maxfilesexceeded', file => {
          this.removeAllFiles();
          this.addFile(file);
        });

        this.on('success', (file, response) => {
          self.updateImage(response.data.link);
          this.removeFile(file);
        });
      }
    });
  },

  beforeDestroy() {
    this.dropzone.destroy();
  },

  methods: {
    updateImage(imageSrc) {
      this.$emit('input', imageSrc);
    }
  }
};
</script>
