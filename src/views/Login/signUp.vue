<template>
    <div class="content">
        <div class="form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="ruleForm">
                <el-form-item label="账号：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitAction()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from 'store/user'
import { signUpByPWD, loginByPWD } from 'api/api'
import Cookies from 'js-cookie'
export default {
    name: 'signUp',
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
            ruleForm: {
                name: '',
                password: '',
            }, rules: {
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
        submitAction() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    signUpByPWD(this.ruleForm).then(res => {
                        if (!res.data.code) {
                           this.$router.push({path:'/'})
                        } else {
                            this.$message({type:'error',message:res.data.message})
                        }
                    }).catch(err=>{
                        this.$message({type:'error',message:err.message})
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
    width: 600px;
    height: 400px;
    margin: 100px auto;
    background-color: gray;
    padding: 50px;
}
</style>
