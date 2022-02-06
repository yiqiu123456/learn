<template>
  <div class="mx-aut0 px-10">
    <div class="mx-auto h-12">
      <span>javascript编辑器</span>
    </div>
    <div class="relative mx-auto">
      <div class="inline-block">
        <MonacoEditor :width="800" :height="600" ref="monacoEditor" />
        <button class="relative mx-auto mt-5" @click="parserCode">运行</button>
      </div>
      <div class="inline-block bg-blue-100">
        <div class="h-32 w-32"></div>
      </div>
    </div>
  </div>
</template>
<script>
import MonacoEditor from "@/components/monaco/MonacoEditor.vue";
import { Parser } from "acorn";
export default {
  name: "editorMain",
  components: { MonacoEditor },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    parserCode() {
      debugger;
      let code = this.$refs.monacoEditor.getMonacoEditorValue();
      try {
        let ast = Parser.parse(code, { ecmaVersion: 2020 });
        console.log(ast);
      } catch (e) {
        let { loc, name } = e;
        // 语法错误位置
        console.log(loc);
        // 语法错误名称
        console.log(name);
      }
    },
  },
};
</script>

<style scoped>
@btn {
  px: 4px;
}
</style>