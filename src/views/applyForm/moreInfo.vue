<template>
  <div class="more-apply__info">
    <md-notice-bar>为了确保您能终审通过，请填写下列详细信息</md-notice-bar>
    <md-field title="个人信息" class="field-title">
      <select-item
        title="所在城市:"
        name="所在城市"
        :value.sync="userInfo.city"
        :picker-data="pickerData"
        picker-title="选择省市县"
        v-validate="'required'"
      />

      <input-validate
        v-model="userInfo.residentialAddress"
        title="住宅地址:"
        name="住宅地址"
        placeholder="请输入您的住宅地址"
        v-validate="'required'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('住宅地址')"
        clearable
      />

      <input-validate
        v-model="userInfo.personalEmail"
        type="email"
        title="邮箱:"
        name="邮箱"
        placeholder="请输入您的邮箱"
        v-validate="'required|email'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('邮箱')"
        clearable
      />

      <select-item
        title="婚姻状况:"
        name="婚姻状况"
        :value.sync="userInfo.maritalStatus"
        :picker-data="marrigePickerData"
        :picker-cols="1"
        picker-title="婚姻状况"
        v-validate="'required'"
      />

      <select-item
        title="教育程度:"
        name="教育程度"
        :value.sync="userInfo.educationLevel"
        :picker-data="educatePickerData"
        :picker-cols="1"
        picker-title="教育程度"
        v-validate="'required'"
      />

    </md-field>

    <!-- 2 -->
    <md-field title="工作信息" class="field-title">
      <input-validate
        v-model="userInfo.companyName"
        title="单位名称:"
        name="单位名称"
        placeholder="单位名称"
        v-validate="'required'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('单位名称')"
        clearable
      />

      <select-item
        title="单位城市:"
        name="单位城市"
        :value.sync="userInfo.companyCity"
        :picker-data="pickerData"
        picker-title="单位所在城市"
        v-validate="'required'"
      />

      <input-validate
        v-model="userInfo.companyPhone"
        title="单位电话:"
        name="单位电话"
        placeholder="单位电话"
        v-validate="'required|numeric|min:7'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('单位电话')"
        clearable
      />

      <input-validate
        v-model="userInfo.annualIncome"
        title="年收入:"
        name="年收入"
        placeholder="年收入"
        v-validate="'required|decimal:2'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('年收入')"
        clearable
      />

    </md-field>

    <!-- 3 -->
    <md-field title="联系人信息" class="field-title">
      <md-field title="联系人1:" class="field-contact__item">
        <input-validate
          v-model="userInfo.contactName"
          name="联系人姓名"
          placeholder="姓名"
          v-validate="'required|phone'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人姓名')"
          clearable
        />

        <input-validate
          v-model="userInfo.companyPhone"
          type="phone"
          name="联系人手机号"
          placeholder="手机号"
          v-validate="'required|phone'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人手机号')"
          clearable
        />
      </md-field>

      <md-field title="联系人2:" class="field-contact__item">
        <input-validate
          v-model="userInfo.contactName2"
          name="联系人姓名"
          placeholder="姓名"
          v-validate="'required'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人姓名')"
          clearable
        />

        <input-validate
          v-model="userInfo.companyPhone2"
          type="phone"
          name="联系人手机号"
          placeholder="手机号"
          v-validate="'required|phone'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人手机号')"
          clearable
        />
      </md-field>
    </md-field>

    <div class="footer-btn">
      <md-button @click="actDialog.open = true">提 交</md-button>
    </div>

     <md-dialog
      :closable="false"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      提交信息审核通过后我们将第一时间和您联系，请保存电话畅通！
    </md-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Picker, Field, FieldItem, InputItem, Button, Toast, NoticeBar, Dialog } from 'mand-mobile'
  import { district } from '@/utils/district'
  import { educates, maritalStatus } from '@/utils'
  import { Validator } from "vee-validate"
  import { savePersonInfo } from '@/api/product'
  import InputValidate from "@/components/InputValidate/index.vue"
  import SelectItem from '@/components/SelectItem/index.vue'

  // 手机号验证器
  Validator.extend("phone", {
    getMessage: field => `请输入您有效的${field}`,
    validate: value => /^1[34578][0-9]{9}$/.test(value)
  })

  export default {
    name: 'MoreApplyInfoForm',
    /* eslint-disable */
    components: {
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [NoticeBar.name]: NoticeBar,
      [Dialog.name]: Dialog,
      InputValidate,
      SelectItem
    },
    data() {
      return {
        pickerData: district, // 省市县
        marrigePickerData: maritalStatus, // 婚姻状况
        educatePickerData: educates, // 教育程度
        userInfo: {
          city: '',
          residentialAddress: '',
          personalEmail: '',
          maritalStatus: '',
          educationLevel: '',
          companyName: '',
          companyCity: '',
          companyPhone: '',
          annualIncome: '',
          contactName: '',
          contactPhone: '',
          contactName2: '',
          contactPhone2: ''
        },
        actDialog: {
          open: false,
          btns: [
            {
              text: '取消',
              handler: this.onActCancel,
            },
            {
              text: '确认提交',
              handler: this.onActConfirm,
            },
          ],
        }
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
      if (!this.$route.params.auth) this.$router.push({ path: '/center' })
    },
    methods: {
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        this.actDialog.open = false
        // this.submitForm()
        this.$router.push({ name: 'NoticePage', params: { auth: true } })
      },
      submitForm() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            savePersonInfo(Object.assign({}, this.userInfo, this.user)).then(response => {
              console.log(response)
              if (response && response.status === 201) {
                this.$router.push({ name: 'NoticePage', params: { auth: true } })
              }
            }).catch(err => {
              console.error(err)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .more-apply__info {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    .field-title {
      & > .md-field-title {
        color: #2c3e50;
        font-size: 30px;
        font-weight: 400;
      }
    }
    .field-contact__item .md-field-title::before,
    .field-title .md-field-item-title::before {
      content: '*';
      padding-top: 5px;
      padding-right: 5px;
      color: #ff525d;
    }
    .footer-btn {
      width: 95%;
      margin: 30px auto;
      .md-button.primary.large {
        border-radius: 10px;
      }
    }
  }
</style>
