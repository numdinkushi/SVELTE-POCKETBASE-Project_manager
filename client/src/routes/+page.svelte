<script lang="ts">
  import ProjectListItem from "$lib/components/ProjectListItem.svelte";
  import { getImageUrl } from "$lib/helpers";

  interface DataType {
    profile: {};
    projects: DataType[];
  }
  let { data }: { data: DataType } = $props();
</script>

<h1 class="text-3xl font-bold text-blue-400">Your next favorite thing!!! 👋</h1>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
  <div class="lg:col-span-2">
    {#each data?.projects as project}
      <ProjectListItem {project} />
    {/each}
  </div>
  <div class="bg-green-500 p-4 text-white lg:col-span-1">Column 2</div>
</div>
