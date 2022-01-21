<template>
  <div class="container mx-auto px4 h-600">
    <!-- js代码编辑器 -->
    <div class="py-2 h-10 w-full">
      <span>javascript在线代码编辑器</span>
    </div>
    <div class="h-full w-full mt-5 relative">
      <div class="w-1/2 h-full"  ref="editor">
        <div id="monaco" class="w-full h-full"></div>
      </div>
      <div class="w-1/2 h-full px-5 bg-blue-100 inline-block">
      
      </div>
    </div>
  </div>
</template>
<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
// 语法高亮
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
// 编辑器查询功能插件 
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
export default {
  name: "editor",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initMonacoEditor();
  },
  methods: {
    initMonacoEditor() {
      monaco.editor.create(document.getElementById("monaco"), {
        value: `console.log("hello,world")`,
        language: "javascript",
      });
    },
  },
};
</script>
<style scoped>
.h-600 {
  height: 600px;
}
</style>