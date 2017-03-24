<template>
    <div class='main'>
        <!-- 顶栏 -->
        <div class="statu-navbar">
            <span class="statu-navbar__logo"></span>
            <div class="statu-navbar__user"></div>
        </div>
        <!-- 侧边栏 -->
        <div class="container">
            <el-row class="container-row">
                <el-col class="slide-navbar" :span="3">
                    <el-menu default-active="2" :style="{height:heightSize+'px',minWidth:widthSize+'px'}" @open="handleOpen" @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>导航一</template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
                        <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
                    </el-menu>
                </el-col>
                <!-- 显示栏 -->
                <el-col class="show-plane" :span="21">
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                widthSize:120
            }
        },
        computed: {
            heightSize: function() {
                //对于绝大部分浏览器使用window.innerWidth即可获取宽度，使用document.documentElement.clientWidth || document.body.clientWidth 为了实现对IE6，7的支持
                return (window.innerHeight - 60) || (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60)
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
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
        .container {
            .container-row {
                .slide-navbar {
                    ul.el-menu {
                        min-width: 120px;
                    }
                }
            }
        }
        // .no-svg .statu-navbar__logo{
        //  background: url()
        // }
    }
}
</style>
