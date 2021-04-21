<template>
  <div class="login">
    <form>
      <input
        type="text"
        v-model="formParams.name"
        name="name"
        @input="onInput"
        placeholder="请输入账号"
      />
      <input
        type="password"
        v-model="formParams.password"
        name="password"
        @input="onInput"
        placeholder="请输入密码"
        @keyup.enter="onSumbitClick"
      />
      <button type="sumbit" @click="onSumbitClick">提交</button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { IFormParamsState } from "../../types/index";
import { ajaxLogin } from "../../api/api";
import { message } from "ant-design-vue";
export default {
  setup() {
    const router = useRouter();
    const formParams = reactive<IFormParamsState>({
      name: "",
      password: "",
    });
    const onSumbitClick = async (e: PointerEvent) => {
      e.preventDefault();
      if (formParams.name.trim() === "") {
        return message.warn("请输入账号");
      }
      if (formParams.password.trim() === "") {
        return message.warn("请输入密码");
      }
      const { success } = await ajaxLogin(formParams);
      if (!success) return message.error("密码错误");
      formParams.name = "";
      formParams.password = "";
      router.push("/");
    };

    const onInput = (e: any) => {
      const name = e.target.name as string;
      const value = e.target.value;
      name === "name"
        ? (formParams.name = value)
        : (formParams.password = value);
    };
    return {
      onSumbitClick,
      formParams,
      onInput,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #98c379;
  position: relative;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    input {
      height: 40px;
      width: 100%;
      background: #fff;
      border-radius: 10px;
      padding-left: 10px;
      font-size: 18px;
    }
    button {
      width: 40%;
      height: 40px;
      border: none;
      border-radius: 10px;
      outline: none;
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>
