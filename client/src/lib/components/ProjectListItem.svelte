<script lang="ts">
  import FaComment from "svelte-icons/fa/FaComment.svelte";
  import FaCaretUp from "svelte-icons/fa/FaCaretUp.svelte";
  import { getImageUrl } from "$lib/helpers";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  export let project;

  let imageUrl: string | null = null;

  onMount(async () => {
    try {
      const url = await getImageUrl(
        project.collectionId,
        project.id,
        project.thumbnail
      );
      imageUrl = url;
      console.log("Image URL:", url);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  const handleVote = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const id = formData.get("id") as string;

    try {
      const response = await fetch("?/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id }).toString(),
      });

      if (response.ok) {
        toast.success("Vote submitted successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("An error occurred while submitting your vote.");
    }
  };
</script>

<div
  class="bg-base-100 hover:bg-base-300 hover:cursor-pointer shadow-md w-full h-28 flex items-center justify-center"
>
  <div class="avatar">
    <div class="w-24 rounded">
      {#if imageUrl}
        <img alt="" src={imageUrl} />
      {:else}
        <p>Image</p>
      {/if}
    </div>
  </div>
  <div class="flex flex-col w-full ml-4 h-full justify-between relative">
    <div class="flex justify-between items-center px-7">
      <div>
        <a href="/" class="font-semibold text-lg">{project?.name}</a>
        <p>{project?.tagline}</p>
      </div>
      <div
        class="flex items-center justify-center gap-4 absolute top-[20%] right-10"
      >
        <button
          class="px-4 py-3 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-red-100 hover:text-red-500 hover:border-red-500"
        >
          <p class="w-4 h-4">
            <FaComment />
          </p>
          <div class="text-sm font-medium">0</div>
        </button>
        <form on:submit={handleVote}>
          <input type="hidden" value={project.id} name="id" />
          <button
            class="px-4 py-3 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-red-100 hover:text-red-500 hover:border-red-500"
          >
            <p class="w-4 h-4">
              <FaCaretUp />
            </p>
            <div class="text-sm font-medium">0</div>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
