<template>
  <div class="card">
    <h1>Access Wallet</h1>
    <p>How do you want to access your wallet?</p>
    <div class="options">
      <div class="option">
        <h4>Private Key</h4>
        <p>0xde4867ed4c361cc...</p>
        <router-link to="/access/private_key" />
      </div>
      <div class="option">
        <h4>Keystore File</h4>
        <p>CKB_ZvtFT.json</p>
        <router-link to="/access/keystore" />
      </div>
      <div class="option">
        <h4>Mnemonic</h4>
        <p>Coming Soon</p>
      </div>
      <div class="option">
        <h4>Synapse</h4>
        <p>Coming Soon</p>
      </div>
    </div>
    <router-link to="/create">Don't have a wallet?</router-link>
  </div>
</template>
<style scoped lang="scss">
    @use '../../main';

    $col_w: 240px;
    .options{
        margin: 30px auto;
        display: grid;
        grid-template-columns: $col_w $col_w;
        grid-gap: 30px;

        >div{

        }

        h4{
            font-size: 18px;
        }

        p{
            font-size: 13px;
            margin-top: 12px !important;
            color: #ac65d8;
        }
    }

    a{
        color: #1D82BB !important;
    }

    .option{
        position: relative;
        transition-duration: 0.1s;
        transition-timing-function: ease-in;
        box-shadow: 4px 3px 10px rgba(0,0,0,0.2);
        border-radius: 4px;
        padding: 30px;

        a{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &:hover{
            transform: translateY(-5px);
            box-shadow: 4px 8px 10px rgba(0,0,0,0.2);
        }
    }

    @media only screen and (max-width: main.$mobile_width) {
        .options{
            display: block;
            grid-template-columns: none;
        }

        .option{
            margin-bottom: 30px;

        }
    }
</style>
