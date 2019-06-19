<template>
    <div class="edit_container">
        <quill-editor :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'


export default {
    name: 'MdEditor',
    components: {
        quillEditor
    },
  props: {
      r_content: {
        type: String,
        default: ''
      }
    },
    watch: {
        r_content: {
            handler(newValue, oldValue) {
                console.log('richEditor:', newValue)
    },
            deep: true
    }
  },
  data() {
    return {
            editorOption: {}
    }
  },
  methods: {
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
    },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
    },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
    },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
    },
  }
}
</script>

<style>

</style>