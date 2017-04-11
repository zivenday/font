<template id='main'>
    <div class='main'>
        <!-- 顶栏 -->
        <div class="statu-navbar">
            <span class="statu-navbar__logo"></span>
            <div class="statu-navbar__user"></div>
        </div>
        <!-- 侧边栏 -->
        <div class="main-container">
    
            <div class="main-container__slider">
                <el-menu :style="{height:heightSize+'px'}"
                         @open="handleOpen"
                         @select="handleSelect"
                         @close="handleClose">
                    <el-submenu index="/main/user">
                        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                        <el-menu-item index="1-1">用户查询</el-menu-item>
                        <el-menu-item index="1-2">权限管理</el-menu-item>
                        <el-menu-item index="1-3">个人设置</el-menu-item>
                    </el-submenu>
                    </el-submenu>
                    <el-menu-item index="/main/pano"><i class="el-icon-menu"></i>全景图管理</el-menu-item>
                    <el-menu-item index="/main/feedback"><i class="el-icon-setting"></i>反馈管理</el-menu-item>
                </el-menu>
            </div>
            <!-- 显示栏 -->
    
            <div class="main-container__show">
                <router-view></router-view>
            </div>
    
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            heightSize: (window.innerHeight - 60) || (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60)
        }
    },
    mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
                that.heightSize = (window.innerHeight - 60) || (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60)
            })()
        }
    },
    //     watch: {
    //     screenWidth (val) {
    //         this.screenWidth = val
    //     }
    // },
    // computed: {
    //     heightSize: function() {
    //         //对于绝大部分浏览器使用window.innerWidth即可获取宽度，使用document.documentElement.clientWidth || document.body.clientWidth 为了实现对IE6，7的支持
    //         return (window.innerHeight - 60) || (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60)
    //     }
    // },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            this.$router.push({ path: key })
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleResize() {
            console.log(1);
        }
    }
}
</script>

<style lang="scss">
.main {
    height: 100%;
    .statu-navbar {
        height: 60px;
        background-color: grey;
        .statu-navbar__logo {
            display: inline-block;
            height: 32px;
            width: 140px;
            background-image: url('../../assets/imgs/top-logo.png');
            margin-top: 14px;
            margin-left: 60px;
        }
    }
    &-container {
        display: flex;
        &__slider {
            width: 10%;
            min-width: 150px;
        }
        &__show {
            width: 90%;
            padding-top:15px;
        }
    }
}
</style>
