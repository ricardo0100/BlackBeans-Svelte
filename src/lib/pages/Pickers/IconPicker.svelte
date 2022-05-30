<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { getIcons } from "../../API";

  let icons = [];
  export let selected = "";

  const dispatch = createEventDispatcher();

  onMount(async () => {
    // @ts-ignore
    icons = await getIcons();
  });

  /**
   * @param {string} icon
   */
  function setIcon(icon) {
    selected = icon;
    dispatch("selected", {
      icon: icon,
    });
  }
</script>

<p>Icon</p>

<div class="text-center border rounded">
  {#each icons as icon}
    {#if icon == selected}
      <span style="font-size: 2em;" class="material-icons p-3">{icon}</span>
    {:else}
      <span
        style="font-size: 2em; color: #AAA;"
        class="material-icons p-3"
        on:click={() => {
          setIcon(icon);
        }}>{icon}</span
      >
    {/if}
  {/each}
</div>
