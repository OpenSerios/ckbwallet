<template>
  <div class="access_view">
    <transition name="fade" mode="out-in">
      <router-view class="card" />
    </transition>
  </div>
</template>
<style scoped lang="scss">
    .access_view{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card{
        text-align: center;
    }
</style>
