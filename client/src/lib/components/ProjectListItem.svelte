<script lang="ts">
  import FaComment from "svelte-icons/fa/FaComment.svelte";
  import FaCaretUp from "svelte-icons/fa/FaCaretUp.svelte";
  export let project;
  console.log(8777, project);
</script>

<div class="bg-base-100 hover:bg-base-300 hover:cursor-pointer shadow-md w-full h-28 flex items-center justify-center ">
  <div class="avatar">
    <div class="w-24 rounded">
      <img
        alt=""
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      />
    </div>
  </div>
  <div class="flex flex-col w-full ml-4 h-full justify-between relative">
    <div class="flex justify-between items-center px-7">
      <div>
        <a href="/" class="font-semibold text-lg">Project Name</a>
        <p>Project tagline</p>
      </div>
      <div
        class="flex items-center justify-center gap-4 absolute top-[20%] right-10"
      >
        <div
          class="px-4 py-3 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-red-100 hover:text-red-500 hover:border-red-500"
        >
          <p class="w-4 h-4">
            <FaComment />
          </p>
          <div class="text-sm font-medium">0</div>
        </div>
        <div
          class="px-4 py-3 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-red-100 hover:text-red-500 hover:border-red-500"
        >
          <p class="w-4 h-4">
            <FaCaretUp />
          </p>
          <div class="text-sm font-medium">0</div>
        </div>
      </div>
    </div>
  </div>
</div>
