<template id='main'>
    <div class='main'>
        <!-- 顶栏 -->
        <div class="statu-navbar">
            <div class="statu-navbar__user"><el-dropdown>
  <span class="el-dropdown-link">
    这里头部下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>功能一</el-dropdown-item>
    <el-dropdown-item>功能二</el-dropdown-item>
    <el-dropdown-item>功能三</el-dropdown-item>
    <el-dropdown-item disabled>不可点击功能四</el-dropdown-item>
    <el-dropdown-item divided>分割线隔开功能五</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown></div>
            
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
    name:'main',
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
        background-color: #409EFF;
        .statu-navbar__user {
            float: right;
            margin-top: 20px;
            margin-right: 50px

        }
       
    }
     .statu-navbar:before{
            position: absolute;
            content:'这里系统名称或logo';
            padding-top:15px;
            padding-left: 10px;
            font-size: 20px;
            width: 400px;
            height: 60px;
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

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
