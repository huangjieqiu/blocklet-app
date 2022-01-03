<template>
  <div class="message-box" v-if="visible">
    <div class="message-box__header">
      <div class="message-box__title">
        <span>{{ title }}</span>
      </div>
      <button type="button" aria-label="Close" class="message-box__headerbtn" @click="changeVisible(false)">X</button>
    </div>
    <div class="message-box__content">
      <div class="message-box__container">
        <div class="message-box__message">
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
    <div class="message-box__btns">
      <button type="button" class="button" @click="changeVisible(false)"><span> 取消 </span></button
      ><button type="button" class="button button--primary" @click="changeVisible(false)"><span> 确定 </span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-box',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    message: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeVisible(visible = true) {
      this.$emit('update:visible', visible);
    },
  },
};
</script>

<style lang="less" scoped>
.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 365px;
  max-width: 365px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
  .message-box__header {
    position: relative;
    padding: 15px 15px 10px;
    .message-box__title {
      padding-left: 0;
      margin-bottom: 0;
      font-size: 18px;
      line-height: 1;
      color: #303133;
    }
    .message-box__headerbtn {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 0;
      border: none;
      outline: none;
      background: transparent;
      font-size: 16px;
      cursor: pointer;
      .message-box__close {
        color: #909399;
      }
    }
  }
  .message-box__content {
    padding: 10px 15px;
    color: #606266;
    font-size: 14px;
    .message-box__container {
      position: relative;
      .message-box__message {
        padding-left: 36px;
        padding-right: 12px;
        margin: 0;
        p {
          margin: 0;
          line-height: 24px;
        }
      }
    }
  }
  .message-box__btns {
    padding: 5px 15px 0;
    text-align: right;

    .button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
      padding: 9px 15px;
      font-size: 12px;
      border-radius: 3px;
      &:first-child {
        margin-right: 8px;
      }
      &.button--primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
      }
    }
  }
}
</style>