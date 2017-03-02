<template>
    <div class="html__login">
        <div class="form__login--center">
            <div class="form__title--center">
                ADMIN
            </div>
            <div class="form__content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                    <el-form-item label="登录名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'html__login',
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('登录名不能为空！'))
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
                age: ''
            },
            apiUrl: 'http://localhost:3000/login',
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.createUser(formName);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
            this.checkUser(jsonData);
        },
        checkUser(jsonData) {
            var res='';
            this.$http.post(this.apiUrl, jsonData)
                .then((response) => {
                    res=response.body;
                    console.log(response);
                    if (res.code == 1) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch((response) => {
                    // response.json()
                    alert('登录失败！')
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
        position: relative;
        width: 500px;
        height: 250px;
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
}


/* Form-mixin */
</style>
