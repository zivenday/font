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
                         <side-menu  :routes='permissionRouters' />
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
import { mapGetters } from 'vuex';
import SideMenu from './SideMenu.vue';
export default {
    components: { SideMenu },
    computed:{
        ...mapGetters(['permissionRouters'])
    },
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
