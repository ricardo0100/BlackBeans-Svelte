<script>
  import { onMount } from "svelte";
  import App from "./app/App.svelte";
  import Website from "./website/Website.svelte";
  
  let isAuthenticated = false;

  onMount(() => {
    let pathComponents = document.baseURI.split("/");
    let page = pathComponents.pop();
  });
</script>

{#if isAuthenticated}
  <App />
{:else}
  <Website />
{/if}
