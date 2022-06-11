<script>
  import { getAccounts } from "../../../util/API";
  import { createEventDispatcher, onMount } from "svelte";

  let accounts = [];
  export let selectedAccount = null;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    accounts = await getAccounts();
  });

  /**
   * @param {any} account
   */
  function onAccountSelected(account) {
    selectedAccount = account;
    dispatch("selected", {
      account: account,
    });
  }
</script>

<p class="mb-1">Account</p>

<div class="dropdown">
  <button class="btn btn-light dropdown-toggle" type="button" id="accountsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
    {#if selectedAccount == null}
      Select account
    {:else}
      <span class="material-icons float-start me-2" style="color: {selectedAccount.color};">circle</span> {selectedAccount.name}
    {/if}
  </button>

  <ul class="dropdown-menu" aria-labelledby="accountsDropdown">
    <form class="p-2 mb-2 bg-light border-bottom">
      <input type="search" class="form-control" autocomplete="false" placeholder="Type to filter..." />
    </form>
    {#each accounts as account (account.id)}
      <li>
        <button
          type="button"
          class="dropdown-item"
          on:click={() => {
            onAccountSelected(account);
          }}
        >
          <span class="material-icons float-start me-2" style="color: {account.color};">circle</span>{account.name}
        </button>
      </li>
    {/each}
  </ul>
</div>
