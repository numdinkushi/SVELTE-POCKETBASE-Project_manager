<script>
  import "../app.css";
  import "../app.postcss";
  // @ts-ignore
  import DiCode from "svelte-icons/di/DiCode.svelte";

  // @ts-ignore
  let { data, children } = $props();
</script>

<div class="h-full w-full min-h-screen bg-base-200">
  <div class="bg-base-100 border-b-2">
    <div class="navbar xl:container mx-auto bg-base-100 px-4 fixed">
      <div class="navbar-start">
        <a
          href="/"
          class="h-12 w-12 text-xl text-base-100 hover:cursor-pointer bg-primary rounded-md"
        >
          <DiCode />
        </a>
      </div>
      <div class="navbar-end space-x-2">
        {#if data?.profile}
          <a href="/projects/new" class="btn btn-primary py-0">New Project</a>
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/profile" class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a href="/settings">Settings</a></li>
              <form action="/logout" method="POST">
                <button class="btn-transparent ml-4">Logout</button>
              </form>
            </ul>
          </div>
        {:else}
          <a href="/login" class="btn btn-outline">Login</a>
          <a href="/register" class="btn btn-primary btn-outline">Register</a>
        {/if}
      </div>
    </div>
  </div>
  <div
    class="h- w-full xl:container mx-auto mt-20 px-4 pb-10 overflow-y-scroll"
  >
    {@render children()}
  </div>
</div>
