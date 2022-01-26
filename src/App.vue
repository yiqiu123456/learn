<template>
  <div id="app">
    <MonacoEditor :width="800" :height="600" />
  </div>
</template>

<script>
import MonacoEditor from "@/components/monaco/MonacoEditor.vue";

export default {
  name: "App",
  components: {
    MonacoEditor,
  },
};
</script>

<style>
</style>
