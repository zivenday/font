<template>
    <div class="html__login">
        <div class="form__login--center" v-loading="isLoad">
            <div class="form__title--center">
                ZIVEN管理系统
            </div>
            <div class="form__content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                    <el-form-item label="账号：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">账号登录</el-button>
                        <el-button @click="signUp()">注册</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </div>
        <div class="auth__login">
            <i class="auth__login--github" @click="loginByOathGithub"></i>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible">
            <div v-html="GitOauthHtml"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from 'store/user'
import { loginByPWD, GetGithubOauth } from 'api/api';
import Cookies from 'js-cookie'
export default {
    name: 'html__login',
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空！'))
            } else {
                callback();
            }
        };
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
                callback();
            }
        };
        return {
            dialogVisible: false,
            ruleForm: {
                name: '',
                password: '',
            },
            isLoad: false,
            GitOauthHtml: '',
            rules: {
                name: [{
                    validator: checkName,
                    trigger: 'blur'
                }],
                password: [{
                    validator: checkPass,
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        ...mapActions(["USER_SIGNIN"]),
        submitForm() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    // this.createUser(formName);
                    this.checkUser()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        signUp(){
          this.$router.push({path:'/signUp'}) 
        },
        loginByOathGithub() {
            GetGithubOauth().then(res => {
                console.log(res)
                if (!res.data.code) {
                    window.location.href = res.data.url
                }
            }).catch(err => {
                console.log(err)
            })

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        createUser(formName) {
            var jsonData = {};
            var formObj = this.$refs[formName].$children;
            for (var i = formObj.length - 2; i >= 0; i--) {
                jsonData[formObj[i].prop] = formObj[i].fieldValue;
            }
            // this.checkUser(jsonData); 
            this.$router.push({ name: 'main' })
        },
        checkUser() {
            loginByPWD(this.ruleForm).then(res => {
                console.log(res)
                let data = res.data
                if (!data.code) {
                    Cookies.getJSON('user') ? this.$router.push({path:'/'}) : this.$message.error('用户名或密码错误！')
                } else {
                    this.$message.error(data.message)
                }
                console.log(sessionStorage.getItem("user"))
                console.log(this.$store.state.user)

            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$backgroundColor:#C0C0C0;
.html__login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $backgroundColor;
    display: flex;
    justify-content: center;
    align-items: center;
    .form__login--center {
        position: absolute;
        width: 500px;
        height: 350px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        padding-top: 20px;
        text-align: center;
        margin: 0 auto;
    }
    .form__title--center {
        padding-bottom: 20px
    }
    .form__content {
        width: 85%
    }
    .auth__login {
        position: absolute;
        width: 500px;
        height: 43px;
        margin: 130px auto;
        display: flex;
        justify-content: center;
        &::before {
            content: '第三方授权登录';
            position: absolute;
            text-align: center;
            font-size: 14px;
            width: 70%;
            border-bottom: 50px solid rgba(255, 255, 255, 0.5); // border-height: 1px;
            // background-color: black;
            // opacity: 0.1;
            top: -30px;
            padding-bottom: 10px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            z-index: 0px;
        }
        i {
            height: 40px;
            width: 40px;
            background-size: 100% 100%;
            margin-left: 15px;
            margin-right: 15px;
            cursor: pointer;
            opacity: 0.6;
            z-index: 1px;
        }
        &--github {
            background: url('../../assets/svg/github.svg') no-repeat;

            &:hover {
                opacity: 0.3;
            }
        }
        &--qq {
            background: url('../../assets/svg/qq.svg') no-repeat;
            &:hover {
                opacity: 0.3;
            }
        }
        &--weibo {
            background: url('../../assets/svg/微博.svg') no-repeat;
            &:hover {
                opacity: 0.3;
            }
        }
    }
}








/* Form-mixin */
</style>
