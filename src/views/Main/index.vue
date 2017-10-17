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
                <el-menu class="el-menu-vertical"
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
                    <el-menu-item index="/main/video"><i class="el-icon-menu"></i>VR视频管理</el-menu-item>
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
        }
    },
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
    flex-direction: column;
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
        display:flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        left: 0px;
        width:100%;
        &__slider {
            width: 200px;
            flex: 0 0 200px;
            .el-menu-vertical {
                height: 100%
            }
        }
        &__show {
            flex: 1;
            box-sizing: border-box;
            padding: 20px;
        }
    }
}
</style>
