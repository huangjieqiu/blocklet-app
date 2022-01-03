<template>
  <div class="flex-box">
    <div class="left-content">
      <slot name="left-content">{{ leftContent }}</slot>
    </div>
    <div class="right-content">
      <slot name="right-content">
        <div class="item-content" v-for="(item, index) in rightContent" :key="item.main + index">
          <a
            href="javascript:;"
            style="display: inline-block; color: rgb(12, 108, 242)"
            v-if="heightLight"
            class="main"
            >{{ item.main }}</a
          >
          <div class="main" v-else>{{ item.main }}</div>
          <div class="aside" v-if="item.aside !== 'undefined'">{{ item.aside }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flex-box',
  props: {
    leftContent: {
      type: String,
      default: '',
    },
    propValue: {
      type: String,
      default: 'id',
    },
    rightContent: {
      type: Array,
      default() {
        return [];
      },
    },
    heightLight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: flex-start;
  padding: 0.8rem 0px;
  color: rgb(53, 63, 82);
  width: 100%;
  .left-content {
    font-size: 1rem;
    flex: 0 0 100px;
    width: 100px;
    text-align: left;
  }
  .right-content {
    width: calc(100% - 100px);
    .item-content {
      display: flex;
      color: rgb(53, 63, 82);
      text-align: left;
      width: 100%;
      font-size: 1rem;
      .main {
        flex: 1;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 5px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .flex-box {
    width: 50%;
  }
}
</style>