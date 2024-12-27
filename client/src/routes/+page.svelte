<script lang="ts">
  // export let data;
  import ProjectListItem from "$lib/components/ProjectListItem.svelte";
  //   let { data } = $props();
  export let data;
  console.log(111444, data);
</script>

<h1 class="text-3xl font-bold text-blue-400">Your next favorite thing!!! 👋</h1>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
  <div class="lg:col-span-2">
    <ProjectListItem />
  </div>
  <div class="bg-green-500 p-4 text-white">Column 2</div>
</div>
