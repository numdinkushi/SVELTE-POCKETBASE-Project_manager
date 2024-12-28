<script lang="ts">
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import type { PageData } from "./$types";
  import { restructureData } from "$lib/utils/utils";
  import { goto } from "$app/navigation";

  let { data, form: returnedFormData }: { data: PageData; form: FormData } =
    $props();

  let errors: { path: string; message: string }[] = $state([]);

  function getErrorMessage(fieldName: string) {
    const error = errors.find((error) => error.path === fieldName);
    return error ? error.message : "";
  }

  async function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);

  // Append the thumbnail file to the form data
  const thumbnailInput = document.getElementById("thumbnail") as HTMLInputElement;
  if (thumbnailInput.files && thumbnailInput.files.length > 0) {
    formData.append("thumbnail", thumbnailInput.files[0]);
    console.log("Appending file:", thumbnailInput.files[0]); // Debugging line
  }

  try {
    const response = await fetch("/projects/new?/create", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    const success = JSON.parse(result?.data)[3];
    console.log(898232, success);
    if (success === true) {
      //reset form data, and redirect to '/'
      toast.success("Project Successfully created");
      goto("/");
    } else {
      const parsedData = JSON.parse(result.data);
      const structuredData = restructureData(parsedData);
      errors = structuredData;
    }
  } catch (err) {
    toast.error("Something went wrong during project submission");
    console.error("Something went wrong during project submission", err);
  }
}

</script>

<div class="flex flex-col items-center h-full w-full pt-5">
  <h2 class="text-center text-3xl font-bold tracking-tight text-base-content">
    Create a new Project 🆕
  </h2>
  <div class="text-center mt-1">
    We will send the following information to make it work!
  </div>
  <div class="bg-white py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
    <form
      on:submit={onSubmit}
      class="flex flex-col items-center space-y-2 w-full"
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
        {#if getErrorMessage("name")}
          <p class="text-red-500 text-sm mt-1">{getErrorMessage("name")}</p>
        {/if}
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
        {#if getErrorMessage("tagline")}
          <p class="text-red-500 text-sm mt-1">{getErrorMessage("tagline")}</p>
        {/if}
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
        {#if getErrorMessage("url")}
          <p class="text-red-500 text-sm mt-1">{getErrorMessage("url")}</p>
        {/if}
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
        {#if getErrorMessage("description")}
          <p class="text-red-500 text-sm mt-1">
            {getErrorMessage("description")}
          </p>
        {/if}
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="form-control" for="thumbnail">
          <div class="label">
            <span class="label-text">Thumbnail</span>
          </div>
          <input type="file" id="thumbnail" name="thumbnail" class="border" />
        </label>
        {#if getErrorMessage("thumbnail")}
          <p class="text-red-500 text-sm mt-1">
            {getErrorMessage("thumbnail")}
          </p>
        {/if}
      </div>
      <div class="w-full max-w-xs pt-3">
        <button type="submit" class="btn btn-primary w-full max-w-xs"
          >Add Project</button
        >
      </div>
    </form>
  </div>
  <Toaster />
</div>