<template>
  <div class="wallet_sidebar">
    <router-link to="/wallet">
      <img src="@/assets/sidebar/portfolio_nav.png">
      Portfolio
    </router-link>
    <router-link to="/wallet/keys">
      <img src="@/assets/sidebar/manage_nav.png">
      Manage
    </router-link>
    <router-link to="/wallet/transfer">
      <img src="@/assets/sidebar/transfer_nav.png">
      Send
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
    @use '../../main';

    .wallet_sidebar{
        padding: 20vh 0px !important;
        display: flex;
        flex-direction: column;

        a{
            display: flex;
            align-items: center;
            padding: 14px 24px;
            /*margin-bottom: 30px;*/
            white-space: nowrap;
            opacity: 0.6;
        }

        a.router-link-exact-active{
            opacity: 1;
            /*color: #9974f1 !important;*/
            background-color: #F5F6FA;
        }
    }

    img{
        width: 20px;
        margin-right: 15px;
        object-fit: contain;
    }
</style>
