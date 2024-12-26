<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col items-center h-full w-full pt-5">
  <h2 class=" text-center text-3xl font-bold tracking-tight text-base-content">
    Create a new Project 🆕
  </h2>
  <div class="text-center mt-1">
    We will send the following information to make it work!
  </div>
  <div class="bg-white py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form
      method="POST"
      action="?/create"
      class="flex flex-col items-center space-y-2 w-full"
      enctype="multipart/form-data"
    >
      <div class="form-control w-full max-w-xs">
        <label for="name" class="label font-medium pb-1">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="tagline" class="label font-medium pb-1">
          <span class="label-text">Tagline</span>
        </label>
        <input
          type="text"
          name="tagline"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="url" class="label font-medium pb-1">
          <span class="label-text">Url</span>
        </label>
        <input
          type="text"
          name="url"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="form-control" for="description">
          <div class="label">
            <span class="label-text">Description</span>
          </div>
          <textarea
            name="description"
            class="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="form-control" for="thumbnail">
          <div class="label">
            <span class="label-text">Thumbnail</span>
          </div>
          <input
            type="file"
            name="thumbnail"
            class="border"
          />
        </label>
      </div>
      <div class="w-full max-w-xs pt-3">
        <button class="btn btn-primary w-full max-w-xs">Add Project</button>
      </div>
    </form>
  </div>
</div>
