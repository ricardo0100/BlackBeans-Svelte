<script>
  import { onMount } from "svelte";
  import EditAccount from "./EditAccount.svelte";
  import { getAccounts } from "../../API";

  let accounts = [];
  let editingAccount = { name: "", color: "#000000" };

  async function loadAccounts() {
    accounts = await getAccounts();
  }
  onMount(async () => {
    await loadAccounts();
  });

  function showNewAccount() {
    editingAccount = { name: "", color: "#000000" };
    showModal();
  }

  /**
   * @param {{ name: string; color: string; }} account
   */
  function showExistingAccount(account) {
    editingAccount = account;
    showModal();
  }

  function showModal() {
    const element = document.getElementById("editaccountmodal");
    // @ts-ignore
    const modal = bootstrap.Modal.getOrCreateInstance(element);
    modal.show();
  }

  let formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function format(value) {
    return formatter.format(value);
  }
</script>

<div class="hstack mb-3">
  <h1>Accounts</h1>
  <span class="ms-auto" />
  <button
    class="btn btn-primary"
    on:click={(e) => {
      showNewAccount();
    }}>New account</button
  >
</div>

<ul class="list-group">
  {#each accounts as account (account.id)}
    <li
      class="list-group-item list-group-item-action"
      on:click={(e) => {
        showExistingAccount(account);
      }}
    >
      <span class="material-icons float-start me-2" style="color: {account.color};">circle</span>
      {account.name}
      <span class="float-end me-2" class:text-danger={account.total < 0} class:text-success={account.total >= 0}>{format(account.total)}</span>
    </li>
  {/each}
</ul>

<EditAccount
  {editingAccount}
  on:success={async () => {
    await loadAccounts();
  }}
/>
