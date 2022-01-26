<template>
  <div id="monaco" :style="{ width: widthStyle, height: heightStyle }"></div>
</template>
<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
// javascript语法高亮
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
// 编辑器查询功能插件
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";

export default {
  name: "MonacoEditor",
  props: {
    width: { type: Number },
    height: { type: Number },
    option: {
      type: Object,
      default: function () {
        return {
          monacoEditor: null,
          language: "javascript",
          theme: "vs-dark",
        };
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initMonacoEditor();
  },
  computed: {
    widthStyle: function () {
      return this.width + "px";
    },
    heightStyle: function () {
      return this.height + "px";
    },
  },
  methods: {
    // 初始化 Monaco-editor
    initMonacoEditor() {
      this.monacoEditor = monaco.editor.create(
        document.getElementById("monaco"),
        {
          language: "javascript",
          theme: "vs-dark",
        }
      );
    },
    getMonacoEditorValue() {
      return this.monacoEditor.getValue();
    },
    setMonacoEditorValue() {},
  },
};
</script>
<style scoped>
</style>